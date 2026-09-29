document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initProjects();
  initGalleryLightbox();
  initContactForm();
  initTheme();
  initActiveNav();
  initBackToTop();
  initScrollReveal();
});

  // MOBILE NAVIGATION

function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }

  function toggleMenu() {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('nav-open', isOpen);
  }

  hamburger.addEventListener('click', toggleMenu);

  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

  //  PROJECT DATA & RENDERING

const projectData = [
  {
    id: 'ai-chatbot',
    name: 'AI CHATBOT',
    image: 'images/project1.jpg',
    description: 'Raymond AI Chatbot is a web-based AI assistant designed to provide quick and interactive responses to users. It features a simple and clean chat interface where users can ask questions, get information, and interact with the AI in real time.',
    tags: ['Node.js', 'Express', 'JWT', 'JavaScript',
            'HTML', 'CSS'
    ],
    category: ['web'],
    link: 'https://raymond-aichatbot.vercel.app/'
  },
  {
    id: 'count',
    name: 'Manual Counting',
    image: 'images/project2.jpg',
    description: 'Lets Count is a simple web-based application designed for manual counting. Users can enter or track numbers manually, making it useful for practicing basic counting and JavaScript input functionality.',
    tags: ['HTML', 'CSS', 'Javascript'],
    category: ['web'],
    link: 'https://lets-count-eight.vercel.app/'
  },
  {
    id: 'student-grade-calcultor',
    name: 'Student Grade Calculator',
    image: 'images/project3.jpg',
    description: 'Student Grade Calculator is a simple web application that calculates a student’s average grade based on three entered grades. It provides a quick and easy way to check the final grade result through a clean and user-friendly interface.',
    tags: ['HTML', 'CSS', 'Javascript'],
    category: ['school'],
    link: 'https://student-grade-calculator-c552.vercel.app/'
  },

  {
    id: '4 Pics 1 Word',
    name: '4 Pics 1 Word',
    image: 'images/project4.jpg',
    description: 'A Java-based word puzzle game where players identify a common word that connects four related images. The project demonstrates Java programming concepts such as GUI design, event handling, arrays, game logic, user input, and score/level management.',
    tags: ['JAVA'],
    category: ['java'],
    link: 'https://github.com/raymoondd/java-project-4-pics-1-word',
  }
  
];

function initProjects() {
  const grid = document.getElementById('projectsGrid');
  const noResults = document.getElementById('noResults');
  const searchInput = document.getElementById('projectSearch');
  const filterPills = document.querySelectorAll('.pill');

  let activeFilter = 'all';

  function matchesFilter(project) {
    return activeFilter === 'all' || project.category.includes(activeFilter);
  }

  function matchesSearch(project, query) {
    if (!query) return true;
    const haystack = (project.name + ' ' + project.tags.join(' ')).toLowerCase();
    return haystack.includes(query);
  }

  function renderProjects() {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = projectData.filter(
      (project) => matchesFilter(project) && matchesSearch(project, query)
    );

    grid.innerHTML = '';

    filtered.forEach((project) => {
      const card = document.createElement('article');
      card.className = 'project-card card';
      card.innerHTML = `
        <img src="${project.image}" alt="${project.name} preview" class="project-thumb">
        <div class="project-body">
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <div class="project-tags">
            ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
          </div>
          <button type="button" class="project-link" data-id="${project.id}">View Details &rarr;</button>
        </div>
      `;
      grid.appendChild(card);
    });

    noResults.hidden = filtered.length !== 0;

    grid.querySelectorAll('.project-link').forEach((btn) => {
      btn.addEventListener('click', () => openModal(btn.dataset.id));
    });
  }

  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.dataset.filter;
      renderProjects();
    });
  });

  searchInput.addEventListener('input', renderProjects);
  renderProjects();
  initModal();
}

  //  PROJECT MODAL

function openModal(id) {
  const project = projectData.find((p) => p.id === id);
  if (!project) return;

  document.getElementById('modalImg').src = project.image;
  document.getElementById('modalImg').alt = project.name + ' preview';
  document.getElementById('modalTitle').textContent = project.name;
  document.getElementById('modalDescription').textContent = project.description;
  
  const linkBtn = document.getElementById('modalLink');
  if (project.link && project.link !== '#') {
    linkBtn.href = project.link;
    linkBtn.hidden = false;
  } else {
    linkBtn.hidden = true;
  }

  const tagsContainer = document.getElementById('modalTags');
  tagsContainer.innerHTML = project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('');

  document.getElementById('modalOverlay').classList.add('active');
  document.body.classList.add('nav-open');
}

