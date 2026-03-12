/**
 * result.js
 * =========
 * Handles all scoring, classification, gap analysis, reliability display,
 * and HTML result page construction.
 *
 * Public entry point:
 *   buildResults(selfAnswers, otherAnswers, overallReliabilityScore, selfRel, otherRel)
 *
 * Called by script.js when both phases are complete.
 */

// ─────────────────────────────────────────────────────────────────────────────
// SCORING
// ─────────────────────────────────────────────────────────────────────────────

function calculateCategoryScores(answers) {
  const scores = {};
  Object.keys(CATEGORIES).forEach(cat => (scores[cat] = 0));

  QUESTIONS.forEach(q => {
    const v = answers[q.id];
    if (v !== undefined) {
      scores[q.category] = (scores[q.category] || 0) + v * q.weight;
    }
  });

  return scores;
}

function classify(score, catKey) {
  const t = CATEGORIES[catKey].thresholds;
  if (score >= t.High[0])     return "High";
  if (score >= t.Moderate[0]) return "Moderate";
  return "Low";
}

// ─────────────────────────────────────────────────────────────────────────────
// GAP ANALYSIS
// ─────────────────────────────────────────────────────────────────────────────

function analyseGap(selfScore, otherScore, catKey) {
  const max    = CATEGORIES[catKey].maxScore;
  const diff   = otherScore - selfScore;
  const absPct = Math.abs(diff) / max;

  if (absPct < 0.20) return { significant: false, direction: "aligned" };
  return {
    significant: true,
    direction: diff > 0 ? "other-higher" : "self-higher",
    diffPct: Math.round(absPct * 100)
  };
}

const LEVEL_LABELS = {
  Low: "低",
  Moderate: "中",
  High: "高"
};

// ─────────────────────────────────────────────────────────────────────────────
// HTML BUILDERS
// ─────────────────────────────────────────────────────────────────────────────

function levelClass(level) {
  return { Low: "lv-low", Moderate: "lv-moderate", High: "lv-high" }[level] || "";
}

function reliabilityClass(cat) {
  return { High: "rel-high", Medium: "rel-medium", Low: "rel-low" }[cat] || "";
}

function buildCard(catKey, selfScore, otherScore) {
  const meta       = CATEGORIES[catKey];
  const selfLevel  = classify(selfScore, catKey);
  const otherLevel = classify(otherScore, catKey);
  const gap        = analyseGap(selfScore, otherScore, catKey);

  const selfPct  = Math.round((selfScore  / meta.maxScore) * 100);
  const otherPct = Math.round((otherScore / meta.maxScore) * 100);

  const levelOrder = ["Low", "Moderate", "High"];
  const dominantLevel = levelOrder[
    Math.max(levelOrder.indexOf(selfLevel), levelOrder.indexOf(otherLevel))
  ];

  let gapHTML = "";
  if (gap.significant) {
    const msg = gap.direction === "other-higher"
      ? "自分ではあまり気づいていないみたいだけど、あなたは特性持ちです。この分野において、健常者ではありません。"
      : "自分ではすごく気にしてるみたいだけど、正常です。この分野においては健常者です。";
    gapHTML = `
      <div class="gap-alert">
        <span class="gap-icon">👁</span>
        <span>${msg} <em>(${gap.diffPct}% difference)</em></span>
      </div>`;
  }

  return `
  <div class="result-card">
    <div class="rc-header">
      <span class="rc-icon">${meta.icon}</span>
      <div class="rc-title-wrap">
        <h3 class="rc-name">${meta.label}</h3>
        <p class="rc-desc">${meta.description}</p>
      </div>
      <span class="level-badge ${levelClass(dominantLevel)}">${LEVEL_LABELS[dominantLevel]}</span>
    </div>

    <div class="score-rows">
      <div class="score-row">
        <span class="sr-label">自己評価</span>
        <div class="sr-track">
          <div class="sr-fill self-fill" style="width:${selfPct}%"></div>
        </div>
        <span class="sr-num">${selfScore}<span class="sr-max">/${meta.maxScore}</span></span>
        <span class="sr-tag ${levelClass(selfLevel)}">${LEVEL_LABELS[selfLevel]}</span>
      </div>
      <div class="score-row">
        <span class="sr-label">他者評価</span>
        <div class="sr-track">
          <div class="sr-fill other-fill" style="width:${otherPct}%"></div>
        </div>
        <span class="sr-num">${otherScore}<span class="sr-max">/${meta.maxScore}</span></span>
        <span class="sr-tag ${levelClass(otherLevel)}">${LEVEL_LABELS[otherLevel]}</span>
      </div>
    </div>

    <p class="rc-interpretation">${meta.interpretation[dominantLevel]}</p>
    ${gapHTML}
  </div>`;
}

