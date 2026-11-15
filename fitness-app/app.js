// app.js —— 视图渲染 + 状态管理 + 交互（单页 SPA，state 驱动）
'use strict';

/* ---------- 图标（Lucide 内联 SVG，离线零依赖） ---------- */
const ICONS = {
  house: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  trendDown: '<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>',
  trash: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  chevronLeft: '<path d="m15 18-6-6 6-6"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  dumbbell: '<path d="M14.4 14.4 9.6 9.6"/><path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z"/><path d="m21.5 21.5-1.4-1.4"/><path d="M3.9 3.9 2.5 2.5"/><path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z"/>',
  utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  scale: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
  activity: '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0L5.65 10.54A2 2 0 0 1 3.72 12H2"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  bowl: '<path d="M20 11a8 8 0 0 1-16 0Z"/><path d="M12 19v2"/><path d="M8 21h8"/>',
  wind: '<path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/>',
  zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  weight: '<circle cx="12" cy="5" r="3"/><path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z"/>',
  bookmark: '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93 1.41-1.41"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
};

function svg(name, cls = '') {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}

/* ---------- 常量 ---------- */
const TODAY = '2026-11-15'; // 与 mock 数据对齐的「今天」，保证仪表盘有数据
const TAB_ITEMS = [
  ['home', '首页', 'house'], ['training', '训练', 'dumbbell'],
  ['diet', '饮食', 'utensils'], ['weight', '体重', 'scale'],
];
const TAB_SUB = {
  home: '', training: '记录每一次突破', diet: '吃得清楚，练得明白', weight: '见证曲线的变化',
};
const CATEGORIES = [
  { key: 'cardio', label: '有氧', icon: 'wind', cls: 'cat-cardio' },
  { key: 'strength', label: '力量', icon: 'dumbbell', cls: 'cat-strength' },
  { key: 'functional', label: '功能性', icon: 'zap', cls: 'cat-functional' },
];
const MEALS = ['早餐', '午餐', '晚餐', '上午加餐', '下午加餐', '晚上加餐'];
// 三大总目标：指针位置 / 热量调整 / 指针颜色
const GOALS = {
  cut: { label: '减脂', sub: '热量缺口', color: '#F97316' },
  bulk: { label: '增肌', sub: '热量盈余', color: '#0EA5E9' },
  maintain: { label: '维持', sub: '热量平衡', color: '#94A3B8' },
};
// 速率预设周速率（kg/周）：减脂与增肌各自三档
const PACE = {
  cut: { slow: 0.25, mid: 0.5, fast: 0.75 },
  bulk: { slow: 0.125, mid: 0.25, fast: 0.5 },
};
const PACE_LABEL = { slow: '慢速', mid: '中速', fast: '快速' };
const WEEK_PRESETS = [8, 12, 16, 24];
const clampWeeks = (w) => Math.max(1, Math.min(52, Number(w) || 12));
// 计划总变化量（kg）= |当前体重 − 目标体重|
const planDelta = (p) => Math.max(0.5, Math.abs(latestWeight() - p.goalWeight));
// 每日缺口/盈余（kcal/日）= 总变化 × 7700 ÷ (周期 × 7)；随速率（联动周期）与周期变化
function computedAdjust(p = DB.profile) {
  if (p.goal === 'maintain') return 0;
  return Math.max(100, Math.min(1000, Math.round(planDelta(p) * 1100 / clampWeeks(p.weeks))));
}
// 带符号调整量：减脂为负（缺口）、增肌为正（盈余）、维持为 0 —— 驱动仪表盘目标指针
const signedAdjust = (p = DB.profile) => p.goal === 'cut' ? -computedAdjust(p) : p.goal === 'bulk' ? computedAdjust(p) : 0;
// 当前周期隐含的实际周速率（kg/周）
const impliedPace = (p = DB.profile) => planDelta(p) / clampWeeks(p.weeks);
function etaDate(weeks) {
  const [y, m, d] = TODAY.split('-').map(Number);
  const dt = new Date(y, m - 1, d + clampWeeks(weeks) * 7);
  return `${dt.getMonth() + 1}月${dt.getDate()}日`;
}
// 速率说明行（含安全提示）
function paceLine(p) {
  if (p.goal === 'maintain') return '维持模式：每日摄入与消耗保持平衡，无需缺口/盈余';
  const adj = computedAdjust(p), pace = impliedPace(p), weeks = clampWeeks(p.weeks);
  let note, toneCls = 'tone-good';
  if (pace > PACE[p.goal].fast + 1e-9) { note = '快于「快速」上限，注意肌肉流失与代谢适应风险'; toneCls = 'tone-bad'; }
  else if (pace < PACE[p.goal].slow - 1e-9) { note = '慢于「慢速」档，稳健但需耐心'; toneCls = 'tone-mid'; }
  else {
    const closest = Object.entries(PACE[p.goal]).reduce((a, b) => Math.abs(b[1] - pace) < Math.abs(a[1] - pace) ? b : a);
    note = `符合${PACE_LABEL[closest[0]]}档`;
  }
  return `每日${p.goal === 'cut' ? '缺口' : '盈余'} <b>${adj}</b> kcal · 周速率 ${pace.toFixed(2)} kg/周（<span class="${toneCls}">${note}</span>）· 计划总变化 ${planDelta(p).toFixed(1)} kg · 预计 ${etaDate(weeks)} 达成`;
}
const ACTIVITY_OPTIONS = [
  { v: 1.2, label: '久坐' }, { v: 1.375, label: '轻度' }, { v: 1.55, label: '中度' }, { v: 1.725, label: '高强度' },
];

const state = {
  tab: 'home',
  date: TODAY,   // 当前查看/录入的日期（首页、饮食页日期导航驱动）
  trainingFilter: '全部',
  weightRange: '30',
  sheet: null,   // 'workout' | 'meal' | 'weight' | 'goals' | 'customFood'
  form: {},
  pendingMealForm: null,
};

/* ---------- 本地持久化（模拟云端） ---------- */
const STORE_KEY = 'litecal-prototype-db-v3'; // v3：新增 customFoods（自定义食物）
function persist() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(DB)); } catch (e) {}
}
function hydrate() {
  try {
    const saved = localStorage.getItem(STORE_KEY);
    if (saved) { const d = JSON.parse(saved); Object.assign(DB, d); }
  } catch (e) {}
}

/* ---------- 工具 ---------- */
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => 'x' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const clamp01 = (v) => Math.max(0, Math.min(1, v));

function fmtDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  const wd = '周日一二三四五六'[dt.getDay()];
  if (iso === TODAY) return '今天';
  const [ty, tm, td] = TODAY.split('-').map(Number);
  const diff = Math.round((new Date(ty, tm - 1, td) - dt) / 86400000);
  if (diff === 1) return '昨天';
  return `${m}月${d}日 · 周${wd}`;
}
function fmtShort(iso) {
  const [, m, d] = iso.split('-');
  return `${Number(m)}/${Number(d)}`;
}

/* ---------- 核心计算逻辑 ---------- */
const latestWeight = () => (DB.weights.length ? DB.weights[DB.weights.length - 1].weight : DB.profile.startWeight);
// Mifflin-St Jeor 基础代谢
function bmr(p = DB.profile, wKg = latestWeight()) {
  const base = 10 * wKg + 6.25 * p.heightCm - 5 * p.age;
  return Math.round(base + (p.gender === 'male' ? 5 : -161));
}
const tdee = (p = DB.profile) => Math.round(bmr(p) * p.activity);                       // 总消耗目标
const targetIntake = (p = DB.profile) => Math.round(tdee(p) + signedAdjust(p));    // 总摄入目标 = TDEE + 带符号缺口/盈余
const todayTrainKcal = (date = state.date) => DB.workouts.filter(w => w.date === date).reduce((s, w) => s + w.kcal, 0);
const todayIntake = (date = state.date) => DB.meals.filter(m => m.date === date).reduce((s, m) => s + m.totalKcal, 0);
// 能量平衡 = 总摄入 − 总消耗（总消耗 = 基础代谢 + 当日训练消耗）；负=缺口，正=盈余
function energyToday(date = state.date) {
  const burn = bmr() + todayTrainKcal(date);
  const intake = todayIntake(date);
  return { burn, intake, balance: intake - burn };
}
// 宏量目标：蛋白按体重 × 目标系数（减脂2.0/增肌1.8/维持1.4 g/kg）；脂肪=摄入目标×25%÷9；碳水补齐剩余
function macroTargets(p = DB.profile) {
  const ti = targetIntake(p);
  const protein = Math.round(({ cut: 2.0, bulk: 1.8, maintain: 1.4 }[p.goal] || 1.4) * latestWeight());
  const fat = Math.round(ti * 0.25 / 9);
  const carbs = Math.max(0, Math.round((ti - protein * 4 - fat * 9) / 4));
  return { protein, carbs, fat };
}

