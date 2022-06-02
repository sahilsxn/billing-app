import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'http://dct-pos-app.herokuapp.com/api'
})

export default axios
