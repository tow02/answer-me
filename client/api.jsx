import Promise from 'bluebird'

export function get(url) {
  return Promise.try(() => {
    return fetch(url).then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw Error(res.status)
      }
    })
  })
}

export function getImageObject() {
  const url = '/api/image'
  return get(url)
}