function rpeBand(rpe) {
  if (rpe <= 3) return { label: '轻松', cls: 'rpe-easy' };
  if (rpe <= 6) return { label: '适中', cls: 'rpe-mid' };
  if (rpe <= 8) return { label: '吃力', cls: 'rpe-hard' };
  return { label: '极限', cls: 'rpe-max' };
}
const catMeta = (key) => CATEGORIES.find(c => c.key === key) || CATEGORIES[1];

function metFor(category, name) {
  const hit = (DB.exerciseLib[category] || []).find(e => e.name === name);
  return hit ? hit.met : { cardio: 6, strength: 5, functional: 7 }[category];
}
// 预估时长：有氧=分钟数；力量/功能性=组数×(次数×0.05+1.5) 分钟（含组间休息）
function estDuration(f) {
  const sets = Number(f.sets) || 0, reps = Number(f.reps) || 0;
  return f.category === 'cardio' ? reps : Math.round(sets * (reps * 0.05 + 1.5));
}
const estKcal = (f) => Math.round(metFor(f.category, f.name) * latestWeight() * estDuration(f) / 60);

// 目标进度：返回 {pct(0-100), text, tone: good|mid|bad}
function goalProgress(balance) {
  const g = DB.profile.goal;
  const adj = computedAdjust();
  if (g === 'cut') {
    const cur = -balance;
    if (cur >= adj) return { pct: 100, text: `缺口已达标 · 超出 ${cur - adj} kcal`, tone: 'good' };
    if (cur >= 0) return { pct: Math.round(cur / adj * 100), text: `还差 ${adj - cur} kcal 达到目标缺口`, tone: 'mid' };
    return { pct: 0, text: `今日已盈余 ${-cur} kcal，超出减脂区间`, tone: 'bad' };
  }
  if (g === 'bulk') {
    const cur = balance;
    if (cur >= adj) return { pct: 100, text: `盈余已达标 · 超出 ${cur - adj} kcal`, tone: 'good' };
    if (cur >= 0) return { pct: Math.round(cur / adj * 100), text: `还差 ${adj - cur} kcal 达到目标盈余`, tone: 'mid' };
    return { pct: 0, text: `今日缺口 ${-cur} kcal，不利于增肌`, tone: 'bad' };
  }
  const dev = Math.abs(balance);
  if (dev <= 150) return { pct: 100, text: '收支平衡，保持得不错', tone: 'good' };
  if (dev <= 400) return { pct: Math.round(100 - (dev - 150) / 2.5), text: `偏离平衡 ${dev} kcal`, tone: 'mid' };
  return { pct: 0, text: `偏离平衡 ${dev} kcal`, tone: 'bad' };
}

/* ---------- 图表：半圆渐变仪表盘（指针 + 目标标记联动） ---------- */
function buildGauge(balance) {
  const w = 340, h = 216, cx = 170, cy = 190, R = 134;
  const goal = GOALS[DB.profile.goal];
  // 动态量程：至少 ±800，目标缺口/盈余超出时自动扩程（目标值 +200 余量）
  const RANGE = Math.max(800, Math.abs(signedAdjust()) + 200);
  const rotN = (Math.max(-RANGE, Math.min(RANGE, balance)) / RANGE * 90).toFixed(1);
  const rotG = (Math.max(-RANGE, Math.min(RANGE, signedAdjust())) / RANGE * 90).toFixed(1);
  const pt = (tt, rr) => { const a = Math.PI * (1 - tt); return [cx + rr * Math.cos(a), cy - rr * Math.sin(a)]; };
  const [x0, y0] = pt(0, R), [x1, y1] = pt(1, R);

  let ticks = '', labels = '';
  for (let i = 0; i <= 16; i++) {
    const tt = i / 16, major = i % 2 === 0;
    const [ax, ay] = pt(tt, R - (major ? 19 : 13));
    const [bx, by] = pt(tt, R - 9);
    ticks += `<line x1="${ax.toFixed(1)}" y1="${ay.toFixed(1)}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" stroke="${major ? '#B6C2BD' : '#D8E0DC'}" stroke-width="1"/>`;
  }
  for (let i = 0; i <= 8; i++) {
    const tt = i / 8, val = Math.round(-RANGE + i * (RANGE / 4));
    const [lx, ly] = pt(tt, R - 30);
    const rot = (tt * 180 - 90).toFixed(0);
    labels += `<text class="gauge-axis" x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" transform="rotate(${rot} ${lx.toFixed(1)} ${ly.toFixed(1)})">${val}</text>`;
  }

  const label = balance < -50 ? '热量缺口' : balance > 50 ? '热量盈余' : '收支平衡';
  const iconX = cx + label.length * 6 + 12;

  return `<svg viewBox="0 0 ${w} ${h}" class="chart-svg gauge-svg" role="img" aria-label="${label} ${Math.abs(balance)} 千卡">
    <defs><linearGradient id="ggrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#EF4444"/><stop offset=".22" stop-color="#F97316"/><stop offset=".5" stop-color="#FACC15"/>
      <stop offset=".78" stop-color="#34D399"/><stop offset="1" stop-color="#0EA5E9"/>
    </linearGradient></defs>
    <path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${R} ${R} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}" fill="none" stroke="url(#ggrad)" stroke-width="13" stroke-linecap="round"/>
    ${ticks}${labels}
    <g class="g-goal" data-rot="${rotG}" style="--goal-c:${goal.color}">
      <rect class="g-goal-pill" x="${cx - 5.5}" y="${cy - R - 8}" width="11" height="24" rx="5.5"/>
      <text class="g-goal-txt" x="${cx}" y="${cy - R + 34}" text-anchor="middle">目标</text>
    </g>
    <g class="g-needle" data-rot="${rotN}">
      <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - (R - 30)}" stroke="#475569" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${cy}" r="4.5" fill="#475569"/>
    </g>
    <text class="gauge-label" x="${cx}" y="${cy - 54}" text-anchor="middle">${label}</text>
    <g class="gauge-info" transform="translate(${iconX} ${cy - 58})"><circle cx="0" cy="0" r="6.5" fill="none" stroke="#94A3B8" stroke-width="1.3"/><line x1="0" y1="-1.5" x2="0" y2="2.5" stroke="#94A3B8" stroke-width="1.3" stroke-linecap="round"/><circle cx="0" cy="-3.6" r=".9" fill="#94A3B8"/></g>
    <text class="gauge-num" x="${cx}" y="${cy - 16}" text-anchor="middle">${Math.abs(balance).toLocaleString()}</text>
  </svg>`;
}

// 挂载后触发指针扫摆动画（从 0° 扫到目标角度）
function animateGauge() {
  document.querySelectorAll('#view [data-rot]').forEach(el => {
    const rot = el.dataset.rot;
    requestAnimationFrame(() => requestAnimationFrame(() => { el.style.transform = `rotate(${rot}deg)`; }));
  });
}

