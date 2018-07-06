'use strict';

(function () {
  var commentsBlock = document.querySelector('.social__comments');
  var template = document.querySelector('#picture');
  var imageTemplate = template.content.querySelector('.picture__link');
  var picturesBlock = document.querySelector('.pictures');

  var createElements = function (data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      var image = imageTemplate.cloneNode(true);
      image.querySelector('.picture__img').src = data[i].url;
      image.querySelector('.picture__stat--likes').textContent = data[i].likes;
      image.querySelector('.picture__stat--comments').textContent = data[i].comments.length;
      fragment.appendChild(image);
    }

    picturesBlock.appendChild(fragment);
  };

  var URL = 'https://js.dump.academy/kekstagram/data';

  var addComments = function (data) {
    var commentsFragment = document.createDocumentFragment();

    for (var i = 0; i < 5; i++) {
      var commentTemplate = commentsBlock.querySelector('.social__comment').cloneNode(true);
      commentTemplate.querySelector('.social__picture').src = 'img/avatar-' + window.utils.generateRandomNumber(1, 6) + '.svg';
      commentTemplate.querySelector('.social__text').textContent = data[0].comments[i];
      commentsFragment.appendChild(commentTemplate);
    }
    commentsBlock.innerHTML = '';
    commentsBlock.appendChild(commentsFragment);
  };

  var onError = function (message) {
    var ERROR_TIMEOUT = 4000;
    var errorMessage = window.photos.template.content.querySelector('.img-upload__message--error');
    errorMessage = errorMessage.cloneNode(true);

    errorMessage.classList.remove('hidden');
    errorMessage.innerText = message;

    errorMessage.style.zIndex = 2;
    picturesBlock.appendChild(errorMessage);
    setTimeout(function () {
      picturesBlock.removeChild(errorMessage);
    }, ERROR_TIMEOUT);
  };

  var onSuccess = function (data) {
    createElements(data);
    addComments(data);
    window.photos = {
      data: data
    };
  };

  window.load(URL, onSuccess, onError);
  window.photos = {
    template: template,
    onError: onError
  };
}());
