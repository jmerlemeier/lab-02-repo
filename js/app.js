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
  $.get('data/page-1.json').then( images => {
    console.log('imgs from the then.', images);

    images.forEach(eachImage => {
      new Image(eachImage.image_url, eachImage.title, eachImage.description, eachImage.keyword, eachImage.numberofhorns);
    })

    allImages.forEach(image => {
      image.renderwithJquery();
    })
    renderDropDown();
  })

}

getAllImagesFromFile();
//-------------------------------------

function renderDropDown() {
  const uniqueKeywords = [];
  let dropdown = $('select');
  allImages.forEach(value => {
    let flag = true;
    uniqueKeywords.forEach(uniqueImage => {
      if (uniqueImage === value.keyword) {
        flag = false;
      }
    })
    if (flag) {
      dropdown.append($('<option></option>').attr('value', value.keyword).text(value.keyword));
      uniqueKeywords.push(value.keyword);
    }
  })
}






















// //array of keywords
// const getKeywords = () => {
//   const keywordArr = [];
//   allImages.forEach((value) => {
//     keywordArr.push(value.keyword)
//   });
//   return keywordArr;
// };

// //make dropdown using prototype
// Image.prototype.renderDropDown = function() {
//   // const $mydropdownTemplate = $('dropdown-template');
//   // const $mydropdownHtml = $mydropdownTemplate.html();

//   const $newOption = $('<option></option>')
//   $newOption.text()
// }
// //grab 'select'
// //make a copy
// //plug in keywords
// //append