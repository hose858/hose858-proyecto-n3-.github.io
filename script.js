// script.js

// 1. Version check
;(async function() {
  const CURRENT_VERSION = '1.0';
  const VERSION_URL     = 'https://raw.githubusercontent.com/ivysone/Will-you-be-my-Valentine-/main/version.json';

  try {
    const res = await fetch(VERSION_URL);
    if (!res.ok) throw new Error('Error fetching version');
    const { version, updateMessage } = await res.json();
    if (version !== CURRENT_VERSION) alert(updateMessage);
  } catch (err) {
    console.warn('Version check failed:', err);
  }
})();

// 2. Interactive logic
document.addEventListener('DOMContentLoaded', () => {
  const header        = document.querySelector('header');
  const mainSection   = document.querySelector('main');
  const yesBtn        = document.getElementById('yesBtn');
  const noBtn         = document.getElementById('noBtn');
  const feedback      = document.getElementById('feedback');
  const thanksSection = document.getElementById('thanks');
  const buttonsSection= document.querySelector('.buttons');

  let scaleFactor = 1;
  const noTexts = [
    'Almost got me!',
    'Are you sure??',
    'I will be very sad…',
    'Don’t you want to think about it more??'
  ];
  let textIndex = 0;

  function getRandomPosition() {
    const { width: W, height: H } = buttonsSection.getBoundingClientRect();
    const { width: w, height: h } = noBtn.getBoundingClientRect();
    return {
      x: Math.random() * (W - w),
      y: Math.random() * (H - h)
    };
  }

  function evade() {
    const { x, y } = getRandomPosition();
    const rot      = Math.random() * 90 - 45; // ±45°
    noBtn.style.transition = 'transform 0.5s ease-out';
    noBtn.style.transform  = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
    noBtn.textContent      = noTexts[textIndex++ % noTexts.length];
    scaleFactor = Math.min(scaleFactor + 0.1, 3);
    yesBtn.style.transform = `scale(${scaleFactor})`;
  }

  noBtn.addEventListener('mouseenter', evade);
  noBtn.addEventListener('touchstart', evade, { passive: true });

  noBtn.addEventListener('click', e => {
    e.preventDefault();
    feedback.textContent = 'Oh! Maybe next time 😊';
    feedback.classList.remove('hidden');
    feedback.focus();
  });

  yesBtn.addEventListener('click', () => {
    header.classList.add('hidden');
    mainSection.classList.add('hidden');
    thanksSection.classList.remove('hidden');
    thanksSection.classList.add('fade-in');
  });
});
