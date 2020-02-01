import axios from '@/utils/http';

export const fetchData3 = options => axios.request({
  ...options,
  url: 'xxx',
});
export default {};
