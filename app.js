const patientPortal=document.getElementById('patientPortal');
const caregiverPortal=document.getElementById('caregiverPortal');
const portalButtons=[...document.querySelectorAll('.portal-btn')];
const modal=document.getElementById('modal');
const modalContent=document.getElementById('modalContent');
const toast=document.getElementById('toast');

/* ---------------------------------------------------------
   NeuroSathi opening flow: homepage -> portal selection -> app
   --------------------------------------------------------- */
function createOpeningFlow(){
  if(document.getElementById('neuroBoot'))return;
  const boot=document.createElement('div');
  boot.id='neuroBoot';
  boot.className='neuro-boot';
  boot.innerHTML=`
    <div class="boot-card" id="bootWelcome">
      <div class="boot-mark">N</div>
      <p class="eyebrow">COGNITIVE CARE • NER</p>
      <h1>NeuroSathi</h1>
      <p>Personalized cognitive engagement and caregiver support.</p>
      <button class="primary boot-button" id="bootEnter">Enter NeuroSathi →</button>
      <small>For cognitive engagement and caregiver support. Not a diagnostic system.</small>
    </div>
    <div class="boot-card boot-role-card hidden" id="bootRoles">
      <div class="boot-mark">N</div>
      <p class="eyebrow">WELCOME TO NEUROSATHI</p>
      <h1>Choose your portal</h1>
      <p>Select the experience you need.</p>
      <div class="boot-role-grid">
        <button class="boot-role" data-boot-role="patient"><span>🙂</span><div><b>Patient Portal</b><small>Activities, memories, My Day & help</small></div><i>→</i></button>
        <button class="boot-role" data-boot-role="caregiver"><span>🤝</span><div><b>Caregiver Portal</b><small>Patient profile, memories, monitoring & insights</small></div><i>→</i></button>
      </div>
      <small>Demo profile: Asha Sharma • Local browser prototype</small>
    </div>`;
  document.body.prepend(boot);
  document.getElementById('bootEnter').onclick=()=>{
    document.getElementById('bootWelcome').classList.add('hidden');
    document.getElementById('bootRoles').classList.remove('hidden');
  };
  boot.querySelectorAll('[data-boot-role]').forEach(btn=>btn.onclick=()=>{
    showPortal(btn.dataset.bootRole);
    boot.classList.add('boot-exit');
    setTimeout(()=>boot.remove(),260);
  });
}

function showPortal(role){
  const patient=role==='patient';
  patientPortal.classList.toggle('active-portal',patient);
  caregiverPortal.classList.toggle('active-portal',!patient);
  portalButtons.forEach(b=>b.classList.toggle('active',b.dataset.portal===role));
  const target=patient?'patientHome':'caregiverHome';
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active-view'));
  const targetEl=document.getElementById(target); if(targetEl)targetEl.classList.add('active-view');
  document.querySelectorAll('.nav').forEach(n=>n.classList.remove('active'));
  const first=document.querySelector(`.nav[data-view="${target}"]`); if(first)first.classList.add('active');
  const roleText=document.querySelector('.role-label');
  document.body.dataset.portal=role;
  window.scrollTo({top:0,behavior:'smooth'});
}
portalButtons.forEach(b=>b.addEventListener('click',()=>showPortal(b.dataset.portal)));

function showView(id){
  const target=document.getElementById(id); if(!target)return;
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active-view',v===target));
  document.querySelectorAll('.nav').forEach(n=>n.classList.toggle('active',n.dataset.view===id));
  window.scrollTo({top:document.querySelector('.content-grid').offsetTop-90,behavior:'smooth'});
}
document.querySelectorAll('[data-view]').forEach(n=>n.addEventListener('click',()=>showView(n.dataset.view)));

/* ---------------------------------------------------------
   Profile + voice
   --------------------------------------------------------- */
