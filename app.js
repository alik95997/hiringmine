const toggleBtn = document.getElementById('toggle-btn');
const navMenu = document.querySelector('.nav-menu ul');

toggleBtn.addEventListener('click', () => {
  navMenu.style.display = navMenu.style.display === 'block' ? 'none' : 'block';
});

