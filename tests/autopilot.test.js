// Run: node --test tests/autopilot.test.js
const test = require('node:test'); const assert = require('node:assert');
const { EMPLOYEES, safetyCheck, autopilotCycle, NEVER_AUTO } = require('../lib/autopilot.js');
test('20 employees, 5 teams', () => { assert.equal(EMPLOYEES.length, 20); });
test('WhatsApp excluded from autopilot', () => { const w = EMPLOYEES.find((e) => e.name === 'WhatsApp Marketing'); assert.equal(w.autopilot, false); const c = autopilotCycle('2026-10-28'); assert.ok(!c.drafts.find((d) => d.employee === 'WhatsApp Marketing')); assert.equal(c.drafts.length, 19); });
test('banned claims blocked', () => { assert.equal(safetyCheck('certified organic').ok, false); assert.equal(safetyCheck('Price ₹499').ok, false); assert.equal(safetyCheck('Guaranteed result').ok, false); assert.equal(safetyCheck('Better flowers, better leaves').ok, true); });
test('cycle spends 0 and publishes nothing live', () => { const c = autopilotCycle('2026-10-28'); assert.equal(c.spendingINR, 0); assert.ok(c.drafts.every((d) => d.status === 'Awaiting Approval')); assert.match(c.ceoReport, /CEO Report to Founder/); assert.match(c.ceoReport, /TBD/); });
test('never-auto list covers money, live publish, WhatsApp', () => { const s = NEVER_AUTO.join(' '); assert.match(s, /WhatsApp/); assert.match(s, /publish/); });
