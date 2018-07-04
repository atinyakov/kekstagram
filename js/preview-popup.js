'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');

  var pictures = document.querySelector('.pictures.container');
  var closeBigPicture = bigPicture.querySelector('.big-picture__cancel');
  var overlays = document.querySelectorAll('.overlay');
  var cancelButtons = document.querySelectorAll('.cancel');
  var ESC_KEYCODE = 27;

  var hideElement = function (elem) {
    document.querySelector(elem).classList.add('visually-hidden');
  };

  hideElement('.social__comment-count');
  hideElement('.social__loadmore');


  var closePopup = function () {
    [].forEach.call(overlays, function (el) {
      el.classList.add('hidden');
      el.value = '';
    });

    [].forEach.call(cancelButtons, function (el) {
      el.removeEventListener('mouseup', closePopup);
      el.removeEventListener('mouseup', openPicture);
    });

    document.removeEventListener('keyup', keyPressHandler);
  };

  var keyPressHandler = function (evt) {

    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var openBigPicture = function (i) {
    bigPicture.classList.remove('hidden');
    closeBigPicture.addEventListener('mouseup', closePopup);
    i--;
    bigPicture.querySelector('.big-picture__img img').src = window.photos.data[i].url;
    bigPicture.querySelector('.big-picture__img img').alt = '';
    bigPicture.querySelector('.likes-count').textContent = window.photos.data[i].likes;
    bigPicture.querySelector('.comments-count').textContent = window.photos.data[i].comments.length;
    bigPicture.querySelector('.social__caption').textContent = window.photos.data[i].description;

    document.addEventListener('keyup', keyPressHandler);
  };


  var openPicture = function (evt) {

    if (evt.target.tagName === 'IMG' && evt.target.classList.value === 'picture__img') {
      var FROM = -6;
      var TO = -2;
      var photoURL = evt.target.src.slice(FROM, TO);
      var regexp = /\d+/;
      var photoNumbersInUrl = photoURL.match(regexp);
      openBigPicture(photoNumbersInUrl[0]);
    }
  };

  pictures.addEventListener('mouseup', openPicture);

  window.pictures = {
    closePopup: closePopup
  };
})();
