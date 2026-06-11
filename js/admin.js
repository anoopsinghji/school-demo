/* ============================================================
   ADMIN.JS — Admin Dashboard Logic
   Login, Inquiries Management, LocalStorage CRUD
   ============================================================ */

'use strict';

const ADMIN_CREDENTIALS = { username: 'admin', password: 'edgemont2024' };
const STORAGE_KEY = 'ea_inquiries';
const AUTH_KEY = 'ea_admin_auth';

/* ─── State ──────────────────────────────────────────────────── */
let allInquiries = [];
let filteredInquiries = [];
let currentInquiryId = null;

/* ─── DOM References ─────────────────────────────────────────── */
const loginPage = document.getElementById('loginPage');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const tableBody = document.getElementById('inquiryTableBody');
const totalCount = document.getElementById('totalCount');
const newCount = document.getElementById('newCount');
const reviewedCount = document.getElementById('reviewedCount');
const todayCount = document.getElementById('todayCount');
const newBadge = document.getElementById('newBadge');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('inquiryModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const exportBtn = document.getElementById('exportBtn');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');

/* ─── Auth ───────────────────────────────────────────────────── */
function checkAuth() {
  const auth = sessionStorage.getItem(AUTH_KEY);
  if (auth === 'true') showDashboard();
  else showLogin();
}

function showLogin() {
  loginPage.style.display = 'flex';
  dashboard.classList.remove('active');
}

function showDashboard() {
  loginPage.style.display = 'none';
  dashboard.classList.add('active');
  loadInquiries();
}

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = this.username.value.trim();
    const password = this.password.value;
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      loginError.classList.remove('show');
      showDashboard();
    } else {
      loginError.textContent = 'Invalid username or password. Please try again.';
      loginError.classList.add('show');
      this.password.value = '';
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem(AUTH_KEY);
    showLogin();
    showToast('Logged out successfully.', 'success');
  });
}

/* ─── Load & Render Inquiries ────────────────────────────────── */
function loadInquiries() {
  allInquiries = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  // Seed demo data if empty
  if (allInquiries.length === 0) seedDemoData();
  filteredInquiries = [...allInquiries];
  updateStats();
  renderTable();
}

function seedDemoData() {
  const demoData = [
    { id: 1717000001, parentName: 'Rajesh Kumar', studentName: 'Aryan Kumar', mobile: '9876543210', email: 'rajesh.kumar@email.com', classApplying: 'Class 6', message: 'Looking for admission for my son. Please share fee structure.', date: '09 Jun 2025', time: '10:30 AM', status: 'New' },
    { id: 1717000002, parentName: 'Priya Sharma', studentName: 'Anika Sharma', mobile: '9865432109', email: 'priya.sharma@email.com', classApplying: 'Class 1', message: 'Interested in nursery admission. My daughter is 5 years old.', date: '08 Jun 2025', time: '02:15 PM', status: 'Reviewed' },
    { id: 1717000003, parentName: 'Suresh Patel', studentName: 'Riya Patel', mobile: '9754321098', email: 'suresh.patel@email.com', classApplying: 'Class 9', message: 'Want to know about science stream availability.', date: '07 Jun 2025', time: '11:45 AM', status: 'New' },
    { id: 1717000004, parentName: 'Meena Verma', studentName: 'Karan Verma', mobile: '9643210987', email: 'meena.verma@email.com', classApplying: 'Class 3', message: 'Please send admission form and required documents list.', date: '06 Jun 2025', time: '09:20 AM', status: 'Pending' },
    { id: 1717000005, parentName: 'Amit Singh', studentName: 'Shreya Singh', mobile: '9532109876', email: 'amit.singh@email.com', classApplying: 'Class 11 (Science)', message: 'My daughter scored 92% in Class 10. Looking for good school.', date: '05 Jun 2025', time: '04:00 PM', status: 'Reviewed' },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(demoData));
  allInquiries = demoData;
}

