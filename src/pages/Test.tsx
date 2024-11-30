import React, { useEffect, useState } from 'react';
import { getMenu } from '../../amplify/graphql/queries';
import { generateClient } from "aws-amplify/api";
import { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

// Define the shape of the data fetched from the API
interface Post {
    id: number;
    title: string;
    body: string;
}

const ParentComponent: React.FC = () => {
    const [data, setData] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMenuDetails = async (menuId: string, householdId: string, setMenuArray: any) => {
        try {
          const response = await client.graphql({
            query: getMenu,
            variables: {
              id: menuId,
              householdId: householdId,
            },
          });
          if (response.data.getMenu?.menuDetails) {
            setMenuArray(JSON.parse(response.data.getMenu.menuDetails));
          }
        } catch (error) {
          console.error("Error fetching menu details:", error);
        }
      };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result: Post[] = await response.json(); // Explicitly type the result
                setData(result);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Parent Component</h1>
            <ChildComponent posts={data} />
        </div>
    );
};

export default ParentComponent;

// Define props for the child component
interface ChildComponentProps {
    posts: {
        id: number;
        title: string;
        body: string;
    }[];
}

const ChildComponent: React.FC<ChildComponentProps> = ({ posts }) => {
    return (
        <div>
            <h2>Child Component</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};