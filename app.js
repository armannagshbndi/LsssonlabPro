function showSection(id) {
  document
    .querySelectorAll("main section")
    .forEach(s => s.classList.add("hidden"));

  const target = document.getElementById(id);
  if (target) {
    target.classList.remove("hidden");
    localStorage.setItem("lastSection", id);
  }
}

  



/* =================================
   FLOATING TOOL MENU - PRO
================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Restore Last Section ---------- */
  const last = localStorage.getItem("lastSection");
  if (last) showSection(last);

  if (window.innerWidth > 768) return;

  /* ---------- FAB BUTTON ---------- */
  const fab = document.createElement("div");
  fab.id = "fab-btn";
  fab.innerHTML = "☰";
  document.body.appendChild(fab);

  /* ---------- MENU ---------- */
  const menu = document.createElement("div");
  menu.id = "fab-menu";
menu.innerHTML = `
  <button onclick="openSection('prime')">${iconPrime()} فیزیک</button>
  <button onclick="openSection('calc')">${iconCalc()} ادبیات</button>
  <button onclick="openSection('stats')">${iconStats()} عربی</button>
  <button onclick="openSection('trig')">${iconTrig()} شیمی</button>
  <button onclick="showSection('english')">🇬🇧 انگلیسی</button>
  <button onclick="openSection('advancedCalculator')">${iconadvancedCalculator()} هوش مصنوعی</button>
  <button onclick="openSection('help')">${iconHelp()} راهنما</button>
  <button onclick="openSection('about')">${iconInfo()} درباره</button>
`;

  document.body.appendChild(menu);

  let open = false;

  /* ---------- Toggle ---------- */
  fab.addEventListener("click", (e) => {
    e.stopPropagation();
    open = !open;
    menu.classList.toggle("open", open);
    fab.classList.toggle("active", open);
    fab.innerHTML = open ? "✕" : "☰";
  });

  /* ---------- Close on Outside Click ---------- */
  document.addEventListener("click", () => {
    if (!open) return;
    open = false;
    menu.classList.remove("open");
    fab.classList.remove("active");
    fab.innerHTML = "☰";
  });

  menu.addEventListener("click", e => e.stopPropagation());
});

/* ---------- Open Section + Save ---------- */
function openSection(id) {
  showSection(id);


  const menu = document.getElementById("fab-menu");
  const fab = document.getElementById("fab-btn");
  if (menu && fab) {
    menu.classList.remove("open");
    fab.classList.remove("active");
    fab.innerHTML = "☰";
  }
}

/* =================================
   SVG ICONS
================================= */

function iconPrime(){ return "⚛️"; }     // فیزیک
function iconCalc(){ return "📖"; }      // ادبیات
function iconStats(){ return "📝"; }     // عربی
function iconTrig(){ return "🧪"; }      // شیمی
function iconTrig(){ return "🌍"; }  
function iconadvancedCalculator(){ return "🧠"; } // محاسبات
function iconHelp(){ return "❓"; }       // راهنما
function iconInfo(){ return "ℹ️"; }       // درباره







async function solveAIWithServer() {
  const input = document.getElementById("aiInput").value;
  const output = document.getElementById("aiOutput");

  if (!input.trim()) {
    output.innerHTML = "❗ لطفاً یک سوال وارد کنید";
    return;
  }

  output.innerHTML = "⏳ در حال تحلیل سوال...";

  try {
    const response = await fetch("/api/solve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question: input })
    });

    const data = await response.json();
    output.innerText = data.answer;
  } catch (err) {
    output.innerHTML = "❌ خطا در ارتباط با سرور";
  }
}




// سرعت: v = s / t
function calcSpeed() {
  let s = parseFloat(document.getElementById("v_distance").value);
  let t = parseFloat(document.getElementById("v_time").value);
  if (!s || !t) return document.getElementById("v_result").textContent="مقادیر صحیح وارد کنید";
  let v = s / t;
  document.getElementById("v_result").textContent = `v = ${v.toFixed(2)} m/s`;
}

// شتاب: a = (vf - vi)/t
function calcAcceleration() {
  let vf = parseFloat(document.getElementById("a_vf").value);
  let vi = parseFloat(document.getElementById("a_vi").value);
  let t = parseFloat(document.getElementById("a_time").value);
  if (!vf && !vi && !t) return document.getElementById("a_result").textContent="مقادیر صحیح وارد کنید";
  let a = (vf - vi)/t;
  document.getElementById("a_result").textContent = `a = ${a.toFixed(2)} m/s²`;
}

