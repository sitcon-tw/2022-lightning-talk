import config from './config.json'
import upperConfig from '../config.json'

export default {
    ...upperConfig,
    ...config,
}
