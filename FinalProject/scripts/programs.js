
document.addEventListener('DOMContentLoaded', ()=>{
  const grid = document.getElementById('programGrid');
  const select = document.getElementById('difficulty');
  if (!grid || !window.programs) return;

  function render(list){
    grid.innerHTML = list.map(p => `
      <article class="card">
        <img src="${p.image}" alt="${p.name}" loading="lazy" width="400" height="280">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="badge">${p.difficulty}</div>
      </article>
    `).join('');
  }

  function applyFilter(){
    const val = select.value;
    const filtered = val === 'all' ? window.programs : window.programs.filter(p => p.difficulty === val);
    render(filtered);
    localStorage.setItem('lastDifficulty', val);
  }

  
  const last = localStorage.getItem('lastDifficulty');
  if (last) { select.value = last; }
  select.addEventListener('change', applyFilter);

  applyFilter();
});
