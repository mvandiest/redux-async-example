import { Schema, arrayOf } from 'normalizr'
import { FETCH_API } from './middleware/fetch'

const postSchema = new Schema('posts')

export function fetchPostById(id) {
  return {
    [FETCH_API]:{
      types: [
        'FETCH_REQUEST',
        'FETCH_SUCCESS',
        'FETCH_FAILURE'
      ],
      config: {
        path: `https://jsonplaceholder.typicode.com/posts/${id}`
        //responsePreHandler: response => { return { alias, ...response } }
      },
      schema: postSchema,
      id
    }
  }
}
