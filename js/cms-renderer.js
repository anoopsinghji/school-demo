/**
 * ============================================================
 * CMS-RENDERER.JS — Edgemont School
 * Handles dynamic content population from Sanity client queries
 * ============================================================
 */
'use strict';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Render homepage elements
  await renderNoticeBoard();
  await renderFacilitiesPreview();
  await renderTestimonials();
  await renderNewsPreview();

  // 2. Render subpage elements
  await renderAllFacilities();
  await renderAllNews();
});

/**
 * Notice Board Renderer
 */
async function renderNoticeBoard() {
  const container = document.getElementById('notice-list-container');
  if (!container) return;

  const notices = await fetchNotices();
  if (!notices || !notices.length) return;

  container.innerHTML = notices.map(notice => {
    const dateObj = new Date(notice.date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const monthNames = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"]; // Relative indexing or standard
    const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthList[dateObj.getMonth()];

    let tagClass = 'notice-tag';
    if (notice.tag === 'Admission') tagClass = 'notice-tag notice-tag-gold';
    if (notice.tag === 'Achievement') tagClass = 'notice-tag notice-tag-green';

    return `
      <article class="notice-item">
        <div class="notice-date">
          <span>${day}</span>
          <small>${month}</small>
        </div>
        <div class="notice-content">
          <span class="${tagClass}">${notice.tag}</span>
          <h3>${notice.title}</h3>
          <p>${notice.content}</p>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Facilities Preview Renderer (Homepage, first 3 main facilities)
 */
async function renderFacilitiesPreview() {
  const container = document.getElementById('facilities-preview-container');
  if (!container) return;

  const facilities = await fetchFacilities();
  if (!facilities || !facilities.length) return;

  const mainFacilities = facilities.filter(f => !f.isAdditional).slice(0, 3);

  container.innerHTML = mainFacilities.map(f => {
    const imageUrl = f.mainImage && f.mainImage.asset ? urlFor(f.mainImage) : f.imageUrl;
    return `
      <div class="facility-card fade-up visible">
        <div class="facility-image sample-image-card">
          <img src="${imageUrl}" alt="${f.mainImage?.alt || f.title}" />
          <div class="overlay"></div>
        </div>
        <div class="facility-body">
          <h4>${f.title}</h4>
          <p>${f.description.split('. ')[0]}.</p>
          <div class="facility-tags">
            ${f.label ? `<span class="tag">${f.label}</span>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Testimonials Renderer
 */
async function renderTestimonials() {
  const container = document.getElementById('testimonials-container');
  if (!container) return;

  const testimonials = await fetchTestimonials();
  if (!testimonials || !testimonials.length) return;

  container.innerHTML = testimonials.map(t => {
    const starsText = '★'.repeat(t.stars) + '☆'.repeat(5 - t.stars);
    return `
      <div class="testimonial-card fade-up visible">
        <div class="testimonial-stars">${starsText}</div>
        <p class="testimonial-text">"${t.text}"</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${t.authorName.charAt(0)}</div>
          <div>
            <div class="author-name">${t.authorName}</div>
            <div class="author-role">${t.authorRole}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * News Preview Renderer (Homepage, latest 3 updates)
 */
async function renderNewsPreview() {
  const container = document.getElementById('news-preview-container');
  if (!container) return;

  const newsItems = await fetchNews();
  if (!newsItems || !newsItems.length) return;

  const previewItems = newsItems.slice(0, 3);

  container.innerHTML = previewItems.map(item => {
    const imageUrl = item.mainImage && item.mainImage.asset ? urlFor(item.mainImage) : item.imageUrl;
    const dateObj = new Date(item.date);
    const formattedDate = dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    let displayCat = 'News';
    if (item.category === 'achievement') displayCat = 'Achievement';
    if (item.category === 'event' || item.category === 'upcoming_event') displayCat = 'Event';
    if (item.category === 'announcement') displayCat = 'Announcement';
    if (item.category === 'exam') displayCat = 'Examination';

    return `
      <div class="news-card fade-up visible">
        <div class="news-image sample-image-card">
          <img src="${imageUrl}" alt="${item.mainImage?.alt || item.title}" />
          <span class="news-cat">${displayCat}</span>
        </div>
        <div class="news-body">
          <div class="news-date"><i class="bi bi-calendar3"></i> ${formattedDate}</div>
          <h4>${item.title}</h4>
          <p>${item.summary.split('. ')[0]}.</p>
          <a href="news.html" class="news-link">Read More <i class="bi bi-arrow-right"></i></a>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Detailed Facilities Page Renderer (facilities.html)
 */
async function renderAllFacilities() {
  const rowsContainer = document.getElementById('facilities-rows-container');
  const addContainer = document.getElementById('additional-facilities-container');
  if (!rowsContainer && !addContainer) return;

  const facilities = await fetchFacilities();
  if (!facilities || !facilities.length) return;

  if (rowsContainer) {
    const mainFacilities = facilities.filter(f => !f.isAdditional);
    rowsContainer.innerHTML = mainFacilities.map((f, index) => {
      const imageUrl = f.mainImage && f.mainImage.asset ? urlFor(f.mainImage) : f.imageUrl;
      const isReverse = index % 2 !== 0;
      const benefitsHTML = f.benefits ? f.benefits.map(b => `
        <div class="benefit-item"><i class="bi bi-check-circle-fill"></i> ${b}</div>
      `).join('') : '';

      return `
        <div class="facility-detail-card ${isReverse ? 'reverse' : ''} fade-up visible">
          <div class="fdc-inner">
            <div class="fdc-image sample-image-card">
              <img src="${imageUrl}" alt="${f.mainImage?.alt || f.title}" />
              ${f.label ? `<span class="fdc-label">${f.label}</span>` : ''}
            </div>
            <div class="fdc-body">
              <h3>${f.title}</h3>
              <p>${f.description}</p>
              <div class="benefits-list">
                ${benefitsHTML}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  if (addContainer) {
    const addFacilities = facilities.filter(f => f.isAdditional);
    addContainer.innerHTML = addFacilities.map(f => {
      const imageUrl = f.mainImage && f.mainImage.asset ? urlFor(f.mainImage) : f.imageUrl;
      const tagsHTML = f.tags ? f.tags.map(t => `<span class="tag">${t}</span>`).join('') : '';

      return `
        <div class="facility-card fade-up visible">
          <div class="facility-image sample-image-card">
            <img src="${imageUrl}" alt="${f.mainImage?.alt || f.title}" />
            <div class="overlay"></div>
          </div>
          <div class="facility-body">
            <h4>${f.title}</h4>
            <p>${f.description}</p>
            <div class="facility-tags">
              ${tagsHTML}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

/**
 * Detailed News Page Renderer (news.html)
 */
async function renderAllNews() {
  const container = document.getElementById('newsContainer');
  if (!container) return;

  const newsItems = await fetchNews();
  if (!newsItems || !newsItems.length) return;

  container.innerHTML = newsItems.map(item => {
    const imageUrl = item.mainImage && item.mainImage.asset ? urlFor(item.mainImage) : item.imageUrl;
    const dateObj = new Date(item.date);
    const formattedDate = dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    let displayCat = 'News';
    let filterType = item.category;
    if (filterType === 'upcoming_event') filterType = 'event';

    if (item.category === 'achievement') displayCat = 'Achievement';
    if (item.category === 'event') displayCat = 'Event';
    if (item.category === 'upcoming_event') displayCat = 'Upcoming Event';
    if (item.category === 'announcement') displayCat = 'Announcement';
    if (item.category === 'exam') displayCat = 'Examination';

    const infoBoxHTML = item.infoBox ? `
      <div style="margin-top:12px;padding:12px;background:var(--gold-pale);border-radius:8px;font-size:0.83rem;color:var(--text-muted)">
        <i class="bi bi-info-circle text-gold"></i> ${item.infoBox}
      </div>
    ` : '';

    const buttonHTML = item.category === 'announcement' ? `
      <a href="admissions.html" class="btn btn-primary btn-sm" style="margin-top:14px">Apply Now <i class="bi bi-arrow-right"></i></a>
    ` : '';

    return `
      <div class="news-card fade-up visible" data-type="${filterType}" style="margin-bottom:24px">
        <div class="news-image sample-image-card">
          <img src="${imageUrl}" alt="${item.mainImage?.alt || item.title}" />
          <span class="news-cat">${displayCat}</span>
        </div>
        <div class="news-body">
          <div class="news-date"><i class="bi bi-calendar3"></i> ${formattedDate}</div>
          <h4>${item.title}</h4>
          <p>${item.summary}</p>
          ${infoBoxHTML}
          ${buttonHTML}
        </div>
      </div>
    `;
  }).join('');
}
