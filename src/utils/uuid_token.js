import { v4 as uuidv4 } from 'uuid'

export default () => {
  // 每个游客的uuid都有唯一性，并且要存入 localStorage
  // 每次需要获取uuid 要先去 localStorage中获取
  let uuid = localStorage.getItem('uuid_token')
  if (!uuid) {
    uuid = uuidv4()
    localStorage.setItem('uuid_token', uuid)
  }
  return uuid
}