/* ---------- 图表：平滑体重折线（Catmull-Rom） ---------- */
function buildWeightChart(points, goal) {
  const w = 340, h = 200, padL = 42, padR = 14, padT = 14, padB = 26;
  if (!points.length) return '<div class="empty"><b>暂无数据</b><span>先记录一次体重吧</span></div>';
  const vals = points.map(p => p.weight);
  const min = Math.min(...vals, goal), max = Math.max(...vals, goal);
  const span = (max - min) || 1;
  const yMin = min - span * .2, yMax = max + span * .2, yRange = yMax - yMin;
  const xFor = i => points.length === 1 ? padL + (w - padL - padR) / 2 : padL + (i / (points.length - 1)) * (w - padL - padR);
  const yFor = v => padT + (yMax - v) / yRange * (h - padT - padB);
  const coords = points.map((p, i) => ({ x: xFor(i), y: yFor(p.weight) }));

  let line = `M${coords[0].x.toFixed(1)},${coords[0].y.toFixed(1)}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const p0 = coords[Math.max(i - 1, 0)], p1 = coords[i], p2 = coords[i + 1], p3 = coords[Math.min(i + 2, coords.length - 1)];
    const c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
    line += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  const bottom = h - padB;
  const area = `${line} L${coords[coords.length - 1].x.toFixed(1)},${bottom} L${coords[0].x.toFixed(1)},${bottom} Z`;
  const dots = coords.map(c => `<circle class="chart-dot" cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="3"/>`).join('');

  let goalLine = '';
  if (goal != null && goal >= yMin && goal <= yMax) {
    goalLine = `<line class="chart-goal-line" x1="${padL}" y1="${yFor(goal).toFixed(1)}" x2="${w - padR}" y2="${yFor(goal).toFixed(1)}"/>` +
      `<text class="chart-goal-label" x="${w - padR}" y="${(yFor(goal) - 5).toFixed(1)}" text-anchor="end">目标 ${goal}kg</text>`;
  }
  const yLabels = [yMax, (yMax + yMin) / 2, yMin]
    .map(v => `<text class="chart-axis" x="${padL - 8}" y="${yFor(v).toFixed(1)}" text-anchor="end" dominant-baseline="middle">${v.toFixed(1)}</text>`).join('');
  const xLabels = `<text class="chart-axis" x="${coords[0].x.toFixed(1)}" y="${h - 8}" text-anchor="middle">${fmtShort(points[0].date)}</text>` +
    (points.length > 1 ? `<text class="chart-axis" x="${coords[coords.length - 1].x.toFixed(1)}" y="${h - 8}" text-anchor="middle">${fmtShort(points[points.length - 1].date)}</text>` : '');

  return `<svg viewBox="0 0 ${w} ${h}" class="chart-svg" preserveAspectRatio="xMidYMid meet">
    <defs><linearGradient id="wgrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E9F6E" stop-opacity=".20"/><stop offset="1" stop-color="#0E9F6E" stop-opacity="0"/></linearGradient></defs>
    ${goalLine}
    <path d="${area}" fill="url(#wgrad)" stroke="none"/>
    <path class="chart-line" d="${line}"/> ${dots} ${yLabels} ${xLabels}
  </svg>`;
}

function buildRing(pct, size = 118, stroke = 11) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  const off = c * (1 - clamp01(pct));
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="ring">` +
    `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" class="ring-bg" stroke-width="${stroke}"/>` +
    `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" class="ring-fg" stroke-width="${stroke}" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}" transform="rotate(-90 ${size / 2} ${size / 2})"/>` +
    `</svg>`;
}

/* ---------- 视图渲染 ---------- */
function render() {
  document.body.dataset.page = state.tab;
  $('#pageTitle').textContent = state.tab === 'home' ? '轻卡星球' : TAB_ITEMS.find(t => t[0] === state.tab)[1];
  $('#pageSub').textContent = state.tab === 'home' ? homeSub() : TAB_SUB[state.tab];
  $('#view').innerHTML = {
    home: renderHome, training: renderTraining, diet: renderDiet, weight: renderWeight,
  }[state.tab]();
  renderTabbar();
  renderFab();
  animateGauge();
}

function homeSub() {
  const [y, m, d] = state.date.split('-');
  const wd = '周日一二三四五六'[new Date(y, m - 1, d).getDay()];
  return `${Number(m)}月${Number(d)}日 · 周${wd} · 已连续打卡 ${DB.profile.streak} 天`;
}

function renderTabbar() {
  const bar = $('#tabbar');
  if (!bar.children.length) {
    bar.innerHTML = TAB_ITEMS.map(([key, label, icon]) =>
      `<button class="tab" data-tab="${key}"><span class="tic">${svg(icon)}</span>${label}</button>`).join('');
  }
  bar.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === state.tab));
}
function renderFab() {
  $('#fab').innerHTML = svg('plus');
}

/* ---------- 首页：核心联动仪表盘 ---------- */
function renderHome() {
  const p = DB.profile;
  const { burn, intake, balance } = energyToday();
  const prog = goalProgress(balance);

  const goalSeg = Object.entries(GOALS).map(([key, g]) =>
    `<button class="goal-seg ${p.goal === key ? 'active' : ''} goal-${key}" data-action="switch-goal" data-goal="${key}">
      <b>${g.label}</b><span>${g.sub}</span></button>`).join('');

  const mealCards = [['早餐', 'sun', '#F59E0B'], ['午餐', 'utensils', '#F97316'], ['晚餐', 'moon', '#64748B']].map(([mt, ic, color]) => {
    const sum = DB.meals.filter(m => m.date === state.date && m.mealType === mt).reduce((s, m) => s + m.totalKcal, 0);
    return `<button class="meal-card" data-action="open-sheet" data-type="meal" data-meal="${mt}">
      <span class="mi" style="color:${color}">${svg(ic)}</span><b>${mt}</b>
      ${sum ? `<span class="meal-kcal">${sum} kcal</span>` : `<span class="meal-add">${svg('plus')}</span>`}
    </button>`;
  }).join('');

  return `
    ${dateNavHTML()}
    <section class="card gauge-card">
      <div class="sec-head">
        <b>${state.date === TODAY ? '今日' : fmtShort(state.date)} 能量平衡</b>
        <span class="streak-tag">${p.goal === 'maintain' ? '维持中' : `${GOALS[p.goal].label}·${PACE_LABEL[p.pace || 'mid']}·${clampWeeks(p.weeks)}周`}</span>
        <button class="sec-link" data-action="open-sheet" data-type="goals">${svg('edit')} 目标</button>
      </div>
      <div class="goal-segs">${goalSeg}</div>
      <div class="gauge-box">${buildGauge(balance)}</div>
      <div class="stat-duo">
        <div>
          <div class="sd-head"><span class="sd-ic sd-burn">${svg('flame')}</span>总消耗</div>
          <div class="sd-num"><b>${burn.toLocaleString()}</b><span>/ ${tdee(p).toLocaleString()} 千卡</span></div>
          <div class="sd-sub">基础代谢 ${bmr(p).toLocaleString()} + 训练 ${todayTrainKcal()}</div>
        </div>
        <div class="sd-right">
          <div class="sd-head"><span class="sd-ic sd-intake">${svg('bowl')}</span>总摄入</div>
          <div class="sd-num"><b>${intake.toLocaleString()}</b><span>/ ${targetIntake(p).toLocaleString()} 千卡</span></div>
          <div class="sd-sub">三餐 + 加餐合计</div>
        </div>
      </div>
      <div class="prog-row">
        <div class="prog-head"><span>目标进度</span><b class="tone-${prog.tone}">${prog.pct}%</b></div>
        <div class="prog-bar"><div class="prog-fill tone-${prog.tone}" style="width:${prog.pct}%"></div></div>
        <div class="prog-text tone-${prog.tone}">${prog.text}</div>
      </div>
    </section>

    <section class="card">
      <div class="sec-head">
        <span class="sec-title">${state.date === TODAY ? '录入三餐，统计今日热量摄入' : `补记 ${fmtDate(state.date)} 的三餐与加餐`}</span>
        <button class="sec-link snack-link" data-action="open-sheet" data-type="meal" data-meal="${defaultSnack()}">${svg('plus')} 加餐</button>
      </div>
      <div class="meals-grid">${mealCards}</div>
    </section>

    <section class="quick-grid">
      <button class="quick" data-action="open-sheet" data-type="workout"><span class="qic qic-mint">${svg('dumbbell')}</span><b>训练录入</b><span>累计 ${DB.workouts.length} 次</span></button>
      <button class="quick" data-action="open-sheet" data-type="weight"><span class="qic qic-sky">${svg('scale')}</span><b>测量体重</b><span>当前 ${latestWeight()} kg</span></button>
      <button class="quick" data-action="open-sheet" data-type="goals"><span class="qic qic-orange">${svg('target')}</span><b>目标设置</b><span>目标 ${p.goalWeight} kg</span></button>
    </section>
  `;
}

