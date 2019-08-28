'use strict';

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
var numberOfPhoto = 25;
var minLikes = 15;
var maxLikes = 200;

var getRandomArrayValue = function(array) {
  return array[Math.floor(Math.random() * array.length)];
};
var getRandomComments = function(array) {
  if (getRandomNumber(0,1)) {
    return getRandomArrayValue(array);
  } else {
    return getRandomArrayValue(array) + ' ' + getRandomArrayValue(array);
  }
};
var getRandomNumber = function(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};
var getPhotos = function(count) {
  var photo = [];
  for (var i = 0; i < count; i++) {
    photo[i] = {
      url: 'img/' + (i + 1) + '.jpg',
      likes: getRandomNumber(minLikes, maxLikes),
      comments: getRandomComments(commentsTemplate),
      description: getRandomArrayValue(descriptionTemplate)
    }
  }
  return photo;
};

console.log(getPhotos(numberOfPhoto));
