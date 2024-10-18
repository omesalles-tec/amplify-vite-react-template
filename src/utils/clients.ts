import { generateClient } from "aws-amplify/data";
import { Schema } from "../../amplify/data/resource";


const clientSchema = generateClient<Schema>();
export { clientSchema };
