const { WebSocketServer } = require("ws");


export class WSServer {
    constructor() {
        const wss = new WebSocketServer({port: 6601}, () => {
            console.log(`ws start on 6601`)
        });

        wss.on("connection", (ws) => {
            console.log(`есть контакт`)

            ws.on("message", (data) => {
              //  const msg = JSON.parse(data)

                console.log(data.toString())
            })
        })
    }
}

