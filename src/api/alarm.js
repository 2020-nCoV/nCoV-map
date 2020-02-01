import axios from '@/utils/http';

export const fetchData1 = options => axios.request({
  ...options,
  url: 'xxx',
});
export default {};