const profileBtn=document.getElementById('profileBtn');
if(profileBtn)profileBtn.onclick=()=>openModal('<p class="eyebrow">DEMO PROFILE</p><h3>Asha Sharma</h3><p>Retired teacher • Guwahati. This demo profile shows how personal memory anchors can support familiar activities and caregiver review.</p><div class="demo-options"><button class="demo-option">10 personal memory anchors loaded</button><button class="demo-option">Personal baseline established</button><button class="demo-option">Caregiver feedback enabled</button></div>');
const voiceBtn=document.getElementById('voiceBtn');
if(voiceBtn)voiceBtn.onclick=()=>speak('Welcome to NeuroSathi. Your portal and activities are personalized around familiar routines.');
const speakTest=document.getElementById('speakTest'); if(speakTest)speakTest.onclick=()=>speak('This is a browser voice assistance test for NeuroSathi.');
const patientSpeak=document.getElementById('patientSpeak'); if(patientSpeak)patientSpeak.onclick=()=>speak('You can choose Memory Match, Sequence My Day, Pattern Match, or Object Recall. Ask your caregiver for help if needed.');
function speak(text){
  if(!('speechSynthesis' in window)){toastMsg('Voice is not supported by this browser.');return;}
  speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.rate=.92;speechSynthesis.speak(u);toastMsg('Voice assistance started');
}

/* ---------------------------------------------------------
   Modal helpers
   --------------------------------------------------------- */
function openModal(html){modalContent.innerHTML=html;modal.classList.add('open')}
if(document.getElementById('closeModal'))document.getElementById('closeModal').onclick=()=>modal.classList.remove('open');
modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});
function toastMsg(text){toast.textContent=text;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2400)}

/* ---------------------------------------------------------
   Original activity interactions preserved
   --------------------------------------------------------- */
function activityModal(game,anchor='Garden'){
  openModal(`<p class="eyebrow">PATIENT ACTIVITY</p><h3>${game}</h3><p>This activity uses an approved personal memory anchor: <b>${anchor}</b>. The prototype records the response pattern and can adapt the next task.</p><div class="demo-options"><button class="demo-option" onclick="toastMsg('Correct response recorded');document.getElementById('closeModal').click()">✓ Familiar item — ${anchor}</button><button class="demo-option" onclick="toastMsg('Response pattern recorded');document.getElementById('closeModal').click()">✓ Familiar item — Morning tea</button><button class="demo-option" onclick="toastMsg('Hint used — context recorded');document.getElementById('closeModal').click()">? Need a hint</button></div>`);
}
document.querySelectorAll('.play').forEach(btn=>btn.onclick=()=>activityModal(btn.dataset.game));

/* ---------------------------------------------------------
   Contextual Change Map review
   --------------------------------------------------------- */
const reviewBtn=document.getElementById('reviewBtn');
if(reviewBtn)reviewBtn.onclick=()=>openModal('<p class="eyebrow">CAREGIVER CHECK</p><h3>Before treating this as a change</h3><p>Was there a temporary context factor today? For example: fatigue, unfamiliar language, hearing difficulty, distraction, medication timing, illness or a change in routine.</p><div class="demo-options"><button class="demo-option" onclick="toastMsg(\'Context: tired today — signal softened\');document.getElementById(\'closeModal\').click()">Yes — temporary fatigue</button><button class="demo-option" onclick="toastMsg(\'No context found — observation retained\');document.getElementById(\'closeModal\').click()">No — no context found</button><button class="demo-option" onclick="toastMsg(\'Context note saved\');document.getElementById(\'closeModal\').click()">Add another note</button></div>');

/* ---------------------------------------------------------
   Personal Memory Builder + Personalized Activity Engine
   This is an explainable prototype engine, not a trained ML model.
   --------------------------------------------------------- */
const defaultMemories=[
  {type:'Family',title:'Riya',detail:'Granddaughter • family',icon:'👧'},
  {type:'Place',title:'Dispur School',detail:'School where Asha taught',icon:'📍'},
  {type:'Routine',title:'Morning tea',detail:'Tea → newspaper → garden',icon:'☕'},
  {type:'Hobby',title:'Tea garden',detail:'Favourite garden walk',icon:'🌱'},
  {type:'Music',title:'Favourite old song',detail:'Familiar melody cue',icon:'🎵'},
  {type:'Occupation',title:'Teaching',detail:'Retired teacher',icon:'👩‍🏫'}
];
let memories=JSON.parse(localStorage.getItem('neurosathi_memories')||'null')||defaultMemories;

function saveMemories(){localStorage.setItem('neurosathi_memories',JSON.stringify(memories));}