function defaultSnack() {
  const h = new Date().getHours();
  if (h < 11) return '上午加餐';
  if (h < 17) return '下午加餐';
  return '晚上加餐';
}

/* ---------- 训练 ---------- */
function renderTraining() {
  const [ty, tm, td] = TODAY.split('-').map(Number);
  const weekAgo = new Date(ty, tm - 1, td - 6);
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const weekList = DB.workouts.filter(w => w.date >= iso(weekAgo));
  const weekMin = weekList.reduce((s, w) => s + w.duration, 0);
  const weekKcal = weekList.reduce((s, w) => s + w.kcal, 0);

  const filters = ['全部', ...CATEGORIES.map(c => c.label)].map(l =>
    `<button class="chip ${state.trainingFilter === l ? 'active' : ''}" data-action="filter" data-part="${l}">${l}</button>`).join('');

  const list = DB.workouts.filter(w => state.trainingFilter === '全部' || catMeta(w.category).label === state.trainingFilter);
  const groups = {};
  list.forEach(w => { (groups[w.date] = groups[w.date] || []).push(w); });

  const body = Object.keys(groups).sort((a, b) => b.localeCompare(a)).map(date => {
    const items = groups[date].map(w => {
      const cm = catMeta(w.category), rb = rpeBand(w.rpe);
      const detail = w.category === 'cardio' ? `${w.reps} 分钟` : `${w.sets} 组 × ${w.reps} 次`;
      return `
      <div class="record">
        <div class="record-head">
          <div>
            <span class="record-tag ${cm.cls}">${cm.label}</span>
            <div class="record-title" style="margin-top:6px">${esc(w.name)}</div>
          </div>
          <div class="record-actions">
            <button class="icon-btn" data-action="edit-workout" data-id="${w.id}" aria-label="编辑">${svg('edit')}</button>
            <button class="icon-btn" data-action="delete-workout" data-id="${w.id}" aria-label="删除">${svg('trash')}</button>
          </div>
        </div>
        <div class="record-meta">${detail}${w.weightKg ? ` · 负重 ${w.weightKg} kg` : ''} · <span class="rpe ${rb.cls}">RPE ${w.rpe} ${rb.label}</span></div>
        <div class="record-stats">
          <span>${svg('clock')} ${w.duration} 分钟</span>
          <span>${svg('flame')} <b>${w.kcal}</b> kcal</span>
          ${w.source === 'template' ? `<span>${svg('bookmark')} 模板</span>` : ''}
        </div>
      </div>`;
    }).join('');
    return `<div class="group-label">${fmtDate(date)}</div>${items}`;
  }).join('');

  const tpls = DB.templates.map(t => {
    const cm = catMeta(t.category);
    return `<button class="tpl-card" data-action="use-template" data-id="${t.id}">
      <div class="tpl-head"><span class="record-tag ${cm.cls}">${cm.label}</span>${svg('bookmark')}</div>
      <b>${esc(t.name)}</b>
      <span class="tpl-desc">${esc(t.desc)}</span>
      <span class="tpl-foot">${t.kcal} kcal · ${t.duration} 分钟 · 一键复用</span>
    </button>`;
  }).join('');

  return `
    <section class="card">
      <div class="card-title">${svg('activity')} 本周累计</div>
      <div style="height:10px"></div>
      <div class="stat-grid">
        <div class="stat"><b>${weekList.length}</b><span>训练次数</span></div>
        <div class="stat"><b>${weekMin}</b><span>总时长 (min)</span></div>
        <div class="stat"><b>${weekKcal}</b><span>总消耗 (kcal)</span></div>
      </div>
    </section>
    <section>
      <div class="sec-head"><b>我的模板</b><span class="sec-hint">点击复用</span></div>
      <div class="tpl-scroll">${tpls}</div>
    </section>
    <section><div class="chips">${filters}</div></section>
    ${list.length ? `<div class="list">${body}</div>` : emptyState('dumbbell', '暂无训练记录', '点击右下角 + 或复用模板开始记录')}
  `;
}

/* ---------- 饮食 ---------- */
function renderDiet() {
  const p = DB.profile;
  const kcal = todayIntake();
  const mtg = macroTargets(p);
  const dayLabel = state.date === TODAY ? '今日' : fmtShort(state.date);
  const todayMeals = DB.meals.filter(m => m.date === state.date);
  const macro = todayMeals.reduce((a, m) => {
    m.foods.forEach(f => { a.protein += f.protein; a.carbs += f.carbs; a.fat += f.fat; });
    return a;
  }, { protein: 0, carbs: 0, fat: 0 });

  const macroRow = (label, val, target, color) => `
    <div class="macro"><span class="m-label">${label}</span><div class="m-bar"><div class="m-fill" style="width:${Math.min(100, val / target * 100)}%;background:${color}"></div></div><span class="m-val">${Math.round(val)}g</span></div>`;

  const groups = {};
  todayMeals.forEach(m => { (groups[m.mealType] = groups[m.mealType] || []).push(m); });

  const body = MEALS.map(mt => {
    const items = (groups[mt] || []).map(m => `
      <div class="record" style="padding:12px 14px">
        <div class="record-head">
          <div class="record-title">${m.foods.map(f => esc(f.name)).join(' · ')}</div>
          <div class="record-actions">
            <button class="icon-btn" data-action="edit-meal" data-id="${m.id}" aria-label="编辑">${svg('edit')}</button>
            <button class="icon-btn" data-action="delete-meal" data-id="${m.id}" aria-label="删除">${svg('trash')}</button>
          </div>
        </div>
        <div class="record-meta">${m.foods.map(f => `${esc(f.name)} ${esc(f.amount)} ${f.kcal}kcal`).join('，')}</div>
        <div class="record-stats"><span>${svg('flame')} <b>${m.totalKcal}</b> kcal</span></div>
      </div>`).join('');
    const sum = (groups[mt] || []).reduce((s, m) => s + m.totalKcal, 0);
    return `<div class="group-label">${mt}${sum ? ` · ${sum} kcal` : ''}</div>${items || '<div class="record-meta" style="color:var(--text-faint);padding:4px 2px">未记录</div>'}`;
  }).join('');

  return `
    ${dateNavHTML()}
    <section class="card">
      <div class="card-title">${svg('flame')} ${dayLabel}摄入</div>
      <div style="height:8px"></div>
      <div class="ring-wrap">
        <div class="ring-center">${buildRing(kcal / targetIntake(p))}
          <div class="center-txt"><b>${kcal}</b><span>/ ${targetIntake(p)} kcal</span></div>
        </div>
        <div class="macro-bars">
          ${macroRow('蛋白', macro.protein, mtg.protein, '#0E9F6E')}
          ${macroRow('碳水', macro.carbs, mtg.carbs, '#F97316')}
          ${macroRow('脂肪', macro.fat, mtg.fat, '#0EA5E9')}
        </div>
      </div>
    </section>
    <div class="sec-head"><b>${dayLabel}餐次</b><button class="sec-link snack-link" data-action="open-sheet" data-type="meal" data-meal="${defaultSnack()}">${svg('plus')} 加餐</button></div>
    <section><div class="list">${body}</div></section>
  `;
}

