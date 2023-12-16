import netWork from '../utils/axios.js'

const service = new netWork().fetch()

// 随机头像
export const getHeaderPic = () => service.get(`https://v2.api-m.com/api/head`)

// 随机名称
export const getRandomName = () => service.get(`https://v.api.aa1.cn/api/api-xingming/index.php`)