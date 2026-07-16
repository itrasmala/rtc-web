document.addEventListener('DOMContentLoaded', () => {

  /* ---------- سنة الفوتر ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- الهيدر عند التمرير + شريط التقدم ---------- */
  const header = document.getElementById('siteHeader');
  const progress = document.getElementById('voltProgress');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
    const h = document.documentElement;
    const scrollPercent = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    if (progress) progress.style.width = scrollPercent + '%';
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- قائمة الجوال ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  }));

  /* ---------- تفعيل رابط القسم الحالي (scrollspy) ---------- */
  const sections = ['home','about','services','portfolio','partners','contact']
    .map(id => document.getElementById(id)).filter(Boolean);
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spyObserver.observe(s));

  /* ---------- كشف عند التمرير (reveal) ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---------- عدّاد الإحصائيات ---------- */
  const stats = document.querySelectorAll('.stat-num');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const isPlain = el.dataset.plain === 'true';
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const value = Math.round(target * eased);
        el.textContent = isPlain ? value : value.toLocaleString('en-US');
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.6 });
  stats.forEach(s => countObserver.observe(s));

  /* ---------- بناء معرض الأعمال (30 مشروع) ---------- */
  const portfolioGrid = document.getElementById('portfolioGrid');
  const portfolioImages = [];
  for (let i = 1; i <= 30; i++) {
    const src = `img/portfolio/project${i}.jpg`;
    portfolioImages.push(src);
    const item = document.createElement('div');
    item.className = 'portfolio-item reveal';
    item.dataset.index = i - 1;
    item.innerHTML = `<img src="${src}" alt="مشروع RTC رقم ${i}" loading="lazy"><span class="p-label">مشروع ${i}</span>`;
    portfolioGrid.appendChild(item);
    revealObserver.observe(item);
  }

  /* ---------- بناء شبكة الشركاء ---------- */
  const partnersData = [
    { file: 'stc.png', name: 'STC' },
    { file: 'sec.png', name: 'الشركة السعودية للكهرباء' },
    { file: 'riyadh.jpg', name: 'أمانة منطقة الرياض' },
    { file: 'nwc.jpg', name: 'شركة المياه الوطنية' },
    { file: 'nga.jpg', name: 'التحالف السعودي للغاز' },
    { file: 'nbk.png', name: 'بنك الكويت الوطني' },
    { file: 'mobily.png', name: 'موبايلي' },
  ];
  const partnersGrid = document.getElementById('partnersGrid');
  partnersData.forEach((p, i) => {
    const el = document.createElement('div');
    el.className = 'partner-logo reveal';
    el.innerHTML = `<img src="img/partners/${p.file}" alt="${p.name}" loading="lazy">`;
    partnersGrid.appendChild(el);
    revealObserver.observe(el);
  });

  /* ---------- نافذة عرض الصور (Lightbox) ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = (index + portfolioImages.length) % portfolioImages.length;
    lightboxImg.src = portfolioImages[currentIndex];
    lightboxImg.alt = `مشروع RTC رقم ${currentIndex + 1}`;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  portfolioGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.portfolio-item');
    if (item) openLightbox(parseInt(item.dataset.index, 10));
  });
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  lightboxPrev.addEventListener('click', () => openLightbox(currentIndex - 1));
  lightboxNext.addEventListener('click', () => openLightbox(currentIndex + 1));
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') openLightbox(currentIndex - 1); /* RTL */
    if (e.key === 'ArrowLeft') openLightbox(currentIndex + 1);
  });

  /* ---------- نموذج التواصل → Formspree ---------- */
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('formSubmitBtn');
  const statusEl = document.getElementById('formStatus');
  const FORM_ENDPOINT = 'https://formspree.io/f/xdarpopq';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'جارٍ الإرسال...';
    statusEl.textContent = '';
    statusEl.className = 'form-status';

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        statusEl.textContent = '✓ تم إرسال رسالتك بنجاح، سنتواصل معك قريباً.';
        statusEl.classList.add('ok');
        form.reset();
      } else {
        statusEl.textContent = 'حدث خطأ أثناء الإرسال، حاول مرة أخرى أو تواصل معنا هاتفياً.';
        statusEl.classList.add('err');
      }
    } catch (err) {
      statusEl.textContent = 'تعذّر الاتصال بالخادم، تحقق من اتصالك بالإنترنت وحاول مجدداً.';
      statusEl.classList.add('err');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'إرسال الرسالة';
    }
  });
});