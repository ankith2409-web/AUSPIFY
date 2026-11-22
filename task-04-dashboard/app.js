const D = Dashboard, clean = D.escape, main = document.querySelector('#content');
const selection = {period:'week',query:'',status:'All statuses',facility:''};
let pageNumber = 1;
const pageSize = 25;
const rows = () => D.select(selection);
const cohort = () => D.select({period:selection.period});
const pill = value => `<span class="pill ${value.toLowerCase().replaceAll(' ','').replace('inprogress','progress')}">${clean(value)}</span>`;
const range = () => `<label class="range">Time range<select id="period">${Object.entries(D.ranges).map(([key,value]) => `<option value="${key}"${key === selection.period ? ' selected' : ''}>${value.label}</option>`).join('')}</select></label>`;
const title = (name,description,controls = true) => `<div class="heading-row"><div><h1 tabindex="-1">${clean(name)}</h1><p>${description}</p></div>${controls ? range() : ''}</div>`;
const facilityFilter = () => {
  const names = [...D.facilities.map(item => item.name), 'Unassigned'];
  return `<label><span class="sr-only">Filter by facility</span><select id="facility"><option value="">All facilities</option>${names.map(name => `<option${name === selection.facility ? ' selected' : ''}>${clean(name)}</option>`).join('')}</select></label>`;
};
const filters = () => `<div class="controls"><label class="search-field"><span class="sr-only">Search incidents</span><input id="search" type="search" placeholder="Search ID, category, area or facility" value="${clean(selection.query)}"></label><label><span class="sr-only">Filter by status</span><select id="status">${['All statuses',...D.statuses].map(value => `<option${value === selection.status ? ' selected' : ''}>${value}</option>`).join('')}</select></label>${facilityFilter()}<button class="secondary" id="clear">Clear filters</button></div>`;

function selectionSummary() {
  const fields = [
    ['Date range', D.ranges[selection.period].label],
    ['Status', selection.status],
    ['Facility', selection.facility || 'All facilities'],
    ['Search', selection.query.trim() || 'None'],
  ];
  return `<dl class="selection-summary" aria-label="Current filters">${fields.map(([label, value]) =>
    `<div><dt>${label}</dt><dd>${clean(value)}</dd></div>`).join('')}</dl>`;
}