// نیرو: F = m * a
function calcForce() {
  let m = parseFloat(document.getElementById("f_mass").value);
  let a = parseFloat(document.getElementById("f_acc").value);
  if (!m || !a) return document.getElementById("f_result").textContent="مقادیر صحیح وارد کنید";
  let F = m * a;
  document.getElementById("f_result").textContent = `F = ${F.toFixed(2)} N`;
}

// وزن: W = m * g
function calcWeight() {
  let m = parseFloat(document.getElementById("w_mass").value);
  let g = parseFloat(document.getElementById("w_g").value);
  if (!m || !g) return document.getElementById("w_result").textContent="مقادیر صحیح وارد کنید";
  let W = m * g;
  document.getElementById("w_result").textContent = `W = ${W.toFixed(2)} N`;
}

// فشار: P = F / A
function calcPressure() {
  let F = parseFloat(document.getElementById("p_force").value);
  let A = parseFloat(document.getElementById("p_area").value);
  if (!F || !A) return document.getElementById("p_result").textContent="مقادیر صحیح وارد کنید";
  let P = F / A;
  document.getElementById("p_result").textContent = `P = ${P.toFixed(2)} Pa`;
}

// جابه‌جایی: Δx = x2 - x1
function calcDisplacement() {
  let x1 = parseFloat(document.getElementById("d_initial").value);
  let x2 = parseFloat(document.getElementById("d_final").value);
  if (!x1 && !x2) return document.getElementById("d_result").textContent="مقادیر صحیح وارد کنید";
  let dx = x2 - x1;
  document.getElementById("d_result").textContent = `Δx = ${dx.toFixed(2)} m`;
}

// گشتاور: τ = F * r * sinθ
function calcTorque() {
  let F = parseFloat(document.getElementById("t_force").value);
  let r = parseFloat(document.getElementById("t_radius").value);
  let theta = parseFloat(document.getElementById("t_angle").value) * Math.PI/180;
  if (!F || !r || !theta) return document.getElementById("t_result").textContent="مقادیر صحیح وارد کنید";
  let tau = F * r * Math.sin(theta);
  document.getElementById("t_result").textContent = `τ = ${tau.toFixed(2)} N·m`;
}

// مزیت مکانیکی: MA = F_out / F_in
function calcMechanicalAdv() {
  let Fout = parseFloat(document.getElementById("ma_fout").value);
  let Fin = parseFloat(document.getElementById("ma_fin").value);
  if (!Fout || !Fin) return document.getElementById("ma_result").textContent="مقادیر صحیح وارد کنید";
  let MA = Fout / Fin;
  document.getElementById("ma_result").textContent = `MA = ${MA.toFixed(2)}`;
}