function updateStats() {
  const total = allInquiries.length;
  const newInq = allInquiries.filter(i => i.status === 'New').length;
  const reviewed = allInquiries.filter(i => i.status === 'Reviewed').length;
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const todayInq = allInquiries.filter(i => i.date === today).length;

  if (totalCount) totalCount.textContent = total;
  if (newCount) newCount.textContent = newInq;
  if (reviewedCount) reviewedCount.textContent = reviewed;
  if (todayCount) todayCount.textContent = todayInq;
  if (newBadge) { newBadge.textContent = newInq; newBadge.style.display = newInq > 0 ? '' : 'none'; }
}

function renderTable() {
  if (!tableBody) return;
  if (filteredInquiries.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><i class="bi bi-inbox"></i><h4>No inquiries found</h4><p>No admission inquiries match your search.</p></div></td></tr>`;
    return;
  }

  tableBody.innerHTML = filteredInquiries.map((inq, idx) => `
    <tr>
      <td><span style="color:var(--gray-400);font-size:0.8rem">#${idx + 1}</span></td>
      <td>
        <div style="font-weight:600;color:var(--navy)">${escapeHtml(inq.parentName)}</div>
        <div style="font-size:0.78rem;color:var(--gray-400)">${escapeHtml(inq.email)}</div>
      </td>
      <td>${escapeHtml(inq.studentName)}</td>
      <td>${escapeHtml(inq.mobile)}</td>
      <td><span style="font-size:0.85rem">${escapeHtml(inq.classApplying)}</span></td>
      <td>
        <div style="font-size:0.82rem;color:var(--gray-400)">${inq.date}</div>
        <div style="font-size:0.75rem;color:var(--gray-400)">${inq.time}</div>
      </td>
      <td>
        <span class="badge-status badge-${inq.status.toLowerCase()}">${inq.status}</span>
      </td>
      <td>
        <button class="action-btn btn-view" onclick="viewInquiry(${inq.id})"><i class="bi bi-eye"></i> View</button>
        <button class="action-btn btn-delete" onclick="deleteInquiry(${inq.id})"><i class="bi bi-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

/* ─── View Inquiry Modal ─────────────────────────────────────── */
function viewInquiry(id) {
  const inq = allInquiries.find(i => i.id === id);
  if (!inq) return;
  currentInquiryId = id;

  document.getElementById('mParentName').textContent = inq.parentName;
  document.getElementById('mStudentName').textContent = inq.studentName;
  document.getElementById('mMobile').textContent = inq.mobile;
  document.getElementById('mEmail').textContent = inq.email;
  document.getElementById('mClass').textContent = inq.classApplying;
  document.getElementById('mDate').textContent = `${inq.date} at ${inq.time}`;
  document.getElementById('mMessage').textContent = inq.message || '—';
  document.getElementById('mStatus').innerHTML = `<span class="badge-status badge-${inq.status.toLowerCase()}">${inq.status}</span>`;

  // Status update select
  const statusSelect = document.getElementById('mStatusSelect');
  if (statusSelect) statusSelect.value = inq.status;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Mark as reviewed if new
  if (inq.status === 'New') {
    inq.status = 'Reviewed';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allInquiries));
    updateStats();
    renderTable();
  }
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
  currentInquiryId = null;
}

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalOverlay) modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ─── Status Update ──────────────────────────────────────────── */
const statusUpdateBtn = document.getElementById('updateStatusBtn');
if (statusUpdateBtn) {
  statusUpdateBtn.addEventListener('click', () => {
    const statusSelect = document.getElementById('mStatusSelect');
    if (!statusSelect || !currentInquiryId) return;
    const inq = allInquiries.find(i => i.id === currentInquiryId);
    if (inq) {
      inq.status = statusSelect.value;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allInquiries));
      updateStats();
      renderTable();
      showToast('Status updated successfully!', 'success');
      closeModal();
    }
  });
}

/* ─── Delete Inquiry ─────────────────────────────────────────── */
function deleteInquiry(id) {
  if (!confirm('Are you sure you want to delete this inquiry? This action cannot be undone.')) return;
  allInquiries = allInquiries.filter(i => i.id !== id);
  filteredInquiries = filteredInquiries.filter(i => i.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allInquiries));
  updateStats();
  renderTable();
  showToast('Inquiry deleted.', 'error');
}

