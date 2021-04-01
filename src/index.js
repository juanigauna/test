import app from "./app";

// database
import "./config/mongoose";


const port = process.env.PORT || 3000
// Starting the server
app.listen(port);
console.log("Server on port", port);