function memoryCard(m){
  return `<div class="memory-anchor-card"><span>${m.icon||'🧠'}</span><div><b>${escapeHtml(m.title)}</b><small>${escapeHtml(m.type)} • ${escapeHtml(m.detail)}</small></div></div>`;
}
function escapeHtml(v){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}

function renderMemoryBuilder(){
  const grid=document.getElementById('dynamicMemoryGrid');
  if(grid)grid.innerHTML=memories.map(memoryCard).join('');
  const count=document.getElementById('memoryCount');
  if(count)count.textContent=`${memories.length} anchors`;
  renderGeneratedGames();
}

function generatedGameForMemory(m,index){
  const templates={
    Family:['Who Is Who?','Match family members with familiar stories.','recognition'],
    Place:['Familiar Places','Match places with the memories connected to them.','place recall'],
    Routine:['My Routine','Put familiar daily events in the correct order.','sequencing'],
    Hobby:['Familiar Hobby Match','Identify objects and activities linked to a favourite hobby.','recognition'],
    Music:['Memory Cue Match','Use a familiar song cue to recall its associated memory.','association'],
    Occupation:['My Work Story','Match familiar work objects with the right story.','semantic recall'],
    Event:['Memory Story Match','Connect a meaningful event to its people and place.','association'],
    Object:['Everyday Object Recall','Recognise an object from a familiar routine.','object recall']
  };
  const t=templates[m.type]||templates.Object;
  return {title:t[0],description:`Built from “${m.title}” — ${m.detail}.`,target:t[2],anchor:m,index};
}

function generatedGames(){
  return memories.slice(0,8).map((m,i)=>generatedGameForMemory(m,i));
}

function gameCard(g,caregiver=false){
  return `<article class="game-card generated-game ${caregiver?'care-generated':''}">
    <div class="game-icon">${g.anchor.icon||'🧩'}</div>
    <span class="activity-type">AI-PERSONALIZED • ${escapeHtml(g.target.toUpperCase())}</span>
    <h3>${escapeHtml(g.title)}</h3>
    <p>${escapeHtml(g.description)}</p>
    <small class="source-anchor">Source memory: ${escapeHtml(g.anchor.title)}</small>
    ${caregiver?'<div class="generated-status">✓ Generated from approved memory</div>':'<button class="primary generated-play">Play</button>'}
  </article>`;
}

function renderGeneratedGames(){
  const games=generatedGames();
  const care=document.getElementById('generatedCareGames');
  if(care)care.innerHTML=games.map(g=>gameCard(g,true)).join('');
  const patient=document.getElementById('generatedPatientGames');
  if(patient)patient.innerHTML=games.map(g=>gameCard(g,false)).join('');
  document.querySelectorAll('.generated-play').forEach(btn=>{
    btn.onclick=()=>{
      const card=btn.closest('.generated-game');
      const title=card.querySelector('h3').textContent;
      const source=card.querySelector('.source-anchor').textContent.replace('Source memory: ','');
      activityModal(title,source);
    };
  });
}

function openMemoryForm(){
  openModal(`<p class="eyebrow">CAREGIVER MEMORY PAGE</p><h3>Add a familiar memory</h3><p>Add information that is meaningful and caregiver-approved. The prototype immediately uses the new anchor to create a personalized activity.</p>
    <div class="memory-form">
      <label>Memory type<select id="memoryType"><option>Family</option><option>Place</option><option>Routine</option><option>Hobby</option><option>Music</option><option>Occupation</option><option>Event</option><option>Object</option></select></label>
      <label>Name / title<input id="memoryTitle" placeholder="e.g. Riya's birthday" /></label>
      <label>What makes it familiar?<textarea id="memoryDetail" placeholder="e.g. Family celebration every year"></textarea></label>
      <button class="primary" id="saveMemory">Save memory & generate activity →</button>
    </div>`);
  document.getElementById('saveMemory').onclick=()=>{
    const type=document.getElementById('memoryType').value;
    const title=document.getElementById('memoryTitle').value.trim();
    const detail=document.getElementById('memoryDetail').value.trim()||'Caregiver-approved familiar context';
    if(!title){toastMsg('Please add a memory title');return;}
    const icons={Family:'👨‍👩‍👧',Place:'📍',Routine:'☀',Hobby:'🌱',Music:'🎵',Occupation:'👩‍🏫',Event:'🎉',Object:'🔎'};
    memories.push({type,title,detail,icon:icons[type]||'🧠'});
    saveMemories();renderMemoryBuilder();
    modal.classList.remove('open');
    showView('caregiverMemories');
    toastMsg(`Memory added — new ${type.toLowerCase()} activity generated`);
  };
}

