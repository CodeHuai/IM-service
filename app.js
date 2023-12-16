import express from 'express'
import bodyParser from 'body-parser';
import {router} from './routes/routes.js'
import {config} from './config/index.js'
import http from 'http'
import {Server} from "socket.io";
import cors from 'cors'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/otherApi', router.otherRouter) // 第三方接口路由
app.use('/api', router.loginRouter) // 登录接口路由

io.on('connection', socket => {
    socket.on('echo-test', data => {
        console.log(data)
    })
})


server.listen(config.PORT, err => {
    if (err) {
        return new Error(err)
    }
    console.log('connected 3000')
})