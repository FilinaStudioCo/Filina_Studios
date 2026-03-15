// =============================================
//  TALKING AVATAR ANIMATION — Aling Lina
// =============================================

const hosts = [
  {
    id: 'angelina',
    bubbleId: 'bubble-angelina',
    dotsId: 'talking-angelina',
    quotes: [
      '💬 "Busy nga ako but wait — pakinggan mo muna tong idea ko."',
      '💬 "Sige, gagawin ko na. Sabay sa thesis ko."',
      '💬 "May PhD plan ako... oo, seryoso."',
      '💬 "Wala na akong time. Anyway, bagong project!"'
    ]
  },
  {
    id: 'catalina',
    bubbleId: 'bubble-catalina',
    dotsId: 'talking-catalina',
    quotes: [
      '💬 "Okay, real talk lang — huwag kayong mag-judge ha."',
      '💬 "Hindi mo alam kung iiyak ka o matatawa — basta pakinggan mo."',
      '💬 "Dumaan na ako sa bagyo — marami. Nakatayo pa rin ako."',
      '💬 "Bes, totoo yan. Promise."'
    ]
  },
  {
    id: 'rosalinda',
    bubbleId: 'bubble-rosalinda',
    dotsId: 'talking-rosalinda',
    quotes: [
      '💬 "It is okay, I am here. Tell me everything."',
      '💬 "Nandito lang ako. Kwento mo sa akin."',
      '💬 "Schedule updated na. Relax kayo."',
      '💬 "Bahala na ako. Walang mag-aalala."'
    ]
  }
];

let currentSpeaker = 0;
const quoteIndexes = [0, 0, 0];

function activateSpeaker(index) {
  // Reset all
  hosts.forEach(function(h) {
    var bubble = document.getElementById(h.bubbleId);
    var dots   = document.getElementById(h.dotsId);
    var card   = document.getElementById('host-' + h.id);
    if (bubble) bubble.classList.remove('visible');
    if (dots)   dots.classList.remove('active');
    if (card)   card.classList.remove('is-talking');
  });

  var host   = hosts[index];
  var bubble = document.getElementById(host.bubbleId);
  var dots   = document.getElementById(host.dotsId);
  var card   = document.getElementById('host-' + host.id);

  if (!bubble || !dots || !card) return;

  // Set quote and cycle
  bubble.textContent      = host.quotes[quoteIndexes[index]];
  quoteIndexes[index]     = (quoteIndexes[index] + 1) % host.quotes.length;

  bubble.classList.add('visible');
  dots.classList.add('active');
  card.classList.add('is-talking');
}

function startTalkingCycle() {
  activateSpeaker(currentSpeaker);
  setInterval(function() {
    currentSpeaker = (currentSpeaker + 1) % hosts.length;
    activateSpeaker(currentSpeaker);
  }, 3500);
}

// =============================================
//  NAV + FORMS
// =============================================

function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('open');
}

function subscribeNewsletter(e) {
  e.preventDefault();
  var msg = document.getElementById('subscribe-msg');
  if (msg) msg.style.display = 'inline-block';
  e.target.reset();
}

function sendContact(e) {
  e.preventDefault();
  var msg = document.getElementById('contact-msg');
  if (msg) msg.style.display = 'inline-block';
  e.target.reset();
}

// =============================================
//  COUNTER ANIMATION
// =============================================

function animateCount(id, end) {
  var el = document.getElementById(id);
  if (!el || end === 0) return;
  var start = 0;
  var step  = Math.ceil(end / 60);
  var timer = setInterval(function() {
    start += step;
    if (start >= end) {
      el.textContent = end;
      clearInterval(timer);
    } else {
      el.textContent = start;
    }
  }, 30);
}

// =============================================
//  INIT
// =============================================

document.addEventListener('DOMContentLoaded', function() {
  animateCount('ep-count', 0);
  animateCount('dl-count', 0);
  setTimeout(startTalkingCycle, 1200);
});
