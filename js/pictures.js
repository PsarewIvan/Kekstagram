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
var photosDomParent = document.querySelector('.pictures');
var template = document.querySelector('#picture-template')
    .content.querySelector('.picture');
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
  var photos = [];
  for (var i = 0; i < count; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNumber(minLikes, maxLikes),
      comments: getRandomComments(commentsTemplate),
      description: getRandomArrayValue(descriptionTemplate)
    }
  }
  return photos;
};
var buildPhoto = function(photo) {
  var element = template.cloneNode(true);
  element.querySelector('img').setAttribute('src', photo.url);
  element.querySelector('.picture-likes').textContent = photo.likes;
  element.querySelector('.picture-comments').textContent = photo.comments;
  return element;
};
var fillingPhotosDomBlock = function(count) {
  var fragment = document.createDocumentFragment();
  var photos = getPhotos(count);
  for (var i = 0; i < count; i++) {
    fragment.appendChild(buildPhoto(photos[i]));
  }
  return fragment;
};

photosDomParent.appendChild(fillingPhotosDomBlock(numberOfPhoto));

console.log(fillingPhotosDomBlock(numberOfPhoto));
