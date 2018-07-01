'use strict';

(function () {
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

  var createPhoto = function (i) {
    var photo = {
      url: 'photos/' + ++i + '.jpg',
      likes: window.utils.generateRandomNumber(15, 200),
      comments: [comments[window.utils.generateRandomNumber(0, 5)], comments[window.utils.generateRandomNumber(0, 5)]],
      description: description[window.utils.generateRandomNumber(0, 4)]
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

  window.data = {
    photos: photos
  };

}());
