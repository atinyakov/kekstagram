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

var openBigPicture = function () {
  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img img').src = photos[0].url;
  bigPicture.querySelector('.likes-count').textContent = photos[0].likes;
  bigPicture.querySelector('.comments-count').textContent = photos[0].comments.length;
  bigPicture.querySelector('.social__caption').textContent = photos[0].description;
};

openBigPicture();

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
