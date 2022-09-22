const { WebSocketServer } = require("ws");


let Pool = require("pg").Pool;


//DB CONFIG FROM SOCKET

export const db = new Pool({
    user: "postgres",
    password: "109109109",
    host: "localhost",
    port: 5432,
    database: "calendar"
});



export class WSServer {
    constructor() {
        const wss = new WebSocketServer({port: 6601}, () => {
            console.log(`ws start on 6601`)
            console.log(`ws start on 6601`)
            console.log(`ws start on 6601`)
            console.log(`ws start on 6601`)
            console.log(`ws start on 6601`)
            console.log(`ws start on 6601`)
            console.log(`ws start on 6601`)
            console.log(`ws start on 6601`)
            console.log(`ws start on 6601`)
            console.log(`ws start on 6601`)
            console.log(`ws start on 6601`)
            console.log(`ws start on 6601`)
            console.log(`ws start on 6601`)
            console.log(`ws start on 6601`)
            
        });

        wss.on("connection", (ws) => {
            console.log(`есть контакт`)
            ws.id = []

            ws.on("message", (data) => {
              const msg = JSON.parse(data)

              switch (msg.type) {
                case "connection": {
                    if (!ws.id.includes(msg.id)) {
                        ws.id.push(msg.id)
                    }
                    break;
                }

                case "msg": {

                


                    if (msg.user && msg.audio.length == 0) {
                        // db.query(`UPDATE user_entity SET status = 'Online' WHERE id = ${msg.user.id}`)
                        db.query(`INSERT INTO message_entity(sender, chatid, text, time, audio) VALUES('${msg.user.id}','${msg.chatId}','${msg.text}','${msg.time}','${msg.audio}');`)
                    }

                    wss.clients.forEach(el => {
                        if (el.id.includes(msg.chatId || msg.chatid)) {
                            el.send(JSON.stringify(msg))
                        }
                    })
                    break;
                }


                case "exit": {
                   //console.log("exit")
                    //db.query(`UPDATE user_entity SET status = 'Offilne' WHERE id = ${msg.user.id}`)
                    break;
                }

                default: ""
              }
            })
        })
    }
}

