import axios from 'axios';
import qs from 'querystring';

// 处理多余的一些响应数据
const deleteResponseData = (res, ...key) => {
  key.forEach(el => {
    if (res[el]) {
      delete res[el]
    }
  })
  return res
}

class netWork {

  constructor(config) {
    const options = {
      withCredentials: true,
      timeOut: 1000 * 5
    }
    this.instance = axios.create({
      ...config,
      ...options
    })
  }

  // 处理拦截器
  handleInterceptors(instance) {
    // 请求
    instance.interceptors.request.use(config => {

      if (Reflect.has(config, '_useFormFlag')) {
        config.headers['content-type'] = 'application/x-www-form-urlencoded';
        config.data = qs.stringify(config.data);

      } else if (Reflect.has(config, '_fileFlag')) {
        config.headers['Accept'] = '*/*';
        config.headers['content-type'] = 'multipart/form-data';

      } else {
        config.headers['content-type'] = 'application/json;charset=UTF-8';
      }

      return config;
    }, error => {
      return Promise.reject(error)
    })

    // 响应
    instance.interceptors.response.use(response => {
      let { data } = response

      if (data instanceof Blob) {
        return data
      }

      // 对返回的数据做个包装
      data = deleteResponseData(data, 'code', 'msg')
      return { data: data, code: 200, msg: '请求成功' }
    }, error => {
      return Promise.reject({ code: 10000, data: error, msg: '请求出错' });
    })

  }

  // 请求的方法
  fetch() {
    this.handleInterceptors(this.instance)
    return this.instance
  }
}

export default netWork