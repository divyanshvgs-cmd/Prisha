const SPEECH = {
  about:
    'UN Sustainable Development Goal 14, Life Below Water, aims to conserve and sustainably use the world\'s oceans, seas, and marine resources. It focuses on reducing marine pollution, ending overfishing, addressing ocean acidification, and protecting marine ecosystems to support biodiversity and livelihoods.',
  targets:
    'Key targets for 2030 include reducing marine pollution, restoring coastal ecosystems, reducing ocean acidification, ending overfishing and destructive fishing, increasing protected marine areas, and supporting small-scale fishers.',
  causes:
    'The decline of marine ecosystems is mainly driven by pollution, climate change, overfishing, and habitat destruction.',
  help:
    'You can help by reducing single-use plastics, choosing sustainable seafood, supporting marine conservation organizations, and advocating for stronger ocean protection policies.'
};

const screens = {
  screen1: document.getElementById('screen1'),
  screen2: document.getElementById('screen2')
};

function switchScreen(targetId) {
  Object.values(screens).forEach((screen) => screen.classList.remove('active'));
  screens[targetId]?.classList.add('active');
}

function speak(text) {
  if (!('speechSynthesis' in window)) {
    alert(`Speech not supported in this browser.\n\n${text}`);
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

document.querySelectorAll('[data-nav]').forEach((button) => {
  button.addEventListener('click', () => switchScreen(button.dataset.nav));
});

document.querySelectorAll('[data-speak]').forEach((button) => {
  button.addEventListener('click', () => {
    speak(SPEECH[button.dataset.speak]);
  });
});

const runDemo = document.getElementById('runDemo');
runDemo.addEventListener('click', async () => {
  runDemo.disabled = true;
  runDemo.textContent = 'Simulator running...';

  switchScreen('screen1');
  await step(() => speak(SPEECH.about), 1800);
  await step(() => speak(SPEECH.targets), 2200);
  await step(() => switchScreen('screen2'), 900);
  await step(() => speak(SPEECH.causes), 1900);
  await step(() => speak(SPEECH.help), 2300);

  runDemo.disabled = false;
  runDemo.textContent = 'Run Simulator Tour';
});

function step(action, delay) {
  action();
  return new Promise((resolve) => setTimeout(resolve, delay));
}
