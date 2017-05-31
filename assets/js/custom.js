jQuery(function($) {
  "use strict";

  // get the value of the bottom of the #main element by adding the offset of that element plus its height, set it as a variable
    var mainbottom = $('#purpose').offset().top - 80;
    // on scroll,
    $(window).on('scroll', function(){
    // we round here to reduce a little workload
    stop = Math.round($(window).scrollTop());
    if (stop > mainbottom) {
        $('.navbar').addClass('past-main');
        $('.navbar').addClass('effect-main')
    } else {
        $('.navbar').removeClass('past-main');
      }
    });

  // Collapse navbar on click

  $(document).on('click.nav','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
    $(this).removeClass('in').addClass('collapse');
   }
  });

/*----- Preloader ----- */

  $(window).load(function() {
		setTimeout(function() {
      $('#loading').fadeOut('slow', function() {
      });
    }, 300);
  });

/* --------- Wow Init -------*/

  new WOW().init();

/* ------- Magnific Popup ---------*/

  $('.popup').magnificPopup({
    disableOn: 0,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });

/*-------- Owl Carousel ---------- */

  $(".reviews").owlCarousel({

    slideSpeed : 200,
    items: 1,
    singleItem: true,
    autoPlay : true,
    pagination : false
  });

  $(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

/* ------ Clients Section Owl Carousel ----- */

  $(".clients").owlCarousel({
    slideSpeed : 200,
    items: 5,
    singleItem: false,
    autoPlay : true,
    pagination : false
  });


/*----------- Scroll To Top ---------------*/

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 1000) {
        $('#back-top').fadeIn();
    } else {
        $('#back-top').fadeOut();
    }
  });
  // scroll body to 0px on click
  $('#back-top').on('click', function () {
    $('#back-top').tooltip('hide');
    $('body,html').animate({
        scrollTop: 0
    }, 1500);
    return false;
  });

/* ------ Countdown ----- */

  $('#countdown').countdown({
		date: '12/07/2017 12:00:00',
		offset: +2,
		day: 'Day',
		days: 'Days'
	 }, function () {
		alert('Done!');
	});

/* ------ jQuery for Easing min -- */

  $('a.page-scroll').on('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
          scrollTop: $($anchor.attr('href')).offset().top - 59
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
    });

/*----- Subscription Form ----- */


    ajaxMailChimpForm($("#subscribe-form"), $("#subscribe-result"));

    // Turn the given MailChimp form into an ajax version of it.
    // If resultElement is given, the subscribe result is set as html to
    // that element.
    function ajaxMailChimpForm($form, $resultElement){

        // Hijack the submission. We'll submit the form manually.
        $form.submit(function(e) {
            e.preventDefault();

            if (!isValidEmail($form)) {
                var error =  "Please provide a valid email";
                $resultElement.html(error);
                $resultElement.css("color", "red");
            } else {
                $resultElement.css("color", "black");
                $resultElement.html("Joining...");
                submitSubscribeForm($form, $resultElement);
            }
        });
    }

    // Validate the email address in the form
    function isValidEmail($form) {
        // If email is empty, show error message.
        // contains just one @
        var email = $form.find("input[type='email']").val();
        if (!email || !email.length) {
            return false;
        } else if (email.indexOf("@") == -1) {
            return false;
        }

        return true;
    }

    // Submit the form with an ajax/jsonp request.
    // Based on http://stackoverflow.com/a/15120409/215821
    function submitSubscribeForm($form, $resultElement) {
        $.ajax({
            type: "GET",
            url: $form.attr("action"),
            data: $form.serialize(),
            cache: false,
            dataType: "jsonp",
            jsonp: "c", // trigger MailChimp to return a JSONP response
            contentType: "application/json; charset=utf-8",

            error: function(error){
                // According to jquery docs, this is never called for cross-domain JSONP requests
            },

            success: function(data){
                if (data.result != "success") {
                    var message = data.msg || "Unable to join. Please try again later";
                    $resultElement.css("color", "red");

                    if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
                        message = "You've already joined!";
                        $resultElement.css("color", "green");
                    }

                    $resultElement.html(message);

                } else {
                    $resultElement.css("color", "green");
                    $resultElement.html("You're in! Check your inbox to confirm");
                }
            }
        });
    }


$('#faqlist').on('show.bs.collapse', function () {
    $('#faqlist .in').collapse('hide');
});

});
