import { app } from "./app";

const PORT = process.env.PORT || 1759;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