function initModal() {
  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalClose');

  function closeModal() {
    overlay.classList.remove('active');
    document.body.classList.remove('nav-open');
  }

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });
}

  //  GALLERY LIGHTBOX

function initGalleryLightbox() {
  const overlay = document.getElementById('lightboxOverlay');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery-item');

  function openLightbox(src, alt, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightboxCaption.textContent = caption;
    
    overlay.classList.add('active');
    document.body.classList.add('nav-open');
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.classList.remove('nav-open');
    // Clear source after transition to avoid flash of old image on next open
    setTimeout(() => { lightboxImg.src = ''; }, 300);
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery-img');
      openLightbox(img.src, img.alt, img.dataset.caption);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });
  
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay.classList.contains('active')) {
      closeLightbox();
    }
  });
}

  //  CONTACT FORM VALIDATION

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const MIN_MESSAGE_LENGTH = 10;
  let notificationTimer;

  function showNotification(type, message) {
    let notification = document.getElementById('notification');

    if (!notification) {
      notification = document.createElement('div');
      notification.id = 'notification';
      notification.className = 'notification';

      notification.innerHTML = `
        <span class="notification-icon"></span>
        <span class="notification-message"></span>
      `;

      document.body.appendChild(notification);
    }

    const icon = notification.querySelector('.notification-icon');
    const messageElement = notification.querySelector('.notification-message');

    clearTimeout(notificationTimer);

    notification.classList.remove('success', 'error', 'show');
    notification.classList.add(type);

    icon.textContent = type === 'success' ? '✓' : '!';
    messageElement.textContent = message;

    void notification.offsetWidth;

    notification.classList.add('show');

    notificationTimer = setTimeout(() => {
      notification.classList.remove('show');
    }, 5000);
  }

  const fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('nameError'),
      validate: (value) => {
        return value.trim().length === 0
          ? 'Please enter your name.'
          : '';
      }
    },

    email: {
      input: document.getElementById('email'),
      error: document.getElementById('emailError'),
      validate: (value) => {
        if (value.trim().length === 0) {
          return 'Please enter your email.';
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(value.trim())
          ? ''
          : 'Please enter a valid email address.';
      }
    },

    subject: {
      input: document.getElementById('subject'),
      error: document.getElementById('subjectError'),
      validate: (value) => {
        return value.trim().length === 0
          ? 'Please enter a subject.'
          : '';
      }
    },

    message: {
      input: document.getElementById('message'),
      error: document.getElementById('messageError'),
      validate: (value) => {
        if (value.trim().length === 0) {
          return 'Please enter a message.';
        }

        if (value.trim().length < MIN_MESSAGE_LENGTH) {
          return `Message should be at least ${MIN_MESSAGE_LENGTH} characters.`;
        }

        return '';
      }
    }
  };

  function showFieldError(field, message) {
    field.error.textContent = message;

    field.input
      .closest('.form-group')
      .classList.toggle('error', Boolean(message));
  }

  Object.values(fields).forEach((field) => {
    field.input.addEventListener('input', () => {
      showFieldError(field, '');
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let isValid = true;

    Object.values(fields).forEach((field) => {
      const errorMessage = field.validate(field.input.value);

      showFieldError(field, errorMessage);

      if (errorMessage) {
        isValid = false;
      }
    });

    if (!isValid) {
      showNotification(
        'error',
        'Please fill out all required fields.'
      );

      return;
    }

    showNotification(
      'success',
      'Message sent successfully!'
    );

    form.reset();
  });
}
  //  THEME TOGGLE & LOCAL STORAGE

function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const STORAGE_KEY = 'portfolio-theme';

  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  toggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem(STORAGE_KEY, 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem(STORAGE_KEY, 'light');
    }
  });
}

  //  ACTIVE NAVIGATION ON SCROLL

function initActiveNav() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

  // BACK TO TOP BUTTON

function initBackToTop() {
  const button = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    button.classList.toggle('visible', window.scrollY > 500);
  });

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

  //  SCROLL REVEAL

function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.about-text, .about-card, .skill-card, .section-title, .resume-content'
  );

  targets.forEach((el) => el.classList.add('reveal-on-scroll'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  
  targets.forEach((el) => observer.observe(el));
}