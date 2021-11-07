import axios from 'axios';

const baseUrl = 'https://hphucs-social-backend.meorung.workers.dev';
// const baseUrl = 'http://127.0.0.1:8787';

export async function getALlPost () {
  return await axios.get(`${baseUrl}/posts`)
}

export async function getALlComments () {
  return await axios.get(`${baseUrl}/comments`)
}

export async function newPost(postContent) {
  return await axios.post(`${baseUrl}/posts`, postContent)
}

export async function newComment(commentContent) {
  return await axios.post(`${baseUrl}/comments`, commentContent)
}