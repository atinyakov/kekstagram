'use strict';

(function () {
  var SCALE_LINE_LENGTH = 450;
  var PERCENTS_100 = 100;

  var uploadForm = document.querySelector('.img-upload__form');
  var imgPreview = uploadForm.querySelector('.img-upload__preview');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
  var closeOverlayButton = uploadForm.querySelector('.img-upload__cancel');
  var filterPin = uploadForm.querySelector('.scale__pin ');
  var filterInitialX;
  var filterScalePlaceholder = uploadForm.querySelector('.img-upload__scale');
  var filterScale = uploadForm.querySelector('.scale__level');
  var filters = uploadForm.querySelector('.effects__list');
  var imagePreview = uploadForm.querySelector('.img-upload__preview');

  var errorMessage = window.photos.template.content.querySelector('.img-upload__message--error');


  uploadFile.addEventListener('change', function () {
    uploadOverlay.classList.remove('hidden');
    closeOverlayButton.addEventListener('mouseup', window.pictures.closePopup);
    filterInitialX = 20;
    filterPin.style.left = filterInitialX + '%';
    filterScale.style.width = filterInitialX + '%';
  });

  var defineFilterRatio = function (ratio) {
    filterScalePlaceholder.style.display = 'block';
    if (imgPreview.classList.contains('effects__preview--chrome')) {
      imgPreview.style.filter = 'grayscale(' + ratio / PERCENTS_100 + ')';
    } else if (imgPreview.classList.contains('effects__preview--sepia')) {
      imgPreview.style.filter = 'sepia(' + ratio / PERCENTS_100 + ')';
    } else if (imgPreview.classList.contains('effects__preview--marvin')) {
      imgPreview.style.filter = 'invert(' + ratio + '%)';
    } else if (imgPreview.classList.contains('effects__preview--phobos')) {
      imgPreview.style.filter = 'blur(' + (ratio * 3 / PERCENTS_100) + 'px)';
    } else if (imgPreview.classList.contains('effects__preview--heat')) {
      imgPreview.style.filter = 'brightness(' + (1 + ratio * 2 / PERCENTS_100) + ')';
    } else if (imgPreview.classList.contains('effects__preview--none')) {
      filterScalePlaceholder.style.display = 'none';
    }
  };


  filters.addEventListener('mouseup', function (evt) {
    imagePreview.className = 'img-upload__preview';
    imgPreview.style.filter = '';
    var currentEffect = evt.target.classList[1];
    imagePreview.classList.add(currentEffect);
    defineFilterRatio(filterScale.style.width.slice(0, -1));
  });


  // --------------HASHTAGS---------------------------
  var hashtagInput = uploadForm.querySelector('.text__hashtags');

  var hashtagCheckHandler = function (evt) {
    var hashtags;

    hashtags = hashtagInput.value.split(' ');
    evt.target.setCustomValidity('');
    evt.target.style.border = '2px solid transparent';

    for (var i = 0; i < hashtags.length; i++) {
      var elem = hashtags[i];
      if (hashtags[i] === '') {
        evt.target.setCustomValidity('между хештегами должен быть один пробел!');
        evt.target.style.border = '2px solid red';
        return;
      } else if (hashtags[i].charAt(0) !== '#') {
        evt.target.setCustomValidity('Хеш тег должен начинаться с символа решетка: #');
        evt.target.style.border = '2px solid red';
        return;
      } else if (hashtags[i] === '#') {
        evt.target.setCustomValidity('Хештег не может состоять из одной #!');
        evt.target.style.border = '2px solid red';
        return;
      } else if (hashtags[i].length > 20) {
        evt.target.setCustomValidity('Хештег не может быть длиннее 20 символов!');
        evt.target.style.border = '2px solid red';
        return;
      }

      for (var j = 1; j < hashtags[i].length; j++) {
        if (hashtags[i].charAt(j) === '#') {
          evt.target.setCustomValidity('Хеш тег не может внутри себя содержать символ решетка: #');
          return;
        }
      }

      for (var k = i + 1; k < hashtags.length; k++) {
        if (elem === hashtags[k]) {
          evt.target.setCustomValidity('нельзя использовать одинаковые хештеги!');
          return;
        }
      }
    }
    if (hashtags.length > 5) {
      evt.target.setCustomValidity('Максимум 5 хештегов');
    }
  };

  hashtagInput.addEventListener('change', hashtagCheckHandler);
  // -------------------------text description --------------------------

  var textDescription = uploadForm.querySelector('.text__description');

  textDescription.addEventListener('change', function (evt) {
    evt.target.setCustomValidity('');
    evt.target.style.border = '2px solid transparent';
    if ((evt.target.value !== '') && (evt.target.value.length > 140)) {
      evt.target.setCustomValidity('Максимум 140 символов');
      evt.target.style.border = '2px solid red';
      return;
    }
  });
  // ---------------------------- filter drag -------------------------------

  filterPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {};

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var scaleLineCoord = document.querySelector('.scale__line').getBoundingClientRect();

      startCoords = {
        x: Math.floor((moveEvt.clientX - scaleLineCoord.x) * PERCENTS_100 / SCALE_LINE_LENGTH)
      };


      filterPin.style.left = window.utils.mathClamp(0, startCoords.x, 100) + '%';
      filterScale.style.width = window.utils.mathClamp(0, startCoords.x, 100) + '%';
      defineFilterRatio(window.utils.mathClamp(0, startCoords.x, 100));
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      defineFilterRatio(startCoords.x);
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  // ---------------FORM_SUBMIT----------------------

  var onError = function (message) {
    errorMessage.classList.remove('hidden');
    errorMessage.innerText = errorMessage.innerText + ' ' + message;
    // ?????? Как показать error ??
  };

  var onSuccess = function () {
    textDescription.value = '';
    hashtagInput.value = '';
    window.pictures.closePopup();
  };

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    // evt.checkValidity();

    var SERVER_URL = 'https://js.dump.academy/kekstagram';

    var formData = new FormData(uploadForm);
    window.send(formData, SERVER_URL, onSuccess, onError);
  });
}());
