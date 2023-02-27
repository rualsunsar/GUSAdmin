import request from '@/utils/request'

export function listArticle(params) {
  return request({
    url: '/article/list',
    method: 'get',
    params
  })
}

export function getArticle(params) {
  return request({
    url: '/article/get',
    method: 'get',
    params
  })
}

export function delArticle(data) {
  return request({
    url: '/article/del',
    method: 'post',
    data
  })
}

export function addArticle(data) {
  return request({
    url: '/article/add',
    method: 'post',
    data
  })
}

export function updateArticle(article_id, data) {
  return request({
    url: '/article/edit?article_id=' + article_id,
    method: 'post',
    data
  })
}
