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
    }
  };
}());
