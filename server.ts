import "jsr:@std/dotenv/load";

// @deno-types="npm:@types/express@4.17.15"
import express from "npm:express@4.18.2";

const PORT = Deno.env.get("PORT") || "3000";

const app = express();

app.use(express.json());

app.get("/api/v1/:name", (req, res) => {
  const name = req.params.name.trim();
  const data = { message: `Hello, ${name}!` };
  res.send(data);
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

Deno.addSignalListener("SIGINT", () => {
  console.log("SIGINT signal received: server is shutting down...");
  server.close((err) => {
    if (err) {
      console.error("Error closing server:", err);
    } else {
      console.log("Server closed successfully");
    }
    Deno.exit(err ? 1 : 0);
  });
});
