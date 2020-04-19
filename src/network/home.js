import {request} from './request'

//轮播图
export function getHomeMultidata(){
  return request({
    url: '/home/multidata'
  })
}