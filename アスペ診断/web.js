// ─── DATA ──────────────────────────────────────────────
const doctors = [
  {id:0,role:'院長',name:'阿部 ゴキブリ 巧真',reading:'あべ ごきぶり たくま',specialty:'ADHD・不安障害・アルツハイマー・ダウン症',days:['月','火','水','金'],comment:'「一回トイレ行くだよ。」',img:'images/Gokiburi.PNG',career:['カンブリア紀 昆虫大学医学部医学科 卒業','紀元前5000年 ホモサピエンス大学附属病院 精神科 研修医','紀元前300年 国立精神・神経医療研究センター 勤務','250年 都内銀の皿精神科クリニック 副院長','2018年 チーム障害者メンタルクリニック 開院・院長就任'],message:'精神科医として1億5000万年のキャリアを通じ、いつの時代でも、こころの病気が誰にでも起こりうることを実感してきました。患者さまが安心して相談できるクリニックを作りたいという思いから開院しました。どうぞお気軽にご来院ください。'},
  {id:1,role:'副院長',name:'ガン ピン 国家',reading:'がん ぴん こっか',specialty:'発達特性外来・ADHD・ASD',days:['月','木','土'],comment:'「できないものはできない、ないものはない！いい加減にしてくれ。」',img:'images/Pinkun.PNG',career:['2020年 東京国際大学言語コミュニケーション学部 中退','2023年 羽田空港付属病院 精神神経科 書類落ち','2024年 大宮区立ピンサロ医療研究センター 児童精神科','2025年 久喜発達障害専門クリニック 勤務','2026年 チーム障害者メンタルクリニック 副院長就任'],message:'ヨーホー!発達障害の診断・支援を専門とし、子ども〜30代までのお姉さんのみ診療してるってば。てかさ、診断はゴールではなくスタートなんさ。韓国のお姉さんにいじめられたい。あぁ、やばい…気絶…しそう…'},
  {id:2,role:'医師',name:'内田 留',reading:'うちだ りゅう',specialty:'学習障害・パニック障害・ADHD',days:['火','水','金'],comment:'「一緒にストリップチャットで白い噴火しましょう。」',img:'images/Uchida.PNG',career:['2000年 国立埼玉病院 誕生','2016年 流通経済大学 普通科 見学','2017年 国立埼玉病院 入院','2019年 チーム障害者メンタルクリニック 入職'],message:'当たり前じゃないからな、この状況。診察中も踊ることはやめられませんが、患者さまのペースに合わせた丁寧な治療を心がけています。'},
  {id:3,role:'医師',name:'桑代 たけし',reading:'くわしろ たけし',specialty:'うつ症状・ストレス障害',days:['月','水','土'],comment:'「戦時中の日本兵に同じこと言えんの？」',img:'images/Takeshi.PNG',career:['2022年 東京国際大学 中退','3019年 スカイネット大学病院 精神科 勤務','3024年 US NAVY 精神科病院 医員','2021年 チーム障害者メンタルクリニック 入職'],message:'屋根があるとこで生活できて、温かい飯と、柔らかい枕があるだけで幸せだと思えよ。甘えすぎ、戦場で真っ先に死ぬタイプ。どうぞ、Go fuck yourself'},
  {id:4,role:'医師',name:'高木 ジョセフ まさと',reading:'たかぎ じょせふ まさと',specialty:'ASD・ADHD・思春期精神医学',days:['火','木','土'],comment:'「テストステロン低くね？」',img:'images/Takagi.PNG',career:['2023年 東京国際大学経済学部 卒業','2024年 エニタイム大学医学部附属病院 精神科','2024年 発達障害研究機関へ留学（米国ロサンゼルス）','2025年 帰国・都内クリニック勤務','2026年 チーム障害者メンタルクリニック 入職'],message:'おまえらテストステロン低すぎてゲイに見えるから、病むんだよ。もっと筋トレした方がいいよ。あと格闘技もやった方が病気全部治ると思う。'},
  {id:5,role:'医師',name:'鶴間 ライアン 空生',reading:'つるま らいあん そうい',specialty:'トラウマ治療・PTSD',days:['月','木','金'],comment:'「５分でいいから一回電話しよう。」',img:'images/Tsuruma.PNG',career:['2018年 西武台高校ラグビー部 卒業','2023年 秋津療育園 十度心身障害者施設 研修','2023年 リハビリデイサービスNAGOMI 退職','2024年 秋津療育園 入園','2025年 チーム障害者メンタルクリニック 入職'],message:'重度心身障害者のうんこ掃除がトラウマですので、排泄してしまう方の診療はご遠慮ください。排泄物を触れたり、投げたりしてしまう方は、どうぞくたばってください。'},
  {id:6,role:'医師',name:'有川 たくま',reading:'ありかわ たくま',specialty:'依存症・ストレス関連障害',days:['火','水','土'],comment:'「We are Japanese Band!」',img:'images/Arikawa.PNG',career:['2023年 エニタイム大学医学部 卒業','2024年 乞食病院 精神科・神経科 研修','2025年 Jellow Glow専門医療機関 勤務','2026年 都内クリニック 渋谷区内多動性障害専門外来担当','2024年 チーム障害者メンタルクリニック 入職'],message:'これからは僕たち障害者が最前列に立ち、声を上げて、この世界とこの時代を変えていく。そこにはモラルやルールなんてありません。ピカチュウの服を着てもよし、コンドームの場所を店員に聞くもよしです。この世を変えられるのは我々障害者だけです！毎週日曜日６時〜来院お待ちしてます！'}
];

