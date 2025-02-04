import axios from 'axios';
import { errorInterceptor, responseInterceptor } from './interceptors';

const Api = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
);

Api.interceptors.response.use(
    (resposta) => responseInterceptor(resposta),
    (erro) => errorInterceptor(erro)
);

export { Api };
