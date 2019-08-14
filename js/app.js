'use strict'

const allImages = [];

const Image = function (image_url, title, description, keyword, numberofhorns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.numberofhorns = numberofhorns;
  allImages.push(this);
};

Image.prototype.renderwithJquery = function() {
  const $myTemplate = $('#photo-template');
  const $myTemplateHtml = $myTemplate.html();

  const $newSection = $('<section></section>')
  $newSection.html($myTemplateHtml);

  $newSection.find('h2').text(this.title);
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('p').text(this.description);
  $('main').append($newSection);
}

//AJAX
const getAllImagesFromFile = () => {
  $.get('data/page-1.json').then(images => {
    console.log('imgs from the then.', images);

    images.forEach(eachImage => {
      new Image(eachImage.image_url, eachImage.title, eachImage.description, eachImage.keyword, eachImage.numberofhorns);
    })

    allImages.forEach(image => {
      image.renderwithJquery();
    })
  })

}

getAllImagesFromFile();