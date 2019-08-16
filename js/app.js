'use strict'

let allImagesOne = [];
let allImagesTwo = [];


const Image = function (image_url, title, description, keyword, numberofhorns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.numberofhorns = numberofhorns;
};

Image.prototype.renderWithHandleBars = function () {
  let hornHtml = $('#horn-template').html();
  const renderImageWithHandlebars = Handlebars.compile(hornHtml);
  const hornImage = renderImageWithHandlebars(this);
  $('main').append(hornImage);
};

// DRY
const renderPageOne = () => {
  allImagesOne.forEach(image => {
    image.renderWithHandleBars();
  })
}

const getAllPageOneFiles = () => {
  $.get('data/page-1.json')
    .then(images => {
      images.forEach(eachImage => {
        allImagesOne.push(new Image(
          eachImage.image_url,
          eachImage.title,
          eachImage.description,
          eachImage.keyword,
          eachImage.horns
        ));
      })
      renderPageOne();
    })
}

const renderPageTwo = () => {
  allImagesTwo.forEach(image => {
    image.renderWithHandleBars();
  })
}

const getAllPageTwoFiles = () => {
  $.get('data/page-2.json')
    .then(images => {
      images.forEach(eachImage => {
        allImagesTwo.push(new Image(
          eachImage.image_url,
          eachImage.title,
          eachImage.description,
          eachImage.keyword,
          eachImage.horns
        ));
      })
    })
}

//-------------------------------------


Image.sort = function (array, property) {
  array.sort((a, b) => {
    return a[property] < b[property] ? -1 : 1;
  })
}

// WORK ON THIS
$('#horns').on('click', () => {
  Image.sort(allImagesOne, (this).numberofhorns);
})

function renderDropDown(attribute) {
  const uniques = [];
  let dropdown = $('select');
  allImagesOne.forEach(image => {
    let flag = true;
    uniques.forEach(uniqueImage => {
      if (uniqueImage === image[attribute]) {
        flag = false;
      }
    })
    if (flag) {
      dropdown
        .append($('<option></option>')
          .attr('value', image[attribute])
          .text(image[attribute]));
      uniques.push(image[attribute]);
    }
  })
}

$('select').on('change', function () {
  let $selected = $(this).val();
  $('section').hide();
  $(`img[data-keyword = ${$selected}]`).parent().show();
  $(`img[data-horns = ${$selected}]`).parent().show();
});

$('input[type=radio]').on('change', function () {
  $('select').empty();
  let $clicked = $(this).val();
  console.log($(this).val())
  if ($clicked === 'radio-one') {
    renderDropDown('keyword');
  } else {
    renderDropDown('numberofhorns');
  }
});

$('#page-one').on('click', function () {
  $('section').hide();
  renderPageOne();
  //allImagesOne = [];
})

$('#page-two').on('click', function () {
  $('section').hide()
  renderPageTwo();
  // console.log('get all images 2', getAllPageTwoFiles());
})

getAllPageTwoFiles();
getAllPageOneFiles();

