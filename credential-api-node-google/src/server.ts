import { env } from "./config/env.js";
import { createApp } from "./app.js";
import { createTokenValidator } from "./idp/index.js";

const app = createApp(createTokenValidator());

app.listen(env.PORT, () => {
  console.log(`Credential API listening on port ${env.PORT}`);
});
