import request from '@/utils/request'

export function uploadLogoL(data) {
  return request({
    url: '/article/uploadLogoL',
    method: 'post',
    data
  })
}
