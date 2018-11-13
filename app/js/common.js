'use strict';
jQuery(document).ready(function($) {

  // Toggle nav menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    t1.reversed(!t1.reversed());
    $(this).toggleClass('active');
  });

  $('.nav-list a').on('click', function (e) {
    e.preventDefault();
    t1.reversed(!t1.reversed());
    $('.nav-toggle').removeClass('active');
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

  // mobileMenu();

  window.addEventListener('resize', function() {
    // mobileMenu();
  });

  // Counter number
  $('.counter').counterUp({
    time: 5000,
  });

  // Tabs
  $('.portfolio-list').tabslet();

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

  // portfolioImageScroll();

  window.addEventListener('scroll', function() {
    
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    var portfolioSectionOffset = $('.portfolio').offset().top;

    console.log(portfolioSectionOffset);

    if (scrolled >= portfolioSectionOffset) {
      portfolioImageScroll();
    }
  });

  // Portfolio slider
  var portfolioSlider = new Swiper ('.portfolio-slider', {
    slidesPerView: 2,
    spaceBetween: -120,
    centeredSlides: true,
    loop: true,

    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    breakpoints: {
      992: {
        slidesPerView: 1,
        spaceBetween: 30
      }
    },
    on: {
      slideChangeTransitionEnd: function() {
        portfolioImageScroll();
      }
    }

  });

});