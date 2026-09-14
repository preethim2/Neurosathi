# NeuroSathi

**Personalized cognitive engagement and contextual caregiver support for elderly people living with dementia.**

NeuroSathi is a lightweight prototype designed for the North Eastern Region (NER). Instead of treating every user as a generic test profile, it builds a **Personal Cognitive Fingerprint** from caregiver-approved familiar memories, routines, people, places and interests. Activities can then be personalized around that context.

## Two-portal experience

NeuroSathi now separates the experience into two clear portals so each user sees only the information relevant to their role.

### Patient Portal — simple and activity-focused
- **Home:** today's progress, next recommended activity and quick actions
- **My Activities:** Memory Match, Sequence My Day, Pattern Match and Object Recall
- **My Memories:** familiar people, places, routines, songs and events
- **My Day:** simple routine and activity reminders
- **Help:** voice-assisted guidance and caregiver support

### Caregiver Portal — monitoring and context-focused
- **Dashboard:** patient overview, activity performance and review prompts
- **Contextual Change Map:** baseline, context checks and repeated-deviation signals
- **Activity Monitoring:** recent scores, error patterns and activity context
- **Patient Profile:** Personal Cognitive Fingerprint and personal domains
- **Memory Anchors:** review/add caregiver-approved familiar context
- **Settings:** privacy, context feedback, voice and clinical boundary

This separation keeps the patient interface calm and simple while giving caregivers the monitoring and explainability tools they need.

## What makes the prototype different

### 1. Personal Cognitive Fingerprint
The system represents the person's familiar context as a small set of memory anchors. These can include family members, familiar places, daily routines, occupation, hobbies, songs and meaningful events.

**Life memories → personal context → cognitive activities**

### 2. Contextual Change Map
A low score is not automatically treated as a concerning change. The prototype considers familiarity, language/context match, evidence quality, response pattern, repeated deviation and caregiver context notes.

A caregiver signal is intended to prompt a human context check, **not to diagnose dementia**.

### 3. Explainable personalization
The prototype can explain why an activity was selected: familiar anchors, recent error type, difficulty adjustment and context. This makes the logic inspectable rather than presenting an unexplained AI score.

## Prototype status

This is a **research/demo prototype**, not a clinical device. The current implementation uses client-side JavaScript and explainable rule/statistical logic. It does **not** claim to contain a trained machine-learning model, diagnose dementia, predict disease progression, or replace professional medical care.

The demo runs as a static GitHub Pages site. Demo profile information is illustrative and stored locally in the browser; no backend or real patient database is included.

## Core workflow

```text
Caregiver-approved memories
          ↓
Personal Cognitive Fingerprint
          ↓
Personalized activity selection
          ↓
Observe accuracy + error type + response pattern
          ↓
Context check
          ↓
Repeated familiar deviation?
       ↙           ↘
     No             Yes
     ↓               ↓
 Continue        Caregiver review
                    ↓
              Context feedback
```

## Technical architecture

- **Frontend:** HTML5, CSS3, vanilla JavaScript
- **State:** browser LocalStorage for prototype/demo state
- **Voice:** Web Speech API where supported by the browser
- **Personalization:** deterministic, explainable client-side logic in the prototype
- **Deployment:** static hosting / GitHub Pages
- **Future ML layer:** once ethically collected longitudinal data and validation are available, a supervised/anomaly-detection layer can be evaluated against the rule-based baseline.

## Prototype modules

- Patient Portal
- Caregiver Portal
- Personal Cognitive Fingerprint
- Personalized patient activities
- Caregiver activity monitoring
- Contextual Change Map
- Memory anchors
- Caregiver context review
- Voice assistance demo
- Privacy and clinical-boundary settings

## Responsible-use boundary

NeuroSathi is intended for **cognitive engagement and caregiver support**. A prototype signal is an observation prompt only. Any real-world clinical interpretation must be performed by qualified healthcare professionals.

## 5-day implementation plan

**Day 1 — Discovery & co-design:** caregiver interviews, accessibility review, NER language requirements and consent/privacy requirements.

**Day 2 — Personalization foundation:** memory-anchor model, profile creation and activity templates.

**Day 3 — Contextual Change Map:** baseline logic, context overrides, repeated-deviation logic and explainable event log.

**Day 4 — Accessibility & validation:** large-touch UI, voice interaction, language testing, usability testing with caregivers/older adults where ethically approved.

**Day 5 — Evaluation & deployment:** bug fixing, evidence capture, documentation, GitHub Pages deployment and demo rehearsal.

## Judge demo

1. Open **Patient Portal** and show the simple home screen.
2. Open **My Activities** and demonstrate **Sequence My Day** or **Memory Match**.
3. Switch to **Caregiver Portal** and show the dashboard.
4. Open **Contextual Change Map**.
5. Compare an unfamiliar low score (no signal) with a repeated familiar deviation (review signal).
6. Click **Review context** and select a temporary context such as fatigue. Explain how caregiver feedback prevents an isolated observation from becoming an overconfident conclusion.
7. Open **Memory Anchors / Patient Profile** to show how the caregiver-approved personal context feeds personalization.

## Important claims discipline

The prototype deliberately avoids unsupported clinical impact claims. It demonstrates a **personalization and caregiver-support mechanism** that can be evaluated through future user studies; it is not evidence that the system slows cognitive decline.
