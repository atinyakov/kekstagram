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

var openBigPicture = function (i) {
  bigPicture.classList.remove('hidden');
  i--;
  bigPicture.querySelector('.big-picture__img img').src = photos[i].url;
  // console.log(photos[i].url);
  bigPicture.querySelector('.big-picture__img img').alt = '';
  bigPicture.querySelector('.likes-count').textContent = photos[i].likes;
  bigPicture.querySelector('.comments-count').textContent = photos[i].comments.length;
  bigPicture.querySelector('.social__caption').textContent = photos[i].description;
};

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

var uploadForm = document.querySelector('.img-upload__form');
var uploadFile = uploadForm.querySelector('#upload-file');
var uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
var closeOverlayButton = uploadForm.querySelector('.img-upload__cancel');
var filterPin = uploadForm.querySelector('.scale__pin ');
var filterInitialX;
var filterScale = uploadForm.querySelector('.scale__level');
var filters = uploadForm.querySelector('.effects__list');
var imagePreview = uploadForm.querySelector('.img-upload__preview');
var pictures = document.querySelector('.pictures.container');
var closeBigPicture = bigPicture.querySelector('.big-picture__cancel');
var overlays = document.querySelectorAll('.overlay');

uploadFile.addEventListener('change', function () {
  uploadOverlay.classList.remove('hidden');
  filterInitialX = 20;
  filterPin.style.left = filterInitialX + '%';
  filterScale.style.width = filterInitialX + '%';
});

var closeUploadOverlay = function () {
  [].forEach.call(overlays, function (el) {
    el.classList.add('hidden');
    el.value = '';
  });
};

closeOverlayButton.addEventListener('mouseup', closeUploadOverlay);

closeBigPicture.addEventListener('mouseup', closeUploadOverlay);

filters.addEventListener('mouseup', function (evt) {
  imagePreview.className = 'img-upload__preview';
  var currentEffect = evt.target.classList[1];
  imagePreview.classList.add(currentEffect);
});

pictures.addEventListener('mouseup', function (evt) {
  if (evt.target.tagName === 'IMG') {
    var FROM = -6;
    var TO = -2;
    var photo = evt.target.src.slice(FROM, TO);
    var regexp = /\d+/;
    var photoIndex = photo.match(regexp);
    openBigPicture(photoIndex[0]);
  }
});