/* ─── Search ─────────────────────────────────────────────────── */
if (searchInput) {
  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase().trim();
    filteredInquiries = query
      ? allInquiries.filter(i =>
          i.parentName.toLowerCase().includes(query) ||
          i.studentName.toLowerCase().includes(query) ||
          i.mobile.includes(query) ||
          i.email.toLowerCase().includes(query) ||
          i.classApplying.toLowerCase().includes(query)
        )
      : [...allInquiries];
    renderTable();
  });
}

/* ─── Export CSV ─────────────────────────────────────────────── */
if (exportBtn) {
  exportBtn.addEventListener('click', () => {
    if (allInquiries.length === 0) { showToast('No data to export.', 'error'); return; }
    const headers = ['#', 'Parent Name', 'Student Name', 'Mobile', 'Email', 'Class', 'Date', 'Status', 'Message'];
    const rows = allInquiries.map((inq, idx) => [
      idx + 1, inq.parentName, inq.studentName, inq.mobile, inq.email,
      inq.classApplying, `${inq.date} ${inq.time}`, inq.status,
      (inq.message || '').replace(/,/g, ';')
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `admissions_${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
    showToast('CSV exported successfully!', 'success');
  });
}

/* ─── Toast ──────────────────────────────────────────────────── */
function showToast(message, type = 'success') {
  if (!toast || !toastMsg) return;
  toastMsg.textContent = message;
  toast.className = `toast ${type}`;
  toast.querySelector('i').className = type === 'success' ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ─── Utility ────────────────────────────────────────────────── */
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ─── Clear All Data ─────────────────────────────────────────── */
const clearAllBtn = document.getElementById('clearAllBtn');
if (clearAllBtn) {
  clearAllBtn.addEventListener('click', () => {
    if (!confirm('Clear ALL inquiries? This cannot be undone.')) return;
    localStorage.removeItem(STORAGE_KEY);
    allInquiries = []; filteredInquiries = [];
    updateStats(); renderTable();
    showToast('All inquiries cleared.', 'error');
  });
}

/* ─── Update current date in topbar ─────────────────────────── */
const dateEl = document.getElementById('currentDate');
if (dateEl) {
  dateEl.textContent = new Date().toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
}

/* ─── Init ───────────────────────────────────────────────────── */
checkAuth();

/* ─── Page-aware table render ────────────────────────────────── */
// Override renderTable to target the currently visible tbody
const _renderTable = renderTable;
function renderTable() {
  // Find the visible tableBody
  const bodies = document.querySelectorAll('#inquiryTableBody');
  const visibleBody = Array.from(bodies).find(b => {
    let el = b;
    while (el) { if (el.style && el.style.display === 'none') return false; el = el.parentElement; }
    return true;
  });
  // Temporarily reassign tableBody reference
  if (!filteredInquiries.length) {
    bodies.forEach(b => { b.innerHTML = `<tr><td colspan="8"><div class="empty-state"><i class="bi bi-inbox"></i><h4>No inquiries found</h4><p>No admission inquiries match your search.</p></div></td></tr>`; });
    return;
  }
  const html = filteredInquiries.map((inq, idx) => `
    <tr>
      <td><span style="color:var(--gray-400);font-size:0.8rem">#${idx + 1}</span></td>
      <td><div style="font-weight:600;color:var(--navy)">${escapeHtml(inq.parentName)}</div><div style="font-size:0.78rem;color:var(--gray-400)">${escapeHtml(inq.email)}</div></td>
      <td>${escapeHtml(inq.studentName)}</td>
      <td>${escapeHtml(inq.mobile)}</td>
      <td><span style="font-size:0.85rem">${escapeHtml(inq.classApplying)}</span></td>
      <td><div style="font-size:0.82rem;color:var(--gray-400)">${inq.date}</div><div style="font-size:0.75rem;color:var(--gray-400)">${inq.time}</div></td>
      <td><span class="badge-status badge-${inq.status.toLowerCase()}">${inq.status}</span></td>
      <td><button class="action-btn btn-view" onclick="viewInquiry(${inq.id})"><i class="bi bi-eye"></i> View</button><button class="action-btn btn-delete" onclick="deleteInquiry(${inq.id})"><i class="bi bi-trash"></i></button></td>
    </tr>`).join('');
  bodies.forEach(b => { b.innerHTML = html; });
}
