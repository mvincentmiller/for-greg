import 'whatwg-fetch'

export const post = (url, data, head) => {
  return fetch(
    url,
    {
      method: 'POST',
      cache: 'default',
      mode: 'cors',
      headers: head,
      body: JSON.stringify(data),
    },
    {
      'Content-Type': 'application/json',
    }
  )
    .then(response => response.json())
    .catch(console.log)
}

export const patch = (url, data) => {
  return fetch(url, {
    method: 'PATCH',
    cache: 'default',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .catch(console.log)
}

export const get = url => {
  return fetch(url, {
    method: 'GET',
  })
    .then(response => response.json())
    .catch(console.log)
}

export const get_cookie = name => {
  return (document.cookie.match('(^|; )' + name + '=([^;]*)') || 0)[2]
}
