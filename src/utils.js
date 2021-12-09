import {IOS_ENDPOINT, ANDROID_ENDPOINT} from './constants';

export const getEndpoint = os => {
  console.log(os);
  console.log(IOS_ENDPOINT);
  return os === 'ios' ? IOS_ENDPOINT : ANDROID_ENDPOINT;
};
