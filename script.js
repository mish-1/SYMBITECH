// Countdown to a target date (25 Oct 2025 00:00:00 local time)
(function(){
  const dayEl = document.getElementById('dd');
  const hourEl = document.getElementById('hh');
  const minEl = document.getElementById('mm');
  const secEl = document.getElementById('ss');

  if(!dayEl || !hourEl || !minEl || !secEl) return;

  const target = new Date('2025-09-19T00:00:00');

  function pad(n){ return String(n).padStart(2,'0'); }

  function tick(){
    const now = new Date();
    let diff = Math.max(0, target - now);
    const days = Math.floor(diff / (1000*60*60*24)); diff -= days*(1000*60*60*24);
    const hours = Math.floor(diff / (1000*60*60));    diff -= hours*(1000*60*60);
    const mins = Math.floor(diff / (1000*60));        diff -= mins*(1000*60);
    const secs = Math.floor(diff / 1000);

    dayEl.textContent = pad(days);
    hourEl.textContent = pad(hours);
    minEl.textContent = pad(mins);
    secEl.textContent = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
})();