const faqData = [
  {q:'初診の流れを教えてください',a:'まずはお電話またはウェブフォームからご予約ください。来院時に保険証をお持ちいただき、問診票にご記入いただきます。医師が丁寧に診察（約30分）し、今後の治療方針をご説明します。'},
  {q:'予約はどのようにすればよいですか？',a:'お電話（042-399-5678）またはこちらの予約フォームからご予約いただけます。初診の方は当日予約も可能ですが、お電話でのご確認をお勧めします。'},
  {q:'診療時間について教えてください',a:'月・火・水・金曜は10:00〜18:00、木曜は12:00〜20:00（夜間診療あり）、土曜は10:00〜14:00です。日曜・祝日は休診となります。受付は診療終了30分前までとなります。'},
  {q:'保険は使えますか？',a:'はい、健康保険（国民健康保険・社会保険）がご利用いただけます。また、自立支援医療制度（精神通院医療）の申請もサポートしております。'},
  {q:'子どもでも受診できますか？',a:'はい、中学生以上のお子さまからご受診いただけます。発達特性外来では、18歳までの方を専門的にサポートしています。小学生以下のお子さまについてはご相談ください。'},
  {q:'診察は何分くらいかかりますか？',a:'初診は問診を含めて30〜45分程度お時間をいただきます。再診は通常10〜20分程度です。状態によって前後する場合があります。'},
  {q:'薬を処方してもらえますか？',a:'診察の結果に基づき、必要と判断された場合には処方を行います。薬に不安や疑問がある場合は、遠慮なく医師にお伝えください。'},
  {q:'他院からの転院は可能ですか？',a:'はい、他の医療機関からの転院は可能です。できれば現在の主治医からの紹介状（診療情報提供書）をお持ちいただくとスムーズです。なくても初診は受け付けています。'},
  {q:'ジムはありますか？またプロテインは飲めますか？',a:'院内アイアンパラダイスと連携しており、巨大ジムが無料で利用し放題となっております。また、プロテインサーバーをご用意しておりますので、飲み放題となっております。'},
  {q:'医者は健常者ですか？',a:'いいえ、全員が障害者の世界では有名なスーパーエリート、いわゆる障害者界のアベンジャーズのメンバーです。'},
  {q:'ゴキブリとは虫のことですか？',a:'いいえ、院長の名前です。'}

];

