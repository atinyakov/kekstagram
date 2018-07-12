'use strict';

(function () {
  var template = document.querySelector('#picture');
  var imageTemplate = template.content.querySelector('.picture__link');
  var picturesBlock = document.querySelector('.pictures');
  var imgFiltersBlock = document.querySelector('.img-filters');
  var imgFilters = imgFiltersBlock.querySelector('.img-filters__form');
  var imgFiltersButtons = imgFiltersBlock.querySelector('.img-filters__form');
  var ERROR_TIMEOUT = 4000;


  var createElements = function (data, amount) {
    var fragment = document.createDocumentFragment();
    amount = amount ? amount : data.length;

    var images = document.querySelectorAll('.picture__link');
    [].forEach.call(images, function (el) {
      picturesBlock.removeChild(el);
    });

    for (var i = 0; i < amount; i++) {
      var image = imageTemplate.cloneNode(true);
      image.querySelector('.picture__img').src = data[i].url;
      image.querySelector('.picture__stat--likes').textContent = data[i].likes;
      image.querySelector('.picture__stat--comments').textContent = data[i].comments.length;
      fragment.appendChild(image);
    }

    picturesBlock.appendChild(fragment);
  };

  var URL = 'https://js.dump.academy/kekstagram/data';


  var onError = function (message) {
    var errorMessage = window.photos.template.content.querySelector('.img-upload__message--error');
    errorMessage = errorMessage.cloneNode(true);

    errorMessage.classList.remove('hidden');
    errorMessage.innerText = message;

    picturesBlock.appendChild(errorMessage);
    setTimeout(function () {
      picturesBlock.removeChild(errorMessage);
    }, ERROR_TIMEOUT);
  };


  var onSuccess = function (data) {
    createElements(data);

    imgFiltersBlock.classList.remove('img-filters--inactive');
    window.photos = {
      data: data
    };
  };

  var onFilterchange = function (evt) {

    [].forEach.call(imgFiltersButtons, function (el) {
      el.classList.remove('img-filters__button--active');
    });

    if (evt.target.id === 'filter-popular') {
      createElements(window.photos.data);
    } else if (evt.target.id === 'filter-new') {
      createElements(window.photos.data, 10);
    } else if (evt.target.id === 'filter-discussed') {
      var mostDiscussed = window.photos.data.sort(window.utils.sortMostToLeast);
      createElements(mostDiscussed);
    }

    evt.target.classList.add('img-filters__button--active');
  };

  function onClick(evt) {
    onFilterchange(evt);
  }

  var DEBOUNCE_INTERVAL = 500;
  imgFilters.addEventListener('mouseup', window.utils.debounce(onClick, DEBOUNCE_INTERVAL));


  window.load(URL, onSuccess, onError);
  window.photos = {
    template: template,
    onError: onError
  };
}());
