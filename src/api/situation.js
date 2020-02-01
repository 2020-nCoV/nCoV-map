import axios from '@/utils/http';

export const fetchData = options => axios.request({
  ...options,
  url: '/data',
});
export default {};
