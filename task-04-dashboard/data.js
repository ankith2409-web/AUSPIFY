(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Dashboard = factory();
})(typeof globalThis === 'object' ? globalThis : this, () => {
  const categories = ['Medical / non-critical','Medical / critical','Transport / transfer','Accident / trauma','Other'];
  const statuses = ['Waiting','Accepted','In progress','Completed'];
  const facilities = [
    {name:'Riverside General',zone:'Zone A'}, {name:'Lakeside Medical',zone:'Zone B'},
    {name:'Northview Regional',zone:'Zone C'}, {name:'West End Community',zone:'Zone A'}
  ];
  const areas = ['Riverside / Zone A','Lakeside / Zone B','Northview / Zone C','West End / Zone A','Hillcrest / Zone B'];
  const ranges = {week:{label:'18-24 Jan 2025',start:'2025-01-18',end:'2025-01-24'},month:{label:'January 2025',start:'2025-01-01',end:'2025-01-31'}};
  const pad = n => String(n).padStart(2,'0');
  const generated = Array.from({length:93}, (_, seed) => {
    const status = ['Waiting','Accepted','In progress','Completed','Completed','Completed','In progress'][seed % 7];
    return {id:`INC-${String(2401 + seed).padStart(5,'0')}`,category:categories[seed % 5],priority:['High','Medium','Low'][seed % 3],area:areas[seed % 5],facility:status === 'Waiting' ? 'Unassigned' : facilities[seed % 4].name,minutes:status === 'Waiting' ? null : 8 + seed * 7 % 18,status,created:`2025-01-${pad(Math.floor(seed / 3) + 1)} ${pad(8 + seed % 3 * 4)}:${pad(seed * 7 % 60)}`};
  });
  const featured = [
    ['02584',1,'High',0,0,12,'In progress','24 14:26'],
    ['02583',2,'Medium',1,1,18,'Accepted','24 13:58'],
    ['02582',3,'High',2,2,15,'Accepted','24 12:47'],
    ['02581',0,'Low',3,3,20,'Completed','24 11:36'],
    ['02580',1,'High',4,0,13,'Completed','24 10:22'],
    ['02579',4,'Low',1,-1,null,'Waiting','23 16:10'],
    ['02578',3,'High',2,2,11,'In progress','23 14:20'],
    ['02577',0,'Medium',3,3,19,'Completed','22 09:05']
  ].map(([id,category,priority,area,facility,minutes,status,date]) => ({id:`INC-${id}`,category:categories[category],priority,area:areas[area],facility:facility < 0 ? 'Unassigned' : facilities[facility].name,minutes,status,created:`2025-01-${date}`}));
  const incidents = [...generated,...featured].sort((a,b) => b.created.localeCompare(a.created) || b.id.localeCompare(a.id));
  function select({period='week',query='',status='All statuses',facility='' } = {}) {
    const range = ranges[period] || ranges.week, term = query.trim().toLowerCase();
    return incidents.filter(i => i.created.slice(0,10) >= range.start && i.created.slice(0,10) <= range.end && (status === 'All statuses' || i.status === status) && (!facility || i.facility === facility) && Object.values(i).join(' ').toLowerCase().includes(term));
  }
  function metrics(rows) {
    const times = rows.map(i => i.minutes).filter(Number.isFinite).sort((a,b) => a-b), half = Math.floor(times.length / 2);
    const accepted = rows.filter(i => i.status !== 'Waiting').length;
    return {total:rows.length,accepted,acceptance:rows.length ? accepted / rows.length * 100 : null,median:times.length ? (times[half] + times[Math.ceil(times.length / 2)-1]) / 2 : null,open:rows.filter(i => i.status !== 'Completed').length};
  }
  function buckets(rows, period) {
    const spans = period === 'month' ? [[1,7],[8,14],[15,21],[22,28],[29,31]] : Array.from({length:7},(_,i) => [18+i,18+i]);
    return spans.map(([start,end]) => ({label:start === end ? `${start} Jan` : `${start}-${end} Jan`,count:rows.filter(i => {const day = Number(i.created.slice(8,10));return day >= start && day <= end;}).length}));
  }
  const breakdown = rows => categories.map(label => ({label,count:rows.filter(i => i.category === label).length}));
  const escape = value => String(value ?? '').replace(/[&<>"']/g,c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function csv(rows) {
    const keys = ['id','category','priority','area','facility','minutes','status','created'];
    const cell = value => `"${String(value ?? '').replace(/^[=+@-]/,"'$&").replaceAll('"','""')}"`;
    return [keys.join(','),...rows.map(row => keys.map(key => cell(row[key])).join(','))].join('\r\n');
  }
  return {incidents,facilities,categories,statuses,ranges,select,metrics,buckets,breakdown,csv,escape};
});