/* ---------- 体重 ---------- */
function renderWeight() {
  const p = DB.profile;
  const latest = DB.weights[DB.weights.length - 1];
  const diff = (latest.weight - p.goalWeight).toFixed(1);
  const lost = (p.startWeight - latest.weight).toFixed(1);

  let points = DB.weights;
  if (state.weightRange === '7') points = points.slice(-7);
  else if (state.weightRange === '30') points = points.slice(-30);

  const ranges = [['7', '近7天'], ['30', '近30天'], ['all', '全部']].map(([k, l]) =>
    `<button class="${state.weightRange === k ? 'active' : ''}" data-action="range" data-range="${k}">${l}</button>`).join('');

  const list = [...DB.weights].reverse().map(w => `
    <div class="record">
      <div class="record-head">
        <div><div class="record-title">${w.weight} kg</div><div class="record-meta">${fmtDate(w.date)}${w.bodyFat ? ` · 体脂 ${w.bodyFat}%` : ''}</div></div>
        <div class="record-actions">
          <button class="icon-btn" data-action="edit-weight" data-id="${w.id}" aria-label="编辑">${svg('edit')}</button>
          <button class="icon-btn" data-action="delete-weight" data-id="${w.id}" aria-label="删除">${svg('trash')}</button>
        </div>
      </div>
    </div>`).join('');

  return `
    <section class="card" style="text-align:center">
      <div class="card-sub">当前体重</div>
      <div class="big-num">${latest.weight}<span> kg</span></div>
      <div class="record-stats" style="justify-content:center;margin-top:6px">
        <span>距目标 <b style="color:var(--orange)">${diff > 0 ? diff : 0} kg</b></span>
        <span>累计减重 <b style="color:var(--primary)">${lost} kg</b></span>
      </div>
    </section>
    <section class="card">
      <div class="card-title">${svg('trendDown')} 体重趋势</div>
      <div style="height:8px"></div>
      <div class="segmented">${ranges}</div>
      <div style="height:10px"></div>
      <div class="chart-box">${buildWeightChart(points, p.goalWeight)}</div>
    </section>
    <section class="card goal-card">
      <div class="goal-card-row">
        <div>
          <div class="card-title">${svg('target')} 当前总目标</div>
          <div class="card-sub">${GOALS[p.goal].label} · ${GOALS[p.goal].sub}${p.goal !== 'maintain' ? ` · ${PACE_LABEL[p.pace || 'mid']} · ${clampWeeks(p.weeks)}周` : ''} · 目标体重 ${p.goalWeight} kg</div>
        </div>
        <button class="btn btn-ghost btn-sm" data-action="open-sheet" data-type="goals">${svg('edit')} 调整</button>
      </div>
    </section>
    <section><div class="list">${list}</div></section>
  `;
}

function emptyState(icon, title, sub) {
  return `<div class="empty">${svg(icon)}<b>${title}</b><span>${sub}</span></div>`;
}

/* ---------- 底部弹层 ---------- */
function openSheet(type, mealType) {
  state.sheet = type;
  state.form = initForm(type, mealType);
  renderSheet();
  $('#sheetMask').classList.add('open');
  $('#sheet').classList.add('open');
}
function closeSheet() {
  $('#sheetMask').classList.remove('open');
  $('#sheet').classList.remove('open');
  state.sheet = null;
  state.form = {};
  state.pendingMealForm = null; // 清理自定义食物暂存的餐次表单，避免脏数据
}
// 以预填表单打开弹层（编辑记录用）
function openSheetWith(type, form) {
  state.sheet = type;
  state.form = form;
  renderSheet();
  $('#sheetMask').classList.add('open');
  $('#sheet').classList.add('open');
}
// 日期导航：仅允许回看，不超过今天
function shiftDate(n) {
  const [y, m, d] = state.date.split('-').map(Number);
  const dt = new Date(y, m - 1, d + n);
  const iso = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
  if (iso > TODAY) return;
  state.date = iso;
  render();
}
function dateNavHTML() {
  const isToday = state.date === TODAY;
  return `<div class="date-nav">
    <button class="icon-btn" data-action="shift-date" data-n="-1" aria-label="前一天">${svg('chevronLeft')}</button>
    <span class="date-cur">${fmtDate(state.date)} · ${fmtShort(state.date)}</span>
    <button class="icon-btn" data-action="shift-date" data-n="1" ${isToday ? 'disabled' : ''} aria-label="后一天">${svg('chevronRight')}</button>
    ${isToday ? '' : `<button class="sec-link" data-action="shift-today">回到今天</button>`}
  </div>`;
}
// 弹层补记日期提示（仅非今天显示）
const dateHintHTML = () => state.date === TODAY ? '' :
  `<div class="kcal-preview">${svg('info')} 补记日期：${fmtDate(state.date)}（${fmtShort(state.date)}）</div>`;
function initForm(type, mealType) {
  if (type === 'workout') return { category: 'strength', name: '', sets: 4, reps: 10, weightKg: '', rpe: 6 };
  if (type === 'meal') return { mealType: mealType || '早餐', query: '', selected: [] };
  if (type === 'customFood') return { name: '', unit: '100g', energy: '', energyUnit: 'kcal', carbs: '', protein: '', fat: '' };
  if (type === 'weight') return { weight: '', bodyFat: '' };
  if (type === 'goals') {
    const p = DB.profile;
    return { goal: p.goal, gender: p.gender, age: p.age, heightCm: p.heightCm, activity: p.activity, goalWeight: p.goalWeight, pace: p.pace || 'mid', weeks: clampWeeks(p.weeks) };
  }
  return {};
}

function renderSheet() {
  const t = state.sheet;
  if (!t) return;
  $('#sheet').innerHTML = { workout: sheetWorkout, meal: sheetMeal, weight: sheetWeight, goals: sheetGoals, customFood: sheetCustomFood }[t]();
}

function chipRow(options, current, key) {
  return `<div class="chips">${options.map(o => `<button class="chip ${current === o ? 'active' : ''}" data-action="set-${key}" data-val="${o}">${o}</button>`).join('')}</div>`;
}

function sheetWorkout() {
  const f = state.form;
  const cm = catMeta(f.category);
  const isCardio = f.category === 'cardio';
  const quick = (DB.exerciseLib[f.category] || []).map(e =>
    `<button class="chip ${f.name === e.name ? 'active' : ''}" data-action="quick-ex" data-val="${esc(e.name)}">${e.name}</button>`).join('');
  const rpes = Array.from({ length: 10 }, (_, i) => i + 1).map(n => {
    const rb = rpeBand(n);
    return `<button class="chip rpe-chip ${rb.cls} ${f.rpe === n ? 'active' : ''}" data-action="set-rpe" data-val="${n}">${n}</button>`;
  }).join('');

  return `
    <div class="sheet-grab"></div>
    <div class="sheet-head"><h3>${f.editId ? '编辑训练' : '记录训练'}</h3><button class="icon-btn" data-action="close-sheet" aria-label="关闭">${svg('x')}</button></div>
    <div class="sheet-body">
      ${dateHintHTML()}
      <div><div class="field-label">动作分类</div>${chipRow(CATEGORIES.map(c => c.label), cm.label, 'category')}</div>
      <div><div class="field-label">快速添加</div><div class="chips">${quick}</div></div>
      <div><div class="field-label">动作名称（可手动输入）</div><input class="field" placeholder="例：${isCardio ? '跑步' : '深蹲'}" value="${esc(f.name)}" data-bind="name"></div>
      <div class="field-row">
        ${isCardio ? '' : `<div><div class="field-label">组数</div><input class="field" type="number" inputmode="numeric" value="${f.sets}" data-bind="sets"></div>`}
        <div><div class="field-label">${isCardio ? '时长（分钟）' : '次数 / 组'}</div><input class="field" type="number" inputmode="numeric" value="${f.reps}" data-bind="reps"></div>
        ${isCardio ? '' : `<div><div class="field-label">重量（kg，选填）</div><input class="field" type="number" inputmode="decimal" placeholder="0" value="${esc(f.weightKg)}" data-bind="weightKg"></div>`}
      </div>
      <div><div class="field-label">体感 RPE（1 轻松 → 10 极限）</div><div class="chips rpe-row">${rpes}</div></div>
      <div class="kcal-preview">${svg('flame')} 预计消耗 <b id="kcalPrev">${estKcal(f)}</b> kcal · 约 <span id="durPrev">${estDuration(f)}</span> 分钟</div>
    </div>
    <div class="sheet-footer"><button class="btn btn-primary btn-block" data-action="submit-workout">${f.editId ? '保存修改' : '保存记录'}</button></div>
  `;
}

function foodItemHTML(fd) {
  return `
    <div class="food-item">
      <div class="f-info"><b>${esc(fd.name)}</b><span>${esc(fd.unit)} · ${fd.kcal} kcal · 蛋白${fd.protein}g</span></div>
      <button class="btn btn-ghost btn-sm" data-action="pick-food" data-name="${esc(fd.name)}">添加</button>
    </div>`;
}

function renderFoodList() {
  const el = $('#foodList');
  if (!el) return;
  const q = (state.form.query || '').trim();
  const foods = allFoods().filter(fd => !q || fd.name.includes(q));
  el.innerHTML = foods.length ? foods.map(foodItemHTML).join('') : '<div class="empty" style="padding:16px"><span>没有匹配的食物</span></div>';
}

