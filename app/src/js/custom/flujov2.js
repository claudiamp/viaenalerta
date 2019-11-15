jQuery(document).ready(function($) {


	$('.owl-verification').owlCarousel({
	    loop:true,
	    margin:10,
	    nav:false,
	    dots: false,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:5
	        },
	        1000:{
	            items:7
	        }
	    }
	});

    var owlVerification = $('.owl-verification');
    owlVerification.owlCarousel();
    // Go to the next item
    $('.arrow-right').click(function() {
        owlVerification.trigger('next.owl.carousel');
    })
    // Go to the previous item
    $('.arrow-left').click(function() {
        // With optional speed parameter
        // Parameters has to be in square bracket '[]'
        owlVerification.trigger('prev.owl.carousel', [300]);
    })
});
