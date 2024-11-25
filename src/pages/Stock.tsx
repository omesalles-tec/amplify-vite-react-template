import { post } from "aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";

const session = await fetchAuthSession();
console.log(session);

const Stock = () => {
  const requirements = {
    20240101: {
      lunch: [{ user: "user1", diet: "vegetarian" }, { user: "user2" }],
      dinner: [{ user: "user3", diet: "no eggs" }],
    },
    20240102: {
      lunch: [{ user: "user1", diet: "vegetarian" }],
      dinner: [{ user: "user2" }, { user: "user3", diet: "no eggs" }],
    },
    20240103: {
      lunch: [
        { user: "user1", diet: "vegetarian" },
        { user: "user2" },
        { user: "user3", diet: "no eggs" },
      ],
      dinner: [
        { user: "user1", diet: "vegetarian" },
        { user: "user3", diet: "no eggs" },
      ],
    },
    20240104: {
      lunch: [{ user: "user1", diet: "vegetarian" }],
      dinner: [{ user: "user2" }, { user: "user3", diet: "no eggs" }],
    },
  };

  const recipes = {
    recipe1: {
      type: ["lunch"],
      favourite: [],
      classification: ["ing1", "ing2"],
      season: false,
      diet: ["vegetarian", "no dairy"],
    },
    recipe2: {
      type: ["lunch"],
      favourite: ["user1", "user2", "user3"],
      classification: ["ing1", "ing3"],
      season: false,
      diet: ["no gluten"],
    },
    recipe3: {
      type: ["lunch", "dinner"],
      favourite: ["user3"],
      classification: ["ing1", "ing4"],
      season: false,
      diet: ["no nuts"],
    },
    recipe4: {
      type: ["lunch", "dinner"],
      favourite: ["user2"],
      classification: ["ing1", "ing5"],
      season: true,
      diet: ["vegetarian"],
    },
    recipe5: {
      type: ["lunch", "dinner"],
      favourite: ["user1", "user2"],
      classification: ["ing1", "ing6"],
      season: false,
      diet: [],
    },
    recipe6: {
      type: ["lunch"],
      favourite: ["user3"],
      classification: ["ing2", "ing3"],
      season: true,
      diet: ["vegetarian"],
    },
    recipe7: {
      type: ["lunch", "dinner"],
      favourite: ["user1"],
      classification: ["ing2", "ing4"],
      season: false,
      diet: [],
    },
    recipe8: {
      type: ["lunch", "dinner"],
      favourite: [],
      classification: ["ing2", "ing5"],
      season: false,
      diet: ["no gluten"],
    },
    recipe9: {
      type: ["lunch"],
      favourite: [],
      classification: ["ing2", "ing6"],
      season: false,
      diet: ["no gluten", "no eggs"],
    },
    recipe10: {
      type: ["lunch", "dinner"],
      favourite: ["user3"],
      classification: ["ing3", "ing4"],
      season: false,
      diet: [],
    },
    recipe11: {
      type: ["lunch", "dinner"],
      favourite: ["user1", "user3"],
      classification: ["ing3", "ing5"],
      season: true,
      diet: [],
    },
    recipe12: {
      type: ["lunch"],
      favourite: ["user1", "user3"],
      classification: ["ing3", "ing6"],
      season: false,
      diet: ["no eggs"],
    },
    recipe13: {
      type: ["lunch", "dinner"],
      favourite: [],
      classification: ["ing4", "ing5"],
      season: true,
      diet: [],
    },
    recipe14: {
      type: ["lunch"],
      favourite: ["user1"],
      classification: ["ing4", "ing6"],
      season: false,
      diet: [],
    },
    recipe15: {
      type: ["dinner"],
      favourite: [],
      classification: ["ing5", "ing6"],
      season: false,
      diet: [],
    },
  };

  const days_look_back = "3";


  /*async function getData() {
    const url = "https://tgn1xz35q9.execute-api.eu-west-3.amazonaws.com/Prod/";
    try {
      const session = await fetchAuthSession();
      if (!session.tokens) {
        throw new Error('Session tokens are undefined');
      }
      console.log(session.tokens.accessToken.toString())
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          requirements: requirements,
          recipes: recipes,
          days_look_back: days_look_back,
        }),
        headers: {
          'Authorization': `Bearer ${session.tokens?.accessToken?.toString()}`,
          "Content-Type": "text/plain",
          "Origin": "http://localhost:5173"  
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
    } catch (error: any) {
      console.error(error.message);
    }
  }*/

  async function postItem(session: any) {
    console.log(session)
    try {
      const restOperation = post({
        apiName: "menu-planner-lambda",
        path: "/test",
        options: {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.tokens.accessToken}`,
          },
          body: JSON.parse(JSON.stringify({
            requirements: requirements,
            recipes: recipes,
            days_look_back: days_look_back,
          })),
        },
      });
      const { body } = await restOperation.response;
      const response = await body.json();

      console.log("POST call succeeded");
      console.log(response);
    } catch (error: any) {
      console.log("POST call failed: ", JSON.stringify(error));
    }
  }

  return (
    <>
      <h1>Stock</h1>
      <input type="button" onClick={() => postItem(session)} value={"Click"} />
    </>
  );
};

export default Stock;
