var $imagesSlider = $(".slider-gallery .slider-gallery__images>div"),
    $thumbnailsSlider = $(".gallery-thumbnail__box>div");

$imagesSlider.slick({
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: 'linear',
    fade: true,
    draggable: false,
    asNavFor: ".gallery-thumbnail__box>div",
    prevArrow: '.slider-gallery__images .prev-arrow',
    nextArrow: '.slider-gallery__images .next-arrow'
});
$thumbnailsSlider.slick({
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    cssEase: 'linear',
    centerMode: true,
    draggable: false,
    focusOnSelect: true,
    asNavFor: ".slider-gallery .slider-gallery__images>div",
    prevArrow: '.slider-gallery__thumbnails .prev-arrow',
    nextArrow: '.slider-gallery__thumbnails .next-arrow',
    responsive: [
        {
            breakpoint: 720,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 350,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }
    ]
});


var $caption = $('.slider-gallery .caption');
var captionText = $('.slider-gallery__images .slick-current img').attr('alt');
updateCaption(captionText);

$imagesSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $caption.addClass('hide');
});

$imagesSlider.on('afterChange', function (event, slick, currentSlide, nextSlide) {
    captionText = $('.slider-gallery__images .slick-current img').attr('alt');
    updateCaption(captionText);
});

function updateCaption(text) {
    if (text === '') {
        text = '&nbsp;';
    }
    $caption.html(text);
    $caption.removeClass('hide');
}