// کار: W = F * d * cosθ
function calcWork() {
  let F = parseFloat(document.getElementById("work_force").value);
  let d = parseFloat(document.getElementById("work_distance").value);
  let theta = parseFloat(document.getElementById("work_angle").value) * Math.PI/180;
  if (!F || !d || !theta) return document.getElementById("work_result").textContent="مقادیر صحیح وارد کنید";
  let W = F * d * Math.cos(theta);
  document.getElementById("work_result").textContent = `W = ${W.toFixed(2)} J`;
}
function showPhysicsSection(id) {
  document.querySelectorAll(".physics-item").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function calcDensity() {
  const mass = parseFloat(document.getElementById("densityMass").value);
  const volume = parseFloat(document.getElementById("densityVolume").value);
  const result = document.getElementById("densityResult");

  if (!mass || !volume) {
    result.innerText = "جرم و حجم را وارد کنید.";
    return;
  }

  const density = mass / volume;

  result.innerText =
    "چگالی = " + density.toFixed(2) + " g/cm³";
}
  

function calcKineticEnergy() {
  const m = parseFloat(document.getElementById("massKE").value);
  const v = parseFloat(document.getElementById("velocityKE").value);
  const result = document.getElementById("keResult");

  if (!m || !v) {
    result.innerText = "جرم و سرعت را وارد کنید.";
    return;
  }

  const energy = 0.5 * m * v * v;

  result.innerText =
    "انرژی جنبشی = " + energy.toFixed(2) + " ژول";
}



function calcSolidPressure() {
  const F = parseFloat(document.getElementById("sp_force").value);
  const A = parseFloat(document.getElementById("sp_area").value);
  const result = document.getElementById("sp_result");

  if (!F || !A) {
    result.innerText = "نیرو و مساحت را وارد کنید.";
    return;
  }

  const P = F / A;
  result.innerText = "فشار = " + P.toFixed(2) + " پاسکال";
}





function calcLiquidPressure() {
  const rho = parseFloat(document.getElementById("lp_density").value);
  const h = parseFloat(document.getElementById("lp_height").value);
  const g = parseFloat(document.getElementById("lp_g").value);
  const result = document.getElementById("lp_result");

  if (!rho || !h) {
    result.innerText = "مقادیر را وارد کنید.";
    return;
  }

  const P = rho * g * h;
  result.innerText = "فشار مایع = " + P.toFixed(2) + " پاسکال";
}



function calcTotalPressure() {
  const p0 = parseFloat(document.getElementById("tp_surface").value);
  const rho = parseFloat(document.getElementById("tp_density").value);
  const h = parseFloat(document.getElementById("tp_height").value);
  const g = parseFloat(document.getElementById("tp_g").value);
  const result = document.getElementById("tp_result");

  if (!rho || !h) {
    result.innerText = "مقادیر را وارد کنید.";
    return;
  }

  const total = p0 + rho * g * h;
  result.innerText = "فشار کل = " + total.toFixed(2) + " پاسکال";
}


function calcFahrenheit() {
  const c = parseFloat(document.getElementById("celsiusF").value);
  const result = document.getElementById("fahrenheitResult");

  if (isNaN(c)) {
    result.innerText = "دما را وارد کنید";
    return;
  }

  const f = (c * 9 / 5) + 32;
  result.innerText = "دما = " + f.toFixed(2) + " °F";
}




function calcKelvin() {
  const c = parseFloat(document.getElementById("celsiusK").value);
  const result = document.getElementById("kelvinResult");

  if (isNaN(c)) {
    result.innerText = "دما را وارد کنید";
    return;
  }

  const k = c + 273.15;
  result.innerText = "دما = " + k.toFixed(2) + " K";
}

function calcLinearExpansion() {
  const L0 = parseFloat(l0.value);
  const a = parseFloat(alphaL.value);
  const dT = parseFloat(deltaTL.value);

  const dL = L0 * a * dT;
  linearResult.innerText = "افزایش طول = " + dL;
}


function calcAreaExpansion() {
  const A0 = parseFloat(a0.value);
  const a = parseFloat(alphaA.value);
  const dT = parseFloat(deltaTA.value);

  const dA = A0 * 2 * a * dT;
  areaResult.innerText = "افزایش سطح = " + dA;
}



function calcVolumeExpansion() {
  const V0 = parseFloat(v0.value);
  const a = parseFloat(alphaV.value);
  const dT = parseFloat(deltaTV.value);

  const dV = V0 * 3 * a * dT;
  volumeResult.innerText = "افزایش حجم = " + dV;
}




function calcDensityChange() {
  const rho0v = parseFloat(rho0.value);
  const b = parseFloat(beta.value);
  const dT = parseFloat(deltaTRho.value);

  const rho = rho0v / (1 + b * dT);
  densityResult.innerText = "چگالی جدید = " + rho;
}




function calcEquilibrium() {
  const m1v = parseFloat(m1.value);
  const c1v = parseFloat(c1.value);
  const t1v = parseFloat(t1.value);

  const m2v = parseFloat(m2.value);
  const c2v = parseFloat(c2.value);
  const t2v = parseFloat(t2.value);

  const T =
    (m1v * c1v * t1v + m2v * c2v * t2v) /
    (m1v * c1v + m2v * c2v);

  equilibriumResult.innerText = "دمای تعادل = " + T.toFixed(2) + " °C";
}
function calcElectricForce() {
  const q1v = parseFloat(q1.value);
  const q2v = parseFloat(q2.value);
  const rv = parseFloat(r.value);
  const result = document.getElementById("electricForceResult");

  if (!q1v || !q2v || !rv) {
    result.innerText = "تمام مقادیر را وارد کنید";
    return;
  }

  const k = 9e9; // N·m²/C²
  const F = k * Math.abs(q1v * q2v) / (rv * rv);

  result.innerText = "نیروی الکتریکی = " + F.toExponential(3) + " N";
}
function calcElectricField() {
  const qv = parseFloat(qField.value);
  const rv = parseFloat(rField.value);
  const result = document.getElementById("electricFieldResult");

  if (!qv || !rv) {
    result.innerText = "تمام مقادیر را وارد کنید";
    return;
  }

  const k = 9e9; // N·m²/C²
  const E = k * Math.abs(qv) / (rv * rv);

  result.innerText = "میدان الکتریکی = " + E.toExponential(3) + " N/C";
}

function calcElectricWork() {
  const qv = parseFloat(qWork.value);
  const dV = parseFloat(deltaV.value);
  const result = document.getElementById("electricWorkResult");

  if (isNaN(qv) || isNaN(dV)) {
    result.innerText = "تمام مقادیر را وارد کنید";
    return;
  }

  const W = qv * dV;
  result.innerText = "کار الکتریکی = " + W.toFixed(3) + " J";
}
function calcPowerPhysics() {
  const W = parseFloat(workP.value);
  const t = parseFloat(timeP.value);

  const F = parseFloat(forceP.value);
  const v = parseFloat(velocityP.value);

  const result = document.getElementById("powerPhysicsResult");

  let P1, P2;
  if (!isNaN(W) && !isNaN(t) && t !== 0) {
    P1 = W / t;
  }

  if (!isNaN(F) && !isNaN(v)) {
    P2 = F * v;
  }

  if (P1 && P2) {
    result.innerText = `توان از W/t = ${P1.toFixed(2)} W\nتوان از F.v = ${P2.toFixed(2)} W`;
  } else if (P1) {
    result.innerText = `توان = ${P1.toFixed(2)} W (W/t)`;
  } else if (P2) {
    result.innerText = `توان = ${P2.toFixed(2)} W (F.v)`;
  } else {
    result.innerText = "لطفاً مقادیر صحیح وارد کنید";
  }
}
function calcCurrentPhysics() {
  const V = parseFloat(voltageP.value);
  const R = parseFloat(resistanceP.value);
  const result = document.getElementById("currentPhysicsResult");

  if (isNaN(V) || isNaN(R) || R === 0) {
    result.innerText = "مقادیر صحیح وارد کنید (R ≠ 0)";
    return;
  }

  const I = V / R;
  result.innerText = "جریان = " + I.toFixed(3) + " A";
}


function calcGasLawCompare() {
  const P1v = parseFloat(P1.value);
  const V1v = parseFloat(V1.value);
  const T1v = parseFloat(T1.value);
  const P2v = parseFloat(P2.value);
  const V2v = parseFloat(V2.value);
  const T2v = parseFloat(T2.value);
  const result = document.getElementById("gasLawCompareResult");

  // محاسبه مقدار خالی
  if (!P1v && P2v && V1v && V2v && T1v && T2v) {
    result.innerText = `P1 = ${(P2v*V2v*T1v/(V1v*T2v)).toFixed(3)} Pa`;
  } else if (P1v && !V1v && P2v && V2v && T1v && T2v) {
    result.innerText = `V1 = ${(P2v*V2v*T1v/(P1v*T2v)).toFixed(3)} m³`;
  } else if (P1v && V1v && !T1v && P2v && V2v && T2v) {
    result.innerText = `T1 = ${(P1v*V1v*T2v/(P2v*V2v)).toFixed(3)} K`;
  } else if (P1v && V1v && T1v && !P2v && V2v && T2v) {
    result.innerText = `P2 = ${(P1v*V1v*T2v/(V2v*T1v)).toFixed(3)} Pa`;
  } else if (P1v && V1v && T1v && P2v && !V2v && T2v) {
    result.innerText = `V2 = ${(P1v*V1v*T2v/(P2v*T1v)).toFixed(3)} m³`;
  } else if (P1v && V1v && T1v && P2v && V2v && !T2v) {
    result.innerText = `T2 = ${(P2v*V2v*T1v/(P1v*V1v)).toFixed(3)} K`;
  } else {
    result.innerText = "یک مقدار خالی برای محاسبه بگذارید";
  }
}


function calcGasLawMain() {
  const P = parseFloat(P_main.value);
  const V = parseFloat(V_main.value);
  const n = parseFloat(n_main.value);
  const T = parseFloat(T_main.value);
  const result = document.getElementById("gasLawMainResult");
  const R = 8.314;

  if (!P && !V && n && T) {
    result.innerText = `فشار = ${(n*R*T/V).toFixed(3)} Pa`;
  } else if (P && !V && n && T) {
    result.innerText = `حجم = ${(n*R*T/P).toFixed(3)} m³`;
  } else if (P && V && !n && T) {
    result.innerText = `تعداد مول = ${(P*V/(R*T)).toFixed(3)} mol`;
  } else if (P && V && n && !T) {
    result.innerText = `دمای T = ${(P*V/(n*R)).toFixed(3)} K`;
  } else {
    result.innerText = "لطفاً مقادیر مناسب وارد کنید (یک مقدار خالی برای محاسبه)";
  }
}


function calcNewton2() {
  const m = parseFloat(massN2.value);
  const a = parseFloat(accN2.value);
  const result = document.getElementById("newton2Result");

  if (isNaN(m) || isNaN(a)) {
    result.innerText = "مقادیر معتبر وارد کنید";
    return;
  }

  const F = m * a;
  result.innerText = "نیرو = " + F.toFixed(3) + " N";
}
function calcNormalForce() {
  const m = parseFloat(massN.value);
  const g = parseFloat(gN.value);
  const result = document.getElementById("normalForceResult");

  if (isNaN(m) || isNaN(g)) {
    result.innerText = "مقادیر معتبر وارد کنید";
    return;
  }

  const N = m * g;
  result.innerText = "نیروی واکنش سطح = " + N.toFixed(3) + " N";
}
function calcApparentWeight() {
  const m = parseFloat(massAW.value);
  const a = parseFloat(accAW.value);
  const dir = dirAW.value;
  const g = 9.8;
  const result = document.getElementById("apparentWeightResult");

  if (isNaN(m) || isNaN(a)) {
    result.innerText = "مقادیر معتبر وارد کنید";
    return;
  }

  let W;
  if (dir === "up") {
    W = m * (g + a);
  } else {
    W = m * (g - a);
  }

  result.innerText = "وزن ظاهری = " + W.toFixed(3) + " N";
}
function calcFrictionStatic() {
  const mu = parseFloat(muS.value);
  const N = parseFloat(Nstatic.value);
  const result = document.getElementById("frictionStaticResult");

  if (isNaN(mu) || isNaN(N)) {
    result.innerText = "مقادیر معتبر وارد کنید";
    return;
  }

  const F = mu * N;
  result.innerText = "حداکثر نیروی اصطکاک ایستایی = " + F.toFixed(3) + " N";
}
function calcFrictionKinetic() {
  const mu = parseFloat(muK.value);
  const N = parseFloat(Nkinetic.value);
  const result = document.getElementById("frictionKineticResult");

  if (isNaN(mu) || isNaN(N)) {
    result.innerText = "مقادیر معتبر وارد کنید";
    return;
  }

  const F = mu * N;
  result.innerText = "نیروی اصطکاک جنبشی = " + F.toFixed(3) + " N";
}
function calcSpringForce() {
  const k = parseFloat(kSpring.value);
  const x = parseFloat(xSpring.value);
  const result = document.getElementById("springForceResult");

  if (isNaN(k) || isNaN(x)) {
    result.innerText = "مقادیر معتبر وارد کنید";
    return;
  }

  const F = k * x;
  result.innerText = "نیروی فنر = " + F.toFixed(3) + " N";
}


function showLiteratureSection(id) {
  document.querySelectorAll(".literature-item").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}





function showLiteratureSection(id){
  document.querySelectorAll(".literature-item")
    .forEach(e => e.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function showArabicSection(id){
  document.querySelectorAll(".arabic-item")
    .forEach(e => e.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function showChemistrySection(id){
  document.querySelectorAll(".chemistry-item")
    .forEach(e => e.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}






/***********************
        ادبیات
************************/
/***********************
   تغییر زیربخش‌ها
************************/
function showLiteratureSection(id){
  document.querySelectorAll(".literature-item")
    .forEach(el => el.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

/***********************
      بخش 1: معنی لغات
************************/
async function findMeaning() {
  const word = document.getElementById("litWord").value.trim();
  const result = document.getElementById("litMeaning");

  if (!word) {
    result.innerHTML = "لغت وارد کنید";
    return;
  }

  result.innerHTML = "در حال جستجو...";

  try {
    const url =
      "https://fa.wiktionary.org/w/api.php?action=query&prop=extracts&explaintext=1&format=json&origin=*&titles=" +
      encodeURIComponent(word);

    const res = await fetch(url);
    const data = await res.json();

    const pages = data.query.pages;
    const page = Object.values(pages)[0];

    if (!page.extract) {
      result.innerHTML = "معنی پیدا نشد";
      return;
    }

    result.innerHTML = page.extract.replace(/\n/g, "<br>");

  } catch (e) {
    result.innerHTML = "خطا در اتصال";
  }
}



/***********************
      بخش 2: تحلیل جمله
************************/
function analyzeSentence() {
  const text = document.getElementById("litSentence").value.trim();
  const result = document.getElementById("litAnalysisResult");

  if (!text) {
    result.innerText = "متنی وارد نشده.";
    return;
  }

  // تعداد حروف
  const letters = text.replace(/\s/g, "").length;

  // تعداد کلمات
  const words = text.split(/\s+/).filter(w => w.length > 0).length;

  // تعداد جملات
  const sentences = text.split(/[.!؟]/).filter(s => s.trim().length > 0).length;

  result.innerText = `تعداد حروف: ${letters} | تعداد کلمات: ${words} | تعداد جملات: ${sentences}`;
}

/***********************
      بخش 3: شاعران و کتاب‌ها
************************/
const poets = {
  "فردوسی": ["شاهنامه", "دیوان فردوسی", "قرن: 4 و 5"],
  "مولانا": ["مثنوی معنوی", "دیوان شمس", "قرن: 7"],
  "سعدی": ["گلستان", "بوستان", "دیوان سعدی", "قرن: 7"],
  "حافظ": ["دیوان حافظ", "قرن: 8"],
  "خیام": ["رباعیات خیام", "قرن: 5"],
  "نظامی": ["خمسه نظامی", "لیلی و مجنون", "خسرو و شیرین", "قرن: 6"],
  "عطار": ["منطق‌الطیر", "الهی‌نامه", "تذکرةالاولیا", "قرن: 6"],
  "رودکی": ["دیوان رودکی", "قرن: 3 و 4"],
  "منوچهری": ["دیوان منوچهری", "قرن: 5"],
  "فرخی سیستانی": ["دیوان فرخی", "قرن: 5"],
  "ناصر خسرو": ["دیوان اشعار", "سفرنامه", "قرن: 5"],
  "سنایی": ["حدیقه الحقیقه", "دیوان سنایی", "قرن: 6"],
  "باباطاهر": ["دو بیتی‌ها", "قرن: 5"],
  "عبید زاکانی": ["موش و گربه", "رساله دلگشا", "قرن: 8"],
  "وحشی بافقی": ["فرهاد و شیرین", "دیوان اشعار", "قرن: 10"],
  "صائب تبریزی": ["دیوان صائب", "قرن: 11"],
  "بیدل دهلوی": ["دیوان بیدل", "قرن: 11"],
  "پروین اعتصامی": ["دیوان پروین", "قرن: 14"],
  "نیما یوشیج": ["افسانه", "شعر نو", "قرن: 14"],
  "احمد شاملو": ["هوای تازه", "ابراهیم در آتش", "قرن: 14"],
  "سهراب سپهری": ["هشت کتاب", "قرن: 14"],
  "فروغ فرخزاد": ["تولدی دیگر", "قرن: 14"],
  "مهدی اخوان ثالث": ["زمستان", "قرن: 14"],
  "شهریار": ["حیدربابایه سلام", "دیوان شهریار", "قرن: 14"],
  "قیصر امین‌پور": ["تنفس صبح", "قرن: 14"],
  "سلمان هراتی": ["آسمان سبز", "قرن: 14"]
};


// بارگذاری شاعران در select هنگام شروع
window.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("poetSelect");
  Object.keys(poets).forEach(poet => {
    const option = document.createElement("option");
    option.value = poet;
    option.innerText = poet;
    select.appendChild(option);
  });
});

function showBooks() {
  const poet = document.getElementById("poetSelect").value;
  const list = document.getElementById("booksList");
  list.innerHTML = "";

  if (!poet) return;

  poets[poet].forEach(book => {
    const li = document.createElement("li");
    li.innerText = book;
    list.appendChild(li);
  });
}


/***********************
          عربی
************************/

async function translateArabic() {
  const word = document.getElementById("arWord").value.trim();
  const result = document.getElementById("arMeaning");

  if (!word) {
    result.innerText = "کلمه‌ای وارد نشده.";
    return;
  }

  result.innerText = "در حال ترجمه...";

  try {
    const res = await fetch(
      "https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=fa&dt=t&q=" +
        encodeURIComponent(word)
    );

    const data = await res.json();
    result.innerText = data[0][0][0];
  } catch (e) {
    result.innerText = "خطا در ترجمه.";
  }
}


/***********************
          شیمی
************************/
function analyzeAtom() {
  let input = document.getElementById("molarMassInput1").value;

  // استخراج عدد از ورودی مثل P15
  let number = parseInt(input.replace(/\D/g, ""));
  if (!number || number <= 0) {
    document.getElementById("molarMassResult1").innerHTML = "ورودی نامعتبر";
    return;
  }

  let electrons = number;
  let layers = [];
  
  // لایه اول
  if (electrons > 0) {
    let take = Math.min(2, electrons);
    layers.push(take);
    electrons -= take;
  }

  // لایه‌های بعدی (حداکثر 8)
  while (electrons > 0) {
    let take = Math.min(8, electrons);
    layers.push(take);
    electrons -= take;
  }

  let period = layers.length;
  let group = layers[layers.length - 1];

  document.getElementById("molarMassResult1").innerHTML =
    "تعداد کل الکترون: " + number +
    "<br>تعداد مدارها (ردیف): " + period +
    "<br>گروه: " + group +
    "<br>الکترون در هر لایه: " + layers.join(" ، ");
}


const molarMassTable = {
  H: 1,
  C: 12,
  O: 16,
  N: 14,
  Na: 23,
  Cl: 35.5,
  Ca: 40,
  S: 32
};

// محاسبه جرم مولی ساده
function calcMolarMass() {
  const formula = document
    .getElementById("molarMassInput")
    .value.trim();

  const result = document.getElementById("molarMassResult");

  if (!formula) {
    result.innerText = "فرمول وارد نشده.";
    return;
  }

  let total = 0;
  const regex = /([A-Z][a-z]?)(\d*)/g;
  let match;

  while ((match = regex.exec(formula)) !== null) {
    const element = match[1];
    const count = parseInt(match[2] || "1");

    if (!molarMassTable[element]) {
      result.innerText = "عنصر ناشناخته: " + element;
      return;
    }

    total += molarMassTable[element] * count;
  }

  result.innerText = "جرم مولی ≈ " + total + " g/mol";
}

// تعداد مول
function calcMoles() {
  const mass = parseFloat(document.getElementById("massInput").value);
  const mm = parseFloat(document.getElementById("mmInput").value);
  const result = document.getElementById("moleResult");

  if (!mass || !mm) {
    result.innerText = "مقادیر کامل نیست.";
    return;
  }

  result.innerText = "تعداد مول = " + (mass / mm).toFixed(3);
}

// غلظت محلول
function calcConcentration() {
  const n = parseFloat(document.getElementById("solute").value);
  const v = parseFloat(document.getElementById("volume").value);
  const result = document.getElementById("concResult");

  if (!n || !v) {
    result.innerText = "اطلاعات کامل نیست.";
    return;
  }

  result.innerText = "غلظت = " + (n / v).toFixed(3) + " M";
}



/***********************
   تغییر زیربخش انگلیسی
************************/
function showEnglishSection(id) {
  document.querySelectorAll(".english-item")
    .forEach(el => el.classList.add("hidden"));

  document.getElementById(id)
    .classList.remove("hidden");
}

/***********************
   EN -> FA
************************/
async function translateEnToFa() {
  const text = document.getElementById("enInput").value.trim();
  const result = document.getElementById("enResult");

  if (!text) {
    result.innerText = "متنی وارد نشده.";
    return;
  }

  result.innerText = "در حال ترجمه...";

  const res = await fetch(
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=fa&dt=t&q=" +
      encodeURIComponent(text)
  );

  const data = await res.json();
  result.innerText = data[0][0][0];
}

/***********************
   FA -> EN
************************/
async function translateFaToEn() {
  const text = document.getElementById("faInput").value.trim();
  const result = document.getElementById("faResult");

  if (!text) {
    result.innerText = "متنی وارد نشده.";
    return;
  }

  result.innerText = "در حال ترجمه...";

  const res = await fetch(
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=fa&tl=en&dt=t&q=" +
      encodeURIComponent(text)
  );

  const data = await res.json();
  result.innerText = data[0][0][0];
}







