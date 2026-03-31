/* ═══════════════════════════════════════════════════
   ZENTEA – Config, helpers cơ bản (show/hide/$)
   File: js/config.js
═══════════════════════════════════════════════════ */


'use strict';
// $ shorthand
var $=function(id){return document.getElementById(id);};
function show(id,d){var e=$(id);if(e)e.style.display=d||'block';}
function hide(id){var e=$(id);if(e)e.style.display='none';}

// Hero bg
// Hero background → xem js/hero-bg.js

// Sidebar toggle (only if sidebar exists)
const sidebar = $('sidebar');
const body = document.body;
const sidebarToggleBtn = $('sidebarToggle');
if(sidebarToggleBtn && sidebar){
  sidebarToggleBtn.onclick = () => {
    sidebar.classList.toggle('open');
    body.classList.toggle('sb-expanded');
  };
}

// Sidebar nav items
document.querySelectorAll('.sb-item[data-target]').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    if(!document.body.classList.contains('logged-in')) return;
    const target = item.dataset.target;
    showPage(target);
    document.querySelectorAll('.sb-item').forEach(i=>i.classList.remove('active'));
    item.classList.add('active');
  });
});

// Top navbar nav-item click handlers — SPA page switch + Hash routing
document.querySelectorAll('.nav-item[data-target]').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    if(!document.body.classList.contains('logged-in')) return;
    const target = item.dataset.target;
    history.pushState(null, '', '#' + target);
    showPage(target);
    document.querySelectorAll('.nav-item').forEach(i=>i.classList.remove('active'));
    item.classList.add('active');
  });
});

// Back/Forward browser navigation
window.addEventListener('popstate', () => {
  if(!document.body.classList.contains('logged-in')) return;
  const hash = location.hash.replace('#','') || 'home';
  showPage(hash);
  document.querySelectorAll('.nav-item').forEach(i=>i.classList.remove('active'));
  const btn = document.querySelector('.nav-item[data-target="'+hash+'"]');
  if(btn) btn.classList.add('active');
});


// SPA page navigation