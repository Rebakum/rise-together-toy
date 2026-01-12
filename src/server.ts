import app from "./app";
import config from "./Config";
import { prisma } from "./lib/prisma";
const port = process.env.PORT ||5000


// Start server
async function server() {
  try{
    await prisma.$connect()
    console.log("Database connected")
    app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port} in ${config.node_env} mode `);
});

  }catch(error){
    console.log("server failed to start", error)
    await prisma.$disconnect()
    process.exit(1)

  } 
  
}
server()

