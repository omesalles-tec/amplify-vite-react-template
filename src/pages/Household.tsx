import { fetchUserAttributes } from "aws-amplify/auth";
import { useState, useEffect } from "react";
import type { Schema } from "../../amplify/data/resource";
import {
  createRequests,
  deleteRequests,
  deleteUser,
} from "../../amplify/graphql/mutations";
import { listRequests, listUsers } from "../../amplify/graphql/queries";
import Table from "@cloudscape-design/components/table";
import {
  Box,
  Button,
  Container,
  ExpandableSection,
  FormField,
  Header,
  Icon,
  Input,
  SpaceBetween,
  Modal,
} from "@cloudscape-design/components";

import EditHouseholdName from "./household/EditHouseholdName";
import EditUser from "./household/EditUser";
import AddAnonymousMember from "./household/AddAnonymousMember";
import { clientSchema } from "../utils/clients"; // Fixed the import statement

const Household = () => {
  const [attributes, setAttributes] = useState<any>({});
  const [users, setUsers] = useState<any>([]);
  const [requests, setRequests] = useState<any>([]);
  const [household, setHousehold] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [contactEmail, setContactEmail] = useState("");
  const [visibleModalHouseholdNameEdit, setVisibleModalHouseholdNameEdit] =
    useState(false);
  const [visibleModalAddAnonymous, setVisibleModalAddAnonymous] =
    useState(false);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Define an asynchronous function to fetch data
    const dataLoader = async () => {
      const attributesData = await fetchUserAttributes();
      setAttributes(attributesData);
      try {
        // Start the loading process
        setLoading(true);
        const householdData = await clientSchema.models.Household.get({
          id: attributesData["custom:householdID"] || "",
        });
        setHousehold(householdData.data); // Set the data into state

        const { data: dataUsers } = await clientSchema.graphql({
          query: listUsers,
          variables: {
            filter: {
              householdID: { eq: attributesData["custom:householdID"] || "" },
            },
          },
        });
        setUsers(dataUsers.listUsers.items);

        //const userAdminFlag = dataUsers.listUsers.items.filter((x)=>x.email===attributesData["email"])[0]["adminFlag"];
        //console.log(userAdminFlag);

        const { data: dataRequests } = await clientSchema.graphql({
          query: listRequests,
          variables: {
            filter: {
              adminEmail: { eq: attributesData["email"] },
            },
          },
        });
        setRequests(dataRequests.listRequests.items);
      } catch (error: any) {
        setError(error.message); // Set any errors
      } finally {
        setLoading(false); // Stop loading whether success or failure
      }
    };

    // Call the fetch function
    dataLoader();
  }, []); // Ensure this runs only once when the component mounts

  // Conditional rendering based on the loading, error, or data state
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // the editing options should only be available to the admin
  // can I add householdID and adminFlag info to cookie?
  // A user should see his request for joining a family until it has been accepted

  // should check if hte user has made a request, and also if the user is admin
  // if he's being made a request.

  const requestToJoinHousehold = async () => {
    const userID = String(attributes["sub"]) || "";
    const email = String(attributes["email"]) || "";

    try {
      await clientSchema.graphql({
        query: createRequests,
        variables: {
          input: {
            userId: userID,
            userEmail: email,
            adminEmail: contactEmail,
          },
        },
      });
      setContactEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        visible={visibleModalHouseholdNameEdit}
        onDismiss={() => {
          setVisibleModalHouseholdNameEdit(false);
        }}
      >
        <EditHouseholdName
          household={household}
          setVisible={setVisibleModalHouseholdNameEdit}
          setHousehold={setHousehold}
        />
      </Modal>

      <Box margin="xl">
        <SpaceBetween size="s">
          <Container header={<Header variant="h2">Household name</Header>}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "10px" }}>
                {household?.householdName}
              </div>
              <div style={{ display: "inline" }}>
                <Button onClick={() => setVisibleModalHouseholdNameEdit(true)}>
                  <Icon name="edit" />
                </Button>
              </div>
            </div>
          </Container>
          <Container>
            <ExpandableSection headerText="Join another household">
              <FormField description="Write the household admin email">
                <Input
                  onChange={({ detail }) => {setContactEmail(detail.value); }}
                  value={contactEmail}
                  type="email"
                />
              </FormField>
              <Button onClick={requestToJoinHousehold}>Send request</Button>
            </ExpandableSection>
          </Container>
          {requests && Array.isArray(requests) && (
            <RequestsTable
              requests={requests}
              setRequests={setRequests}
              users={users}
              setUsers={setUsers}
              household={household}
            />
          )}
          {users && Array.isArray(users) && (
            <>
              <UsersTable
                users={users}
                anonymousFlag={false}
                columnDisplay={[
                  { id: "email", visible: true },
                  { id: "tags", visible: true },
                  { id: "adminFlag", visible: true },
                ]}
                setUsers={setUsers}
                theHeader="Family members with accounts"
              />
              <UsersTable
                users={users}
                anonymousFlag={true}
                columnDisplay={[
                  { id: "anonymousLabel", visible: true },
                  { id: "tags", visible: true },
                  { id: "deleteAction", visible: true },
                ]}
                setUsers={setUsers}
                theHeader="Other members"
              />

              <Modal
                visible={visibleModalAddAnonymous}
                onDismiss={() => {
                  setVisibleModalAddAnonymous(false);
                }}
              >
                <AddAnonymousMember
                  users={users}
                  setUsers={setUsers}
                  setModal={setVisibleModalAddAnonymous}
                />
              </Modal>

              <Button onClick={() => setVisibleModalAddAnonymous(true)}>
                <Icon name="add-plus" />
                Add other members
              </Button>
            </>
          )}
        </SpaceBetween>
      </Box>
    </>
  );
};