// ─── PAGES ───────────────────────────────────────────
const allPages = ['home','clinic','doctors','appointment','access','faq'];
function showPage(id) {
  allPages.forEach(p => { const el = document.getElementById('page-'+p); if(el) el.classList.remove('active'); });
  const target = document.getElementById('page-'+id);
  if(target){ target.classList.add('active'); window.scrollTo(0,0); }
  document.querySelectorAll('.nav-link').forEach(a => a.classList.toggle('active', a.dataset.page===id));
  closeMenu();
  if(id==='doctors') renderDoctors();
  if(id==='appointment') buildCalendar();
  if(id==='faq') renderFaq();
  renderFooters();
  setTimeout(revealAll, 110);
}

// ─── HAMBURGER ───────────────────────────────────────
const menuBtn = document.getElementById('menuBtn');
const navDrawer = document.getElementById('navDrawer');
menuBtn.addEventListener('click', ()=>{ menuBtn.classList.toggle('open'); navDrawer.classList.toggle('open'); });
function closeMenu(){ menuBtn.classList.remove('open'); navDrawer.classList.remove('open'); }
document.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', e=>e.preventDefault()));

// ─── FOOTER ──────────────────────────────────────────
function footerHTML(){
  return `<footer style="background:#1e2d3d;color:white;padding:32px 20px 20px;">
    <div style="font-family:'Noto Serif JP',serif;font-size:16px;font-weight:600;margin-bottom:18px;">チーム障害者メンタルクリニック</div>
    <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px;">
      <div style="display:flex;gap:10px;font-size:12px;color:rgba(255,255,255,.72);"><span>📍</span><span>〒189-0001 東京都東村山市青葉町3-31-1</span></div>
      <div style="display:flex;gap:10px;font-size:12px;color:rgba(255,255,255,.72);"><span>📞</span><a href="tel:0423995678" style="color:rgba(255,255,255,.85);">042-399-5678</a></div>
    </div>
    <div style="background:rgba(255,255,255,.07);border-radius:10px;padding:14px;margin-bottom:20px;font-size:12px;color:rgba(255,255,255,.72);line-height:1.9;">
      <strong style="display:block;color:white;margin-bottom:6px;">診療時間</strong>
      月・火・水・金：10:00〜18:00<br>木曜日：12:00〜20:00<br>土曜日：10:00〜14:00<br>日曜・祝日：休診
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:8px 20px;margin-bottom:20px;">
      <a href="#" onclick="showPage('home')" style="font-size:12px;color:rgba(255,255,255,.65);">ホーム</a>
      <a href="#" onclick="showPage('clinic')" style="font-size:12px;color:rgba(255,255,255,.65);">クリニック紹介</a>
      <a href="#" onclick="showPage('doctors')" style="font-size:12px;color:rgba(255,255,255,.65);">医師紹介</a>
      <a href="#" onclick="showPage('appointment')" style="font-size:12px;color:rgba(255,255,255,.65);">ご予約</a>
      <a href="#" onclick="showPage('access')" style="font-size:12px;color:rgba(255,255,255,.65);">アクセス</a>
      <a href="#" onclick="showPage('faq')" style="font-size:12px;color:rgba(255,255,255,.65);">よくある質問</a>
    </div>
    <div style="border-top:1px solid rgba(255,255,255,.1);padding-top:14px;font-size:11px;color:rgba(255,255,255,.35);text-align:center;">
      © 2024 チーム障害者メンタルクリニック. All Rights Reserved.
    </div>
  </footer>`;
}
function renderFooters(){
  allPages.forEach(k => { const el=document.getElementById('footer-'+k); if(el) el.innerHTML=footerHTML(); });
}

