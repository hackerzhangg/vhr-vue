import axios from 'axios'
import { Message } from 'element-ui';

//response:响应拦截请求
axios.interceptors.response.use(success=>{
    //success.status:取值是HTTP的状态码，success.data.status是手动定义的状态码
    //如果条件满足，表示是业务上的错误
    if(success.status && success.status==200 && success.data.status==500){
        //success.data.msg:从后端的respBean.setMsg中取值
        Message.error({message:success.data.msg});
        return;
    }
    if(success.data.msg){
        Message.success({message:success.data.msg});
    }
    //success.data:返回服务端的数据
    return success.data;
},error=>{
    if(error.response.status ==504 || error.response.status ==404){
        Message.error({message:'服务器出现问题了 哎呀！'});
    }else if(error.response.status ==403){
        Message.error({message:'权限不足，请联系管理员！'});
    }else if(error.response.status ==401){
        Message.error({message:'尚未登录，请登录！'});
    }else{
        if(error.response.data.msg){
            Message.error({message:error.response.data.msg});
        }else{
            Message.error({message:'未知错误！'});
        }
    }
    return;
})

//定义一个post请求的封装
let base='';        //base:防止以后需要给所有的请求加一个前缀

//登录为post请求，在SpringSecurity中默认只支持key:value的格式，不支持json
export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            //i：相当于key
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

//json的形式
export const postRequest = (url,params) => {
    return axios({
        method:'post',
        url:`${base}${url}`,
        data:params
    })
}
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        params: params
    })
}
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        params: params
    })
}