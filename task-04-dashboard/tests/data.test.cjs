const {test} = require('node:test');
const assert = require('node:assert/strict');
const D = require('../data.js');
test('deterministic dataset has unique IDs and complete calendar coverage', () => {
  assert.equal(D.incidents.length,101);
  assert.equal(new Set(D.incidents.map(i => i.id)).size,101);
  assert.equal(new Set(D.incidents.map(i => i.created.slice(0,10))).size,31);
  for (const i of D.incidents) {
    assert.ok(D.categories.includes(i.category));assert.ok(D.statuses.includes(i.status));
    assert.equal(i.status === 'Waiting',i.minutes === null);
    assert.equal(i.status === 'Waiting',i.facility === 'Unassigned');
  }
});
test('week and month inclusively select the documented rows', () => {
  assert.equal(D.select({period:'week'}).length,29);
  assert.equal(D.select({period:'month'}).length,101);
  for (const i of D.select()) assert.ok(i.created >= '2025-01-18' && i.created < '2025-01-25');
});
test('chart buckets, categories, metrics, and assignments reconcile for both ranges', () => {
  for (const period of ['week','month']) {
    const rows = D.select({period}), m = D.metrics(rows), total = xs => xs.reduce((s,v) => s+v.count,0);
    assert.equal(total(D.buckets(rows,period)),m.total);
    assert.equal(total(D.breakdown(rows)),m.total);
    assert.equal(m.accepted,rows.filter(i => i.facility !== 'Unassigned').length);
    assert.equal(m.open,m.total-rows.filter(i => i.status === 'Completed').length);
    assert.equal(m.acceptance,m.accepted/m.total*100);
  }
});
test('median uses finite response values for odd, even, and empty selections', () => {
  assert.equal(D.metrics([{minutes:20},{minutes:10},{minutes:null}]).median,15);
  assert.equal(D.metrics([{minutes:30},{minutes:8},{minutes:12}]).median,12);
  assert.equal(D.metrics([]).median,null);assert.equal(D.metrics([]).acceptance,null);
});
test('search, status, and range intersect rather than override each other', () => {
  const selected = D.select({period:'month',query:' riverside general ',status:'Completed'});
  assert.ok(selected.length > 0);
  for (const row of selected) {assert.equal(row.facility,'Riverside General');assert.equal(row.status,'Completed');}
  assert.equal(D.select({query:'does not exist'}).length,0);
});
test('CSV exports the exact filtered rows, not a page or the entire dataset', () => {
  for (const period of ['week','month']) {
    const rows = D.select({period,status:'Completed'}), lines = D.csv(rows).split('\r\n');
    assert.equal(lines.length,rows.length+1);
    assert.deepEqual(lines.slice(1).map(line => line.split(',')[0].replaceAll('"','')),rows.map(i => i.id));
  }
});
test('CSV quotes commas, quotes, and line breaks; guards formula-leading cells', () => {
  const csv = D.csv([{id:'=SUM(1,2)',category:'A "quoted", label',area:'Two\nlines'}]);
  assert.ok(csv.includes('"\'=SUM(1,2)"'));
  assert.ok(csv.includes('"A ""quoted"", label"'));
  assert.ok(csv.includes('"Two\nlines"'));
});
test('monthly chart includes the final three calendar days', () => {
  const last = D.buckets(D.select({period:'month'}),'month').at(-1);
  assert.equal(last.label,'29-31 Jan');assert.equal(last.count,9);
});
test('search content is safe to interpolate into attributes', () => {
  assert.equal(D.escape('\"><svg/onload=alert(1)>'),'&quot;&gt;&lt;svg/onload=alert(1)&gt;');
});
