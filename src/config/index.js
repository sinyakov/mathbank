import devConfig from './config.dev';
import prodConfig from './config.prod';

export default (process.env.NODE_ENV === 'production' ? prodConfig : devConfig);
