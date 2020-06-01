import { configureApp } from "./app";

const port = 3001;
const app = configureApp();

app.listen(port, () => console.log(`App started at http://localhost:${port}`));
