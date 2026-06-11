/* ============================================================
   COMPONENTS.JS — Shared HTML Components
   Navbar & Footer injected dynamically for DRY code
   ============================================================ */
(function injectComponents() {
  const navHTML = `
  <div class="ticker-wrap" role="status" aria-label="School announcement">
    <div class="ticker-track">
      <div class="ticker-item"><i class="bi bi-megaphone-fill"></i> Admission is open for 2026-27! Apply online now to secure your seat.</div>
      <div class="ticker-item"><i class="bi bi-megaphone-fill"></i> Admission is open for 2026-27! Apply online now to secure your seat.</div>
      <div class="ticker-item"><i class="bi bi-megaphone-fill"></i> Admission is open for 2026-27! Apply online now to secure your seat.</div>
      <div class="ticker-item"><i class="bi bi-megaphone-fill"></i> Admission is open for 2026-27! Apply online now to secure your seat.</div>
      <div class="ticker-item"><i class="bi bi-megaphone-fill"></i> Admission is open for 2026-27! Apply online now to secure your seat.</div>
      <div class="ticker-item"><i class="bi bi-megaphone-fill"></i> Admission is open for 2026-27! Apply online now to secure your seat.</div>
      <div class="ticker-item"><i class="bi bi-megaphone-fill"></i> Admission is open for 2026-27! Apply online now to secure your seat.</div>
      <div class="ticker-item"><i class="bi bi-megaphone-fill"></i> Admission is open for 2026-27! Apply online now to secure your seat.</div>
    </div>
  </div>
  <nav class="navbar scrolled" id="navbar">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">
        <div class="nav-logo-icon">
          <img src="images/logo.png" alt="Edgemont School Logo" class="nav-logo-img" />
        </div>
        <div class="nav-logo-text">
          <div class="school-name">Edgemont School</div>
          <div class="school-tagline">Excellence in Education</div>
        </div>
      </a>
      <div class="nav-links">

        <a href="index.html">Home</a>

        <!-- About dropdown -->
        <div class="nav-dropdown-group">
          <a href="about.html" class="nav-dropdown-trigger">About <i class="bi bi-chevron-down nav-caret"></i></a>
          <div class="nav-dropdown">
            <div class="nav-dropdown-inner">
              <a href="about.html#our-story" class="nav-dropdown-item">
                <i class="bi bi-book"></i>
                <div><strong>Our Story</strong><span>38 years of shaping futures</span></div>
              </a>
              <a href="about.html#vision-mission" class="nav-dropdown-item">
                <i class="bi bi-eye"></i>
                <div><strong>Vision &amp; Mission</strong><span>Our values &amp; guiding principles</span></div>
              </a>
              <a href="about.html#vision-mission" class="nav-dropdown-item">
                <i class="bi bi-heart"></i>
                <div><strong>Core Values</strong><span>Integrity, excellence &amp; compassion</span></div>
              </a>
              <a href="about.html#leadership" class="nav-dropdown-item">
                <i class="bi bi-person-badge"></i>
                <div><strong>Leadership Team</strong><span>Meet our principal &amp; directors</span></div>
              </a>
            </div>
          </div>
        </div>

        <!-- Academics dropdown -->
        <div class="nav-dropdown-group">
          <a href="academics.html" class="nav-dropdown-trigger">Academics <i class="bi bi-chevron-down nav-caret"></i></a>
          <div class="nav-dropdown">
            <div class="nav-dropdown-inner">
              <a href="academics.html#curriculum" class="nav-dropdown-item">
                <i class="bi bi-journal-text"></i>
                <div><strong>Curriculum Overview</strong><span>CBSE-affiliated programmes</span></div>
              </a>
              <a href="academics.html#curriculum" class="nav-dropdown-item">
                <i class="bi bi-1-circle"></i>
                <div><strong>Primary Education</strong><span>Classes 1 – 5</span></div>
              </a>
              <a href="academics.html#curriculum" class="nav-dropdown-item">
                <i class="bi bi-2-circle"></i>
                <div><strong>Secondary Education</strong><span>Classes 6 – 10</span></div>
              </a>
              <a href="academics.html#curriculum" class="nav-dropdown-item">
                <i class="bi bi-3-circle"></i>
                <div><strong>Senior Secondary</strong><span>Classes 11 – 12 (Sci / Com / Hum)</span></div>
              </a>
              <a href="academics.html#methodology" class="nav-dropdown-item">
                <i class="bi bi-lightbulb"></i>
                <div><strong>Learning Methodology</strong><span>Activity, tech &amp; critical thinking</span></div>
              </a>
              <a href="academics.html#examination" class="nav-dropdown-item">
                <i class="bi bi-clipboard-check"></i>
                <div><strong>Examination System</strong><span>Assessment structure &amp; calendar</span></div>
              </a>
            </div>
          </div>
        </div>

        <!-- Facilities dropdown -->
        <div class="nav-dropdown-group">
          <a href="facilities.html" class="nav-dropdown-trigger">Facilities <i class="bi bi-chevron-down nav-caret"></i></a>
          <div class="nav-dropdown">
            <div class="nav-dropdown-inner">
              <a href="facilities.html#smart-classrooms" class="nav-dropdown-item">
                <i class="bi bi-display"></i>
                <div><strong>Smart Classrooms</strong><span>80 interactive digital classrooms</span></div>
              </a>
              <a href="facilities.html#science-labs" class="nav-dropdown-item">
                <i class="bi bi-eyedropper"></i>
                <div><strong>Science Laboratories</strong><span>Physics, Chemistry &amp; Biology labs</span></div>
              </a>
              <a href="facilities.html#computer-lab" class="nav-dropdown-item">
                <i class="bi bi-pc-display"></i>
                <div><strong>Computer Laboratory</strong><span>200+ workstations, AI &amp; coding</span></div>
              </a>
              <a href="facilities.html#library" class="nav-dropdown-item">
                <i class="bi bi-book-half"></i>
                <div><strong>Library &amp; Resource Centre</strong><span>25,000+ books &amp; digital access</span></div>
              </a>
              <a href="facilities.html#sports-complex" class="nav-dropdown-item">
                <i class="bi bi-trophy"></i>
                <div><strong>Sports Complex</strong><span>Pool, cricket, athletics &amp; more</span></div>
              </a>
              <a href="facilities.html#campus-facilities" class="nav-dropdown-item">
                <i class="bi bi-bus-front"></i>
                <div><strong>Additional Facilities</strong><span>Transport, cafeteria &amp; medical</span></div>
              </a>
            </div>
          </div>
        </div>

        <a href="faculty.html">Teachers</a>
        <a href="gallery.html">Gallery</a>

        <!-- Admissions dropdown -->
        <div class="nav-dropdown-group">
          <a href="admissions.html" class="nav-dropdown-trigger">Admissions <i class="bi bi-chevron-down nav-caret"></i></a>
          <div class="nav-dropdown">
            <div class="nav-dropdown-inner">
              <a href="admissions.html#admission-process" class="nav-dropdown-item">
                <i class="bi bi-list-ol"></i>
                <div><strong>Admission Process</strong><span>Our simple 4-step process</span></div>
              </a>
              <a href="admissions.html#eligibility" class="nav-dropdown-item">
                <i class="bi bi-person-check"></i>
                <div><strong>Eligibility Criteria</strong><span>Age &amp; class requirements</span></div>
              </a>
              <a href="admissions.html#documents" class="nav-dropdown-item">
                <i class="bi bi-folder2-open"></i>
                <div><strong>Required Documents</strong><span>Checklist for enrollment</span></div>
              </a>
              <a href="admissions.html#fee-structure" class="nav-dropdown-item">
                <i class="bi bi-cash-coin"></i>
                <div><strong>Fee Structure</strong><span>Annual fees by class</span></div>
              </a>
              <a href="admissions.html#inquiryForm" class="nav-dropdown-item">
                <i class="bi bi-send"></i>
                <div><strong>Apply Now</strong><span>Submit your inquiry online</span></div>
              </a>
            </div>
          </div>
        </div>

        <!-- News dropdown -->
        <div class="nav-dropdown-group">
          <a href="news.html" class="nav-dropdown-trigger">News &amp; Events <i class="bi bi-chevron-down nav-caret"></i></a>
          <div class="nav-dropdown">
            <div class="nav-dropdown-inner">
              <a href="news.html" class="nav-dropdown-item">
                <i class="bi bi-newspaper"></i>
                <div><strong>Latest News</strong><span>School announcements &amp; updates</span></div>
              </a>
              <a href="news.html" class="nav-dropdown-item">
                <i class="bi bi-calendar-event"></i>
                <div><strong>Upcoming Events</strong><span>Dates, fests &amp; competitions</span></div>
              </a>
              <a href="news.html" class="nav-dropdown-item">
                <i class="bi bi-award"></i>
                <div><strong>Achievements</strong><span>Awards &amp; student accolades</span></div>
              </a>
            </div>
          </div>
        </div>

        <!-- Contact dropdown -->
        <div class="nav-dropdown-group">
          <a href="contact.html" class="nav-dropdown-trigger">Contact <i class="bi bi-chevron-down nav-caret"></i></a>
          <div class="nav-dropdown">
            <div class="nav-dropdown-inner">
              <a href="contact.html#contact-info" class="nav-dropdown-item">
                <i class="bi bi-telephone"></i>
                <div><strong>Get in Touch</strong><span>Phone, email &amp; office hours</span></div>
              </a>
              <a href="contact.html#contact-info" class="nav-dropdown-item">
                <i class="bi bi-grid-3x3-gap"></i>
                <div><strong>Department Contacts</strong><span>Direct extensions by department</span></div>
              </a>
              <a href="contact.html#contact-form-section" class="nav-dropdown-item">
                <i class="bi bi-envelope-paper"></i>
                <div><strong>Send a Message</strong><span>Write to us directly</span></div>
              </a>
              <a href="contact.html#contact-form-section" class="nav-dropdown-item">
                <i class="bi bi-geo-alt"></i>
                <div><strong>Find Us</strong><span>Location map &amp; directions</span></div>
              </a>
            </div>
          </div>
        </div>

      </div>
      <a href="admissions.html" class="btn btn-primary nav-cta" style="padding:10px 22px;font-size:0.88rem;white-space:nowrap;flex-shrink:0">
        <i class="bi bi-mortarboard-fill"></i> Apply Now
      </a>
      <div class="hamburger" id="hamburger"><span></span><span></span><span></span></div>
    </div>
  </nav>
  <div class="mobile-nav" id="mobileNav">
    <a href="index.html">Home</a>
    <a href="about.html">About Us</a>
    <a href="academics.html">Academics</a>
    <a href="facilities.html">Facilities</a>
    <a href="faculty.html">Teachers</a>
    <a href="gallery.html">Gallery</a>
    <a href="admissions.html">Admissions</a>
    <a href="news.html">News &amp; Events</a>
    <a href="contact.html">Contact</a>
    <a href="admissions.html" class="btn btn-primary" style="margin-top:8px;justify-content:center">Apply Now</a>
  </div>`;

  const footerHTML = `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="school-name">Edgemont School</div>
          <p>Nurturing young minds with quality education, holistic development, and values that last a lifetime. Established in 1985.</p>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
            <a href="#" class="social-link" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
            <a href="#" class="social-link" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a>
            <a href="#" class="social-link" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
            <a href="#" class="social-link" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h5>Quick Links</h5>
          <div class="footer-links">
            <a href="index.html">Home</a>
            <a href="about.html">About Us</a>
            <a href="academics.html">Academics</a>
            <a href="facilities.html">Facilities</a>
            <a href="faculty.html">Teachers</a>
            <a href="gallery.html">Gallery</a>
            <a href="admissions.html">Admissions</a>
            <a href="news.html">News &amp; Events</a>
            <a href="contact.html">Contact</a>
          </div>
        </div>
        <div class="footer-col">
          <h5>Academics</h5>
          <div class="footer-links">
            <a href="academics.html#curriculum">Primary Education</a>
            <a href="academics.html#curriculum">Secondary Education</a>
            <a href="academics.html#curriculum">Senior Secondary</a>
            <a href="academics.html#curriculum">Curriculum</a>
            <a href="academics.html#examination">Examination System</a>
            <a href="admissions.html#admission-process">Admission Process</a>
            <a href="admissions.html#fee-structure">Fee Structure</a>
          </div>
        </div>
        <div class="footer-col">
          <h5>Contact Us</h5>
          <div class="footer-contact-item"><i class="bi bi-geo-alt-fill"></i><span>123, Edgemont Road, Civil Lines, New Delhi – 110054</span></div>
          <div class="footer-contact-item"><i class="bi bi-telephone-fill"></i><span>+91 11 2345 6789<br>+91 98765 43210</span></div>
          <div class="footer-contact-item"><i class="bi bi-envelope-fill"></i><span>info@edgemontschool.edu.in</span></div>
          <div class="footer-contact-item"><i class="bi bi-clock-fill"></i><span>Mon–Sat: 8:00 AM – 4:00 PM</span></div>
          <div class="hotline-box">
            <div class="hotline-label">Admission Hotline</div>
            <div class="hotline-number">1800-123-4567</div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} Edgemont School. All rights reserved.</p>
        <div style="display:flex;gap:20px">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="admin/index.html" style="color:rgba(255,255,255,0.2)">Admin</a>
        </div>
      </div>
    </div>
  </footer>
  <a class="whatsapp-float" id="whatsappBtn" href="#" aria-label="Chat on WhatsApp">
    <i class="bi bi-whatsapp"></i>
  </a>`;

  /* ---------- Inject HTML ---------- */
  const navPlaceholder = document.getElementById('navbar-placeholder');
  if (navPlaceholder) navPlaceholder.outerHTML = navHTML;

  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) footerPlaceholder.outerHTML = footerHTML;

  /* ---------- Inject Dropdown CSS ---------- */
  const dropdownCSS = `
    /* ---- Nav Dropdown Groups ---- */
    .nav-dropdown-group {
      position: relative;
      display: inline-flex;
      align-items: center;
    }
    .nav-dropdown-trigger {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      white-space: nowrap;
    }
    .nav-caret {
      font-size: 0.65rem;
      transition: transform 0.25s ease;
      opacity: 0.7;
    }
    .nav-dropdown-group:hover .nav-caret {
      transform: rotate(180deg);
    }
    .nav-dropdown {
      display: none;
      position: absolute;
      top: calc(100% + 12px);
      left: 50%;
      transform: translateX(-50%);
      background: #fff;
      border-radius: 14px;
      box-shadow: 0 20px 60px rgba(13,43,85,0.15), 0 4px 16px rgba(0,0,0,0.08);
      min-width: 320px;
      z-index: 9999;
      border: 1px solid rgba(13,43,85,0.08);
      overflow: hidden;
      animation: dropdownFadeIn 0.2s ease;
    }
    @keyframes dropdownFadeIn {
      from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
      to   { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    /* Show on hover */
    .nav-dropdown-group:hover .nav-dropdown {
      display: block;
    }
    /* Invisible bridge between trigger and dropdown */
    .nav-dropdown-group::after {
      content: '';
      position: absolute;
      top: 100%;
      left: -20px;
      right: -20px;
      height: 16px;
    }
    .nav-dropdown-inner {
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .nav-dropdown-item {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 12px 14px;
      border-radius: 10px;
      text-decoration: none;
      color: #1A2B4A !important;
      transition: background 0.18s ease, transform 0.15s ease;
    }
    .nav-dropdown-item:hover {
      background: rgba(13,43,85,0.05);
      transform: translateX(3px);
      color: #0d2b55 !important;
    }
    .nav-dropdown-item > i {
      width: 36px;
      height: 36px;
      border-radius: 9px;
      background: rgba(13,43,85,0.07);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      color: var(--navy, #0d2b55);
      flex-shrink: 0;
    }
    .nav-dropdown-item:hover > i {
      background: var(--gold, #c9962a);
      color: #fff;
    }
    .nav-dropdown-item > div {
      display: flex;
      flex-direction: column;
    }
    .nav-dropdown-item > div strong {
      font-size: 0.88rem;
      font-weight: 600;
      line-height: 1.3;
      color: #1A2B4A !important;
    }
    .nav-dropdown-item > div span {
      font-size: 0.75rem;
      color: #5C6E8A !important;
      margin-top: 1px;
    }
    /* Divider between last item and main-page link area */
    .nav-dropdown-inner::after {
      content: '';
      display: block;
      height: 1px;
      background: rgba(13,43,85,0.06);
      margin: 4px 6px 2px;
    }
  `;

  const style = document.createElement('style');
  style.textContent = dropdownCSS;
  document.head.appendChild(style);
})();
