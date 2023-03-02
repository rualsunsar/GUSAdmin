import request from '@/utils/request'

export function uploadImg(data) {
  return request({
    url: '/article/uploadImg',
    method: 'post',
    data
  })
}
