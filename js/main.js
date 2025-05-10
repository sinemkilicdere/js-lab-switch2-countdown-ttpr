console.log("✅ JS file is running");

CountDownToMario('auto', 'countdown');

function CountDownToMario(endTime, divId) {
  const div = document.getElementById(divId);

  // Read from data-release if 'auto' is passed
  const end = endTime === 'auto' ? new Date(div.dataset.release) : new Date(endTime);
  const pad = (n) => String(n).padStart(2, '0');

  const _second = 1000;
  const _minute = _second * 60;
  const _hour   = _minute * 60;
  const _day    = _hour * 24;

  let countdownInterval;

  function showRemaining() {
    const now = new Date();
    const distance = end - now;

    if (distance <= 0) {
      clearInterval(countdownInterval);
      div.textContent = "Switch 2 is out! 🎉";
      document.body.classList.add('launched');

      // Play sound if available
      const sound = document.getElementById('coinSound');
      if (sound) {
        sound.play().catch(e => console.warn("Sound play failed:", e));
      }

      // Optional: trigger confetti if available
      // if (typeof confetti === 'function') confetti();

      return;
    }

    const days    = Math.floor(distance / _day);
    const hours   = Math.floor((distance % _day) / _hour);
    const minutes = Math.floor((distance % _hour) / _minute);
    const seconds = Math.floor((distance % _minute) / _second);

    div.textContent = `${pad(days)} : ${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`;
  }

  showRemaining();
  countdownInterval = setInterval(showRemaining, 1000);
}