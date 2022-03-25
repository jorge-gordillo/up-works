import '@babel/polyfill'
import app from "./app"
require('dotenv').config()

const PORT = process.env.PORT || 4000

async function main() {
   await app.listen(PORT)
   console.log(`Server listen on port http://localhost:${PORT}/`)
}

main()