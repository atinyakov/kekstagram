'use strict';

window.utils = (function () {
  return {
    generateRandomNumber: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    },
    mathClamp: function (min, mid, max) {
      return Math.min(Math.max(min, mid), max);
    },
    debounce: function (func, interval) {
      var lastTimeout;

      return function (evt) {
        clearTimeout(lastTimeout);
        lastTimeout = setTimeout(function () {
          func(evt);
        }, interval);
      };
    },
    sortMostToLeast: function (first, second) {
      if (first.comments.length > second.comments.length) {
        return -1;
      } else if (first.comments.length < second.comments.length) {
        return 1;
      } else {
        return 0;
      }
    }
  };
}());
