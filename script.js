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


  var serviceSelect = document.getElementById('service-select');
  var serviceSections = document.querySelectorAll('.service-fields');

  function showServiceFields(val) {
    serviceSections.forEach(function(sec) {
      sec.style.display = sec.dataset.service === val ? 'block' : 'none';
    });
  }

  if (serviceSelect) {
    var params = new URLSearchParams(window.location.search);
    var selected = params.get('service');
    if (selected) {
      serviceSelect.value = selected;
    }
    showServiceFields(serviceSelect.value);
    serviceSelect.addEventListener('change', function() {
      showServiceFields(this.value);
    });
  }
});
