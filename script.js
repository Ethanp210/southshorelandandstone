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

  var contactMethod = document.getElementById('contact-method');
  var phoneInput = document.getElementById('phone');
  var emailInput = document.getElementById('email');

  function updateContactRequirements() {
    if (!contactMethod) return;
    if (contactMethod.value === 'phone') {
      if (phoneInput) phoneInput.required = true;
      if (emailInput) emailInput.required = false;
    } else if (contactMethod.value === 'email') {
      if (phoneInput) phoneInput.required = false;
      if (emailInput) emailInput.required = true;
    } else {
      if (phoneInput) phoneInput.required = false;
      if (emailInput) emailInput.required = false;
    }
  }

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

  if (contactMethod) {
    updateContactRequirements();
    contactMethod.addEventListener('change', updateContactRequirements);
  }

  var quoteForm = document.getElementById('quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var formMessage = document.getElementById('form-message');
      fetch(this.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(this)
      }).then(function(response) {
        if (response.ok && formMessage) {
          formMessage.textContent = 'Thank you! Your request has been sent.';
          quoteForm.reset();
        } else if (formMessage) {
          formMessage.textContent = 'Oops! There was a problem.';
        }
      }).catch(function() {
        if (formMessage) {
          formMessage.textContent = 'Network error. Please try again later.';
        }
      });
    });
  }
});
