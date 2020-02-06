import axios from '@/utils/http';

export const fetchData = options => axios.request({
  ...options,
  url: '/data.json',
}).catch((e) => {
  console.log(e);
});

export const getAllGeo = () => axios.request({
  url: 'https://geo.datav.aliyun.com/areas/bound/100000.json',
});

export const getCityGeoJSON = adcode => axios.request({
  url: `/assets/geojson/${adcode}.json`,
});
export default {};
