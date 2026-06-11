/* ==========================================
   DUSK & DIALOGUE — Main JS
   ========================================== */

// ---- NAV SCROLL ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ---- MOBILE NAV ----
const toggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---- REVEAL ON SCROLL ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.stat, .portfolio-card, .blog-card--sm, .contact__left, .contact__right').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ---- GALLERY DATA ----
const galleryItems = [
  { title: 'Before the Hour', artist: 'Amara Nwosu', cat: 'Painting', filter: 'painting',
    grad: 'linear-gradient(135deg, #1D1A39 0%, #451952 40%, #AE445A 100%)' },
  { title: 'Meridiem', artist: 'Tomas Herrera', cat: 'Photography', filter: 'photography',
    grad: 'linear-gradient(135deg, #662549 0%, #F39F5A 100%)' },
  { title: 'Soft Architecture', artist: 'Jin Park', cat: 'Installation', filter: 'installation',
    grad: 'linear-gradient(160deg, #451952 0%, #662549 60%, #E8BCB9 100%)' },
  { title: 'Chromatic Memory', artist: 'Leila Saad', cat: 'Digital', filter: 'digital',
    grad: 'linear-gradient(135deg, #AE445A 0%, #F39F5A 60%, #E8BCB9 100%)' },
  { title: 'The Threshold', artist: 'Kwame Asante', cat: 'Painting', filter: 'painting',
    grad: 'linear-gradient(160deg, #1D1A39 0%, #662549 100%)' },
  { title: 'Dusk Study No.7', artist: 'Ayşe Kaya', cat: 'Photography', filter: 'photography',
    grad: 'linear-gradient(135deg, #662549 0%, #451952 50%, #1D1A39 100%)' },
];

function renderGallery(filter = 'all') {
  const grid = document.getElementById('galleryGrid');
  const visible = filter === 'all' ? galleryItems : galleryItems.filter(i => i.filter === filter);
  grid.innerHTML = visible.map(item => `
    <div class="gallery-item" data-filter="${item.filter}">
      <div class="gallery-item__img" style="background: ${item.grad}"></div>
      <span class="gallery-item__cat">${item.cat}</span>
      <div class="gallery-item__overlay">
        <div class="gallery-item__title">${item.title}</div>
        <div class="gallery-item__artist">${item.artist}</div>
      </div>
    </div>
  `).join('');
}

renderGallery();

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGallery(btn.dataset.filter);
  });
});

// ---- CONVERSATIONS / QUOTES ----
const quotes = [
  {
    text: "The museum is not a neutral space. Every frame, every label, every silence is a curatorial act with political consequences.",
    author: "Yara Okafor",
    topic: "Cultural Institutions — Autumn Salon 2024"
  },
  {
    text: "We teach children to colour inside the lines and then wonder why they stop making art by the time they're twelve.",
    author: "Rafael Mendes",
    topic: "Art Education — Spring Workshop 2024"
  },
  {
    text: "The most dangerous thing a painting can do is make you feel comfortable. Discomfort is the beginning of a real conversation.",
    author: "Jin Park",
    topic: "Open Studio Talk — Summer 2025"
  },
  {
    text: "Dusk is not the absence of light. It is the moment light learns to negotiate with darkness.",
    author: "Amara Nwosu",
    topic: "Artist Statement — Liminal Hours Exhibition"
  },
  {
    text: "Beauty without critique is decoration. Critique without beauty is just noise. Art lives in the tension between the two.",
    author: "Leila Saad",
    topic: "Closing Keynote — Dusk & Dialogue Annual Forum"
  }
];

let currentQuote = 0;
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const quoteTopic = document.getElementById('quoteTopic');
const quoteDots = document.getElementById('quoteDots');
const quoteCard = document.getElementById('quoteCard');

function buildDots() {
  quoteDots.innerHTML = quotes.map((_, i) =>
    `<button class="quote-dot${i === 0 ? ' active' : ''}" data-i="${i}" aria-label="Quote ${i+1}"></button>`
  ).join('');
  quoteDots.querySelectorAll('.quote-dot').forEach(dot => {
    dot.addEventListener('click', () => goToQuote(+dot.dataset.i));
  });
}

function goToQuote(index) {
  quoteCard.style.opacity = '0';
  setTimeout(() => {
    currentQuote = (index + quotes.length) % quotes.length;
    quoteText.textContent = `"${quotes[currentQuote].text}"`;
    quoteAuthor.textContent = `— ${quotes[currentQuote].author}`;
    quoteTopic.textContent = quotes[currentQuote].topic;
    quoteDots.querySelectorAll('.quote-dot').forEach((d, i) =>
      d.classList.toggle('active', i === currentQuote));
    quoteCard.style.opacity = '1';
  }, 250);
}

buildDots();
goToQuote(0);

document.getElementById('quoteNext').addEventListener('click', () => goToQuote(currentQuote + 1));
document.getElementById('quotePrev').addEventListener('click', () => goToQuote(currentQuote - 1));

// Auto-advance
let quoteTimer = setInterval(() => goToQuote(currentQuote + 1), 6000);
quoteCard.addEventListener('mouseenter', () => clearInterval(quoteTimer));
quoteCard.addEventListener('mouseleave', () => {
  quoteTimer = setInterval(() => goToQuote(currentQuote + 1), 6000);
});

// ---- CONTACT FORM ----
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Message Sent ✦';
    btn.style.background = 'rgba(69,25,82,0.6)';
    btn.style.color = 'var(--blush)';
    form.reset();
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      btn.style.background = '';
      btn.style.color = '';
    }, 4000);
  }, 1600);
});

// ---- ACTIVE NAV LINK ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');
const linkObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--blush)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });
sections.forEach(s => linkObserver.observe(s));
