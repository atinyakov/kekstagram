'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var commentsBlock = bigPicture.querySelector('.social__comments');
  var pictures = document.querySelector('.pictures.container');
  var closeBigPicture = bigPicture.querySelector('.big-picture__cancel');
  var overlays = document.querySelectorAll('.overlay');
  var cancelButtons = document.querySelectorAll('.cancel');
  var ESC_KEYCODE = 27;

  var addComments = function () {
    var commentsFragment = document.createDocumentFragment();

    for (var i = 0; i < window.data.photos[0].comments.length; i++) {
      var commentTemplate = commentsBlock.querySelector('.social__comment').cloneNode(true);
      commentTemplate.querySelector('.social__picture').src = 'img/avatar-' + window.utils.generateRandomNumber(1, 6) + '.svg';
      commentTemplate.querySelector('.social__text').textContent = window.data.photos[0].comments[i];
      commentsFragment.appendChild(commentTemplate);
    }
    commentsBlock.innerHTML = '';
    commentsBlock.appendChild(commentsFragment);
  };
  addComments();

  var hideElement = function (elem) {
    document.querySelector(elem).classList.add('visually-hidden');
  };

  hideElement('.social__comment-count');
  hideElement('.social__loadmore');


  var closeUploadOverlay = function () {
    [].forEach.call(overlays, function (el) {
      el.classList.add('hidden');
      el.value = '';
    });

    [].forEach.call(cancelButtons, function (el) {
      el.removeEventListener('mouseup', closeUploadOverlay);
      el.removeEventListener('mouseup', openPicture);
    });

    document.removeEventListener('keyup', keyPressHandler);
  };

  var keyPressHandler = function (evt) {

    if (evt.keyCode === ESC_KEYCODE) {
      closeUploadOverlay();
    }
  };

  var openBigPicture = function (i) {
    bigPicture.classList.remove('hidden');
    closeBigPicture.addEventListener('mouseup', closeUploadOverlay);
    i--;
    bigPicture.querySelector('.big-picture__img img').src = window.data.photos[i].url;
    bigPicture.querySelector('.big-picture__img img').alt = '';
    bigPicture.querySelector('.likes-count').textContent = window.data.photos[i].likes;
    bigPicture.querySelector('.comments-count').textContent = window.data.photos[i].comments.length;
    bigPicture.querySelector('.social__caption').textContent = window.data.photos[i].description;

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
    closeUploadOverlay: closeUploadOverlay
  };
})();
