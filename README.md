# NeuroSathi

**AI-assisted cognitive gaming and memory assistance platform for elderly people and caregivers in the North Eastern Region (NER).**

> **Core idea: From Life Memories to Personalized Cognitive Tasks.**

NeuroSathi keeps the patient experience intentionally simple while giving the caregiver a detailed workspace for memories, routines, activity analysis, personal trends and contextual alerts.

## Product flow

`NeuroSathi welcome → Choose Patient / Caregiver → focused portal`

### Patient Portal

The patient sees only four simple destinations:

1. **Home** — Good morning greeting, three automatically scrolling daily cards, today's tasks, weather and progress.
2. **Games** — Personalized games generated from caregiver-approved memories.
3. **Memories** — Storybook/reel-like memory cards, photos, voice narration, add-memory camera/upload flow and **My Story** daily voice/text journal.
4. **My Day** — Caregiver-created routines, medicines, hydration, walks and other time-based reminders.

### Caregiver Portal

1. **Dashboard** — caregiver/patient relationship, sessions, completion rate, average duration, pending tasks and notifications.
2. **Contextual Change Map** — performance is interpreted against the patient's own recent baseline with familiarity, evidence quality and repeated-deviation context.
3. **Patient** — profile, age, region, language, voice instructions, large text, contrast, reading ability and blue-light preferences.
4. **Activities** — date, game, domain, accuracy, level, duration and status.
5. **Memories** — add family, places, objects, routines, hobbies, music, occupations and events with photo/video/voice/story context.
6. **Reminders** — prescription upload/selection plus typed medicine, hydration and routine instructions.
7. **Trends & Alerts** — memory, attention, recognition, sequencing, pattern and engagement compared with the patient's own recent baseline.
8. **Settings** — caregiver account, relationship, notifications, privacy and logout.

## Personalized memory-to-game engine

Every approved memory can immediately produce a matching activity template:

| Caregiver memory | Generated activity |
|---|---|
| Family member + photo | **Identify the Person** / name recognition |
| Family member + relationship | **Who Is This?** / relationship recall |
| Place + photo | **Where Is This?** / place recall |
| Object + photo | **My Familiar Object** / object recognition |
| Routine | **My Routine** / sequencing |
| Event + photo/story | **Memory Refinding** / autobiographical recall |
| Hobby | **My Favourite Activity** / association |
| Music/voice cue | **Memory Song Cue** |
| Occupation | **My Work Story** |

The source memory remains visible in the caregiver view so the personalization is explainable.

## My Story

The patient can type or speak about the day. NeuroSathi asks gentle follow-up questions such as what happened, who they met and what made them happy. The conversation is stored as a daily journal entry that can be surfaced to the caregiver.

## Contextual Change Map

The prototype does **not** treat one bad score as a diagnosis. It checks:

- familiarity of the task
- evidence quality
- repeated deviation
- recent personal baseline
- caregiver context notes

This produces a caregiver review prompt rather than a clinical diagnosis.

## NER language layer

The caregiver profile includes seven regional language options for the Seven Sister states: Assamese, Nyishi, Meitei, Khasi, Mizo, Nagamese and Kokborok. Actual speech recognition/TTS availability depends on browser and language support; the prototype should not be presented as clinically validated multilingual speech recognition.

## Current prototype technology

- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage for demo persistence
- Web Speech API where supported
- Explainable rule-based personalization

### Important AI boundary

The current browser prototype uses deterministic, explainable personalization logic. It is **not a trained ML model**, does not diagnose dementia, does not predict disease progression and does not replace medical care. A future validated ML layer should only be added after ethically collected longitudinal data and appropriate clinical/privacy validation.

## Demo-ready flow

1. Open NeuroSathi.
2. Enter the app.
3. Choose **Caregiver Portal**.
4. Open **Memories**.
5. Add a family member/photo/story.
6. Show the instantly generated **Identify the Person** game.
7. Switch to **Patient Portal**.
8. Show the clean Good Morning home screen and auto-scrolling cards.
9. Open **Games** and play the generated activity.
10. Open **Memories** → storybook → voice narration → My Story.
11. Open **My Day** to show caregiver-created routines.
12. Return to caregiver **Contextual Change Map** and **Trends & Alerts**.

## Responsible use

NeuroSathi is a cognitive engagement and caregiver-support prototype. Activity scores are intended to help caregivers observe patterns and context; they are not diagnostic measurements.