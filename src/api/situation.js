import axios from '@/utils/http';

export const fetchData = options => axios.request({
  ...options,
  url: '/data',
}).catch((e) => {
  console.log(e);
});
export default {};
