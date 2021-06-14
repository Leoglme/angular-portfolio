$('.slider').bxSlider({
  minSlides: 1,
  maxSlides: 1,
  auto: $('.slider')[0].children.length > 1,
  touchEnabled: $('.slider')[0].children.length > 1,
  hideControlOnEnd: false,
  adaptiveHeight: true,
  controls: false,
  pause: 2500,
  captions: true,
  pager: $('.slider')[0].children.length > 1
});



$('.slider__works').bxSlider({
  minSlides: 1,
  maxSlides: 1,
  auto: $('.slider__works')[0].children.length > 1,
  touchEnabled: $('.slider__works')[0].children.length > 1,
  hideControlOnEnd: false,
  controls: false,
  pause: 2500,
  captions: true,
  pager: $('.slider__works')[0].children.length > 1,
  mode: 'horizontal',
});