function sheetMeal() {
  const f = state.form;
  const q = (f.query || '').trim();
  const foods = allFoods().filter(fd => !q || fd.name.includes(q));
  const total = f.selected.reduce((s, fd) => s + fd.kcal, 0);
  const freq = frequentFoods();

  const picked = f.selected.map((fd, i) => `
    <div class="picked-row">
      <span class="p-name">${esc(fd.name)}</span>
      <input class="qty-input" type="number" inputmode="decimal" value="${fd.grams}" data-food-idx="${i}" aria-label="份量">
      <span style="font-size:12px;color:var(--text-sub)" data-kcal-idx="${i}">${Math.round(fd.kcal)} kcal</span>
      <button class="icon-btn" data-action="remove-food" data-idx="${i}" aria-label="移除">${svg('x')}</button>
    </div>`).join('');

  return `
    <div class="sheet-grab"></div>
    <div class="sheet-head"><h3>${f.editId ? '编辑饮食' : '记录饮食'}</h3><button class="icon-btn" data-action="close-sheet" aria-label="关闭">${svg('x')}</button></div>
    <div class="sheet-body">
      ${dateHintHTML()}
      <div><div class="field-label">餐次</div>${chipRow(MEALS, f.mealType, 'mealType')}</div>
      <div><div class="field-label">搜索食物</div><div class="search-box">${svg('search')}<input class="field" placeholder="输入食物名称" value="${esc(f.query)}" data-bind="query"></div></div>
      ${freq.length ? `<div><div class="field-label">常用食物</div><div class="chips">${freq.map(fd => `<button class="chip freq-chip" data-action="pick-food" data-name="${esc(fd.name)}">${esc(fd.name)}<span>${fd.kcal}</span></button>`).join('')}</div></div>` : ''}
      <div>
        <div class="label-row"><div class="field-label">食物库</div><button class="add-custom" data-action="open-custom-food">${svg('plus')} 自定义食物</button></div>
        <div class="food-list" id="foodList">${foods.length ? foods.map(foodItemHTML).join('') : '<div class="empty" style="padding:16px"><span>没有匹配的食物</span></div>'}</div>
      </div>
      ${f.selected.length ? `<div><div class="field-label">已添加 · 合计 <b id="mealTotal">${Math.round(total)}</b> kcal</div>${picked}</div>` : ''}
    </div>
    <div class="sheet-footer">
      <button class="btn btn-ghost" data-action="close-sheet">取消</button>
      <button class="btn btn-primary" style="flex:1" data-action="submit-meal" id="mealSave" ${f.selected.length ? '' : 'disabled'}>保存（${Math.round(total)} kcal）</button>
    </div>
  `;
}

function sheetWeight() {
  const f = state.form;
  return `
    <div class="sheet-grab"></div>
    <div class="sheet-head"><h3>${f.editId ? '编辑体重' : '记录体重'}</h3><button class="icon-btn" data-action="close-sheet" aria-label="关闭">${svg('x')}</button></div>
    <div class="sheet-body">
      ${dateHintHTML()}
      <div><div class="field-label">体重（kg）</div><input class="field" type="number" inputmode="decimal" step="0.1" placeholder="例：73.2" value="${esc(f.weight)}" data-bind="weight"></div>
      <div><div class="field-label">体脂率（%，选填）</div><input class="field" type="number" inputmode="decimal" step="0.1" placeholder="例：20.5" value="${esc(f.bodyFat)}" data-bind="bodyFat"></div>
    </div>
    <div class="sheet-footer"><button class="btn btn-primary btn-block" data-action="submit-weight">${f.editId ? '保存修改' : '保存记录'}</button></div>
  `;
}

function sheetGoals() {
  const f = state.form;
  const previewP = { ...DB.profile, ...f, age: Number(f.age) || DB.profile.age, heightCm: Number(f.heightCm) || DB.profile.heightCm, activity: Number(f.activity), weeks: clampWeeks(f.weeks) };
  const b = bmr(previewP), t = Math.round(b * previewP.activity), ti = Math.round(t + signedAdjust(previewP));

  const adjFor = (key) => key === 'maintain' ? 0 : computedAdjust({ ...previewP, goal: key });
  const goalCards = Object.entries(GOALS).map(([key, g]) => {
    const adj = adjFor(key);
    const adjText = key === 'maintain' ? '±0 kcal/日' : `${key === 'cut' ? '缺口' : '盈余'} ${adj} kcal/日`;
    return `<button class="goal-opt goal-${key} ${f.goal === key ? 'active' : ''}" data-action="set-goal" data-val="${key}">
      <b>${g.label}</b><span>${g.sub}</span><span class="goal-adjust">${adjText}</span>
    </button>`;
  }).join('');

  const actChips = ACTIVITY_OPTIONS.map(a =>
    `<button class="chip ${Number(f.activity) === a.v ? 'active' : ''}" data-action="set-activity" data-val="${a.v}">${a.label}</button>`).join('');

  // 速率 + 周期（仅减脂/增肌展示）
  let paceBlock = '';
  if (f.goal !== 'maintain') {
    const paceChips = ['slow', 'mid', 'fast'].map(k =>
      `<button class="chip ${(f.pace || 'mid') === k ? 'active' : ''}" data-action="set-pace" data-val="${k}">${PACE_LABEL[k]}${f.goal === 'cut' ? '减脂' : '增肌'}</button>`).join('');
    const weekChips = WEEK_PRESETS.map(w =>
      `<button class="chip ${Number(f.weeks) === w ? 'active' : ''}" data-action="set-weeks" data-val="${w}">${w}周</button>`).join('');
    paceBlock = `
      <div>
        <div class="field-label">${f.goal === 'cut' ? '减脂' : '增肌'}速率</div>
        <div class="chips">${paceChips}</div>
        <div class="card-sub" style="margin-top:6px">参考周速率：慢速 ${PACE[f.goal].slow} / 中速 ${PACE[f.goal].mid} / 快速 ${PACE[f.goal].fast} kg/周 · 选择速率自动联动周期</div>
      </div>
      <div>
        <div class="field-label">${f.goal === 'cut' ? '减脂' : '增肌'}周期（周）</div>
        <div class="field-row">
          <input class="field" type="number" inputmode="numeric" min="1" max="52" value="${esc(f.weeks)}" data-bind="weeks">
          <div class="chips">${weekChips}</div>
        </div>
      </div>
      <div class="kcal-preview" id="pacePrevBox">${svg('activity')} ${paceLine(previewP)}</div>`;
  }

  return `
    <div class="sheet-grab"></div>
    <div class="sheet-head"><h3>目标设置</h3><button class="icon-btn" data-action="close-sheet" aria-label="关闭">${svg('x')}</button></div>
    <div class="sheet-body">
      <div><div class="field-label">总目标（联动仪表盘指针）</div><div class="goal-opts">${goalCards}</div></div>
      ${paceBlock}
      <div><div class="field-label">目标体重（kg）</div><input class="field" type="number" inputmode="decimal" step="0.1" value="${esc(f.goalWeight)}" data-bind="goalWeight"></div>
      <div class="field-row">
        <div><div class="field-label">性别</div><div class="chips">${['male', 'female'].map(g => `<button class="chip ${f.gender === g ? 'active' : ''}" data-action="set-gender" data-val="${g}">${g === 'male' ? '男' : '女'}</button>`).join('')}</div></div>
        <div><div class="field-label">年龄</div><input class="field" type="number" inputmode="numeric" value="${esc(f.age)}" data-bind="age"></div>
        <div><div class="field-label">身高 cm</div><input class="field" type="number" inputmode="numeric" value="${esc(f.heightCm)}" data-bind="heightCm"></div>
      </div>
      <div><div class="field-label">日常活动量</div><div class="chips">${actChips}</div></div>
      <div class="kcal-preview">${svg('info')} 基础代谢 <b id="bmrPrev">${b}</b> kcal · 总消耗目标 <b id="tdeePrev">${t}</b> kcal · 摄入目标 <b id="tiPrev">${ti}</b> kcal</div>
    </div>
    <div class="sheet-footer"><button class="btn btn-primary btn-block" data-action="submit-goals">保存</button></div>
  `;
}

