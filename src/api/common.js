import request from '@/utils/request'

export function uploadLogoL(data) {
  return request({
    url: '/article/uploadLogoL',
    method: 'post',
    data
  })
}

export function uploadLogoM(data) {
  return request({
    url: '/article/uploadLogoM',
    method: 'post',
    data
  })
}

export function uploadLogoS(data) {
  return request({
    url: '/article/uploadLogoS',
    method: 'post',
    data
  })
}
