/**
 * This function is used for solving promise from fetch
 */
export function RequestUtils(responsePromise, callback) {
  if (200 === responsePromise.status) {
    responsePromise.json().then(promise => {
      return Promise.resolve(promise)
    }).then(jsonResponse => {
      callback(jsonResponse);
    });
  } else {
    responsePromise.json().then(promise => {
      return Promise.reject(promise)
    });

  }
}