// ─── MINI AVATARS ─────────────────────────────────────
function renderMiniAvatars(){
  const wrap = document.getElementById('miniAvatars');
  if(!wrap) return;

  wrap.innerHTML = doctors.map(d => `
    <div class="mini-av">
      <img src="${d.img}" class="mini-avatar-img">
    </div>
  `).join('');
}

// ─── DOCTORS LIST ─────────────────────────────────────
function renderDoctors(){
  const list = document.getElementById('doctorsList');
  if(!list) return;
  list.innerHTML = doctors.map((d,i)=>`
    <div class="doctor-card ${i%2===0?'reveal-left':'reveal-right'}" style="transition-delay:${i*0.07}s" onclick="openModal(${d.id})">
      <div class="doctor-photo">
  <img src="${d.img}" class="doctor-img">
</div>
      <div class="doctor-info">
        <span class="doctor-role">${d.role}</span>
        <div class="doctor-name">${d.name}</div>
        <div class="doctor-reading">${d.reading}</div>
        <div class="doctor-specialty">🏥 ${d.specialty}</div>
        <div class="doctor-days">📅 ${d.days.join('・')}曜</div>
        <div class="doctor-comment">${d.comment}</div>
      </div>
      <div class="doctor-arrow">›</div>
    </div>`).join('');
  setTimeout(revealAll, 60);
}