function energyHint(f) {
  const e = Number(f.energy);
  if (!e || e <= 0) return '输入热量后自动换算（1 大卡 = 4.184 千焦）';
  return f.energyUnit === 'kj' ? `≈ <b>${Math.round(e / 4.184)}</b> 大卡（kcal）` : `≈ <b>${Math.round(e * 4.184)}</b> 千焦（kJ）`;
}
function updateEnergyPreview() {
  const el = $('#energyPrev');
  if (el) el.innerHTML = energyHint(state.form);
}

function sheetCustomFood() {
  const f = state.form;
  return `
    <div class="sheet-grab"></div>
    <div class="sheet-head"><h3>自定义食物</h3><button class="icon-btn" data-action="close-sheet" aria-label="关闭">${svg('x')}</button></div>
    <div class="sheet-body">
      <div><div class="field-label">食物名称</div><input class="field" placeholder="例：自制蛋白奶昔" value="${esc(f.name)}" data-bind="name"></div>
      <div><div class="field-label">份量说明</div><input class="field" placeholder="例：100g / 1杯 / 1份" value="${esc(f.unit)}" data-bind="unit"></div>
      <div>
        <div class="field-label">热量</div>
        <div class="field-row">
          <input class="field" type="number" inputmode="decimal" placeholder="0" value="${esc(f.energy)}" data-bind="energy">
          <div class="chips">
            <button class="chip ${f.energyUnit === 'kcal' ? 'active' : ''}" data-action="set-energy-unit" data-val="kcal">大卡</button>
            <button class="chip ${f.energyUnit === 'kj' ? 'active' : ''}" data-action="set-energy-unit" data-val="kj">千焦</button>
          </div>
        </div>
        <div class="card-sub" style="margin-top:6px" id="energyPrev">${energyHint(f)}</div>
      </div>
      <div>
        <div class="field-label">营养成分（g，选填）</div>
        <div class="field-row">
          <div><div class="field-sub">碳水</div><input class="field" type="number" inputmode="decimal" placeholder="0" value="${esc(f.carbs)}" data-bind="carbs"></div>
          <div><div class="field-sub">蛋白质</div><input class="field" type="number" inputmode="decimal" placeholder="0" value="${esc(f.protein)}" data-bind="protein"></div>
          <div><div class="field-sub">脂肪</div><input class="field" type="number" inputmode="decimal" placeholder="0" value="${esc(f.fat)}" data-bind="fat"></div>
        </div>
      </div>
    </div>
    <div class="sheet-footer"><button class="btn btn-primary btn-block" data-action="submit-custom-food">保存并添加到餐次</button></div>
  `;
}

async function submitCustomFood() {
  const f = state.form;
  const name = String(f.name || '').trim();
  if (!name) { toast('请输入食物名称'); return; }
  const e = Number(f.energy);
  if (!e || e <= 0) { toast('请输入有效热量'); return; }
  const kcal = f.energyUnit === 'kj' ? Math.round(e / 4.184) : Math.round(e);
  const rec = {
    name, unit: String(f.unit || '').trim() || '100g', kcal,
    carbs: Number(f.carbs) || 0, protein: Number(f.protein) || 0, fat: Number(f.fat) || 0, custom: true,
  };
  await API.addCustomFood(rec);
  persist();
  // 返回饮食记录弹层并自动加入已选
  state.sheet = 'meal';
  state.form = state.pendingMealForm || initForm('meal');
  state.pendingMealForm = null;
  pickFood(rec.name);
  toast(`已创建「${rec.name}」并添加`);
}

/* ---------- 事件委托 ---------- */
document.addEventListener('click', (e) => {
  const tabEl = e.target.closest('[data-tab]');
  if (tabEl) { state.tab = tabEl.dataset.tab; render(); return; }

  const act = e.target.closest('[data-action]');
  if (!act) return;
  const d = act.dataset;
  switch (d.action) {
    case 'fab': fabAction(); break;
    case 'open-sheet': openSheet(d.type, d.meal); break;
    case 'close-sheet': closeSheet(); break;
    case 'filter': state.trainingFilter = d.part; render(); break;
    case 'shift-date': shiftDate(Number(d.n)); break;
    case 'shift-today': state.date = TODAY; render(); break;
    case 'edit-workout': {
      const w = DB.workouts.find(x => x.id === d.id); if (!w) break;
      openSheetWith('workout', { category: w.category, name: w.name, sets: w.sets, reps: w.reps, weightKg: w.weightKg == null ? '' : w.weightKg, rpe: w.rpe, editId: w.id });
      break;
    }
    case 'edit-meal': {
      const m = DB.meals.find(x => x.id === d.id); if (!m) break;
      const selected = m.foods.map(fd => {
        const grams = parseFloat(fd.amount) || 100;
        return { name: fd.name, unit: String(fd.amount).replace(/^[\d.]+/, '') || '100g', grams, baseAmount: grams, baseKcal: fd.kcal, baseProtein: fd.protein, baseCarbs: fd.carbs, baseFat: fd.fat, kcal: fd.kcal, protein: fd.protein, carbs: fd.carbs, fat: fd.fat };
      });
      openSheetWith('meal', { mealType: m.mealType, query: '', selected, editId: m.id });
      break;
    }
    case 'edit-weight': {
      const w = DB.weights.find(x => x.id === d.id); if (!w) break;
      openSheetWith('weight', { weight: w.weight, bodyFat: w.bodyFat == null ? '' : w.bodyFat, editId: w.id });
      break;
    }
    case 'range': state.weightRange = d.range; render(); break;
    case 'switch-goal': switchGoal(d.goal); break;
    case 'use-template': useTemplate(d.id); break;
    case 'delete-workout': delWorkout(d.id); break;
    case 'delete-meal': delMeal(d.id); break;
    case 'delete-weight': delWeight(d.id); break;
    case 'set-category': {
      const c = CATEGORIES.find(x => x.label === d.val);
      state.form.category = c.key;
      state.form.name = '';
      renderSheet(); break;
    }
    case 'quick-ex': state.form.name = d.val; renderSheet(); break;
    case 'set-rpe': state.form.rpe = Number(d.val); renderSheet(); break;
    case 'set-mealType': state.form.mealType = d.val; renderSheet(); break;
    case 'set-goal': state.form.goal = d.val; renderSheet(); break;
    case 'set-pace': {
      state.form.pace = d.val;
      if (state.form.goal !== 'maintain') {
        const w = Math.round(planDelta(state.form) / PACE[state.form.goal][d.val]);
        state.form.weeks = clampWeeks(w);
      }
      renderSheet(); break;
    }
    case 'set-weeks': state.form.weeks = clampWeeks(d.val); renderSheet(); break;
    case 'open-custom-food':
      state.pendingMealForm = state.form;
      state.sheet = 'customFood';
      state.form = initForm('customFood');
      renderSheet();
      break;
    case 'set-energy-unit': state.form.energyUnit = d.val; renderSheet(); break;
    case 'submit-custom-food': submitCustomFood(); break;
    case 'set-gender': state.form.gender = d.val; renderSheet(); break;
    case 'set-activity': state.form.activity = Number(d.val); renderSheet(); break;
    case 'pick-food': pickFood(d.name); break;
    case 'remove-food': state.form.selected.splice(+d.idx, 1); renderSheet(); break;
    case 'submit-workout': submitWorkout(); break;
    case 'submit-meal': submitMeal(); break;
    case 'submit-weight': submitWeight(); break;
    case 'submit-goals': submitGoals(); break;
  }
});

/* 双向绑定：input 通过 data-bind 回写 form，定向更新 DOM（不整层重绘，避免输入失焦） */
const NUM_KEYS = ['sets', 'reps', 'weightKg', 'weight', 'bodyFat', 'goalWeight', 'age', 'heightCm', 'weeks', 'energy', 'carbs', 'protein', 'fat'];
document.addEventListener('input', (e) => {
  const bind = e.target.closest('[data-bind]');
  if (bind && state.sheet) {
    const key = bind.dataset.bind;
    let val = bind.value;
    if (NUM_KEYS.includes(key)) val = val === '' ? '' : Number(val);
    state.form[key] = val;
    if (state.sheet === 'workout' && ['sets', 'reps'].includes(key)) updateWorkoutPreview();
    if (state.sheet === 'goals' && ['age', 'heightCm', 'weeks', 'goalWeight'].includes(key)) updateGoalPreview();
    if (state.sheet === 'customFood' && key === 'energy') updateEnergyPreview();
    if (key === 'query') renderFoodList();
    return;
  }
  const qty = e.target.closest('[data-food-idx]');
  if (qty) updateFoodQty(qty);
});

