import {IOS_ENDPOINT, ANDROID_ENDPOINT} from './constants';

export const getEndpoint = os => {
  return os === 'ios' ? IOS_ENDPOINT : ANDROID_ENDPOINT;
};
