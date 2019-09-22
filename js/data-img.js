'use strict';

//Создает данные для массива картинок
(function () {
  var commentsTemplate = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var descriptionTemplate = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];
  var minLikes = 15;
  var maxLikes = 200;

  // Создание массива случайных объектов с данными для конструктора
  window.dataImg = {
    getPhotos: function (count) {
      var photos = [];
      for (var i = 0; i < count; i++) {
        photos[i] = {
          url: 'photos/' + (i + 1) + '.jpg',
          likes: window.global.getRandomNumber(minLikes, maxLikes),
          comments: window.comments.getRandomComments(commentsTemplate, window.global.getRandomNumber(1, commentsTemplate.length)),
          description: descriptionTemplate[window.global.getRandomArrayIndex(descriptionTemplate)],
          index: i
        }
      }
      return photos;
    }
  }
})();
