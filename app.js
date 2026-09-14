const views=[...document.querySelectorAll('.view')];
const navs=[...document.querySelectorAll('[data-view]')];
const modal=document.getElementById('modal');
const modalContent=document.getElementById('modalContent');
const toast=document.getElementById('toast');

function showView(id){
  views.forEach(v=>v.classList.toggle('active-view',v.id===id));
  navs.forEach(n=>n.classList.toggle('active',n.dataset.view===id));
  window.scrollTo({top:document.querySelector('.content-grid').offsetTop-90,behavior:'smooth'});
}
navs.forEach(n=>n.addEventListener('click',()=>showView(n.dataset.view)));

document.getElementById('profileBtn').onclick=()=>openModal('<h3>Asha Sharma</h3><p>Demo participant profile used to demonstrate NeuroSathi\'s personalization and caregiver workflow.</p><div class="demo-options"><button class="demo-option">10 personal memory anchors loaded</button><button class="demo-option">Personal baseline established</button><button class="demo-option">Caregiver feedback enabled</button></div>');

document.getElementById('voiceBtn').onclick=()=>speak('Welcome to NeuroSathi. Your next activity is personalized to your familiar daily routine.');
document.getElementById('speakTest').onclick=()=>speak('This is a browser voice assistance test for NeuroSathi.');

function speak(text){
  if(!('speechSynthesis' in window)){toastMsg('Voice is not supported by this browser.');return;}
  speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); u.rate=.92; speechSynthesis.speak(u); toastMsg('Voice assistance started');
}

function openModal(html){modalContent.innerHTML=html;modal.classList.add('open');}
document.getElementById('closeModal').onclick=()=>modal.classList.remove('open');
modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});

function toastMsg(text){toast.textContent=text;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2400)}

document.querySelectorAll('.play').forEach(btn=>btn.onclick=()=>{
  const game=btn.dataset.game;
  openModal(`<p class="eyebrow">DEMO ACTIVITY</p><h3>${game}</h3><p>This prototype uses Asha's personal anchors to make the task familiar. In a production version, the task generator would select stimuli from the person's approved memory graph and record response type, latency, retries and hints.</p><div class="demo-options"><button class="demo-option" onclick="toastMsg('Correct response recorded');document.getElementById('closeModal').click()">Familiar item — Garden</button><button class="demo-option" onclick="toastMsg('Response pattern recorded');document.getElementById('closeModal').click()">Familiar item — Morning tea</button><button class="demo-option" onclick="toastMsg('Context note added');document.getElementById('closeModal').click()">Need a hint</button></div>`);
});

document.getElementById('reviewBtn').onclick=()=>openModal('<p class="eyebrow">CAREGIVER CHECK</p><h3>Before treating this as a change</h3><p>Was there a temporary context factor today? For example: fatigue, unfamiliar language, hearing difficulty, distraction, medication timing, illness or a change in routine.</p><div class="demo-options"><button class="demo-option" onclick="toastMsg(\'Context: tired today — signal softened\');document.getElementById(\'closeModal\').click()">Yes — temporary fatigue</button><button class="demo-option" onclick="toastMsg(\'No context found — observation retained\');document.getElementById(\'closeModal\').click()">No — no context found</button><button class="demo-option" onclick="toastMsg(\'Context note saved\');document.getElementById(\'closeModal\').click()">Add another note</button></div>');

document.getElementById('addAnchor').onclick=()=>openModal('<p class="eyebrow">PERSONAL MEMORY FINGERPRINT</p><h3>Add a memory anchor</h3><p>Choose information that is familiar and meaningful to the person. Keep it consent-based and caregiver-approved.</p><div class="demo-options"><button class="demo-option" onclick="toastMsg(\'Family anchor added\');document.getElementById(\'closeModal\').click()">Family member</button><button class="demo-option" onclick="toastMsg(\'Place anchor added\');document.getElementById(\'closeModal\').click()">Familiar place</button><button class="demo-option" onclick="toastMsg(\'Routine anchor added\');document.getElementById(\'closeModal\').click()">Daily routine</button></div>');
document.getElementById('memoryBtn').onclick=document.getElementById('addAnchor').onclick;
document.getElementById('feedbackBtn').onclick=document.getElementById('reviewBtn').onclick;

document.getElementById('clearData').onclick=()=>{localStorage.clear();toastMsg('Demo browser data cleared');};

// Lightweight persistence demonstrates a real client-side state layer without pretending this is a production backend.
localStorage.setItem('neurosathi_demo_version','1.0');