function updateWorkoutPreview() {
  const kp = $('#kcalPrev'), dp = $('#durPrev');
  if (kp) kp.textContent = estKcal(state.form);
  if (dp) dp.textContent = estDuration(state.form);
}
function updateGoalPreview() {
  const f = state.form;
  const p = { ...DB.profile, ...f, age: Number(f.age) || DB.profile.age, heightCm: Number(f.heightCm) || DB.profile.heightCm, activity: Number(f.activity), weeks: clampWeeks(f.weeks) };
  const b = bmr(p), t = Math.round(b * p.activity);
  const bp = $('#bmrPrev'), tp = $('#tdeePrev'), tip = $('#tiPrev'), pp = $('#pacePrevBox');
  if (bp) bp.textContent = b;
  if (tp) tp.textContent = t;
  if (tip) tip.textContent = Math.round(t + signedAdjust(p));
  if (pp) pp.innerHTML = `${svg('activity')} ${paceLine(p)}`;
}

function updateFoodQty(el) {
  const idx = +el.dataset.foodIdx;
  const fd = state.form.selected[idx];
  if (!fd) return;
  const grams = Math.max(0, Number(el.value) || 0);
  const ratio = grams / fd.baseAmount;
  fd.grams = grams;
  fd.kcal = Math.round(fd.baseKcal * ratio);
  fd.protein = +(fd.baseProtein * ratio).toFixed(1);
  fd.carbs = +(fd.baseCarbs * ratio).toFixed(1);
  fd.fat = +(fd.baseFat * ratio).toFixed(1);

  const row = document.querySelector(`[data-kcal-idx="${idx}"]`);
  if (row) row.textContent = `${Math.round(fd.kcal)} kcal`;
  const total = state.form.selected.reduce((s, x) => s + x.kcal, 0);
  const mt = $('#mealTotal'); if (mt) mt.textContent = Math.round(total);
  const ms = $('#mealSave'); if (ms) ms.textContent = `保存（${Math.round(total)} kcal）`;
}

/* ---------- 交互动作 ---------- */
function fabAction() {
  if (state.tab === 'diet') openSheet('meal');
  else if (state.tab === 'weight') openSheet('weight');
  else openSheet('workout');
}

async function switchGoal(goal) {
  if (!GOALS[goal] || DB.profile.goal === goal) return;
  await API.updateProfile({ goal });
  persist(); render();
  toast(`已切换至「${GOALS[goal].label}」目标，指针已联动`);
}

async function useTemplate(id) {
  const t = DB.templates.find(x => x.id === id);
  if (!t) return;
  const per = Math.round(t.kcal / t.items.length), perDur = Math.round(t.duration / t.items.length);
  for (const it of t.items) {
    await API.addWorkout({
      id: uid(), date: state.date, category: t.category, name: it.name,
      sets: it.sets, reps: it.reps, weightKg: it.weightKg, rpe: t.rpe,
      kcal: per, duration: perDur, source: 'template',
    });
  }
  persist(); render();
  toast(`已复用模板「${t.name}」，生成 ${t.items.length} 条记录`);
}

// 全量食物 = 内置食物库 + 用户自定义食物
const allFoods = () => [...DB.foodLib, ...(DB.customFoods || [])];
// 常用食物：按历史饮食记录出现频次取前 8
function frequentFoods() {
  const freq = {};
  DB.meals.forEach(m => m.foods.forEach(f => { freq[f.name] = (freq[f.name] || 0) + 1; }));
  const lib = allFoods();
  return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 8)
    .map(([name]) => lib.find(fd => fd.name === name)).filter(Boolean);
}

function pickFood(name) {
  const fd = allFoods().find(f => f.name === name);
  if (!fd) return;
  const grams = fd.unit.includes('g') && !fd.unit.includes('ml') ? parseInt(fd.unit) || 100 : 100;
  state.form.selected.push({ name: fd.name, unit: fd.unit, grams, baseAmount: grams, baseKcal: fd.kcal, baseProtein: fd.protein, baseCarbs: fd.carbs, baseFat: fd.fat, kcal: fd.kcal, protein: fd.protein, carbs: fd.carbs, fat: fd.fat });
  renderSheet();
}

async function submitWorkout() {
  const f = state.form;
  if (!String(f.name).trim()) { toast('请选择或填写动作名称'); return; }
  const duration = estDuration(f);
  if (!duration) { toast('请填写有效的组数/次数或时长'); return; }
  const old = f.editId ? DB.workouts.find(w => w.id === f.editId) : null;
  const rec = {
    id: f.editId || uid(), date: old ? old.date : state.date, category: f.category, name: String(f.name).trim(),
    sets: f.category === 'cardio' ? 1 : (Number(f.sets) || 1),
    reps: Number(f.reps) || 0,
    weightKg: f.weightKg === '' ? null : Number(f.weightKg),
    rpe: f.rpe, kcal: estKcal(f), duration, source: old ? old.source : 'manual',
  };
  if (f.editId) await API.updateWorkout(f.editId, rec); else await API.addWorkout(rec);
  persist(); closeSheet(); render(); toast(f.editId ? '训练记录已更新' : '训练记录已保存');
}

async function submitMeal() {
  const f = state.form;
  if (!f.selected.length) { toast('请至少添加一种食物'); return; }
  const old = f.editId ? DB.meals.find(m => m.id === f.editId) : null;
  const rec = {
    id: f.editId || uid(), date: old ? old.date : state.date, mealType: f.mealType,
    foods: f.selected.map(s => ({ name: s.name, amount: `${s.grams}${s.unit.includes('ml') ? 'ml' : 'g'}`, kcal: s.kcal, protein: s.protein, carbs: s.carbs, fat: s.fat })),
    totalKcal: f.selected.reduce((a, s) => a + s.kcal, 0),
  };
  if (f.editId) await API.updateMeal(f.editId, rec); else await API.addMeal(rec);
  persist(); closeSheet(); render(); toast(f.editId ? '饮食记录已更新' : '饮食记录已保存');
}

async function submitWeight() {
  const f = state.form;
  const w = Number(f.weight);
  if (!w || w < 30 || w > 300) { toast('请输入有效体重'); return; }
  const bodyFat = f.bodyFat ? +Number(f.bodyFat).toFixed(1) : null;
  if (f.editId) {
    await API.updateWeight(f.editId, { weight: +w.toFixed(1), bodyFat });
    persist(); closeSheet(); render(); toast('体重记录已更新'); return;
  }
  // 同日打卡 upsert：覆盖当前日期旧值，避免趋势图同日多点
  const exist = DB.weights.find(x => x.date === state.date);
  if (exist) {
    await API.updateWeight(exist.id, { weight: +w.toFixed(1), bodyFat });
    persist(); closeSheet(); render(); toast(`已更新${fmtDate(state.date)}的体重`); return;
  }
  const rec = { id: uid(), date: state.date, weight: +w.toFixed(1), bodyFat };
  await API.addWeight(rec); persist(); closeSheet(); render(); toast('体重记录已保存');
}

async function submitGoals() {
  const f = state.form;
  const gw = Number(f.goalWeight);
  if (!gw || gw < 30 || gw > 300) { toast('请输入有效目标体重'); return; }
  await API.updateProfile({
    goal: f.goal, gender: f.gender, age: Number(f.age) || DB.profile.age,
    heightCm: Number(f.heightCm) || DB.profile.heightCm, activity: Number(f.activity), goalWeight: gw,
    pace: f.pace || 'mid', weeks: clampWeeks(f.weeks),
  });
  persist(); closeSheet(); render(); toast('目标已更新，仪表盘已联动');
}

async function delWorkout(id) { await API.deleteWorkout(id); persist(); render(); toast('已删除'); }
async function delMeal(id) { await API.deleteMeal(id); persist(); render(); toast('已删除'); }
async function delWeight(id) { await API.deleteWeight(id); persist(); render(); toast('已删除'); }

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
}

/* ---------- 启动 ---------- */
hydrate();
render();
