'use strict';
jQuery(document).ready(function($) {

  // Toggle nav menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.header__nav').toggleClass('open');
  });

  // Modal
  $('.modal').popup({
    transition: 'all 0.3s',
    onclose: function() {
      $(this).find('label.error').remove();
    }
  });

  window.addEventListener('scroll', function() {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    var header = document.querySelector('.header');

    if (scrolled >= 80) {
      header.classList.add('sticky');
    }
    else {
      header.classList.remove('sticky');
    }
  });

  var mobileMenu = function() {
    t1 = new TimelineMax({
      paused: true
    });

    if (window.innerWidth < 1200) {

      t1.to('.nav', 1, {
        top: '0%',
        ease: Expo.easeInout,
        // delay: -1
      });
  
      t1.staggerFrom('.nav-list li', 1, {
        x: -200,
        opacity: 0,
        ease: Expo.easeInout
      }, 0.3);
  
      t1.staggerFrom('.nav__phone', 1, {
        x: -200,
        opacity: 0,
        ease: Expo.easeInout
      }, 0.3);
  
      t1.reverse();
    }
    else {
      // t1.remove();
      t1.staggerFrom('.nav-list li', 1, {
        x: 0,
        opacity: 1,
        ease: Expo.easeInout
      }, 0.3);
    }
  }


  // Counter number
  // $('.counter').counterUp({
  //   time: 2000,
  // });


  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .not('.portfolio-list__tabs a')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();

        var headerHeight = parseInt($('.header').height(), 10),
        top = target.offset().top - headerHeight - 50;

        $('html, body').animate({
          scrollTop: top
        }, 1000);
      }
    }
  });

  // Parallax
  var scene = document.getElementById('scene');
  var parallaxInstance = new Parallax(scene, {
    relativeInput: true
  });

  var t2 = new TimelineMax({
    paused: true
  });

  var portfolioImageScroll = function() {
    var portfolioImage = $('.portfolio-slider__item.swiper-slide-active .portfolio-slider__img');
    var heightImage = parseInt(portfolioImage.height(), 10);
    var containerHeight = parseInt($('.portfolio-slider__item.swiper-slide-active').height(), 10);

    // var offsetVisible = function() {

    //   if (heightImage - containerHeight > 0) {
    //     return;
    //   }

    //   portfolioImage.stop();

    //   portfolioImage.css({
    //     bottom: 0
    //   }, 5000);
    // }

    // var onRelease = function() {
    //   portfolioImage.css({
    //     bottom: (heightImage - containerHeight)
    //   });
    // }

    // offsetVisible();
    // onRelease();

   

    t2.to(portfolioImage,7, {
      y: '-'+(heightImage - containerHeight)+'px',
      ease: Expo.linear,
    });

    t2.reverse();

    // if (portfolioImage.css('transform') < 'matrix(1, 0, 0, 1, 0, 0)') {
    //   t1.to(portfolioImage,7, {
    //     y: '0px',
    //     ease: Expo.linear,
    //   });
    // }

    t2.reversed(!t2.reversed());
  }

  // Portfolio slider
  $('.portfolio-slider').each(function(i, el) {
    var $this = $(this);
    $this.addClass("portfolio-slider-" + i);
    // $this.parent().find(".swiper-button-prev").addClass("button-prev-" + i);
    // $this.parent().find(".swiper-button-next").addClass("button-next-" + i);
    $this.parent().find(".swiper-pagination").addClass("swiper-pagination-" + i);
  
    // var btnNext = '.button-next-' + i;
    // var btnPrev = '.button-prev-' + i;

    var portfolioSlider = new Swiper ('.portfolio-slider-' + i, {
      slidesPerView: 2,
      spaceBetween: -120,
      centeredSlides: true,
      loop: true,

      pagination: {
        el: '.swiper-pagination-' + i,
        type: 'fraction',
      },
      breakpoints: {
        992: {
          slidesPerView: 1,
          spaceBetween: 30
        }
      }
    });

  });

  // Tabs
  $('.portfolio-list').tabslet();
  $('.portfolio-list').on('_after', function() {
    if ($(window).width() >= 1200) {
      $('.portfolio-slider__item').scrollImage();
    }
  });

  
  jQuery(window).on('load', function(){
    setTimeout(function() {
      if ($(window).width() >= 1200) {
        $('.portfolio-slider__item').scrollImage();
      }
    }, 1000);
      
  });


  var element = document.querySelectorAll('input[type="tel"]');
  var maskOptions = {
    mask: '+{7} (000) 000-00-00'
  };

  if (element) {
    for (var i = 0; i < element.length; i++) {
      var mask = new IMask(element[i], maskOptions);
    }
  }

  $('.services-list__item .btn-trs').click(function(e) {
    var name = $(this).parents('.services-list__item').find('h3').text();
    $('#order-form input[name="subject"]').val('Заказ услуги: ' + name);
  });

  jQuery.validator.addMethod("phoneno", function(phone_number, element) {
    return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
  }, "Введите Ваш телефон");
  
  $('.repeat-form').each(function(i, el) {
    $(this).addClass('repeat-form-' + i);

    $('.repeat-form-' + i).validate({
      messages: {
        name: "Введите Ваше имя",
        phone: "Введите Ваш телефон",
        message: "Введите Ваше сообщение",
      },
      rules: {
        "phone": {
          required: true,
          phoneno: true
        }
      },
      submitHandler: function(form) {
        var t = $('.repeat-form-' + i).serialize();
        ajaxSend('.repeat-form-' + i, t);
      }
    });
  });

  /* Функцыя для отправки формы */
  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

});