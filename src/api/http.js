import router from '../router'

// 配置API接口地址
var root = 'http://81.68.146.67:8000/'
// var root = 'http://localhost:44330/'
// 引用axios
var axios = require('axios')
var qs = require('qs')
// 自定义判断元素类型JS
function toType (obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key]
        }
        if (toType(o[key]) === 'string') {
            o[key] = o[key].trim()
        } else if (toType(o[key]) === 'object') {
            o[key] = filterNull(o[key])
        } else if (toType(o[key]) === 'array') {
            o[key] = filterNull(o[key])
        }
    }
    return o
}
/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/

// axios.create({
//     root,
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
//     withCredentials: false,
// })

// axios.defaults.headers = {
//     'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
// };

// http request 拦截器
axios.interceptors.request.use(
    (config) => {
        // console.log('contenttype', config.headers.contentType);
        // if (config.method === 'post') {
        //     config.data = qs.stringify(config.data)
        // }
        if (window.localStorage.Token) {
            config.headers.Authorization = "Bearer " + window.localStorage.Token
        }
        // config.headers = {
        //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        // };
        return config;
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            // console.log('error response', error)
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    console.log('401')
                    console.log(router.currentRoute.fullPath)
                    // router.replace({
                    //     path: "login",
                    //     query: { redirect: router.currentRoute.fullPath }
                    // });
            }
        }
        return Promise.reject(error.response.data); // 返回接口返回的错误信息
    }
);

function apiAxios (method, url, params, success, failure) {
    if (params) {
        params = filterNull(params)
    }
    axios({
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? qs.stringify(params) : null,
        params: method === 'GET' || method === 'DELETE' ? params : null, //headers 是即将被发送的自定义请求头，还记得我们的jwt验证么，可以封装进来，注意!这里如果要添加 headers ，一定要是正确的值　　 headers:{"Authorization":"Bearer xxxxxxx"},
        baseURL: root,
        withCredentials: false,
        // headers: {
        //     'Authorization': 'Bearer ' + window.localStorage.Token,
        // }
    })
        .then(function (res) {
                success(res.data)
        })
        .catch(function (err) {
            if (err) {
                console.log('err', err)
            }
        })
}

// 返回在vue模板中的调用接口
export default {
    get: function (url, params, success, failure) {
        return apiAxios('GET', url, params, success, failure)
    },
    post: function (url, params, success, failure) {
        return apiAxios('POST', url, params, success, failure)
    },
    put: function (url, params, success, failure) {
        return apiAxios('PUT', url, params, success, failure)
    },
    delete: function (url, params, success, failure) {
        return apiAxios('DELETE', url, params, success, failure)
    },
}
