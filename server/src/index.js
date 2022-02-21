import '@babel/polyfill'
import app from "./app"

const port = 4000

async function main() {
   await app.listen(port)
   console.log(`Server listen on port http://localhost:${port}/`)
}

main()