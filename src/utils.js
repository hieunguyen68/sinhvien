import {IOS_ENDPOINT, ANDROID_ENDPOINT} from './constants';

export const getEndpoint = os => {
  return os === 'ios' ? IOS_ENDPOINT : ANDROID_ENDPOINT;
};

export const formatDate = date => {
  if (!date) return '';
  return `${date.slice(0, 2)}/${date.slice(2, 4)}/${date.slice(4)}`;
};
