'use strict';

(function () {
  var OK_RESPONCE = 200;
  var TIMEOUT = 10000; // 10 seconds

  window.load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_RESPONCE) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT; // 10s

    xhr.open('GET', url);
    xhr.send();
  };

  window.send = function (data, url, onSuccess, onError) {
    var request = new XMLHttpRequest();

    request.addEventListener('load', function () {
      if (request.status === OK_RESPONCE) {
        onSuccess();
      } else {
        onError('Cтатус ответа: ' + request.status + ' ' + request.statusText);
      }
    });

    request.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    request.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + request.timeout + 'мс');
    });

    request.timeout = TIMEOUT; // 10s

    request.open('POST', url);
    request.send(data);
  };
})();
