import axios from 'axios';
import { errorInterceptor, responseInterceptor } from './interceptors';
import { Environment } from '../../environments';

const Api = axios.create(
    {
        baseURL: Environment.URL_BASE
    }
);

Api.interceptors.response.use(
    (resposta) => responseInterceptor(resposta),
    (erro) => errorInterceptor(erro)
);

export { Api };
