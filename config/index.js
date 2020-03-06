/* eslint-disable no-nested-ternary */
import devEnv from './development';
import testEnv from './test';
import prodEnv from './production';

const config = process.env.NODE_ENV === 'development'
  ? devEnv
  : process.env.NODE_ENV === 'production'
    ? prodEnv
    : testEnv;

export default config;
