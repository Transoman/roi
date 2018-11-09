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

  t1 = new TimelineMax({
    paused: true
  });

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

});