function addMemoryExperience(){
  const existing=document.getElementById('caregiverMemories');
  if(existing)return;
  const portal=caregiverPortal;
  const workspace=portal.querySelector('.workspace');
  const view=document.createElement('div');
  view.id='caregiverMemories';view.className='view';
  view.innerHTML=`<div class="section-head"><div><p class="eyebrow">PERSONAL MEMORY FINGERPRINT</p><h2>Memory & Context Builder</h2><p>Add the person's familiar people, places, routines, hobbies, songs, work and meaningful events.</p></div><button class="primary small" id="dynamicAddMemory">+ Add memory</button></div>
    <article class="memory-builder panel"><div class="builder-copy"><span class="builder-icon">🧠</span><div><h3>Life memories → Personal Cognitive Fingerprint → Personalized games</h3><p>NeuroSathi collects caregiver-approved memory anchors and converts them into context for activity generation. The prototype uses transparent rules so the source memory is always visible.</p></div><span class="chip safe" id="memoryCount">6 anchors</span></div><div class="anchor-grid dynamic-anchor-grid" id="dynamicMemoryGrid"></div></article>
    <article class="panel generator-panel"><div class="panel-title"><span>Personalized Activity Engine</span><span class="chip safe">Working</span></div><div class="generator-flow"><span>Approved memories</span><i>→</i><span>Personal Cognitive Fingerprint</span><i>→</i><span>Game template</span><i>→</i><strong>Personalized game</strong></div><p class="engine-note">Example: adding “Riya — granddaughter” creates a family-recognition activity; adding “Morning tea → newspaper → garden” creates a sequencing activity.</p><button class="primary" id="dynamicGenerate">Generate new games from all memories →</button></article>
    <article class="panel"><div class="panel-title"><span>Generated games</span><span class="muted">Source memory is shown for explainability</span></div><div id="generatedCareGames" class="activity-grid"></div></article>`;
  workspace.appendChild(view);
  const nav=portal.querySelector('.sidebar');
  const button=document.createElement('button');button.className='nav';button.dataset.view='caregiverMemories';button.innerHTML='♡ <span>Memory Anchors</span>';nav.appendChild(button);button.onclick=()=>showView('caregiverMemories');
  document.getElementById('dynamicAddMemory').onclick=openMemoryForm;
  document.getElementById('dynamicGenerate').onclick=()=>{renderGeneratedGames();toastMsg(`${memories.length} memories analysed — personalized games refreshed`)};
  renderMemoryBuilder();
}

/* Existing add-anchor buttons are retained, but the main caregiver memory page is now richer. */
function addAnchorModal(){openMemoryForm();}
const addAnchor=document.getElementById('addAnchor');if(addAnchor)addAnchor.onclick=addAnchorModal;
const memoryBtn=document.getElementById('memoryBtn');if(memoryBtn)memoryBtn.onclick=addAnchorModal;
const feedbackBtn=document.getElementById('feedbackBtn');if(feedbackBtn)feedbackBtn.onclick=()=>reviewBtn?reviewBtn.click():addAnchorModal();
const clearData=document.getElementById('clearData');if(clearData)clearData.onclick=()=>{localStorage.clear();memories=[...defaultMemories];renderMemoryBuilder();toastMsg('Demo browser data cleared')};

/* Add dynamic caregiver memory page and personalized patient games without removing existing UI. */
addMemoryExperience();
const patientActivities=document.getElementById('patientActivities');
if(patientActivities){
  const generatedSection=document.createElement('section');generatedSection.className='generated-section';generatedSection.innerHTML=`<div class="activity-section-label">GENERATED FROM YOUR MEMORIES</div><div id="generatedPatientGames" class="activity-grid"></div><div class="patient-note">These are personalized from caregiver-approved memory anchors. This prototype uses explainable rules; it is not a trained clinical AI model.</div>`;
  patientActivities.appendChild(generatedSection);
}

localStorage.setItem('neurosathi_demo_version','3.0');
createOpeningFlow();
showPortal('patient');
