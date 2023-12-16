import {createRouterFactoryFun} from '../utils/createRouter.js';

const loginRouter = createRouterFactoryFun()

// 处理登录逻辑
const loginApiRouter = (router) => {
    router.post('/login', (req, res) => {
        const body = req.body
        // 存入数据库
        console.log(body);
    })
}

loginApiRouter(loginRouter)

export default loginRouter