/**
 * script.js
 * =========
 * Main application controller for the Self & Other Evaluation Tool.
 *
 * Manages:
 *   - Phase flow: start → self → transition → other → results
 *   - Building the merged question sequence (main + reliability questions)
 *   - Rendering questions one at a time
 *   - Storing answers for both phases
 *   - Response reliability tracking:
 *       • Attention check
 *       • Idealization detection
 *       • Contradiction detection
 *       • Extreme answer pattern detection
 *       • Response time tracking
 *   - Exit modal: early exit to results or home from any question phase
 *   - Triggering result calculation (result.js)
 */

// ─────────────────────────────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────────────────────────────

let currentPhase  = "start";   // "start" | "self" | "transition" | "other" | "results"
let currentIndex  = 0;          // Index into questionSequence[]
let selfAnswers   = {};          // { questionId: value (1-5) }
let otherAnswers  = {};          // { questionId: value (1-5) }
let phaseStart    = 0;           // Timestamp (ms) when current phase began — for timing

// The merged sequence of question objects shown to the user.
// Built once by buildQuestionSequence().
let questionSequence = [];

// ─────────────────────────────────────────────────────────────────────────────
// BUILD QUESTION SEQUENCE
// ─────────────────────────────────────────────────────────────────────────────

function buildQuestionSequence() {
  const main = [...QUESTIONS];

  const contraQ  = RELIABILITY_QUESTIONS.contradictionPositive;
  const idealQs  = RELIABILITY_QUESTIONS.idealization;
  const attnQ    = RELIABILITY_QUESTIONS.attention;

  let seq = [];

  main.forEach((q, i) => {
    seq.push(q);

    if (i === 5)  seq.push(contraQ);
    if (i === 12) seq.push(idealQs[0]);
    if (i === 22) seq.push(idealQs[1]);
    if (i === 33) seq.push(idealQs[2]);
    if (i === 43) seq.push(idealQs[3]);
    if (i === 14) seq.push(attnQ);
  });

  return seq;
}

// ─────────────────────────────────────────────────────────────────────────────
// DOM HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function showScreen(id) {
  const ids = ["screen-start", "screen-question", "screen-transition", "screen-results"];
  ids.forEach(sid => {
    const el = document.getElementById(sid);
    if (el) el.classList.toggle("active", sid === id);
  });
}

