const { Server } = require("socket.io");
const si = require('systeminformation');
const io = new Server({cors:{origin:"*"}});

let battLevel
let charging 

setInterval(()=>{
    si.battery()
  .then(data => {
    battLevel = data.percent
    charging = data.isCharging
    })
  .catch(error => console.error(error));
},1000)

setInterval(()=>{
    console.log(battLevel)
    console.log(charging)
},1000)
io.on("connection", (socket) => {
    setInterval(()=>{
        let sysData = {"battLevel":battLevel,"charging":charging}
        socket.emit('batt',sysData)
    },1000)
    console.log(`New user connected : `, socket.id)
});

io.listen(5000);
