import { Authenticator, Divider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import Button from "@cloudscape-design/components/button";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Header from "@cloudscape-design/components/header";

import MyFileUpload from "../components/MyFileUpload";

const client = generateClient<Schema>();

const ID_TEAM = 'a28791a6-2507-4de0-87f1-109f3a384870';
const ID_PLAYER = 'aa28ac0f-5c78-4bac-825f-12a0705887f1';

function Todos() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  async function createMember() {
    await client.models.Member.create({ name: window.prompt("Member name") || "" });
  }

  async function getMember() {
    /* Opcion 1 */
    const { data: member } = await client.models.Member.get({ id: ID_PLAYER});

    if (member) {
      await member.team();
    }
    
    /* Opcion 2 
    const { data: member } = await client.models.Member.get(
      { id: ID_PLAYER },
      { selectionSet: ["name", "team.*"] },
    );
    */    
  }

  async function createTeam() {
    const { data: team } = await client.models.Team.create({
      mantra: window.prompt("Mantra name") || "",
    });
    
    if (team) {
      await client.models.Member.create({
        name: window.prompt("Team name") || "",
        teamId: team.id,
      });
    }
  }

  async function deleteTeam() {
    const { data: team } = await client.models.Team.get({ id: ID_TEAM});

    
    if (team) {
      const { data: members } = await team.members();
      members.forEach(member => {
        client.models.Member.update({
          id: member.id,
          teamId: null, // Eliminamos la relacion con el equipo
        });
      });
    }
    
    await client.models.Team.delete({ id: ID_TEAM });
  }


  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <button onClick={createTeam}>Crear Equipo</button>
          <button onClick={deleteTeam}>Eliminar Equipo</button>
          <button onClick={getMember}>Get Member</button>
          <button onClick={createMember}>Create Member</button>
          ---------          
          <h1>{user?.signInDetails?.loginId}'s todos</h1>
          <MyFileUpload />
          <Divider
              orientation="horizontal" />
              <button onClick={createTodo}>+ new</button>
          <Table
            renderAriaLive={({ firstIndex, lastIndex, totalItemsCount }) =>
              `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
            }
            columnDefinitions={[
              {
                id: "id",
                header: "Identifier",
                cell: (x) => <Button onClick={() => deleteTodo(x.id)}>{x.id}</Button>,
                isRowHeader: true,
              },
              {
                id: "description",
                header: "Description",
                cell: (x) => x.content,
                sortingField: "description",
              },
            ]}
            enableKeyboardNavigation
            items={todos.map((todo) => ({
              id: todo.id,
              content: todo.content,
            }))}
            loadingText="Loading resources"
            sortingDisabled
            empty={
              <Box
                margin={{ vertical: "xs" }}
                textAlign="center"
                color="inherit"
              >
                <SpaceBetween size="m">
                  <b>No resources</b>
                  <Button>Create resource</Button>
                </SpaceBetween>
              </Box>
            }
            header={<Header> Simple table </Header>}
          />
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
              Review next step of this tutorial.
            </a>
          </div>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

export default Todos;
