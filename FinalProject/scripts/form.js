
document.addEventListener('DOMContentLoaded', ()=>{
  const sel = document.getElementById('program');
  if (sel && window.programs) {
    window.programs.forEach(p=>{
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.name;
      sel.appendChild(opt);
    });
  }

  
  const form = document.getElementById('contactForm');
  const confirm = document.getElementById('confirm');
  const countEl = document.getElementById('msgCount');
  const KEY = 'messagesSent';

  const renderCount = () => {
    const n = Number(localStorage.getItem(KEY) || 0);
    countEl.textContent = n;
  };
  renderCount();

  form?.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    if (!form.checkValidity()){
      confirm.textContent = 'Please complete required fields.';
      return;
    }
    
    const n = Number(localStorage.getItem(KEY) || 0) + 1;
    localStorage.setItem(KEY, String(n));
    renderCount();

    const name = (new FormData(form)).get('name') || 'Friend';
    confirm.textContent = `Thanks, ${name}! We’ll email you soon.`;
    form.reset();
  });
});
