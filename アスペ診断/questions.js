/**
 * questions.js
 * ============
 * All question data for the Self & Other Evaluation Tool.
 *
 * Each main question has:
 *   id        — unique identifier
 *   selfText  — shown to person answering about themselves
 *   otherText — shown to close person answering about the subject
 *   category  — ADHD | ASD | LD | BCF | DEP | LIFE
 *   weight    — scoring multiplier (default 1)
 *   type      — "normal" (most) | "contradiction_negative" (high score = problem)
 *   pairId    — (optional) links to a contradiction_positive question
 */

// ─────────────────────────────────────────────────────────────────────────────
// MAIN QUESTIONS  (50 total)
// ─────────────────────────────────────────────────────────────────────────────

const QUESTIONS = [

  // ── ADHD (10) ─────────────────────────────────────────────────────────────
  {
    id:"adhd_1",
    selfText:"私はよく予定や大事な用事を忘れる。",
    otherText:"この人はよく予定や大事な用事を忘れる。",
    category:"ADHD",weight:1,type:"normal"
  },
  {
    id:"adhd_2",
    selfText:"物事を始めても途中で終わらせずに放置してしまうことが多い。",
    otherText:"この人は物事を始めても途中で終わらせずに放置してしまうことが多い。",
    category:"ADHD",weight:1,type:"normal"
  },
  {
    id:"adhd_3",
    selfText:"仕事や勉強中に気が散りやすい。",
    otherText:"この人は仕事や勉強中に気が散りやすい。",
    category:"ADHD",weight:1,type:"normal",
    pairId:"contra_adhd_focus"
  },
  {
    id:"adhd_4",
    selfText:"鍵やスマートフォンなどをよく無くす。",
    otherText:"この人は鍵やスマートフォンなどをよく無くす。",
    category:"ADHD",weight:1,type:"normal"
  },
  {
    id:"adhd_5",
    selfText:"会話中に相手の話をさえぎってしまうことがある。",
    otherText:"この人は会話中に相手の話をさえぎることがある。",
    category:"ADHD",weight:1,type:"normal"
  },
  {
    id:"adhd_6",
    selfText:"長時間じっと座っていなければならないと落ち着かなくなる。",
    otherText:"この人は長時間じっと座っていなければならないと落ち着かない様子がある。",
    category:"ADHD",weight:1,type:"normal"
  },
  {
    id:"adhd_7",
    selfText:"予定やタスクを整理するのが苦手だ。",
    otherText:"この人は予定やタスクを整理するのが苦手だ。",
    category:"ADHD",weight:1,type:"normal"
  },
  {
    id:"adhd_8",
    selfText:"重要なことでも先延ばしにしてしまう。",
    otherText:"この人は重要なことでも先延ばしにしてしまう。",
    category:"ADHD",weight:1,type:"normal"
  },
  {
    id:"adhd_9",
    selfText:"前の作業を終える前に別の作業に移ってしまう。",
    otherText:"この人は前の作業を終える前に別の作業に移ることが多い。",
    category:"ADHD",weight:1,type:"normal"
  },
  {
    id:"adhd_10",
    selfText:"作業にどれくらい時間がかかるか見積もるのが苦手だ。",
    otherText:"この人は作業時間を見積もるのが苦手だ。",
    category:"ADHD",weight:1,type:"normal"
  },

  // ── ASD (10) ─────────────────────────────────────────────────────────────
  {
    id:"asd_1",
    selfText:"人の空気や雰囲気を読み取るのが難しいと感じる。",
    otherText:"この人は空気や雰囲気を読み取るのが難しいように見える。",
    category:"ASD",weight:1,type:"normal"
  },
  {
    id:"asd_2",
    selfText:"表情や声のトーンから感情を読み取るのが苦手だ。",
    otherText:"この人は表情や声のトーンから感情を読み取るのが苦手だ。",
    category:"ASD",weight:1,type:"normal"
  },
  {
    id:"asd_3",
    selfText:"決まったルーティンが好きで、予定が変わると不安になる。",
    otherText:"この人はルーティンを好み、予定変更で不安になることがある。",
    category:"ASD",weight:1,type:"normal"
  },
  {
    id:"asd_4",
    selfText:"特定の分野に強い興味を持つことがある。",
    otherText:"この人は特定の分野に強い興味を持つことがある。",
    category:"ASD",weight:1,type:"normal"
  },
  {
    id:"asd_5",
    selfText:"場にそぐわない発言をしてしまうことがある。",
    otherText:"この人は場にそぐわない発言をしてしまうことがある。",
    category:"ASD",weight:1,type:"normal"
  },
  {
    id:"asd_6",
    selfText:"雑談が苦手だ。",
    otherText:"この人は雑談が苦手な様子がある。",
    category:"ASD",weight:1,type:"normal"
  },
  {
    id:"asd_7",
    selfText:"人と過ごすより一人でいる方が楽だと感じる。",
    otherText:"この人は人と過ごすより一人でいる方を好む。",
    category:"ASD",weight:1,type:"normal"
  },
  {
    id:"asd_8",
    selfText:"細かい部分に強く集中することがある。",
    otherText:"この人は細かい部分に強く集中することがある。",
    category:"ASD",weight:1,type:"normal"
  },
  {
    id:"asd_9",
    selfText:"騒がしい場所や人混みで疲れやすい。",
    otherText:"この人は騒がしい場所や人混みで疲れやすい。",
    category:"ASD",weight:1,type:"normal"
  },
  {
    id:"asd_10",
    selfText:"同じ習慣や行動を繰り返すことがある。",
    otherText:"この人は同じ習慣や行動を繰り返すことがある。",
    category:"ASD",weight:1,type:"normal"
  },

  // ── LD (8) ────────────────────────────────────────────────────────────────
  {
    id: "ld_1",
    selfText:  "私は書かれた指示を理解するのが難しいことがある。",
    otherText: "この人は書かれた指示を理解するのが難しいことがある。",
    category: "LD", weight: 1, type: "normal"
  },
  {
    id: "ld_2",
    selfText:  "読んでいるときに文字や単語を読み間違えることがある。",
    otherText: "この人は読んでいるときに文字や単語を読み間違えることがある。",
    category: "LD", weight: 1, type: "normal"
  },
  {
    id: "ld_3",
    selfText:  "スペルや文字を書くことが苦手だ。",
    otherText: "この人はスペルや文字を書くことが苦手なようだ。",
    category: "LD", weight: 1, type: "normal"
  },
  {
    id: "ld_4",
    selfText:  "文章で書かれた指示に従うのが難しい。",
    otherText: "この人は文章で書かれた指示に従うのが難しい。",
    category: "LD", weight: 1, type: "normal"
  },
  {
    id: "ld_5",
    selfText:  "計算や数学の問題が苦手だ。",
    otherText: "この人は計算や数学の問題が苦手なようだ。",
    category: "LD", weight: 1, type: "normal"
  },
  {
    id: "ld_6",
    selfText:  "読書中にどこを読んでいたか分からなくなることがある。",
    otherText: "この人は読書中にどこを読んでいたか分からなくなることがある。",
    category: "LD", weight: 1, type: "normal"
  },
  {
    id: "ld_7",
    selfText:  "文章で自分の考えをうまく表現するのが難しい。",
    otherText: "この人は文章で自分の考えをうまく表現するのが難しい。",
    category: "LD", weight: 1, type: "normal"
  },
  {
    id: "ld_8",
    selfText:  "学習内容を理解するのに他の人より時間がかかる。",
    otherText: "この人は学習内容を理解するのに他の人より時間がかかるようだ。",
    category: "LD", weight: 1, type: "normal"
  },

  // ── BCF (8) ──────────────────────────────────────────────────────────────
  {
    id: "bcf_1",
    selfText:  "複雑な説明を理解するのに時間がかかる。",
    otherText: "この人は複雑な説明を理解するのに時間がかかる。",
    category: "BCF", weight: 1, type: "normal"
  },
  {
    id: "bcf_2",
    selfText:  "複数の指示を同時に覚えるのが難しい。",
    otherText: "この人は複数の指示を同時に覚えるのが難しい。",
    category: "BCF", weight: 1, type: "normal"
  },
  {
    id: "bcf_3",
    selfText:  "抽象的な問題を理解するのが難しい。",
    otherText: "この人は抽象的な問題を理解するのが難しい。",
    category: "BCF", weight: 1, type: "normal"
  },
  {
    id: "bcf_4",
    selfText:  "新しいことを覚えるとき、他の人より時間がかかると感じる。",
    otherText: "この人は新しいことを覚えるのに他の人より時間がかかるようだ。",
    category: "BCF", weight: 1, type: "normal"
  },
  {
    id: "bcf_5",
    selfText:  "手順が多い作業では混乱することがある。",
    otherText: "この人は手順が多い作業で混乱することがある。",
    category: "BCF", weight: 1, type: "normal"
  },
  {
    id: "bcf_6",
    selfText:  "難しい文章を読むのが苦手だ。",
    otherText: "この人は難しい文章を読むのが苦手なようだ。",
    category: "BCF", weight: 1, type: "normal"
  },
  {
    id: "bcf_7",
    selfText:  "人に説明してもらうとき、簡単に言い換えてもらう必要があることが多い。",
    otherText: "この人は説明を簡単に言い換えてもらう必要があることが多い。",
    category: "BCF", weight: 1, type: "normal"
  },
  {
    id: "bcf_8",
    selfText:  "考えることが多い作業に圧倒されることがある。",
    otherText: "この人は考えることが多い作業に圧倒されることがある。",
    category: "BCF", weight: 1, type: "normal"
  },

  // ── DEP (8) ──────────────────────────────────────────────────────────────
  {
    id: "dep_1",
    selfText:  "以前楽しめていたことに対するやる気が出ない。",
    otherText: "この人は以前楽しめていたことへのやる気が低いようだ。",
    category: "DEP", weight: 1, type: "normal"
  },
  {
    id: "dep_2",
    selfText:  "休んでも疲れが取れないと感じることが多い。",
    otherText: "この人は休んでも疲れているように見えることが多い。",
    category: "DEP", weight: 1, type: "normal"
  },
  {
    id: "dep_3",
    selfText:  "長い間、気分が落ち込んでいると感じる。",
    otherText: "この人は長い間、気分が落ち込んでいるように見える。",
    category: "DEP", weight: 1, type: "normal"
  },
  {
    id: "dep_4",
    selfText:  "普段のエネルギーが低いと感じる。",
    otherText: "この人のエネルギーは普段から低いように見える。",
    category: "DEP", weight: 1, type: "normal"
  },
  {
    id: "dep_5",
    selfText:  "やる気が出ず、作業を始めるのが難しい。",
    otherText: "この人はやる気が出ず、作業を始めるのが難しいようだ。",
    category: "DEP", weight: 1, type: "normal"
  },
  {
    id: "dep_6",
    selfText:  "友人や社会活動から距離を置いてしまうことがある。",
    otherText: "この人は友人や社会活動から距離を置くことがある。",
    category: "DEP", weight: 1, type: "normal"
  },
  {
    id: "dep_7",
    selfText:  "多くの日で精神的に疲れていると感じる。",
    otherText: "この人は多くの日で精神的に疲れているように見える。",
    category: "DEP", weight: 1, type: "normal"
  },
  {
    id: "dep_8",
    selfText:  "将来に希望を持てないと感じることがある。",
    otherText: "この人は将来に希望を持てないように見える。",
    category: "DEP", weight: 1, type: "normal"
  },

  // ── LIFE (6) ─────────────────────────────────────────────────────────────
  {
    id: "life_1",
    selfText:  "普段の睡眠時間が6時間未満である。",
    otherText: "この人は普段6時間未満しか眠っていないようだ。",
    category: "LIFE", weight: 1, type: "normal"
  },
  {
    id: "life_2",
    selfText:  "スマートフォンを長時間使っている。",
    otherText: "この人はスマートフォンを長時間使っている。",
    category: "LIFE", weight: 1, type: "normal"
  },
  {
    id: "life_3",
    selfText:  "常にストレスを感じている。",
    otherText: "この人は常にストレスを感じているようだ。",
    category: "LIFE", weight: 1, type: "normal"
  },
  {
    id: "life_4",
    selfText:  "睡眠時間や寝る時間が不規則である。",
    otherText: "この人の睡眠時間は不規則なようだ。",
    category: "LIFE", weight: 1, type: "normal"
  },
  {
    id: "life_5",
    selfText:  "情報が多すぎて頭が疲れていると感じる。",
    otherText: "この人は情報過多で精神的に疲れているようだ。",
    category: "LIFE", weight: 1, type: "normal"
  },
  {
    id: "life_6",
    selfText:  "寝るべき時間でも夜更かししてしまう。",
    otherText: "この人は寝るべき時間でも夜更かしすることが多い。",
    category: "LIFE", weight: 1, type: "normal"
  }

];

