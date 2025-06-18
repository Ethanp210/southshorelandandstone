window.addEventListener('load', function () {
  var loader = document.getElementById('loader');
  if (loader) loader.style.display = 'none';

  var observer = new IntersectionObserver(function(entries, obs) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-section').forEach(function(el) {
    observer.observe(el);
  });

  var menuButton = document.querySelector('.menu-button');
  var navBlock = document.querySelector('.nav-block');
  if (menuButton && navBlock) {
    menuButton.addEventListener('click', function () {
      navBlock.classList.toggle('open');
    });
  }

  document.querySelectorAll('.dropdown-toggle').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      if (window.innerWidth <= 600) {
        e.preventDefault();
        this.parentElement.classList.toggle('open');
      }
    });
  });
});