function buildSummary(selfScores, otherScores) {
  const highAreas = [];
  let   gapCount  = 0;

  Object.keys(CATEGORIES).forEach(cat => {
    const sl = classify(selfScores[cat],  cat);
    const ol = classify(otherScores[cat], cat);
    if (sl === "High" || ol === "High") highAreas.push(CATEGORIES[cat].label);
    if (analyseGap(selfScores[cat], otherScores[cat], cat).significant) gapCount++;
  });

  const highText = highAreas.length === 0
    ? "高いスコアの領域はありませんでした。"
    : highAreas.length === 1
      ? `1つの領域で高いスコアが見られました： <strong>${highAreas[0]}</strong>。`
      : `高いスコアの領域が <strong>${highAreas.length}件</strong> ありました：${highAreas.map(a => `<strong>${a}</strong>`).join("、")}。`;

  const gapText = gapCount > 0
    ? `自己評価と他者評価の間に <strong>${gapCount}件</strong> の認識差が見られました。`
    : `すべての領域で自己評価と他者評価はおおむね一致していました。`;

  return `
  <div class="summary-panel">
    <div class="sp-row">${highText}</div>
    <div class="sp-row sp-gap">${gapText}</div>
  </div>`;
}

function buildReliabilityPanel(selfRel, otherRel, overallScore) {
  let overallCat = "Low";
  if (overallScore >= RELIABILITY_CONFIG.thresholds.High)        overallCat = "High";
  else if (overallScore >= RELIABILITY_CONFIG.thresholds.Medium) overallCat = "Medium";

  const relLabels = { High: "高い信頼性", Medium: "中程度の信頼性", Low: "低度の信頼性" };
  const relDescs  = {
    High:   "回答は一貫しており、丁寧に回答された可能性が高いです。結果は実際の傾向を比較的よく反映していると考えられます。",
    Medium: "いくつかの回答パターンにばらつきが見られます。結果は参考程度として解釈してください。",
    Low:    "回答に大きな矛盾や偏りが検出されました。結果が実際の傾向を正確に反映していない可能性があります。慎重に回答して再度受けることをおすすめします。"
  };

  const buildFlagList = (flags) => flags.length > 0
    ? `<ul class="flag-list">${flags.map(f => `<li>${f}</li>`).join("")}</ul>`
    : `<p class="no-flags">問題は検出されませんでした。</p>`;

  return `
  <div class="reliability-panel">
    <div class="rel-header">
      <span class="rel-icon">🔎</span>
      <div>
        <h3 class="rel-title">回答の信頼性</h3>
        <p class="rel-subtitle">回答の一貫性や信頼性を評価します。</p>
      </div>
      <span class="rel-badge ${reliabilityClass(overallCat)}">${relLabels[overallCat]}</span>
    </div>
    <p class="rel-desc">${relDescs[overallCat]}</p>

    <div class="rel-scores">
      <div class="rel-score-block">
        <span class="rel-score-label">自己回答</span>
        <div class="rel-score-bar-wrap">
          <div class="rel-score-bar ${reliabilityClass(selfRel.category)}" style="width:${selfRel.score}%"></div>
        </div>
        <span class="rel-score-num">${selfRel.score}/100</span>
        <span class="rel-score-tag ${reliabilityClass(selfRel.category)}">${selfRel.category}</span>
      </div>
      <div class="rel-score-block">
        <span class="rel-score-label">他者回答</span>
        <div class="rel-score-bar-wrap">
          <div class="rel-score-bar ${reliabilityClass(otherRel.category)}" style="width:${otherRel.score}%"></div>
        </div>
        <span class="rel-score-num">${otherRel.score}/100</span>
        <span class="rel-score-tag ${reliabilityClass(otherRel.category)}">${otherRel.category}</span>
      </div>
    </div>

    ${selfRel.flags.length > 0 || otherRel.flags.length > 0 ? `
    <div class="rel-flags">
      <p class="rel-flags-title">検出された問題</p>
      <div class="rel-flags-cols">
        <div>
          <p class="rel-phase-label">自己回答</p>
          ${buildFlagList(selfRel.flags)}
        </div>
        <div>
          <p class="rel-phase-label">他者回答</p>
          ${buildFlagList(otherRel.flags)}
        </div>
      </div>
    </div>` : ""}
  </div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN ENTRY POINT
// ─────────────────────────────────────────────────────────────────────────────

function buildResults(selfAnswers, otherAnswers, overallReliability, selfRel, otherRel) {
  const selfScores  = calculateCategoryScores(selfAnswers);
  const otherScores = calculateCategoryScores(otherAnswers);

  const summaryHTML     = buildSummary(selfScores, otherScores);
  const reliabilityHTML = buildReliabilityPanel(selfRel, otherRel, overallReliability);
  const cardsHTML       = Object.keys(CATEGORIES)
    .map(cat => buildCard(cat, selfScores[cat], otherScores[cat]))
    .join("\n");

  const container = document.getElementById("results-content");
  if (container) {
    container.innerHTML = summaryHTML + reliabilityHTML + cardsHTML;
  }
}