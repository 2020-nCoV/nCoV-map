import axios from '@/utils/http';

export const fetchData2 = options => axios.request({
  ...options,
  url: 'xxx',
});
export default {};
