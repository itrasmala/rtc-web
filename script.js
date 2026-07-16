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

  /* ==========================================================
     نظام اللغة (عربي / إنجليزي)
     - النص العربي الأصلي يُحفظ تلقائياً من الصفحة نفسها
     - قاموس EN يحتوي الترجمة الإنجليزية فقط
     ========================================================== */
  const EN = {
    'brand.sub': 'Rasmala Marketing Contracting',
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Our Services',
    'nav.portfolio': 'Portfolio',
    'nav.partners': 'Our Partners',
    'nav.contact': 'Contact Us',

    'hero.eyebrow': 'Rasmala Marketing Contracting Est. <span class="dot">•</span> Riyadh, Saudi Arabia',
    'hero.title': 'Your Trusted Partner<br>in <span class="accent-word">Contracting</span>',
    'hero.sub': 'We build a future that combines achievement with contracting strength — from design to delivery, backed by electrical and engineering expertise.',
    'hero.cta1': 'Explore Our Projects',
    'hero.cta2': 'Our Services',
    'stat.founded': 'Established in',
    'stat.projects': 'Completed Projects',
    'stat.clients': 'Satisfied Clients',

    'about.overline': 'Get to Know Us',
    'about.title': 'About Us',
    'about.c1.h': 'About the Company',
    'about.c1.p': 'Rasmala Marketing Contracting, headquartered in Riyadh, Saudi Arabia, is a leading provider of innovative and tailored solutions in electrical contracting and infrastructure. With a strict commitment to ethical principles and a continuous drive to exceed our clients\u2019 expectations, we deliver a wide range of services covering residential, commercial and industrial projects, power generation, railways, airports and substations. We stand out through our deep expertise and the professionalism of our team, enabling us to provide reliable, high-quality services that contribute to the success of our clients\u2019 projects and their complete satisfaction.',
    'about.c2.h': 'Our Mission',
    'about.c2.p': 'At Rasmala Marketing Contracting, we see tough competition as a driver for excellence. We are a dedicated team working toward our goal of becoming a strong contractor in general construction and contracting. Our talented team is capable of delivering professional services efficiently and quickly. Our aim is to be an effective electrical contractor operating in an ethical and balanced manner, positioning us to become the leading establishment in electrical services.',
    'about.c3.h': 'Our Vision',
    'about.c3.p': 'We strive at Rasmala Marketing Contracting to be pioneers in electrical contracting in the Kingdom of Saudi Arabia, by providing innovative solutions and high-quality services that meet our clients\u2019 needs and exceed their expectations. We aspire to be a role model in professional ethics, innovation and sustainability.',

    'ceo.overline': 'CEO Message',
    'ceo.p1': 'The business model of Rasmala Marketing Contracting was designed around innovative thinking, strong engineering, teamwork, and the fundamental principle of transparency with employees, stakeholders and clients.',
    'ceo.p2': 'Our strategy is very clear, and we believe it will enable us to achieve our ambitions for continuous growth. We cannot compromise on quality and safety at any stage of a project.',
    'ceo.p3': 'By implementing these values and principles as part of our daily routine, we will be creative in thought and action, continuously enhancing and developing the value of this organization.',
    'ceo.p4': 'With our enthusiastic and ambitious management team, we have combined experienced engineers with strong fundamentals, creativity and ambition in a strategic pursuit to become one of the leading contracting companies in Saudi Arabia. Our key strength is investing in our people at every level so they can gain more high-level professional skills with each passing day.',
    'ceo.p5': 'Thanks to highly professional teamwork, we have succeeded in achieving the establishment\u2019s goals and objectives — not only completing our projects safely, with quality, on time and within budget, but also ensuring harmony in every step we take with all stakeholders and clients. We believe this is the key to our success.',
    'ceo.sign': 'Sultan bin Fahd Al Dhabiah<span>Chief Executive Officer</span>',

    'svc.overline': 'What We Offer',
    'svc.title': 'Our Services',
    'svc.cta': 'Request a Consultation & Quote',
    'svc.c1.h': 'Electrical Contracting Services',
    'svc.c1.p': 'Integrated services in high and medium voltage works and power generation.',
    'svc.c1.l1': 'Services for residential and commercial buildings',
    'svc.c1.l2': 'Services for industrial buildings',
    'svc.c1.l3': 'High/medium voltage works and power generation',
    'svc.c1.l4': 'Electrical infrastructure for railways, airports and substations',
    'svc.c1.l5': 'Civil and electromechanical works',
    'svc.c1.l6': 'High and medium voltage substation works',
    'svc.c1.l7': 'Contracting with the Saudi Electricity Company under unified distribution contracts',
    'svc.c2.h': 'Excavation & Electrical Cabling Services',
    'svc.c2.p': 'Specialized services in excavation and underground cable laying, along with asphalt works and consumer connections, within construction projects of all types.',
    'svc.c2.l1': 'Excavation, underground cable laying and termination',
    'svc.c2.l2': 'Consumer connections and electricity meter installation',
    'svc.c2.l3': 'Asphalt services and more',
    'svc.c2.l4': 'Excavation and foundation works',
    'svc.c2.l5': 'Excavation and backfilling works',
    'svc.c3.h': 'Project Management',
    'svc.c3.p': 'Professional project management services that ensure your project is completed on time and within budget, while maintaining the highest quality standards.',
    'svc.c3.l1': 'Planning and scheduling',
    'svc.c3.l2': 'Cost and budget management',
    'svc.c3.l3': 'Quality and safety control',
    'svc.c3.l4': 'Comprehensive periodic client reports',

    'sol.h': 'End-to-End Integrated Construction Solutions',
    'sol.p': 'From design to delivery, we accompany you at every step to ensure your project\u2019s success',
    'sol.c1.h': 'Technical Expertise',
    'sol.c1.p': 'Rasmala Marketing Contracting is well equipped to provide qualified technical service staff to clients, drawing on extensive experience. Most of our staff have five to seven years of international experience in their fields.',
    'sol.c2.h': 'Supervision',
    'sol.c2.p': 'Supervisors are assigned to every job entrusted to RTC to ensure proper execution in line with the set schedule.',
    'sol.c2.l1': 'Daily supervision of the quality of completed tasks',
    'sol.c2.l2': 'Ensuring adherence to the set schedule',
    'sol.c2.l3': 'Keeping management constantly informed of work quality and performance',
    'sol.c2.l4': 'Ensuring proper distribution of supplies',
    'sol.c2.l5': 'Following up on work requirements to improve quality',
    'sol.c3.h': 'The Role of Contracting Companies',
    'sol.c3.p': 'Contracting companies play a vital role in realizing Saudi Arabia\u2019s Vision 2030.',    'sol.c3.l1': 'Developing infrastructure and economic and social projects',
    'sol.c3.l2': 'Using modern technologies and smart solutions',
    'sol.c3.l3': 'Developing major projects across various sectors',
    'sol.c3.l4': 'Providing job opportunities and developing national skills',
    'sol.c3.l5': 'Transferring technology and knowledge to the Kingdom',

    'proc.overline': 'How We Work',
    'proc.title': 'Our Work Stages',
    'proc.sub': 'We follow a clear, organized methodology to ensure the success of every project',
    'proc.s1.h': 'Initial Consultation',
    'proc.s1.p': 'We listen to your requirements and vision and present our initial proposals',
    'proc.s2.h': 'Design & Planning',
    'proc.s2.p': 'Preparing designs, drawings and financial estimates',
    'proc.s3.h': 'Contract Signing',
    'proc.s3.p': 'A clear, comprehensive agreement defining all details and payments',
    'proc.s4.h': 'Execution',
    'proc.s4.p': 'Work begins at full capacity with continuous quality monitoring',
    'proc.s5.h': 'Delivery',
    'proc.s5.p': 'Full project handover with post-delivery warranty',

    'port.overline': 'Our Work',
    'port.title': 'Project Gallery',
    'port.sub': 'A curated selection of projects delivered by RTC across the Kingdom',

    'part.overline': 'Success Partners',
    'part.title': 'Our Partners',

    'cont.overline': 'Get in Touch',
    'cont.title': 'Contact Us',
    'cont.sub': 'We would be delighted to hear from you to discuss your projects and needs',
    'cont.addrH': 'Address',
    'cont.addrP': 'Riyadh, Saudi Arabia',
    'cont.phoneH': 'Phone',
    'cont.mailH': 'Email',
    'cont.callBtn': 'Call Now',
    'cont.map': 'Open in Google Maps ↗',

    'form.name': 'Name',
    'form.namePh': 'Your full name',
    'form.phone': 'Mobile Number',
    'form.email': 'Email',
    'form.service': 'Service',
    'form.opt0': 'Choose a service',
    'form.opt1': 'General Contracting',
    'form.opt2': 'Project Management',
    'form.opt3': 'Recruitment',
    'form.opt4': 'Engineering Solutions',
    'form.msg': 'Message',
    'form.msgPh': 'Write your message here...',
    'form.submit': 'Send Message',

    'footer.copy': 'Rasmala Marketing Contracting Est. All rights reserved.'
  };

  const MESSAGES = {
    ar: {
      title: 'RTC | مؤسسة رسملة التسويق للمقاولات',
      sending: 'جارٍ الإرسال...',
      submit: 'إرسال الرسالة',
      ok: '✓ تم إرسال رسالتك بنجاح، سنتواصل معك قريباً.',
      err: 'حدث خطأ أثناء الإرسال، حاول مرة أخرى أو تواصل معنا هاتفياً.',
      net: 'تعذّر الاتصال بالخادم، تحقق من اتصالك بالإنترنت وحاول مجدداً.',
      project: (n) => `مشروع ${n}`,
      projectAlt: (n) => `مشروع RTC رقم ${n}`
    },
    en: {
      title: 'RTC | Rasmala Marketing Contracting Est.',
      sending: 'Sending...',
      submit: 'Send Message',
      ok: '✓ Your message has been sent successfully. We will contact you soon.',
      err: 'An error occurred while sending. Please try again or contact us by phone.',
      net: 'Could not reach the server. Check your internet connection and try again.',
      project: (n) => `Project ${n}`,
      projectAlt: (n) => `RTC Project No. ${n}`
    }
  };

  let currentLang = 'ar';
  const langBtn = document.getElementById('langSwitch');
  const arTextCache = new Map();   // element -> original Arabic innerHTML
  const arPhCache = new Map();     // element -> original Arabic placeholder

  // حفظ النص العربي الأصلي مرة واحدة عند التحميل
  document.querySelectorAll('[data-i18n]').forEach(el => arTextCache.set(el, el.innerHTML));
  document.querySelectorAll('[data-i18n-ph]').forEach(el => arPhCache.set(el, el.getAttribute('placeholder')));

  function applyLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = MESSAGES[lang].title;
    langBtn.textContent = lang === 'ar' ? 'EN' : 'عربي';

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (lang === 'en') {
        if (EN[key] !== undefined) el.innerHTML = EN[key];
      } else {
        if (arTextCache.has(el)) el.innerHTML = arTextCache.get(el);
      }
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.dataset.i18nPh;
      if (lang === 'en') {
        if (EN[key] !== undefined) el.setAttribute('placeholder', EN[key]);
      } else {
        if (arPhCache.has(el)) el.setAttribute('placeholder', arPhCache.get(el));
      }
    });

    // تحديث تسميات معرض الأعمال
    document.querySelectorAll('.portfolio-item').forEach(item => {
      const n = parseInt(item.dataset.num, 10);
      const label = item.querySelector('.p-label');
      const img = item.querySelector('img');
      if (label) label.textContent = MESSAGES[lang].project(n);
      if (img) img.alt = MESSAGES[lang].projectAlt(n);
    });

    // إعادة نص زر الإرسال إن لم يكن في حالة إرسال
    const submitBtn = document.getElementById('formSubmitBtn');
    if (submitBtn && !submitBtn.disabled) submitBtn.textContent = MESSAGES[lang].submit;
  }

  langBtn.addEventListener('click', () => {
    applyLang(currentLang === 'ar' ? 'en' : 'ar');
  });

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

  /* ---------- معرض الأعمال: 3 صفوف ثابتة بأسهم تنقّل (10 صور لكل صف) ---------- */
  const rowsWrap = document.getElementById('portfolioRows');
  const ROWS = 3, PER_ROW = 10;
  const rowImages = []; // rowImages[r] = مصادر صور الصف

  for (let r = 0; r < ROWS; r++) {
    const srcs = [];
    for (let i = 1; i <= PER_ROW; i++) {
      const n = r * PER_ROW + i;
      srcs.push(`img/portfolio/project${n}.jpg`);
    }
    rowImages.push(srcs);

    const rowEl = document.createElement('div');
    rowEl.className = 'carousel-row reveal';

    const btnLeft = document.createElement('button');
    btnLeft.type = 'button';
    btnLeft.className = 'car-btn car-left';
    btnLeft.setAttribute('aria-label', 'تمرير لليسار');
    btnLeft.textContent = '‹';

    const btnRight = document.createElement('button');
    btnRight.type = 'button';
    btnRight.className = 'car-btn car-right';
    btnRight.setAttribute('aria-label', 'تمرير لليمين');
    btnRight.textContent = '›';

    const viewport = document.createElement('div');
    viewport.className = 'carousel-viewport';
    const track = document.createElement('div');
    track.className = 'carousel-track';

    srcs.forEach((src, idx) => {
      const n = r * PER_ROW + idx + 1;
      const item = document.createElement('div');
      item.className = 'portfolio-item';
      item.dataset.row = r;
      item.dataset.idx = idx;
      item.dataset.num = n;
      item.innerHTML = `<img src="${src}" alt="${MESSAGES.ar.projectAlt(n)}" loading="lazy"><span class="p-label">${MESSAGES.ar.project(n)}</span>`;
      track.appendChild(item);
    });

    viewport.appendChild(track);
    rowEl.appendChild(btnLeft);
    rowEl.appendChild(viewport);
    rowEl.appendChild(btnRight);
    rowsWrap.appendChild(rowEl);
    revealObserver.observe(rowEl);

    // الأسهم: تمرير فعلي يمين/يسار (يعمل مع العربي والإنجليزي)
    const step = () => Math.max(viewport.clientWidth * 0.8, 260);
    btnLeft.addEventListener('click', () => viewport.scrollBy({ left: -step(), behavior: 'smooth' }));
    btnRight.addEventListener('click', () => viewport.scrollBy({ left: step(), behavior: 'smooth' }));
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

  /* ---------- نافذة عرض الصور (Lightbox) — التنقل داخل صور الصف ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  let currentRow = 0;
  let currentIdx = 0;

  function openLightbox(row, idx) {
    currentRow = row;
    const imgs = rowImages[row];
    currentIdx = (idx + imgs.length) % imgs.length;
    const n = row * PER_ROW + currentIdx + 1;
    lightboxImg.src = imgs[currentIdx];
    lightboxImg.alt = MESSAGES[currentLang].projectAlt(n);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  rowsWrap.addEventListener('click', (e) => {
    const item = e.target.closest('.portfolio-item');
    if (item) openLightbox(parseInt(item.dataset.row, 10), parseInt(item.dataset.idx, 10));
  });
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  lightboxPrev.addEventListener('click', () => openLightbox(currentRow, currentIdx - 1));
  lightboxNext.addEventListener('click', () => openLightbox(currentRow, currentIdx + 1));
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    const rtl = document.documentElement.dir === 'rtl';
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') openLightbox(currentRow, currentIdx + (rtl ? -1 : 1));
    if (e.key === 'ArrowLeft') openLightbox(currentRow, currentIdx + (rtl ? 1 : -1));
  });

  /* ---------- نموذج التواصل → Formspree ---------- */
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('formSubmitBtn');
  const statusEl = document.getElementById('formStatus');
  const FORM_ENDPOINT = 'https://formspree.io/f/xdarpopq';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = MESSAGES[currentLang].sending;
    statusEl.textContent = '';
    statusEl.className = 'form-status';

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        statusEl.textContent = MESSAGES[currentLang].ok;
        statusEl.classList.add('ok');
        form.reset();
      } else {
        statusEl.textContent = MESSAGES[currentLang].err;
        statusEl.classList.add('err');
      }
    } catch (err) {
      statusEl.textContent = MESSAGES[currentLang].net;
      statusEl.classList.add('err');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = MESSAGES[currentLang].submit;
    }
  });
});