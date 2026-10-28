
// ==========================================
// NIMON RECEPTION INVITATION
// COMPLETE JAVASCRIPT
// ==========================================

'use strict';

// ==========================================
// 01. ELEMENT REFERENCES
// ==========================================

const intro = document.getElementById('intro');
const main = document.getElementById('mainContent');

const openButton = document.getElementById('openInvitation');
const skipButton = document.getElementById('skipIntro');

const introSound = document.getElementById('introSound');
const musicToggle = document.getElementById('musicToggle');
const music = document.getElementById('backgroundMusic');

const header = document.getElementById('siteHeader');

const reduceMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

let isOpened = false;
let soundOn = false;

// ==========================================
// 02. INITIAL PAGE STATE
// ==========================================

// Main website is disabled until opened.

main.inert = true;
document.body.classList.add('intro-locked');

// ==========================================
// 03. MUSIC BUTTON STATE
// ==========================================

function updateMusicButtons() {

  introSound.textContent = soundOn
    ? '♫  Sound on'
    : '♫  Sound off';

  introSound.setAttribute(
    'aria-pressed',
    String(soundOn)
  );

  const label = musicToggle.querySelector(
    '.music-toggle__label'
  );

  label.textContent = soundOn
    ? 'Music on'
    : 'Music off';

  musicToggle.setAttribute(
    'aria-pressed',
    String(soundOn)
  );

  musicToggle.setAttribute(
    'aria-label',
    soundOn
      ? 'Pause background music'
      : 'Play background music'
  );
}

// ==========================================
// 04. PLAY / PAUSE MUSIC
// ==========================================

function playMusic() {

  music.volume = 0.28;

  const request = music.play();

  if (
    request &&
    typeof request.catch === 'function'
  ) {
    request.catch(() => {
      soundOn = false;
      updateMusicButtons();
    });
  }
}

function pauseMusic() {
  music.pause();
}

// Opening screen sound preference

introSound.addEventListener('click', () => {
  soundOn = !soundOn;
  updateMusicButtons();
});

// Floating Music button

musicToggle.addEventListener('click', () => {

  soundOn = !soundOn;
  updateMusicButtons();

  if (soundOn) {
    playMusic();
  } else {
    pauseMusic();
  }

});

// ==========================================
// 05. OPEN INVITATION ANIMATION
// ==========================================

// Blur-to-clear cinematic opening.
// No rectangle or name outline.

function revealInvitation(skipAnimation = false) {

  if (isOpened) return;

  isOpened = true;
  openButton.disabled = true;

  // Blur image becomes clear
  intro.classList.add('is-opening');

  if (soundOn) {
    playMusic();
  }

  const revealDelay = (
    reduceMotion || skipAnimation
  ) ? 0 : 1040;

  // Show main website after reveal

  window.setTimeout(() => {

    document.body.classList.add('is-revealed');
    document.body.classList.remove('intro-locked');

    main.inert = false;

    intro.classList.add('is-leaving');

    // Focus main, not the couple names.
    // Avoid visible outline around names.

    main.focus({
      preventScroll: true
    });

  }, revealDelay);

  // Remove opening overlay completely

  window.setTimeout(() => {
    intro.hidden = true;
  }, revealDelay + (reduceMotion ? 20 : 650));

}

// Open Invitation button

openButton.addEventListener('click', () => {
  revealInvitation();
});

// Skip Intro button

skipButton.addEventListener('click', () => {
  revealInvitation(true);
});

// ==========================================
// 06. STICKY HEADER
// ==========================================

function updateHeader() {

  header.classList.toggle(
    'is-scrolled',
    window.scrollY > 60
  );

}

window.addEventListener(
  'scroll',
  updateHeader,
  { passive: true }
);

updateHeader();

// ==========================================
// 07. SCROLL ANIMATIONS
// ==========================================

const revealElements = [
  ...document.querySelectorAll('.reveal')
];

if (
  !reduceMotion &&
  'IntersectionObserver' in window
) {

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            'is-visible'
          );

          observerInstance.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -35px 0px'
    }
  );

  revealElements.forEach(element => {
    observer.observe(element);
  });

} else {

  revealElements.forEach(element => {
    element.classList.add('is-visible');
  });

}

// ==========================================
// 08. RECEPTION COUNTDOWN
// ==========================================