// ─────────────────────────────────────────────────────────────────────────────
// RELIABILITY QUESTIONS
// ─────────────────────────────────────────────────────────────────────────────

const RELIABILITY_QUESTIONS = {

  attention: {
    id: "attn_1",
    selfText:  "適当に連打してないか確認です。この質問では（2）を選択してください。",
    otherText: "適当に連打してないか確認です。この質問では（2）を選択してください。",
    category: "RELIABILITY",
    type: "attention",
    correctValue: 2
  },

  idealization: [
    {
      id: "ideal_1",
      selfText:  "私は人生で一度もミスをしたことがないと思う",
      otherText: "この人は人生で一度もミスをしたことがないと思う",
      category: "RELIABILITY", type: "idealization", flagThreshold: 4
    },
    {
      id: "ideal_2",
      selfText:  "私は常にすべての作業を完璧にこなしてると感じる",
      otherText: "この人は常にすべての作業を完璧にこなせていると感じる",
      category: "RELIABILITY", type: "idealization", flagThreshold: 4
    },
    {
      id: "ideal_3",
      selfText:  "私は物事を忘れたことが一度もない。",
      otherText: "この人は物事を忘れたことが一度もない。",
      category: "RELIABILITY", type: "idealization", flagThreshold: 4
    },
    {
      id: "ideal_4",
      selfText:  "私は常に完璧に整理整頓されている。",
      otherText: "この人は常に完璧に整理整頓されている。",
      category: "RELIABILITY", type: "idealization", flagThreshold: 4
    }
  ],

  contradictionPositive: {
    id: "contra_adhd_focus",
    selfText:  "私は作業中に簡単に集中できる。",
    otherText: "この人は作業中に簡単に集中できる。",
    category: "RELIABILITY",
    type: "contradiction_positive",
    pairsWith: "adhd_3",
    contradictionThreshold: 4
  }

};

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY METADATA
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = {

  ADHD: {
    label: "ADHD傾向",
    icon: "⚡",
    questionCount: 10,
    maxScore: 50,
    thresholds: { Low: [0, 20], Moderate: [21, 35], High: [36, 50] },
    description: "注意力・衝動性・整理能力などに関する傾向。",
    interpretation: {
      Low: "ADHD傾向はほとんど見られません。",
      Moderate: "いくつかのADHD傾向が見られます。",
      High: "ADHD傾向が強く見られます。日常生活に影響している可能性があります。"
    }
  },

  ASD: {
    label: "ASD傾向",
    icon: "🧩",
    questionCount: 10,
    maxScore: 50,
    thresholds: { Low: [0, 20], Moderate: [21, 35], High: [36, 50] },
    description: "社会的コミュニケーションや感覚過敏などに関する傾向。",
    interpretation: {
      Low: "ASD傾向はほとんど見られません。",
      Moderate: "いくつかの自閉スペクトラム傾向が見られます。",
      High: "ASD関連の特徴が強く見られます。"
    }
  },

  LD: {
    label: "学習困難傾向",
    icon: "📖",
    questionCount: 8,
    maxScore: 40,
    thresholds: { Low: [0, 16], Moderate: [17, 28], High: [29, 40] },
    description: "読み書きや学習処理に関する傾向。",
    interpretation: {
      Low: "学習困難の兆候はほとんどありません。",
      Moderate: "学習に関する困難がやや見られます。",
      High: "学習困難の特徴が強く見られます。"
    }
  },

  BCF: {
    label: "境界知能指標",
    icon: "🧠",
    questionCount: 8,
    maxScore: 40,
    thresholds: { Low: [0, 16], Moderate: [17, 28], High: [29, 40] },
    description: "思考処理や複雑なタスク処理能力の傾向。",
    interpretation: {
      Low: "この領域の問題はほとんど見られません。",
      Moderate: "少し支援があると役立つ可能性があります。",
      High: "この領域で困難が見られる可能性があります。"
    }
  },

  DEP: {
    label: "抑うつ傾向",
    icon: "🌧",
    questionCount: 8,
    maxScore: 40,
    thresholds: { Low: [0, 16], Moderate: [17, 28], High: [29, 40] },
    description: "気分・意欲・エネルギーに関する傾向。",
    interpretation: {
      Low: "抑うつ傾向はほとんど見られません。",
      Moderate: "抑うつ傾向が少し見られます。",
      High: "抑うつ傾向が強く見られます。"
    }
  },

  LIFE: {
    label: "生活習慣影響",
    icon: "🌿",
    questionCount: 6,
    maxScore: 30,
    thresholds: { Low: [0, 12], Moderate: [13, 21], High: [22, 30] },
    description: "睡眠・ストレス・生活習慣の影響。",
    interpretation: {
      Low: "生活習慣は比較的安定しています。",
      Moderate: "生活習慣が影響している可能性があります。",
      High: "生活習慣が大きく影響している可能性があります。"
    }
  }

};

// ─────────────────────────────────────────────────────────────────────────────
// RELIABILITY SYSTEM CONFIG
// ─────────────────────────────────────────────────────────────────────────────

const RELIABILITY_CONFIG = {
  startScore: 100,
  penalties: {
    failedAttentionCheck:   -25,
    idealizationFlag:       -10,
    contradictionDetected:  -20,
    extremeAnswerPattern:   -15,
    veryFastCompletion:     -20
  },
  thresholds: {
    High:   75,
    Medium: 50
  },
  extremePatternRatio: 0.80,
  minRealisticSeconds: 90
};