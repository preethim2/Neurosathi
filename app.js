const patientPortal=document.getElementById('patientPortal');
const caregiverPortal=document.getElementById('caregiverPortal');
const portalButtons=[...document.querySelectorAll('.portal-btn')];

function showPortal(role){
  const patient=role==='patient';
  patientPortal.classList.toggle('active-portal',patient);
  caregiverPortal.classList.toggle('active-portal',!patient);
  portalButtons.forEach(b=>b.classList.toggle('active',b.dataset.portal===role));
  const target=patient?'patientHome':'caregiverHome';
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active-view'));
  document.getElementById(target).classList.add('active-view');
  document.querySelectorAll('.nav').forEach(n=>n.classList.remove('active'));
  const first=document.querySelector(`.nav[data-view="${target}"]`); if(first) first.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}
portalButtons.forEach(b=>b.addEventListener('click',()=>showPortal(b.dataset.portal)));

function showView(id){
  const target=document.getElementById(id);
  if(!target)return;
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active-view',v===target));
  document.querySelectorAll('.nav').forEach(n=>n.classList.toggle('active',n.dataset.view===id));
  window.scrollTo({top:document.querySelector('.content-grid').offsetTop-90,behavior:'smooth'});
}
document.querySelectorAll('[data-view]').forEach(n=>n.addEventListener('click',()=>showView(n.dataset.view)));

document.getElementById('profileBtn').onclick=()=>openModal('<p class="eyebrow">DEMO PROFILE</p><h3>Asha Sharma</h3><p>Retired teacher • Guwahati. This demo profile shows how personal memory anchors can support familiar activities and caregiver review.</p><div class="demo-options"><button class="demo-option">10 personal memory anchors loaded</button><button class="demo-option">Personal baseline established</button><button class="demo-option">Caregiver feedback enabled</button></div>');
document.getElementById('voiceBtn').onclick=()=>speak('Welcome to NeuroSathi. Your portal and activities are personalised around familiar routines.');
const speakTest=document.getElementById('speakTest'); if(speakTest)speakTest.onclick=()=>speak('This is a browser voice assistance test for NeuroSathi.');
const patientSpeak=document.getElementById('patientSpeak'); if(patientSpeak)patientSpeak.onclick=()=>speak('You can choose Memory Match, Sequence My Day, Pattern Match, or Object Recall. Ask your caregiver for help if needed.');

function speak(text){
  if(!('speechSynthesis' in window)){toastMsg('Voice is not supported by this browser.');return;}
  speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.rate=.92;speechSynthesis.speak(u);toastMsg('Voice assistance started');
}

const modal=document.getElementById('modal');
const modalContent=document.getElementById('modalContent');
const toast=document.getElementById('toast');
function openModal(html){modalContent.innerHTML=html;modal.classList.add('open')}
document.getElementById('closeModal').onclick=()=>modal.classList.remove('open');
modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});
function toastMsg(text){toast.textContent=text;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2400)}

function activityModal(game){
  openModal(`<p class="eyebrow">PATIENT ACTIVITY</p><h3>${game}</h3><p>This demo uses Asha's approved personal anchors to make the activity familiar. In a production version, the task generator would select stimuli from the person's approved memory graph and record response type, latency, retries and hints.</p><div class="demo-options"><button class="demo-option" onclick="toastMsg('Correct response recorded');document.getElementById('closeModal').click()">✓ Familiar item — Garden</button><button class="demo-option" onclick="toastMsg('Response pattern recorded');document.getElementById('closeModal').click()">✓ Familiar item — Morning tea</button><button class="demo-option" onclick="toastMsg('Hint used — context recorded');document.getElementById('closeModal').click()">? Need a hint</button></div>`);
}
document.querySelectorAll('.play').forEach(btn=>btn.onclick=()=>activityModal(btn.dataset.game));

const reviewBtn=document.getElementById('reviewBtn');
if(reviewBtn)reviewBtn.onclick=()=>openModal('<p class="eyebrow">CAREGIVER CHECK</p><h3>Before treating this as a change</h3><p>Was there a temporary context factor today? For example: fatigue, unfamiliar language, hearing difficulty, distraction, medication timing, illness or a change in routine.</p><div class="demo-options"><button class="demo-option" onclick="toastMsg(\'Context: tired today — signal softened\');document.getElementById(\'closeModal\').click()">Yes — temporary fatigue</button><button class="demo-option" onclick="toastMsg(\'No context found — observation retained\');document.getElementById(\'closeModal\').click()">No — no context found</button><button class="demo-option" onclick="toastMsg(\'Context note saved\');document.getElementById(\'closeModal\').click()">Add another note</button></div>');

function addAnchorModal(){openModal('<p class="eyebrow">CAREGIVER CONTROL</p><h3>Add a memory anchor</h3><p>Choose information that is familiar and meaningful to the person. Keep it consent-based and caregiver-approved.</p><div class="demo-options"><button class="demo-option" onclick="toastMsg(\'Family anchor added\');document.getElementById(\'closeModal\').click()">Family member</button><button class="demo-option" onclick="toastMsg(\'Place anchor added\');document.getElementById(\'closeModal\').click()">Familiar place</button><button class="demo-option" onclick="toastMsg(\'Routine anchor added\');document.getElementById(\'closeModal\').click()">Daily routine</button></div>')}
const addAnchor=document.getElementById('addAnchor');if(addAnchor)addAnchor.onclick=addAnchorModal;
const memoryBtn=document.getElementById('memoryBtn');if(memoryBtn)memoryBtn.onclick=addAnchorModal;
const feedbackBtn=document.getElementById('feedbackBtn');if(feedbackBtn)feedbackBtn.onclick=()=>reviewBtn?reviewBtn.click():addAnchorModal();
const clearData=document.getElementById('clearData');if(clearData)clearData.onclick=()=>{localStorage.clear();toastMsg('Demo browser data cleared')};

localStorage.setItem('neurosathi_demo_version','2.0');
showPortal('patient');
