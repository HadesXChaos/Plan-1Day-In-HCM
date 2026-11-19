(() => {
  'use strict';

  const STORAGE_KEY = 'custom_day_timeline_v1';

  // 7 Danh mục — bộ icon cute dùng thư viện ngoài Material Symbols Rounded (bo tròn, fill đậm)
  const CATEGORIES = {
    'di-chuyen': {
      label: 'Di chuyển',
      color: '#0284c7',
      icon: 'directions_bus'
    },
    'an-uong': {
      label: 'Ăn uống',
      color: '#ea580c',
      icon: 'ramen_dining'
    },
    'cong-viec': {
      label: 'Công việc / Học tập',
      color: '#4f46e5',
      icon: 'laptop_mac'
    },
    'tham-quan': {
      label: 'Tham quan / Giải trí',
      color: '#16a34a',
      icon: 'attractions'
    },
    'nghi-ngoi': {
      label: 'Nghỉ ngơi',
      color: '#0d9488',
      icon: 'bedtime'
    },
    'su-kien': {
      label: 'Sự kiện / Gặp gỡ',
      color: '#db2777',
      icon: 'celebration'
    },
    'khac': {
      label: 'Khác',
      color: '#64748b',
      icon: 'auto_awesome'
    }
  };

  // 3 Mẫu nhanh có sẵn
  const TEMPLATES = {
    trip: {
      title: 'Lịch Trình Khám Phá 1 Ngày',
      subtitle: 'Tập trung đúng giờ • Mang theo giấy tờ tùy thân & trang phục thoải mái',
      events: [
        { start: '06:30', end: '07:15', title: 'Tập trung & Điểm danh đoàn', category: 'di-chuyen', location: 'Cổng chính công ty', note: 'Kiểm tra hành lý, phát nước suối và phân xe di chuyển.', highlight: true, done: false },
        { start: '07:15', end: '09:30', title: 'Di chuyển đến điểm tham quan', category: 'di-chuyen', location: 'Cao tốc hướng điểm đến', note: 'Giao lưu nhẹ trên xe, nghỉ dừng chân 15 phút giữa chặng.', highlight: false, done: false },
        { start: '09:30', end: '11:30', title: 'Tham quan & Hoạt động Teambuilding', category: 'tham-quan', location: 'Khu du lịch trung tâm', note: 'Chụp ảnh tập thể, tham gia trò chơi gắn kết đội nhóm.', highlight: true, done: false },
        { start: '11:30', end: '13:30', title: 'Ăn trưa đặc sản địa phương', category: 'an-uong', location: 'Nhà hàng Ven Hồ', note: 'Thực đơn set menu theo bàn đã đặt trước.', highlight: false, done: false },
        { start: '13:30', end: '15:00', title: 'Nghỉ trưa & Tự do check-in', category: 'nghi-ngoi', location: 'Khuôn viên nghỉ dưỡng', note: 'Thư giãn, uống cà phê hoặc chụp ảnh tự do.', highlight: false, done: false },
        { start: '15:00', end: '17:30', title: 'Trải nghiệm văn hóa & Mua quà lưu niệm', category: 'tham-quan', location: 'Phố đi bộ / Chợ địa phương', note: 'Tự do khám phá theo nhóm nhỏ.', highlight: false, done: false },
        { start: '18:00', end: '20:30', title: 'Gala Dinner & Tổng kết ngày', category: 'su-kien', location: 'Sảnh tiệc Hoa Biển', note: 'Trao giải mini-game, giao lưu âm nhạc và chụp ảnh kỷ niệm.', highlight: true, done: false },
        { start: '20:30', end: '22:00', title: 'Lên xe trở về điểm xuất phát', category: 'di-chuyen', location: 'Điểm đón ban đầu', note: 'Kiểm tra lại tư trang trước khi xuống xe.', highlight: false, done: false }
      ]
    },
    workday: {
      title: 'Kế Hoạch Ngày Làm Việc Hiệu Suất',
      subtitle: 'Tập trung sâu (Deep Work) buổi sáng • Họp & xử lý tác vụ buổi chiều',
      events: [
        { start: '07:00', end: '07:45', title: 'Thể dục & Ăn sáng', category: 'an-uong', location: 'Tại nhà', note: 'Uống 500ml nước, hạn chế lướt điện thoại.', highlight: false, done: false },
        { start: '08:30', end: '09:00', title: 'Rà soát mục tiêu & Check Email', category: 'cong-viec', location: 'Văn phòng', note: 'Chọn ra 3 đầu việc ưu tiên cao nhất trong ngày.', highlight: false, done: false },
        { start: '09:00', end: '11:30', title: 'Deep Work: Xử lý tác vụ trọng tâm', category: 'cong-viec', location: 'Bàn làm việc (Bật chế độ Tập trung)', note: 'Hoàn thiện báo cáo / cấu hình hệ thống không bị gián đoạn.', highlight: true, done: false },
        { start: '11:30', end: '13:15', title: 'Ăn trưa & Nghỉ ngắn 20 phút', category: 'nghi-ngoi', location: 'Khu vực pantry / Quán gần văn phòng', note: 'Rời khỏi màn hình máy tính để nạp lại năng lượng.', highlight: false, done: false },
        { start: '13:30', end: '15:00', title: 'Họp đồng bộ tiến độ cùng team', category: 'su-kien', location: 'Phòng họp B2 / Online', note: 'Cập nhật tiến độ, tháo gỡ vướng mắc kỹ thuật.', highlight: true, done: false },
        { start: '15:15', end: '17:30', title: 'Xử lý ticket & Tổng kết cuối ngày', category: 'cong-viec', location: 'Văn phòng', note: 'Ghi chú backlog cho ngày mai trước khi tắt máy.', highlight: false, done: false },
        { start: '18:00', end: '19:15', title: 'Tập luyện thể thao', category: 'khac', location: 'Phòng gym / Công viên', note: 'Cardio nhẹ hoặc tập kháng lực 60 phút.', highlight: false, done: false }
      ]
    },
    weekend: {
      title: 'Lịch Trình Cuối Tuần Thư Giãn',
      subtitle: 'Sạc lại năng lượng • Cà phê, ẩm thực & giải trí nhẹ nhàng',
      events: [
        { start: '08:30', end: '10:00', title: 'Cà phê sáng & Đọc sách', category: 'an-uong', location: 'Quán cà phê sân vườn', note: 'Thưởng thức cà phê sữa đá và đọc hết 2 chương sách.', highlight: false, done: false },
        { start: '10:15', end: '12:00', title: 'Dạo phố & Tham quan triển lãm', category: 'tham-quan', location: 'Trung tâm thành phố', note: 'Ghé nhà sách và xem trưng bày nghệ thuật.', highlight: true, done: false },
        { start: '12:15', end: '13:45', title: 'Ăn trưa cùng bạn bè', category: 'an-uong', location: 'Nhà hàng khu trung tâm', note: 'Thử quán mới đã lưu từ tuần trước.', highlight: false, done: false },
        { start: '14:00', end: '16:00', title: 'Nghỉ trưa & Nạp năng lượng', category: 'nghi-ngoi', location: 'Tại nhà', note: 'Ngủ trưa, nghe nhạc nhẹ.', highlight: false, done: false },
        { start: '16:30', end: '19:00', title: 'Xem phim chiếu rạp', category: 'tham-quan', location: 'Rạp chiếu phim', note: 'Đặt vé online trước 1 tiếng để chọn ghế giữa.', highlight: true, done: false },
        { start: '19:30', end: '21:30', title: 'Ăn tối & Dạo mát ven sông', category: 'su-kien', location: 'Công viên bờ sông', note: 'Thư giãn cuối ngày, chuẩn bị tinh thần cho tuần mới.', highlight: false, done: false }
      ]
    }
  };

  function uid() {
    return 'ev_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7);
  }

  function todayISO() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function formatDateVN(isoDate) {
    if (!isoDate) return 'Chưa chọn ngày';
    const [y, m, d] = isoDate.split('-').map(Number);
    if (!y || !m || !d) return isoDate;
    const dateObj = new Date(y, m - 1, d);
    const weekdays = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    return `${weekdays[dateObj.getDay()]}, ${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}`;
  }

  function timeToMinutes(t) {
    if (!t || !t.includes(':')) return 0;
    const [h, m] = t.split(':').map(Number);
    return (h || 0) * 60 + (m || 0);
  }

  function formatDuration(start, end) {
    let diff = timeToMinutes(end) - timeToMinutes(start);
    if (diff < 0) diff += 24 * 60; // qua đêm
    if (diff === 0) return '0 phút';
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    if (h > 0 && m > 0) return `${h} giờ ${m} phút`;
    if (h > 0) return `${h} giờ`;
    return `${m} phút`;
  }

  function buildTemplateState(key, keepTheme) {
    const tpl = TEMPLATES[key] || TEMPLATES.trip;
    return {
      theme: keepTheme || 'lotus',
      date: todayISO(),
      title: tpl.title,
      subtitle: tpl.subtitle,
      events: tpl.events.map(ev => ({ ...ev, id: uid() }))
    };
  }

  // Application State
  let state = loadState();
  let activeCategoryFilter = 'all';
  let searchQuery = '';
  let lastProgressPct = -1;

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.events)) {
          return {
            theme: parsed.theme || 'lotus',
            date: parsed.date || todayISO(),
            title: parsed.title || 'Lịch Trình 1 Ngày',
            subtitle: parsed.subtitle || '',
            events: parsed.events.map(e => ({
              id: e.id || uid(),
              start: e.start || '08:00',
              end: e.end || '09:00',
              title: e.title || 'Hoạt động mới',
              category: CATEGORIES[e.category] ? e.category : 'khac',
              location: e.location || '',
              note: e.note || '',
              highlight: Boolean(e.highlight),
              done: Boolean(e.done)
            }))
          };
        }
      }
    } catch (err) {
      console.warn('Không thể đọc dữ liệu localStorage:', err);
    }
    return buildTemplateState('trip', 'lotus');
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      const badge = document.getElementById('autosaveStatus');
      if (badge) {
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        badge.textContent = `Đã lưu lúc ${hh}:${mm}`;
      }
    } catch (err) {
      console.warn('Không thể lưu localStorage:', err);
    }
  }

  // DOM References
  const elHtml = document.documentElement;
  const elTitle = document.getElementById('inputTitle');
  const elSubtitle = document.getElementById('inputSubtitle');
  const elDate = document.getElementById('inputDate');
  const elDisplayDate = document.getElementById('displayDate');
  const elStatCount = document.getElementById('statCount');
  const elStatRange = document.getElementById('statRange');
  const elStatProgressText = document.getElementById('statProgressText');
  const elStatProgressBar = document.getElementById('statProgressBar');
  const elTimelineList = document.getElementById('timelineList');
  const elEmptyState = document.getElementById('emptyState');
  const elEmptyTitle = elEmptyState.querySelector('h3');
  const elEmptyDesc = elEmptyState.querySelector('p');
  const elCategoryFilterBar = document.getElementById('categoryFilterBar');
  const elSearchInput = document.getElementById('inputSearch');
  const elSearchClear = document.getElementById('btnClearSearch');
  const elModal = document.getElementById('eventModal');
  const elModalTitle = document.getElementById('modalTitle');
  const elForm = document.getElementById('eventForm');
  const elFieldId = document.getElementById('fieldId');
  const elFieldStart = document.getElementById('fieldStart');
  const elFieldEnd = document.getElementById('fieldEnd');
  const elFieldTitle = document.getElementById('fieldTitle');
  const elFieldCategory = document.getElementById('fieldCategory');
  const elFieldLocation = document.getElementById('fieldLocation');
  const elFieldNote = document.getElementById('fieldNote');
  const elFieldHighlight = document.getElementById('fieldHighlight');
  const elToast = document.getElementById('toast');

  let toastTimer = null;
  let searchDebounce = null;
  function showToast(msg) {
    elToast.textContent = msg;
    elToast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => elToast.classList.remove('show'), 2400);
  }
  function vibrate(pattern) {
    try {
      if (navigator.vibrate) navigator.vibrate(pattern);
    } catch (_) { /* bỏ qua */ }
  }

  function escapeHTML(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Google Maps: bấm vào địa chỉ -> nhảy sang Google Maps tìm địa điểm đó
  function mapsUrl(location) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.trim())}`;
  }

  // Hiệu ứng ăn mừng 100% — confetti thuần CSS/DOM, không cần thư viện ngoài
  function celebrateCompletion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const layer = document.createElement('div');
    layer.className = 'confetti-layer';
    layer.setAttribute('aria-hidden', 'true');
    const colors = ['#ec4899', '#f9a8d4', '#f59e0b', '#ffffff', '#be185d'];
    const pieces = window.innerWidth < 560 ? 70 : 120;
    for (let i = 0; i < pieces; i++) {
      const s = document.createElement('span');
      const size = 6 + Math.random() * 7;
      s.style.left = `${Math.random() * 100}vw`;
      s.style.width = `${size}px`;
      s.style.height = `${size * (0.5 + Math.random())}px`;
      s.style.background = colors[i % colors.length];
      s.style.animationDelay = `${Math.random() * 0.35}s`;
      s.style.animationDuration = `${2.1 + Math.random() * 1.4}s`;
      s.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px';
      layer.appendChild(s);
    }
    document.body.appendChild(layer);
    setTimeout(() => layer.remove(), 3800);
  }

  function applyTheme(theme) {
    state.theme = theme;
    elHtml.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-dot').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
    saveState();
  }

  function populateCategorySelect() {
    elFieldCategory.innerHTML = Object.entries(CATEGORIES)
      .map(([key, cfg]) => `<option value="${key}">${cfg.label}</option>`)
      .join('');
  }

  function renderCategoryFilters() {
    const counts = { all: state.events.length };
    state.events.forEach(ev => {
      counts[ev.category] = (counts[ev.category] || 0) + 1;
    });

    let html = `<button type="button" class="filter-chip ${activeCategoryFilter === 'all' ? 'active' : ''}" data-cat="all"><span class="chip-dot" style="background: var(--accent)"></span>Tất cả (${counts.all})</button>`;
    Object.entries(CATEGORIES).forEach(([key, cfg]) => {
      const c = counts[key] || 0;
      if (c > 0 || activeCategoryFilter === key) {
        html += `<button type="button" class="filter-chip ${activeCategoryFilter === key ? 'active' : ''}" data-cat="${key}"><span class="chip-dot" style="background: ${cfg.color}"></span>${cfg.label} (${c})</button>`;
      }
    });
    elCategoryFilterBar.innerHTML = html;
  }

  function renderStats() {
    const total = state.events.length;
    const done = state.events.filter(e => e.done).length;
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);

    elStatCount.textContent = `${total} mốc (${done} xong)`;
    elStatProgressText.textContent = `${pct}%`;
    elStatProgressBar.style.width = `${pct}%`;

    // Ăn mừng khi vừa chạm 100% (thư viện canvas-confetti)
    if (lastProgressPct !== -1 && lastProgressPct < 100 && pct === 100 && total > 0) {
      celebrateCompletion();
      showToast('Tuyệt vời! Bạn đã hoàn thành toàn bộ lịch trình 🎉');
    }
    lastProgressPct = pct;

    if (total === 0) {
      elStatRange.textContent = '--:-- - --:--';
    } else {
      const sorted = [...state.events].sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));
      const firstStart = sorted[0].start;
      const lastEnd = sorted.reduce((maxT, e) => (timeToMinutes(e.end) > timeToMinutes(maxT) ? e.end : maxT), sorted[0].end);
      elStatRange.textContent = `${firstStart} – ${lastEnd}`;
    }
  }

  function renderHeader() {
    if (document.activeElement !== elTitle) elTitle.textContent = state.title;
    if (document.activeElement !== elSubtitle) elSubtitle.textContent = state.subtitle;
    elDate.value = state.date;
    elDisplayDate.textContent = formatDateVN(state.date);
    document.title = state.title ? `${state.title} | Timeline 1 Ngày` : 'Timeline 1 Ngày Tự Tùy Chỉnh';
  }

  function renderTimeline() {
    renderHeader();
    renderStats();
    renderCategoryFilters();

    const q = searchQuery.trim().toLowerCase();
    let filtered = activeCategoryFilter === 'all'
      ? [...state.events]
      : state.events.filter(e => e.category === activeCategoryFilter);
    if (q) {
      filtered = filtered.filter(e =>
        (e.title || '').toLowerCase().includes(q) ||
        (e.location || '').toLowerCase().includes(q) ||
        (e.note || '').toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      elTimelineList.innerHTML = '';
      elEmptyState.hidden = false;
      if (q) {
        elEmptyTitle.textContent = `Không tìm thấy “${searchQuery.trim()}”`;
        elEmptyDesc.textContent = 'Thử từ khóa khác hoặc xóa bộ lọc danh mục nhé.';
      } else if (state.events.length === 0) {
        elEmptyTitle.textContent = 'Ngày mới tinh, chưa có mốc nào';
        elEmptyDesc.textContent = 'Thêm hoạt động đầu tiên hoặc chọn một mẫu nhanh bên trên để bắt đầu nhé.';
      } else {
        elEmptyTitle.textContent = 'Danh mục này chưa có mốc nào';
        elEmptyDesc.textContent = 'Thêm mốc mới hoặc chọn bộ lọc khác nhé.';
      }
      return;
    }

    elEmptyState.hidden = true;

    elTimelineList.innerHTML = filtered.map((ev, i) => {
      const realIndex = state.events.findIndex(item => item.id === ev.id);
      const cat = CATEGORIES[ev.category] || CATEGORIES.khac;
      const duration = formatDuration(ev.start, ev.end);
      const isFirst = realIndex === 0;
      const isLast = realIndex === state.events.length - 1;

      return `
        <article class="timeline-item ${ev.highlight ? 'is-highlight' : ''} ${ev.done ? 'is-done' : ''} reveal" style="transition-delay: ${Math.min(i * 55, 330)}ms" data-id="${ev.id}">
          <div class="tl-rail">
            <div class="tl-dot" style="background: linear-gradient(135deg, ${cat.color}, ${cat.color}B3)" title="${escapeHTML(cat.label)}">
              <span class="material-symbols-rounded tl-ico" aria-hidden="true">${cat.icon}</span>
              <span class="tl-num">${String(i + 1).padStart(2, '0')}</span>
              ${ev.done ? '<span class="tl-done">✓</span>' : ''}
            </div>
          </div>

          <div class="tl-card">
            <div class="tl-top">
              <span class="tl-time">
                <span class="material-symbols-rounded tl-ico-sm" aria-hidden="true">schedule</span>
                ${escapeHTML(ev.start)} <span class="tl-arrow">→</span> ${escapeHTML(ev.end)}
              </span>
              <span class="duration-badge"><span class="material-symbols-rounded tl-ico-sm" aria-hidden="true">timer</span> ${duration}</span>
            </div>

            <div class="tl-main">
              <label class="tl-check no-print" title="Đánh dấu hoàn thành">
                <input type="checkbox" data-action="toggle-done" ${ev.done ? 'checked' : ''} aria-label="Đánh dấu hoàn thành" />
                <span class="tl-box"><svg viewBox="0 0 24 24"><path d="m4 12.5 5 5L20 6.5"/></svg></span>
              </label>

              <div class="tl-content">
                <h3 class="tl-title">${escapeHTML(ev.title)}</h3>
                <div class="card-badges">
                  <span class="cat-badge" style="background: ${cat.color}"><span class="material-symbols-rounded badge-ico" aria-hidden="true">${cat.icon}</span>${cat.label}</span>
                  ${ev.highlight ? '<span class="highlight-badge"><span class="material-symbols-rounded badge-ico" aria-hidden="true">kid_star</span>Nổi bật</span>' : ''}
                  ${ev.location ? `
                    <a class="location-tag location-link" href="${mapsUrl(ev.location)}" target="_blank" rel="noopener" title="Mở Google Maps: ${escapeHTML(ev.location)}">
                      <span class="material-symbols-rounded badge-ico" aria-hidden="true">location_on</span>
                      <span class="location-text">${escapeHTML(ev.location)}</span>
                      <span class="material-symbols-rounded external-icon" aria-hidden="true">open_in_new</span>
                    </a>
                  ` : ''}
                </div>
                ${ev.note ? `<p class="event-note">${escapeHTML(ev.note)}</p>` : ''}
              </div>

              <div class="card-actions no-preview no-print">
                <button class="icon-btn" type="button" data-action="move-up" title="Di chuyển lên" ${isFirst ? 'disabled style="opacity:.35;pointer-events:none"' : ''}>
                  <span class="material-symbols-rounded" aria-hidden="true">arrow_upward</span>
                </button>
                <button class="icon-btn" type="button" data-action="move-down" title="Di chuyển xuống" ${isLast ? 'disabled style="opacity:.35;pointer-events:none"' : ''}>
                  <span class="material-symbols-rounded" aria-hidden="true">arrow_downward</span>
                </button>
                <button class="icon-btn" type="button" data-action="duplicate" title="Nhân bản mốc">
                  <span class="material-symbols-rounded" aria-hidden="true">content_copy</span>
                </button>
                <button class="icon-btn" type="button" data-action="edit" title="Chỉnh sửa">
                  <span class="material-symbols-rounded" aria-hidden="true">edit</span>
                </button>
                <button class="icon-btn danger" type="button" data-action="delete" title="Xóa mốc">
                  <span class="material-symbols-rounded" aria-hidden="true">delete</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Cập nhật % tiến độ lên đường ray timeline
    const totalAll = state.events.length;
    const doneAll = state.events.filter(e => e.done).length;
    const railPct = totalAll === 0 ? 0 : Math.round((doneAll / totalAll) * 100);
    elTimelineList.style.setProperty('--done-pct', railPct);

    requestAnimationFrame(() => observeReveals());
  }

  // Reveal on scroll — animation nhẹ, mượt trên mobile
  let revealObserver = null;
  function observeReveals() {
    const items = elTimelineList.querySelectorAll('.reveal:not(.is-visible)');
    if (!items.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(el => el.classList.add('is-visible'));
      return;
    }
    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-visible'));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
    }
    items.forEach(el => revealObserver.observe(el));
  }

  // Modal helpers
  function openModal(eventObj = null) {
    if (eventObj) {
      elModalTitle.textContent = 'Chỉnh sửa mốc thời gian';
      elFieldId.value = eventObj.id;
      elFieldStart.value = eventObj.start;
      elFieldEnd.value = eventObj.end;
      elFieldTitle.value = eventObj.title;
      elFieldCategory.value = eventObj.category;
      elFieldLocation.value = eventObj.location;
      elFieldNote.value = eventObj.note;
      elFieldHighlight.checked = eventObj.highlight;
    } else {
      elModalTitle.textContent = 'Thêm mốc thời gian mới';
      elFieldId.value = '';
      // Gợi ý giờ bắt đầu tiếp nối mốc cuối cùng
      let nextStart = '08:00';
      let nextEnd = '09:00';
      if (state.events.length > 0) {
        const last = state.events[state.events.length - 1];
        nextStart = last.end || '08:00';
        const endMins = (timeToMinutes(nextStart) + 60) % (24 * 60);
        nextEnd = `${String(Math.floor(endMins / 60)).padStart(2, '0')}:${String(endMins % 60).padStart(2, '0')}`;
      }
      elFieldStart.value = nextStart;
      elFieldEnd.value = nextEnd;
      elFieldTitle.value = '';
      elFieldCategory.value = 'cong-viec';
      elFieldLocation.value = '';
      elFieldNote.value = '';
      elFieldHighlight.checked = false;
    }
    elModal.hidden = false;
    setTimeout(() => elFieldTitle.focus(), 40);
  }

  function closeModal() {
    elModal.hidden = true;
  }

  // Event Listeners
  function bindEvents() {
    // Theme switch
    document.querySelectorAll('.theme-dot').forEach(btn => {
      btn.addEventListener('click', () => {
        applyTheme(btn.dataset.theme);
        showToast(`Đã đổi chủ đề: ${btn.title}`);
      });
    });

    // Inline header editing
    elTitle.addEventListener('input', () => {
      state.title = elTitle.textContent.trim();
      saveState();
    });

    elSubtitle.addEventListener('input', () => {
      state.subtitle = elSubtitle.textContent.trim();
      saveState();
    });

    elDate.addEventListener('change', () => {
      state.date = elDate.value || todayISO();
      elDisplayDate.textContent = formatDateVN(state.date);
      saveState();
    });

    // Dropdown templates
    const dropdown = document.getElementById('btnTemplates').closest('.dropdown');
    document.getElementById('btnTemplates').addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    document.addEventListener('click', () => dropdown.classList.remove('open'));

    document.querySelectorAll('#templateMenu button').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.template;
        state = buildTemplateState(key, state.theme);
        activeCategoryFilter = 'all';
        searchQuery = '';
        elSearchInput.value = '';
        elSearchClear.hidden = true;
        saveState();
        renderTimeline();
        showToast('Đã áp dụng mẫu lịch trình mới');
      });
    });

    // Sort by start time
    document.getElementById('btnSortTime').addEventListener('click', () => {
      state.events.sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));
      saveState();
      renderTimeline();
      showToast('Đã sắp xếp các mốc theo thứ tự thời gian');
    });

    // Export JSON
    document.getElementById('btnExportJson').addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `timeline-${state.date || 'custom'}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Đã tải xuống file JSON');
    });

    // Import JSON
    const fileInput = document.getElementById('fileImportJson');
    document.getElementById('btnImportJson').addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const imported = JSON.parse(reader.result);
          if (!imported || !Array.isArray(imported.events)) {
            throw new Error('Cấu trúc JSON không hợp lệ');
          }
          state = {
            theme: imported.theme || state.theme,
            date: imported.date || todayISO(),
            title: imported.title || 'Lịch Trình Đã Nhập',
            subtitle: imported.subtitle || '',
            events: imported.events.map(ev => ({
              id: ev.id || uid(),
              start: ev.start || '08:00',
              end: ev.end || '09:00',
              title: ev.title || 'Hoạt động',
              category: CATEGORIES[ev.category] ? ev.category : 'khac',
              location: ev.location || '',
              note: ev.note || '',
              highlight: Boolean(ev.highlight),
              done: Boolean(ev.done)
            }))
          };
          activeCategoryFilter = 'all';
          searchQuery = '';
          elSearchInput.value = '';
          elSearchClear.hidden = true;
          applyTheme(state.theme);
          renderTimeline();
          showToast('Đã nhập dữ liệu timeline thành công');
        } catch (err) {
          showToast('Lỗi: File JSON không đúng định dạng!');
        } finally {
          fileInput.value = '';
        }
      };
      reader.readAsText(file);
    });

    // Print / PDF
    document.getElementById('btnPrint').addEventListener('click', () => {
      elDisplayDate.textContent = formatDateVN(state.date);
      window.print();
    });

    // Preview Mode
    document.getElementById('btnTogglePreview').addEventListener('click', () => {
      document.body.classList.add('preview-mode');
      elDisplayDate.textContent = formatDateVN(state.date);
      showToast('Đang ở chế độ Xem trước (nhấn ESC để thoát)');
    });

    document.getElementById('btnExitPreview').addEventListener('click', () => {
      document.body.classList.remove('preview-mode');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (!elModal.hidden) closeModal();
        else if (document.body.classList.contains('preview-mode')) {
          document.body.classList.remove('preview-mode');
        }
      }
    });

    // Add event buttons
    document.getElementById('btnAddEvent').addEventListener('click', () => openModal(null));
    document.getElementById('btnEmptyAdd').addEventListener('click', () => openModal(null));
    document.getElementById('btnFabAdd').addEventListener('click', () => openModal(null));

    // Modal controls
    document.getElementById('btnCloseModal').addEventListener('click', closeModal);
    document.getElementById('btnCancelModal').addEventListener('click', closeModal);
    elModal.addEventListener('click', (e) => {
      if (e.target === elModal) closeModal();
    });

    elForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = elFieldId.value;
      const payload = {
        start: elFieldStart.value,
        end: elFieldEnd.value,
        title: elFieldTitle.value.trim(),
        category: elFieldCategory.value,
        location: elFieldLocation.value.trim(),
        note: elFieldNote.value.trim(),
        highlight: elFieldHighlight.checked
      };

      if (!payload.title) return;

      if (id) {
        const idx = state.events.findIndex(item => item.id === id);
        if (idx !== -1) {
          state.events[idx] = { ...state.events[idx], ...payload };
          showToast('Đã cập nhật mốc thời gian');
        }
      } else {
        state.events.push({ id: uid(), ...payload, done: false });
        showToast('Đã thêm mốc thời gian mới');
      }

      saveState();
      renderTimeline();
      closeModal();
    });

    // Category filter click
    elCategoryFilterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-chip');
      if (!btn) return;
      activeCategoryFilter = btn.dataset.cat;
      renderTimeline();
    });

    // Search events (debounce để mượt trên mobile)
    elSearchInput.addEventListener('input', () => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        searchQuery = elSearchInput.value || '';
        elSearchClear.hidden = searchQuery.trim() === '';
        renderTimeline();
      }, 180);
    });
    elSearchClear.addEventListener('click', () => {
      elSearchInput.value = '';
      searchQuery = '';
      elSearchClear.hidden = true;
      renderTimeline();
      elSearchInput.focus();
    });

    // Timeline item delegated actions
    elTimelineList.addEventListener('click', (e) => {
      const actionEl = e.target.closest('[data-action]');
      if (!actionEl) return;

      const itemEl = actionEl.closest('.timeline-item');
      const id = itemEl?.dataset.id;
      const idx = state.events.findIndex(ev => ev.id === id);
      if (idx === -1) return;

      const action = actionEl.dataset.action;

      if (action === 'toggle-done') {
        state.events[idx].done = actionEl.checked;
        vibrate(actionEl.checked ? 15 : 8);
        saveState();
        renderTimeline();
      } else if (action === 'edit') {
        openModal(state.events[idx]);
      } else if (action === 'delete') {
        state.events.splice(idx, 1);
        saveState();
        renderTimeline();
        showToast('Đã xóa mốc thời gian');
      } else if (action === 'duplicate') {
        const copy = { ...state.events[idx], id: uid(), title: `${state.events[idx].title} (Bản sao)`, done: false };
        state.events.splice(idx + 1, 0, copy);
        saveState();
        renderTimeline();
        showToast('Đã nhân bản mốc thời gian');
      } else if (action === 'move-up' && idx > 0) {
        [state.events[idx - 1], state.events[idx]] = [state.events[idx], state.events[idx - 1]];
        saveState();
        renderTimeline();
      } else if (action === 'move-down' && idx < state.events.length - 1) {
        [state.events[idx + 1], state.events[idx]] = [state.events[idx], state.events[idx + 1]];
        saveState();
        renderTimeline();
      }
    });
  }

  // Init
  populateCategorySelect();
  applyTheme(state.theme);
  bindEvents();
  renderTimeline();
})();