// ─── MODAL ────────────────────────────────────────────
function openModal(id){
  const d = doctors[id];
  const allDays = ['月','火','水','木','金','土','日'];
  const tags = allDays.map(day=>`<span class="day-tag ${d.days.includes(day)?'':'off'}">${day}</span>`).join('');
  const career = d.career.map(c=>`<li>${c}</li>`).join('');
  document.getElementById('modalContent').innerHTML = `
    <div class="modal-hero-banner">
      <div class="modal-photo">
  <img src="${d.img}" alt="${d.name}">
</div>
      <div>
        <span class="modal-role-tag">${d.role}</span>
        <div class="modal-name">${d.name}</div>
        <div class="modal-reading">${d.reading}</div>
      </div>
    </div>
    <div class="modal-body">
      <div class="modal-comment-box">${d.comment}</div>
      <div class="modal-sec"><div class="modal-sec-title">🏥 専門分野</div><p>${d.specialty}</p></div>
      <div class="modal-sec"><div class="modal-sec-title">📅 勤務曜日</div><div class="days-grid">${tags}</div></div>
      <div class="modal-sec"><div class="modal-sec-title">📋 経歴</div><ul>${career}</ul></div>
      <div class="modal-sec"><div class="modal-sec-title">💬 プロフィール</div><p>${d.message}</p></div>
      <button class="modal-appt-btn" onclick="closeModal();showPage('appointment')">この医師に予約する →</button>
    </div>`;
  document.getElementById('doctorModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  document.getElementById('doctorModal').classList.remove('open');
  document.body.style.overflow = '';
}
function bgClose(e){ if(e.target===document.getElementById('doctorModal')) closeModal(); }

// ─── APPOINTMENT ──────────────────────────────────────
function switchTab(tab, el){
  document.querySelectorAll('.appt-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.appt-panel').forEach(p=>p.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('appt-'+tab).classList.add('active');
  if(tab==='cal') buildCalendar();
}
function submitForm(){
  const name = document.getElementById('f-name').value;
  const tel = document.getElementById('f-tel').value;
  const date = document.getElementById('f-date').value;
  if(!name||!tel||!date){ alert('必須項目（お名前・電話番号・希望日）を入力してください。'); return; }
  document.getElementById('successMsg').style.display='block';
  document.getElementById('successMsg').scrollIntoView({behavior:'smooth'});
}

// ─── CALENDAR ─────────────────────────────────────────
let calYear, calMonth, selDate;
function buildCalendar(){
  const today = new Date();
  if(!calYear){ calYear=today.getFullYear(); calMonth=today.getMonth(); }
  const wrap = document.getElementById('calendarWrap');
  if(!wrap) return;
  const monthNames=['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
  const dayNames=['日','月','火','水','木','金','土'];
  const firstDay=new Date(calYear,calMonth,1).getDay();
  const dim=new Date(calYear,calMonth+1,0).getDate();
  let cells='';
  for(let i=0;i<firstDay;i++) cells+=`<div class="cal-cell empty"></div>`;
  for(let d=1;d<=dim;d++){
    const dt=new Date(calYear,calMonth,d);
    const dow=dt.getDay();
    const past=dt<new Date(today.getFullYear(),today.getMonth(),today.getDate());
    const isTdy=dt.toDateString()===today.toDateString();
    const isSun=dow===0;
    const isSat=dow===6;
    const dis=past||isSun;
    const ds=`${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    let cls='cal-cell';
    if(dis) cls+=' disabled'; if(isTdy) cls+=' today';
    if(selDate===ds) cls+=' selected'; if(isSun) cls+=' sunday';
    if(isSat&&!dis) cls+=' saturday';
    cells+=`<div class="${cls}" ${dis?'':` onclick="pickDate('${ds}')"`}>${d}</div>`;
  }
  const info=selDate?`<strong>${selDate.replace(/-/g,'/')} を選択中</strong><br>お電話（042-399-5678）でご予約を確定してください。`:'希望日をタップして選択してください';
  wrap.innerHTML=`
    <div class="cal-header"><button class="cal-nav" onclick="calMove(-1)">‹</button><h3>${calYear}年 ${monthNames[calMonth]}</h3><button class="cal-nav" onclick="calMove(1)">›</button></div>
    <div class="cal-days-hdr">${dayNames.map(l=>`<div class="cal-day-lbl" style="${l==='日'?'color:#e05':l==='土'?'color:var(--blue)':''}">${l}</div>`).join('')}</div>
    <div class="cal-grid">${cells}</div>
    <div class="cal-sel-info">${info}</div>`;
}
function calMove(dir){ calMonth+=dir; if(calMonth<0){calMonth=11;calYear--;} if(calMonth>11){calMonth=0;calYear++;} buildCalendar(); }
function pickDate(d){ selDate=d; buildCalendar(); }

// ─── FAQ ──────────────────────────────────────────────
function renderFaq(){
  const list=document.getElementById('faqList');
  if(!list||list.children.length>0) return;
  list.innerHTML=faqData.map((f,i)=>`
    <div class="faq-item reveal" style="transition-delay:${i*0.06}s" onclick="this.classList.toggle('open')">
      <div class="faq-q">
        <div class="faq-q-text"><span class="faq-q-badge">Q</span><span class="faq-q-title">${f.q}</span></div>
        <span class="faq-arrow">▾</span>
      </div>
      <div class="faq-a"><div class="faq-a-inner">${f.a}</div></div>
    </div>`).join('');
  setTimeout(revealAll,50);
}

// ─── SCROLL REVEAL ────────────────────────────────────
function revealAll(){
  const trigger=window.innerHeight*0.93;
  document.querySelectorAll('.page.active .reveal,.page.active .reveal-left,.page.active .reveal-right').forEach(el=>{
    if(el.getBoundingClientRect().top<trigger) el.classList.add('visible');
  });
}
window.addEventListener('scroll',revealAll,{passive:true});

// ─── PARALLAX ─────────────────────────────────────────
window.addEventListener('scroll',()=>{
  const h=document.querySelector('.hero-parallax');
  if(h) h.style.transform=`translateY(${window.scrollY*.22}px)`;
},{passive:true});

// ─── INIT ─────────────────────────────────────────────
renderFooters();
renderMiniAvatars();
setTimeout(revealAll,200);
const fd=document.getElementById('f-date');
if(fd){ const t=new Date(); t.setDate(t.getDate()+1); fd.min=t.toISOString().split('T')[0]; }