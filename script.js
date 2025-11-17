
document.addEventListener('DOMContentLoaded', () => {

  const navToggle = document.getElementById("navToggle");
  const menu = document.getElementById("primaryMenu");

  navToggle.addEventListener("click", () => {
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  });

  const checkerForm = document.getElementById("checkerForm");
  const resultBox = document.getElementById("result");
  const resetBtn = document.getElementById("resetBtn");

  function buildRecommendation({ name, age, symptoms, existing, details }) {
    let rec = [];
    let riskScore = 0;

    const severityMap = {
      "chest-pain": 40,
      "shortness": 35,
      "dizziness": 25,
      "blurred-vision": 20,
      "fatigue": 10,
      "nausea": 10
    };

    symptoms.forEach(s => riskScore += severityMap[s] || 0);

    if (age >= 60) {
      riskScore += 15;
      rec.push("Age factor: People above 60 should seek medical guidance sooner.");
    }

    const lower = existing.toLowerCase();

    if (lower.includes("diabetes")) {
      rec.push("Diabetes detected: Watch blood sugar fluctuations closely.");
      riskScore += 10;
    }
    if (lower.includes("hypertension")) {
      rec.push("Hypertension noted: High BP may worsen dizziness or chest discomfort.");
      riskScore += 12;
    }
    if (lower.includes("heart")) {
      rec.push("Existing heart condition: Chest pain requires urgent evaluation.");
      riskScore += 20;
    }

    if (symptoms.includes("chest-pain") && symptoms.includes("shortness")) {
      rec.push("These symptoms resemble cardiac stress signs. Seek urgent attention.");
    }

    rec.push("• Stay hydrated");
    rec.push("• Avoid heavy activity");
    rec.push("• Monitor symptoms for 24 hours");

    if (riskScore > 80) rec.unshift("<strong>⚠ Critical Warning:</strong> High-risk symptoms detected.");

    riskScore = Math.min(100, Math.max(10, riskScore));

    return `
      <h3>Recommendation for ${name || "Patient"}</h3>
      <p><strong>Risk Score:</strong> ${riskScore}/100</p>
      <ul>${rec.map(r => `<li>${r}</li>`).join("")}</ul>
      <p class="muted">${details || "No extra details provided."}</p>
      <small>Disclaimer: Educational tool, not medical diagnosis.</small>
    `;
  }

  checkerForm.addEventListener("submit", e => {
    e.preventDefault();

    const fd = new FormData(checkerForm);
    const name = fd.get("name");
    const age = fd.get("age");
    const existing = fd.get("existing");
    const details = fd.get("details");

    const symptoms = [...document.querySelectorAll("#symptoms input:checked")]
                      .map(i => i.value);

    resultBox.innerHTML = buildRecommendation({ name, age, symptoms, existing, details });
  });

  resetBtn.addEventListener("click", () => {
    checkerForm.reset();
    resultBox.innerHTML = "";
  });

  document.getElementById("year").textContent = new Date().getFullYear();

});

// Modal & article loader logic
(function(){
  const modal = document.getElementById('articleModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  const articlesJson = JSON.parse(document.getElementById('articles').textContent);

  function openArticle(key){
    const art = articlesJson[key];
    if(!art) return;
    modalTitle.innerHTML = art.title;
    modalBody.innerHTML = art.content;
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeArticle(){
    modal.setAttribute('aria-hidden','true');
    modalTitle.innerHTML = '';
    modalBody.innerHTML = '';
    document.body.style.overflow = '';
  }

  // attach to cards
  document.querySelectorAll('.card[data-article]').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-article');
      openArticle(key);
    });
    card.style.cursor = 'pointer';
  });

  modalClose.addEventListener('click', closeArticle);
  modal.addEventListener('click', (e)=>{
    if(e.target === modal) closeArticle();
  });

  // keyboard accessibility
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeArticle();
  });
})();
