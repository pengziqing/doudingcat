import axios from 'axios';
import qs from 'qs'
import { Message, MessageBox } from 'element-ui'

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
     baseURL: 'https://qasc.qdingnet.com/',
     timeout: 5000
});

service.interceptors.request.use(
    config => {
        // config.data = qs.stringify(config.data)
        console.log(config.data.body)
        let token = window.localStorage.getItem('token')
        // 测试环境
        // if (token) {
        //      config.headers['token'] = token
        // } else {
        //      window.location.href="/"
        // }
        // 本地环境
        // if (!token) {
        //     // window.location.href="https://qasc.qdingnet.com/"
            
        //    config.headers['token'] = 'v1_UU5LQm56KzdLYnJSL0V2WFQ4eUQyS2hIU0RZeDNZMlRreXd6Uis3cG1IVnpDbkNVWXdMWDFSQ3JWdzE2WUhPNWdWVlBFZUxEbGRXUXBzMW9kYUZtcFBkcWN3MWd5MktEak9OaDNpc0Zvc3pyUmJuR0FBcUZ4SVpxeDYrZVJsZzkrVUNCYkZWUmZMUTFDbFJ4aFBNL1BONHBNbXdnRjlqZUxuVEp3MkhJUEMyd0hNdUsxenl4Zi8wcmlIYXpFSzVUUTd5TXczU1QwQWlIWGdhd2dUOTlZYUxBSUtGZ1dXaFdQZDNXWFY4RVdEcz0NksnIAF1jtfSfllSRovl4lWxEXe860JijJhyLZz4oCE6---3LWmfe4Z2O25SCsSPNGd5QSJErVmT-BdX9ukxDX2yjUmdHUNcZwpPct32367fwL1D781DWr-SgD877qvbr_j6wjJHIHp31ljvI4vfAK2IKOVQBQCIM3t-v-M9p9A..'
        // }   
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code === 200) {
            return res;
        } else {
            // Promise.reject();
       Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
        })
      }
      return res;
    },
    error => {
    console.log('err' + error)// for debug
    Message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000
    })        
        return Promise.reject();
    }
);

export default service;
