<<<<<<< HEAD
<<<<<<< HEAD
export const BASE_URL = 'http://localhost:3000/';
//export const BASE_URL = 'https://api.domainname.sosnitskay.nomoredomains.sbs';
=======
export const BASE_URL = 'http://localhost:3000';
//export const BASE_URL = 'api.domainname.sosnitskay.nomoredomains.sbs';
>>>>>>> 3400e87 (auth +)
=======
//export const BASE_URL = 'http://localhost:3000';
export const BASE_URL = 'https://api.domainname.sosnitskay.nomoredomains.sbs';
>>>>>>> 95b09a1f58efa62c41300fa0c592b07b769cad63

<<<<<<< HEAD
export const register = (email, password, token) => {
=======

<<<<<<< HEAD
export const register = (email, password) => {
>>>>>>> parent of 461eb07 (token)
=======
export const register = (email, password, token) => {
>>>>>>> 461eb07 (token)
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({email, password})
  })
  .then((response) => {
    return response.json();
  })
  .then((res) => {
    return res;
  })
  .catch(err => console.log(err));
}; 

export const authorize = (email, password, token) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({email, password})
    })
    .then((response => response.json()))
    .then((res) => {
      return res;
    })
    .catch(err => console.log(err));
  };

<<<<<<< HEAD
<<<<<<< HEAD
  export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
=======
  export const checkToken = () => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      credentials: 'include',
>>>>>>> parent of 461eb07 (token)
    })
    .then(res => res.json())
    .then(data => data)
  }
=======
  // export const checkToken = (token) => {
  //   return fetch(`${BASE_URL}/users/me`, {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`,
  //     }
  //   })
  //   .then(res => res.json())
  //   .then(data => data)
  // }
>>>>>>> 461eb07 (token)
