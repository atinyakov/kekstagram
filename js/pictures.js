'use strict';

var photos = [];
var description = [
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!',
];

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

var PICTURES_AMOUNT = 25;

var generateRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var mathClamp = function (min, mid, max) {
  return Math.min(Math.max(min, mid), max);
};

var createPhoto = function (i) {
  var photo = {
    url: 'photos/' + ++i + '.jpg',
    likes: generateRandomNumber(15, 200),
    comments: [comments[generateRandomNumber(0, 5)], comments[generateRandomNumber(0, 5)]],
    description: description[generateRandomNumber(0, 4)]
  };
  return photo;
};

var fillProtosArray = function () {
  for (var i = 0; i < PICTURES_AMOUNT; i++) {
    photos.push(createPhoto(i));
  }
};

fillProtosArray();

var template = document.querySelector('#picture');
var imageTemplate = template.content.querySelector('.picture__link');
var picturesBlock = document.querySelector('.pictures');

var createElements = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    var image = imageTemplate.cloneNode(true);
    image.querySelector('.picture__img').src = photos[i].url;
    image.querySelector('.picture__stat--likes').textContent = photos[i].likes;
    image.querySelector('.picture__stat--comments').textContent = photos[i].comments.length;
    fragment.appendChild(image);
  }

  picturesBlock.appendChild(fragment);
};

createElements();

var bigPicture = document.querySelector('.big-picture');
var commentsBlock = bigPicture.querySelector('.social__comments');
var uploadForm = document.querySelector('.img-upload__form');
var uploadFile = uploadForm.querySelector('#upload-file');
var uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
var closeOverlayButton = uploadForm.querySelector('.img-upload__cancel');
var filterPin = uploadForm.querySelector('.scale__pin ');
var filterInitialX;
var filterScalePlaceholder = uploadForm.querySelector('.img-upload__scale');
var filterScale = uploadForm.querySelector('.scale__level');
var filters = uploadForm.querySelector('.effects__list');
var imagePreview = uploadForm.querySelector('.img-upload__preview');
var pictures = document.querySelector('.pictures.container');
var closeBigPicture = bigPicture.querySelector('.big-picture__cancel');
var overlays = document.querySelectorAll('.overlay');
var cancelButtons = document.querySelectorAll('.cancel');
var imgPreview = uploadForm.querySelector('.img-upload__preview');

var ESC_KEYCODE = 27;
var SPACE_KEYCODE = 32;
var SCALE_LINE_LENGTH = 450;
var PERCENTS_100 = 100;
var scaleLineCoord = document.querySelector('.scale__line').getBoundingClientRect();

var addComments = function () {
  var commentsFragment = document.createDocumentFragment();

  for (var i = 0; i < photos[0].comments.length; i++) {
    var commentTemplate = commentsBlock.querySelector('.social__comment').cloneNode(true);
    commentTemplate.querySelector('.social__picture').src = 'img/avatar-' + generateRandomNumber(1, 6) + '.svg';
    commentTemplate.querySelector('.social__text').textContent = photos[0].comments[i];
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

uploadFile.addEventListener('change', function () {
  uploadOverlay.classList.remove('hidden');
  closeOverlayButton.addEventListener('mouseup', closeUploadOverlay);
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
  bigPicture.querySelector('.big-picture__img img').src = photos[i].url;
  bigPicture.querySelector('.big-picture__img img').alt = '';
  bigPicture.querySelector('.likes-count').textContent = photos[i].likes;
  bigPicture.querySelector('.comments-count').textContent = photos[i].comments.length;
  bigPicture.querySelector('.social__caption').textContent = photos[i].description;

  document.addEventListener('keyup', keyPressHandler);
};


filters.addEventListener('mouseup', function (evt) {
  imagePreview.className = 'img-upload__preview';
  imgPreview.style.filter = '';
  var currentEffect = evt.target.classList[1];
  imagePreview.classList.add(currentEffect);
  defineFilterRatio(filterScale.style.width.slice(0, -1));
});

var openPicture = function (evt) {
  if (evt.target.tagName === 'IMG' && evt.target.classList === 'picture__img') {
    var FROM = -6;
    var TO = -2;
    var photoURL = evt.target.src.slice(FROM, TO);
    var regexp = /\d+/;
    var photoNumbersInUrl = photoURL.match(regexp);
    openBigPicture(photoNumbersInUrl[0]);
  }
};

pictures.addEventListener('mouseup', openPicture);

// --------------HASHTAGS---------------------------

var hashtagInput = uploadForm.querySelector('.text__hashtags');


var hashtagCheckHandler = function (evt) {
  var hashtags;

  if (evt.keyCode === SPACE_KEYCODE) {
    hashtags = hashtagInput.value.split(' ', 5);

    hashtags.forEach(function (i) {
      var regexp = /^#\w+$/;
      if (i.search(regexp) === -1) {
        hashtagInput.setCustomValidity('Pattern mismatch');
      }
    });
  }
};

hashtagInput.addEventListener('keyup', hashtagCheckHandler);

// ---------------------------- filter drag -------------------------------

filterPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: 20 // %
  };

  var mouseMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();

    startCoords = {
      x: Math.floor((moveEvt.clientX - scaleLineCoord.x) * PERCENTS_100 / SCALE_LINE_LENGTH) - 100
    };

    filterPin.style.left = mathClamp(0, startCoords.x, 100) + '%';
    filterScale.style.width = mathClamp(0, startCoords.x, 100) + '%';
    defineFilterRatio(mathClamp(0, startCoords.x, 100));
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