// CHANGE DATE in index.html:
//
// data-event-date="2026-12-18T19:00:00+06:00"
//
// +06:00 = Bangladesh timezone.

const countdown = document.getElementById(
  'countdown'
);

const receptionTimestamp = new Date(
  countdown.dataset.eventDate
).getTime();

const countdownMessage = document.getElementById(
  'countdownMessage'
);

const parts = {
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
};

function updateCountdown() {

  // Check valid date

  if (!Number.isFinite(receptionTimestamp)) {

    countdownMessage.textContent =
      'Please set a valid reception date.';

    return;
  }

  const distance = Math.max(
    0,
    receptionTimestamp - Date.now()
  );

  const values = {

    days: Math.floor(
      distance / 86400000
    ),

    hours: Math.floor(
      (distance % 86400000) / 3600000
    ),

    minutes: Math.floor(
      (distance % 3600000) / 60000
    ),

    seconds: Math.floor(
      (distance % 60000) / 1000
    )

  };

  Object.entries(values).forEach(
    ([key, value]) => {

      parts[key].textContent = String(
        value
      ).padStart(2, '0');

    }
  );

  if (distance === 0) {

    countdownMessage.textContent =
      'The celebration has begun. Welcome!';

  } else {

    countdownMessage.textContent = '';

  }

}

// Start Countdown

updateCountdown();

window.setInterval(
  updateCountdown,
  1000
);

// ==========================================
// 09. WEDDING PHOTO GALLERY
// ==========================================

// IMAGE CHANGE 02-05:
//
// Images are configured in index.html.
// No image path change is needed here.

const cards = [
  ...document.querySelectorAll('.gallery-card')
];

const dialog = document.getElementById(
  'photoDialog'
);

const dialogImage = document.getElementById(
  'lightboxImage'
);

const dialogCaption = document.getElementById(
  'lightboxCaption'
);

let activePhoto = 0;
let lastGalleryButton = null;

// Display selected photograph

function showPhoto(index) {

  activePhoto = (
    index + cards.length
  ) % cards.length;

  const preview = cards[activePhoto].querySelector(
    'img'
  );

  dialogImage.src = preview.currentSrc || preview.src;
  dialogImage.alt = preview.alt;

  dialogCaption.textContent =
    `${String(activePhoto + 1).padStart(2, '0')}` +
    ` / ${String(cards.length).padStart(2, '0')}` +
    ` — ${preview.alt}`;

}

// Open photo when gallery card is clicked

cards.forEach((card, index) => {

  card.addEventListener('click', () => {

    lastGalleryButton = card;

    showPhoto(index);

    dialog.showModal();

  });

});

// ==========================================
// 10. PHOTO LIGHTBOX CONTROLS
// ==========================================

// Close

document.getElementById('closePhoto')
  .addEventListener('click', () => {
    dialog.close();
  });

// Previous

document.getElementById('prevPhoto')
  .addEventListener('click', () => {
    showPhoto(activePhoto - 1);
  });

// Next

document.getElementById('nextPhoto')
  .addEventListener('click', () => {
    showPhoto(activePhoto + 1);
  });

// Click outside image to close

dialog.addEventListener('click', event => {

  if (event.target === dialog) {
    dialog.close();
  }

});

// Return focus to clicked photo

dialog.addEventListener('close', () => {

  if (lastGalleryButton) {

    lastGalleryButton.focus({
      preventScroll: true
    });

  }

});

// Keyboard arrows

dialog.addEventListener('keydown', event => {

  if (event.key === 'ArrowLeft') {
    showPhoto(activePhoto - 1);
  }

  if (event.key === 'ArrowRight') {
    showPhoto(activePhoto + 1);
  }

});

// ==========================================
// 11. MISSING GALLERY IMAGE FALLBACK
// ==========================================

document.querySelectorAll('.gallery-card img')
  .forEach(image => {

    image.addEventListener('error', () => {
      image.style.display = 'none';
    });

  });

// ==========================================
// 12. INITIAL STATE
// ==========================================

updateMusicButtons();

// ==========================================
// PDF DOWNLOAD NOTE
//
// No PDF JavaScript is required.
//
// The HTML <a download> link downloads
// your manually uploaded PDF from:
//
// assets/Fahim-Momo-Reception-Invitation.pdf
// ==========================================