function updateProgressBar(current, total) {
  const pct  = total > 0 ? Math.round((current / total) * 100) : 0;
  const fill = document.getElementById("progress-fill");
  const txt  = document.getElementById("progress-text");
  if (fill) fill.style.width = pct + "%";
  if (txt)  txt.textContent  = `${current} / ${total}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE: START
// ─────────────────────────────────────────────────────────────────────────────

function startSelfEvaluation() {
  questionSequence = buildQuestionSequence();
  currentPhase     = "self";
  currentIndex     = 0;
  selfAnswers      = {};
  phaseStart       = Date.now();

  renderQuestion();
  showScreen("screen-question");
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE: QUESTION RENDERING
// ─────────────────────────────────────────────────────────────────────────────

function renderQuestion() {
  const q      = questionSequence[currentIndex];
  const total  = questionSequence.length;
  const isSelf = currentPhase === "self";

  // Phase label
  const phaseLabel = document.getElementById("phase-label");
  if (phaseLabel) phaseLabel.textContent = isSelf ? "自己評価" : "他者評価";

  // Category badge
  const badge = document.getElementById("category-badge");
  if (badge) {
    if (q.category === "RELIABILITY") {
      badge.textContent = "⚙ 回答チェック";
      badge.dataset.cat = "RELIABILITY";
    } else {
      const meta = CATEGORIES[q.category];
      badge.textContent = meta ? `${meta.icon} ${meta.label}` : q.category;
      badge.dataset.cat = q.category;
    }
  }

  // Question text with fade animation
  const qText = document.getElementById("question-text");
  if (qText) {
    qText.classList.remove("fade-in");
    void qText.offsetWidth;
    qText.textContent = isSelf ? q.selfText : q.otherText;
    qText.classList.add("fade-in");
  }

  // Progress
  updateProgressBar(currentIndex + 1, total);

  // Highlight previously selected answer
  const answers = isSelf ? selfAnswers : otherAnswers;
  const saved   = answers[q.id];
  document.querySelectorAll(".answer-btn").forEach(btn => {
    btn.classList.toggle("selected", parseInt(btn.dataset.value) === saved);
  });

  // Back button visibility
  const backBtn = document.getElementById("back-btn");
  if (backBtn) backBtn.style.visibility = currentIndex > 0 ? "visible" : "hidden";
}

// ─────────────────────────────────────────────────────────────────────────────
// ANSWER SELECTION
// ─────────────────────────────────────────────────────────────────────────────

function selectAnswer(value) {
  const q       = questionSequence[currentIndex];
  const answers = currentPhase === "self" ? selfAnswers : otherAnswers;

  answers[q.id] = value;

  document.querySelectorAll(".answer-btn").forEach(btn => {
    btn.classList.toggle("selected", parseInt(btn.dataset.value) === value);
  });

  setTimeout(advanceQuestion, 340);
}

function advanceQuestion() {
  currentIndex++;

  if (currentIndex < questionSequence.length) {
    renderQuestion();
  } else {
    if (currentPhase === "self") {
      endSelfPhase();
    } else {
      endOtherPhase();
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// BACK BUTTON
// ─────────────────────────────────────────────────────────────────────────────

function goBack() {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE: TRANSITION (self → other)
// ─────────────────────────────────────────────────────────────────────────────

function endSelfPhase() {
  currentPhase = "transition";
  showScreen("screen-transition");
}

function startOtherEvaluation() {
  currentPhase = "other";
  currentIndex = 0;
  otherAnswers = {};
  phaseStart   = Date.now();

  renderQuestion();
  showScreen("screen-question");
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE: RESULTS
// ─────────────────────────────────────────────────────────────────────────────

function endOtherPhase() {
  const elapsedSeconds = Math.round((Date.now() - phaseStart) / 1000);

  currentPhase = "results";

  const selfReliability  = calculateReliability(selfAnswers,  "self",  selfElapsed);
  const otherReliability = calculateReliability(otherAnswers, "other", elapsedSeconds);
  const overallReliability = Math.min(selfReliability.score, otherReliability.score);

  buildResults(selfAnswers, otherAnswers, overallReliability, selfReliability, otherReliability);
  showScreen("screen-results");
}

// ─────────────────────────────────────────────────────────────────────────────
// RELIABILITY CALCULATION
// ─────────────────────────────────────────────────────────────────────────────

let selfElapsed = 0;

/**
 * Calculate a reliability score for one set of answers.
 */
function calculateReliability(answers, phase, seconds) {
  let score  = RELIABILITY_CONFIG.startScore;
  const flags = [];

  // 1. ATTENTION CHECK
  const attnQ   = RELIABILITY_QUESTIONS.attention;
  const attnAns = answers[attnQ.id];
  if (attnAns !== undefined && attnAns !== attnQ.correctValue) {
    score += RELIABILITY_CONFIG.penalties.failedAttentionCheck;
    flags.push("注意チェックに失敗しました");
  }

  // 2. IDEALIZATION DETECTION
  RELIABILITY_QUESTIONS.idealization.forEach(iq => {
    const ans = answers[iq.id];
    if (ans !== undefined && ans >= iq.flagThreshold) {
      score += RELIABILITY_CONFIG.penalties.idealizationFlag;
      flags.push(`Idealized response on: "${iq.selfText.substring(0, 40)}…"`);
    }
  });

  // 3. CONTRADICTION DETECTION
  const cPos = RELIABILITY_QUESTIONS.contradictionPositive;
  const cNeg = QUESTIONS.find(q => q.id === cPos.pairsWith);
  if (cPos && cNeg) {
    const posAns = answers[cPos.id];
    const negAns = answers[cNeg.id];
    if (
      posAns !== undefined && negAns !== undefined &&
      posAns >= cPos.contradictionThreshold &&
      negAns >= cPos.contradictionThreshold
    ) {
      score += RELIABILITY_CONFIG.penalties.contradictionDetected;
      flags.push("回答に矛盾がある。嘘をつくな (集中 vs. 注意散漫)");
    }
  }

  // 4. EXTREME ANSWER PATTERN
  const mainAnswerValues = QUESTIONS.map(q => answers[q.id]).filter(v => v !== undefined);
  if (mainAnswerValues.length > 0) {
    const extremeCount = mainAnswerValues.filter(v => v === 1 || v === 5).length;
    const extremeRatio = extremeCount / mainAnswerValues.length;
    if (extremeRatio >= RELIABILITY_CONFIG.extremePatternRatio) {
      score += RELIABILITY_CONFIG.penalties.extremeAnswerPattern;
      flags.push(`極端な回答パターンが検出されました (${Math.round(extremeRatio * 100)}%)`);
    }
  }

  // 5. VERY FAST COMPLETION
  if (seconds > 0 && seconds < RELIABILITY_CONFIG.minRealisticSeconds) {
    score += RELIABILITY_CONFIG.penalties.veryFastCompletion;
    flags.push(`ちゃんと読んでから回答してくれ (${seconds}s)`);
  }

  score = Math.max(0, Math.min(100, score));

  let category = "低";
  if (score >= RELIABILITY_CONFIG.thresholds.High)        category = "高";
  else if (score >= RELIABILITY_CONFIG.thresholds.Medium) category = "中";

  return { score, category, flags };
}

// ─────────────────────────────────────────────────────────────────────────────
// EXIT MODAL
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Show the exit confirmation modal.
 * Available during both self and other evaluation phases.
 */
function showExitModal() {
  const overlay = document.getElementById("exit-modal-overlay");
  if (overlay) overlay.classList.add("active");
}

/**
 * Close the modal and resume evaluation.
 */
function closeExitModal() {
  const overlay = document.getElementById("exit-modal-overlay");
  if (overlay) overlay.classList.remove("active");
}

/**
 * Close modal if the dark overlay (not the card) is tapped.
 */
function handleOverlayClick(event) {
  if (event.target === document.getElementById("exit-modal-overlay")) {
    closeExitModal();
  }
}

/**
 * Exit to results using whatever answers have been collected so far.
 * If we're still in the self phase, otherAnswers will be empty ({}).
 */
function exitToResults() {
  closeExitModal();

  // Capture elapsed time for whichever phase we're in
  const elapsedNow = Math.round((Date.now() - phaseStart) / 1000);

  if (currentPhase === "self") {
    // Record self elapsed before we leave
    selfElapsed = elapsedNow;
    // otherAnswers remains {} — reliability will score it with zero answers
    currentPhase = "results";

    const selfReliability  = calculateReliability(selfAnswers,  "self",  selfElapsed);
    const otherReliability = calculateReliability(otherAnswers, "other", 0);
    const overallReliability = Math.min(selfReliability.score, otherReliability.score);

    buildResults(selfAnswers, otherAnswers, overallReliability, selfReliability, otherReliability);
  } else if (currentPhase === "other") {
    // Use already-stored selfElapsed; elapsed for other is elapsedNow
    currentPhase = "results";

    const selfReliability  = calculateReliability(selfAnswers,  "self",  selfElapsed);
    const otherReliability = calculateReliability(otherAnswers, "other", elapsedNow);
    const overallReliability = Math.min(selfReliability.score, otherReliability.score);

    buildResults(selfAnswers, otherAnswers, overallReliability, selfReliability, otherReliability);
  }

  showScreen("screen-results");
}

/**
 * Exit to home — clear all state and return to start screen.
 */
function exitToHome() {
  closeExitModal();
  restartApp();
}

// ─────────────────────────────────────────────────────────────────────────────
// EARLY FINISH (existing button kept for compatibility)
// ─────────────────────────────────────────────────────────────────────────────

function finishSelfEarly() {
  if (currentPhase !== "self") return;
  selfElapsed = Math.round((Date.now() - phaseStart) / 1000);
  endSelfPhase();
}

// ─────────────────────────────────────────────────────────────────────────────
// RESTART
// ─────────────────────────────────────────────────────────────────────────────

function restartApp() {
  currentPhase     = "start";
  currentIndex     = 0;
  selfAnswers      = {};
  otherAnswers     = {};
  selfElapsed      = 0;
  phaseStart       = 0;
  questionSequence = [];
  const rc = document.getElementById("results-content");
  if (rc) rc.innerHTML = "";
  showScreen("screen-start");
}

// ─────────────────────────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  showScreen("screen-start");
});

function finishSelfOnly(){

  // 自己評価の経過時間を記録
  selfElapsed = Math.round((Date.now() - phaseStart) / 1000);

  currentPhase = "results";

  const selfReliability  = calculateReliability(selfAnswers, "self", selfElapsed);
  const otherReliability = calculateReliability({}, "other", 0);

  const overallReliability = selfReliability.score;

  buildResults(selfAnswers, {}, overallReliability, selfReliability, otherReliability);

  showScreen("screen-results");
}
