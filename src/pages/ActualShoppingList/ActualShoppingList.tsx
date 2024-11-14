import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";
import { listDoneCalculations } from "../../../amplify/graphql/queries";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Header from "@cloudscape-design/components/header";
import Link from "@cloudscape-design/components/link";
import supermarkets from "../../utils/supermakets";
import { useCollection } from '@cloudscape-design/collection-hooks';

const client = generateClient<Schema>();

export default function ActualShoppingList() {

  const [data, setData] = useState<any>([])
  const {uuid, yyyymmdd } = useParams();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const temp = await client.graphql({
            query: listDoneCalculations,
            variables: {
              id: uuid,
              createdAt: {"beginsWith": yyyymmdd}
            },
          });
        if (temp.data && 
          temp.data.listDoneCalculations && 
          temp.data.listDoneCalculations.items && 
          temp.data.listDoneCalculations.items[0] && 
          temp.data.listDoneCalculations.items[0].items) {
          setData(temp.data.listDoneCalculations.items[0].items.map(x => JSON.parse(x)));
        }
        console.log(data);
        // Update data state      
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

      fetchData();
    }, []);
    const { items, collectionProps } = useCollection(data, {filtering:{}, pagination: { pageSize: 1000}, sorting: {}, selection:{}});
    
    return (
      <Table
        {...collectionProps}
        columnDefinitions={[
          {
            id: "link",
            header: "Link",
            cell: (item: any) => <Link external href={item.link || "-"} target="_blank">{item.desc}</Link>
          },
          {
            id: "price",
            header: "Item price",
            cell: (item: any) => item.price,
          },

          {
            id: "supermarket",
            header: "Supermarket",
            cell: (item: { supermarket: keyof typeof supermarkets }) => supermarkets[item.supermarket] || "-",
            sortingField: "supermarket"
          }
        ]}
        enableKeyboardNavigation
        items={items}
        loadingText="Loading resources"
        empty={
          <Box
            margin={{ vertical: "xs" }}
            textAlign="center"
            color="inherit"
          >
            <SpaceBetween size="m">
              <b>No resources</b>
            </SpaceBetween>
          </Box>
        }
        header={<Header> Simple table </Header>}
      />
    );
  }