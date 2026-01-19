
const menuBtn = document.querySelector('.menu-btn');
const menuList = document.querySelector('nav ul');
if (menuBtn && menuList) {
  menuBtn.addEventListener('click', () => menuList.classList.toggle('open'));
}




const path = location.pathname.split('/').pop();
document.querySelectorAll('nav a').forEach(a=>{
  const href = a.getAttribute('href');
  if (href && href.endsWith(path)) a.classList.add('active');
  if (!path && href.endsWith('index.html')) a.classList.add('active');
});
