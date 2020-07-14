import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'

const user = {
    state: {
        token: getToken(),
        userMsg:{
            nickName:Cookies.get('nickName'),
            img:Cookies.get('img')
        }
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        }
    },
    acitons: {
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                login(username, userInfo.password,userInfo.captcha,userInfo.uuid).then(response => {
                    if (response.data.code !== 0) {
                        resolve(response.data.data)
                        return
                    }
                    const data = response.data.data
                    commit('SET_TOKEN',data.token)
                    setToken(data.token)
                    resolve(0)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}

export default user