function table(records, caption = 'Fictional incident records') {
  if (!records.length) return '<div class="empty"><h3>No matching incidents</h3><p>Try another search, facility, status, or time range.</p><button class="secondary" id="empty-clear">Clear filters</button></div>';
  const columns = ['Incident ID','Status','Category','Priority','Origin area','Assigned facility','Response time','Created'];
  return `<p class="table-hint">Swipe the table to see more columns.</p><div class="table-scroll" role="region" aria-label="${clean(caption)}; scroll horizontally for more columns" tabindex="0"><table class="data-table"><caption class="sr-only">${clean(caption)}</caption><thead><tr>${columns.map(label => `<th scope="col">${label}</th>`).join('')}</tr></thead><tbody>${records.map(i => `<tr><th scope="row"><a class="id-button" href="#detail/${i.id}">${i.id}</a></th><td>${pill(i.status)}</td><td>${clean(i.category)}</td><td>${pill(i.priority)}</td><td>${clean(i.area)}</td><td>${clean(i.facility)}</td><td>${i.minutes === null ? 'Not received' : `${i.minutes} min`}</td><td>${i.created}</td></tr>`).join('')}</tbody></table></div>`;
}
function chart(records) {
  const values = D.buckets(records,selection.period), max = Math.max(1,...values.map(v => v.count));
  return `<p class="chart-scale">Incidents / zero baseline</p><div class="chart" role="img" aria-label="${values.map(v => `${v.label}: ${v.count} incidents`).join('; ')}">${values.map(v => `<div class="bar-group"><div class="bar" style="height:${v.count / max * 82}%"><span>${v.count}</span></div></div>`).join('')}</div><div class="axis" aria-hidden="true">${values.map(v => `<span>${v.label}</span>`).join('')}</div><details class="chart-data"><summary>View chart data</summary><table><caption>Incident volume / ${D.ranges[selection.period].label}</caption><thead><tr><th scope="col">Date</th><th scope="col">Incidents</th></tr></thead><tbody>${values.map(v => `<tr><th scope="row">${v.label}</th><td>${v.count}</td></tr>`).join('')}</tbody></table></details>`;
}
function overview() {
  const records = cohort(), m = D.metrics(records);
  return `${title('Operations overview','An archived, fictional dataset. Every widget uses the selected time range.')}<section class="metrics" aria-label="Summary metrics"><div class="metric"><span>Incidents</span><strong>${m.total}</strong><small>${D.ranges[selection.period].label}</small></div><div class="metric"><span>Acceptance rate</span><strong>${m.acceptance.toFixed(1)}%</strong><small>${m.accepted} of ${m.total} accepted or later</small></div><div class="metric"><span>Median response</span><strong>${m.median} min</strong><small>Excludes waiting records</small></div><div class="metric"><span>Open cases</span><strong>${m.open}</strong><small>Not marked completed</small></div></section><div class="panels"><section class="panel"><div class="panel-header"><div><h2>Incident volume</h2><p>${selection.period === 'month' ? 'Calendar date groups; final group has 3 days' : 'Daily counts, 18-24 January'} / sample data</p></div><span class="legend"><b></b>Incidents</span></div>${chart(records)}</section><section class="panel"><h2>Incidents by category</h2><p>Count and share of ${m.total} selected records</p><div class="breakdown">${D.breakdown(records).map(v => `<div class="break-row"><span>${v.label}</span><span class="track" aria-hidden="true"><i style="width:${v.count / m.total * 100}%"></i></span><strong>${v.count}<small>${(v.count / m.total * 100).toFixed(1)}%</small></strong></div>`).join('')}</div><p class="chart-note">Bars show share of all selected incidents (0-100%). Percentages are rounded.</p></section></div><section class="panel"><div class="table-head"><div><h2>Recent incidents</h2><p>Newest 5 of ${m.total} selected records.</p></div><a class="text-link" href="#incidents">View incident register &#8594;</a></div>${table(records.slice(0,5),'Recent incidents')}</section><div class="bottom"><section class="panel"><h2>How to read these metrics</h2><p class="explanation">Acceptance includes Accepted, In progress, and Completed. Response time is the sample delay to provider response. Open cases belong to this date cohort, not a live queue.</p><a class="text-link" href="#facilities">Review facility assignments &#8594;</a></section><section class="panel"><h2>About this data</h2><p class="explanation">101 invented January 2025 records, including 29 in the sample week. No live incidents, patient identities, provider availability, or dispatch actions.</p><a class="text-link" href="https://github.com/ankith2409-web/AUSPIFY/blob/task/04-dashboard/task-04-dashboard/RESEARCH.md">Design decisions and data definitions &#8599;</a></section></div>`;
}
function register() {
  const filtered = rows(), count = filtered.length, pages = Math.max(1,Math.ceil(count / pageSize));
  pageNumber = Math.min(pageNumber,pages);
  const start = (pageNumber - 1) * pageSize;
  return `${title('Incidents','Find a record, inspect its details, then return to your selection.')}${filters()}<section class="panel"><div class="panel-header"><div><h2>Incident register</h2><p id="result-count">${count} of ${cohort().length} records match / newest first</p></div><a class="text-link" href="#reports">Export selection &#8594;</a></div>${selectionSummary()}${table(filtered.slice(start,start + pageSize))}${count ? `<div class="pagination"><button class="secondary" id="previous"${pageNumber === 1 ? ' disabled' : ''}>Previous</button><span>Page ${pageNumber} of ${pages} / ${start+1}-${Math.min(start+pageSize,count)} of ${count}</span><button class="secondary" id="next"${pageNumber === pages ? ' disabled' : ''}>Next</button></div>` : ''}</section>`;
}
function facilities() {
  const records = cohort(), assigned = records.filter(i => i.facility !== 'Unassigned').length;
  return `${title('Facilities','Assignments from the same date cohort as the overview.')}<p class="notice">${assigned} assigned / ${records.length-assigned} unassigned. These are fictional providers; availability is not measured.</p><div class="facility-list">${D.facilities.map(f => {const matches = records.filter(i => i.facility === f.name);return `<article class="facility-card"><h2>${f.name}</h2><p>${f.zone}</p><strong class="facility-count">${matches.length}</strong><p>Assigned sample incidents</p><p>${matches.filter(i => i.status !== 'Completed').length} not completed in this cohort</p><button class="secondary" data-facility="${f.name}">View assigned records</button></article>`;}).join('')}</div>`;
}
function reports() {
  const count = rows().length;
  return `${title('Reports','Export the complete filtered selection, including every result page.')}${filters()}<div class="report-layout"><section class="panel"><h2>CSV preview</h2><p class="explanation">${count} of ${cohort().length} records in the selected date range will be included.</p>${selectionSummary()}<button class="primary" id="export"${count ? '' : ' disabled'}>Download ${count} records as CSV</button><a class="text-link report-back" href="#incidents">Review selected records &#8594;</a></section><p class="notice">Generated in your browser from invented sample records. Waiting records have no assigned facility or response time. This is an archived design demonstration.</p></div>`;
}
function detail(id) {
  const record = D.incidents.find(i => i.id === id);
  if (!record) return `${title('Record not found','This record does not exist in the sample dataset.',false)}<a class="back" href="#incidents">Back to incident register</a>`;
  const fields = [['Category',record.category],['Priority',record.priority],['Origin area',record.area],['Assigned facility',record.facility],['Provider response',record.minutes === null ? 'Not received' : `${record.minutes} minutes`],['Created',`${record.created} / sample local time`]];
  return `<a class="back" href="#incidents">&#8592; Back to incidents</a>${title(record.id,'Fictional coordination record / no service action is available.',false)}<section class="panel detail-panel"><div class="panel-header"><h2>Coordination summary</h2>${pill(record.status)}</div><dl class="detail-list">${fields.map(([key,value]) => `<dt>${key}</dt><dd>${clean(value)}</dd>`).join('')}</dl></section><p class="notice detail-panel">Search, status, time range, and register page are retained when you go back.</p>`;
}
function page() { return (location.hash.slice(1) || 'overview').split('/')[0]; }
function render(focusId, caret) {
  const current = page(), pages = {overview,incidents:register,facilities,reports};
  const content = current === 'detail' ? detail(location.hash.split('/')[1]) : pages[current]?.() || `${title('Page not found','Choose a dashboard section.',false)}<a href="#overview">Back to overview</a>`;
  main.innerHTML = `<div class="content">${content}</div>`;
  document.querySelectorAll('[data-nav]').forEach(a => {
    if (a.dataset.nav === (current === 'detail' ? 'incidents' : current)) a.setAttribute('aria-current','page');
    else a.removeAttribute('aria-current');
  });
  if (focusId) {
    const target = document.getElementById(focusId);
    target?.focus({preventScroll:true});
    if (caret !== undefined) target?.setSelectionRange(caret,caret);
  }
  document.title = `${main.querySelector('h1').textContent} | THE SAVIOUR dashboard`;
}
function closeMenu(returnFocus = false) {
  document.querySelector('.sidebar').classList.remove('open');
  const menu = document.querySelector('#menu');
  menu.setAttribute('aria-expanded','false');
  menu.setAttribute('aria-label','Open navigation');
  if (returnFocus) menu.focus();
}
function route() {
  closeMenu();
  render();
  main.querySelector('h1').focus({preventScroll:true});
  scrollTo({top:0,behavior:'instant'});
}
function announce(message) { document.querySelector('#announce').textContent = message; }
function clearFilters() { selection.query = ''; selection.status = 'All statuses'; selection.facility = ''; pageNumber = 1; render('search'); announce(`${rows().length} records match`); }
function download() {
  const filtered = rows();
  if (!filtered.length) return;
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([D.csv(filtered)],{type:'text/csv;charset=utf-8'}));
  link.download = `the-saviour-${selection.period}-${filtered.length}-sample-records.csv`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href),1000);
  announce(`CSV generated with ${filtered.length} fictional records`);
}
// Delegation keeps the handlers stable while panels are replaced.
document.addEventListener('click', event => {
  if (event.target.closest('.skip')) { event.preventDefault(); main.querySelector('h1').focus(); return; }
  const button = event.target.closest('button');
  if (!button) { if (!event.target.closest('.sidebar')) closeMenu(); return; }
  if (button.id === 'menu') {
    const open = document.querySelector('.sidebar').classList.toggle('open');
    button.setAttribute('aria-expanded',String(open));
    button.setAttribute('aria-label',open ? 'Close navigation' : 'Open navigation');
    if (open) document.querySelector('[aria-current="page"]')?.focus();
  } else if (['clear','empty-clear'].includes(button.id)) clearFilters();
  else if (['previous','next'].includes(button.id)) {
    pageNumber += button.id === 'next' ? 1 : -1;
    render();
    main.querySelector('h1').focus({preventScroll:true});
    scrollTo({top:0,behavior:'instant'});
    announce(`Page ${pageNumber}; ${rows().length} records match`);
  } else if (button.id === 'export') download();
  else if (button.dataset.facility) {
    selection.query = '';
    selection.facility = button.dataset.facility;
    selection.status = 'All statuses';
    pageNumber = 1;
    location.hash = 'incidents';
  }
});
document.addEventListener('change', event => {
  if (!['period','status','facility'].includes(event.target.id)) return;
  selection[event.target.id] = event.target.value;
  pageNumber = 1;
  render(event.target.id);
  announce(`${rows().length} records match ${D.ranges[selection.period].label}`);
});
document.addEventListener('input', event => {
  if (event.target.id !== 'search') return;
  selection.query = event.target.value;
  const caret = event.target.selectionStart;
  pageNumber = 1;
  render('search',caret);
  announce(`${rows().length} records match`);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && document.querySelector('#menu').getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('focusin', event => {
  if (!event.target.closest('.sidebar') && event.target.id !== 'menu') closeMenu();
});
addEventListener('hashchange',route);
route();
