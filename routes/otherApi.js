import {nanoid} from 'nanoid'
import {createRouterFactoryFun} from '../utils/createRouter.js'
import {getHeaderPic, getRandomName} from '../api/index.js'


const otherRouter = createRouterFactoryFun()

const otherApiRouter = (router) => {
    // 请求头像接口
    router.get('/getHeaderPicApi', (request, response) => {
        getHeaderPic().then(res => {
            response.json(res)
        }, err => {
            response.json(err)
        })
    })

    // 请求随机名称
    router.get(`/getRandomNameApi`, (request, response) => {
        getRandomName().then(res => {
            console.log(res);
            res.data.id = nanoid() // 增加唯一id标识
            response.json(res)
        }, err => {
            response.json(err)
        })
    })
}

otherApiRouter(otherRouter)

export default otherRouter