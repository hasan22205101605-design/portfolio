
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKu-Vt32phi6brcDLSq4hTFZ32YAyHGZaflIzNBAwazkWYonWGoGwecgsdwIyK_z8Nxg/exec';

// --- Sticky Nav ---
window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('stuck',scrollY>60);
});

// --- Reveal on Scroll ---
const ro=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

// --- Skill Bars ---
const so=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.sk-fill').forEach(b=>{b.style.width=b.dataset.w+'%'});
    }
  });
},{threshold:.3});
document.querySelectorAll('.skills-grid').forEach(el=>so.observe(el));

// --- Contact Form → Google Sheets ---
const form=document.getElementById('contactForm');
const btn=document.getElementById('submitBtn');
const btnText=document.getElementById('btnText');
const ring=document.getElementById('loadRing');
const msg=document.getElementById('formMsg');

form.addEventListener('submit',async e=>{
  e.preventDefault();



  // Loading state
  btn.disabled=true;
  btnText.style.display='none';
  ring.style.display='block';
  msg.style.display='none';

  try{
    const res=await fetch(SCRIPT_URL,{method:'POST',body:new FormData(form)});
    const data=await res.json();
    if(data.result==='success'){
      form.reset();
      showMsg('✓ Message sent! I will get back to you soon.','success');
    } else {
      showMsg('Something went wrong. Please try again.','error');
    }
  }catch(err){
    showMsg('Network error. Please try again.','error');
  }finally{
    btn.disabled=false;
    btnText.style.display='block';
    ring.style.display='none';
  }
});

function showMsg(text,type){
  msg.textContent=text;
  msg.className='form-msg '+type;
  msg.style.display='block';
}