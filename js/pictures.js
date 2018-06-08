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
  for (var i = 0; i < 25; i++) {
    photos.push(createPhoto(i));
  }
};

fillProtosArray();
// console.log(photos);

// var template = document.querySelector('#picture');
// console.log(template);
//test