export default Household;

interface UsersTableProps {
  //users: Schema["User"][];
  users: any;
  anonymousFlag: boolean;
  columnDisplay: any[];
  setUsers: any;
  theHeader: string;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  anonymousFlag,
  columnDisplay,
  setUsers,
  theHeader,
}) => {
  // State for managing the modal
  const [selectedRow, setSelectedRow] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Function to handle row click and open the modal
  const handleRowClick = (userID: string) => {
    setSelectedRow(userID);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRow("");
  };

  const deleteAnonymousMember = async (itemID: string) => {
    try {
      await clientSchema.graphql({
        query: deleteUser,
        variables: { input: { id: itemID } },
      });
    } catch (error) {
      console.log(error);
    }
    setUsers(users.filter((user:any) => user.id !== itemID));
  };

  return (
    <>
      <Table
        columnDefinitions={[
          {
            id: "email",
            header: "Email",
            cell: (item: any) => (
              <Button variant="link" onClick={() => handleRowClick(item.id)}>
                {item.email}
              </Button>
            ),
          },
          {
            id: "anonymousLabel",
            header: "Name",
            cell: (item: any) => (
              <Button variant="link" onClick={() => handleRowClick(item.id)}>
                {item.anonymousLabel}
              </Button>
            ),
          },
          {
            id: "adminFlag",
            header: "Household admin",
            cell: (item: any) => (
              <input type="checkbox" checked={item.adminFlag} readOnly />
            ),
          },
          {
            id: "tags",
            header: "Dietary needs",
            cell: (item: any) => item.tags?.join(", ") ?? "",
          },
          {
            id: "deleteAction",
            header: "Delete member",
            cell: (item) => (
              <span onClick={() => deleteAnonymousMember(item.id)}>
                {" "}
                <Icon name="remove" />
              </span>
            ),
          },
        ]}
        columnDisplay={columnDisplay}
        items={users.filter((user:any) => user.anonymousFlag === anonymousFlag)}
        loadingText="Loading resources"
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No resources</b>
            </SpaceBetween>
          </Box>
        }
        header={<Header>{theHeader}</Header>}
      />
      {/* Modal that opens when a row is clicked */}
      {isModalOpen && (
        <Modal
          onDismiss={handleCloseModal}
          visible={isModalOpen}
          closeAriaLabel="Close"
          header="Item Details"
        >
          <EditUser
            users={users}
            userID={selectedRow}
            setUsers={setUsers}
            closeModal={handleCloseModal}
          />
        </Modal>
      )}
    </>
  );
};

interface RequestsTableProps {
  users: Schema["User"][];
  setUsers: (users: any[]) => void;
  requests: any[];
  setRequests: (requests: any[]) => void;
  household: Schema["Household"];
}

const RequestsTable: React.FC<RequestsTableProps> = ({
  users,
  setUsers,
  requests,
  setRequests,
  household,
}) => {
  // State for managing the modal

  const handleAccept = async (item: any, household: any) => {
    try {
      console.log(item.userId, household.id);
      // update user table and cognito to reflect the new household
      await clientSchema.models.User.update({
        id: item.userId,
        householdID: household.id,
        adminFlag: false,
      });
      //update cognito: https://docs.amplify.aws/react/build-a-backend/auth/connect-your-frontend/manage-user-attributes/#update-user-attribute
      /*    const output = await updateUserAttribute({
      userAttribute: {
        attributeKey,
        value
      }
    });*/
      await clientSchema.mutations.updateCognitoHousehold({
        userEmail: item.userEmail, //<= should know the cognito id of the requesting user, I should make it the same value as User.id
        newHouseholdID: household.id,
      });
      await handleReject(item);
      const {data: newUser} = await clientSchema.models.User.get(item.userID);
      setUsers([...users, newUser]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (item: any) => {
    await clientSchema.graphql({
      query: deleteRequests,
      variables: {
        input: { id: item.id },
      },
    });
    requests.length === 1
      ? setRequests([])
      : setRequests(requests.filter((x) => x.id !== item.id));
  };
  return (
    <Table
      columnDefinitions={[
        {
          id: "email",
          header: "Email",
          cell: (item: any) => item.userEmail,
        },
        {
          id: "acceptAction",
          header: "Accept member",
          cell: (item) => (
            <Button onClick={() => handleAccept(item, household)}>
              <Icon name="add-plus" />
              Accept
            </Button>
          ),
        },
        {
          id: "rejectAction",
          header: "Reject member",
          cell: (item) => (
            <Button onClick={() => handleReject(item)}>
              <Icon name="remove" />
              Reject
            </Button>
          ),
        },
      ]}
      columnDisplay={[
        { id: "email", visible: true },
        { id: "acceptAction", visible: true },
        { id: "rejectAction", visible: true },
      ]}
      items={requests}
      loadingText="Loading resources"
      header={<Header>Pending requests</Header>}
    />
  );
};
