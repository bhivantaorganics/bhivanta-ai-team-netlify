// Netlify Function: dashboard API (stateless, seed + autopilot status).
// No DB claim: drafts are generated deterministically per date by the
// scheduled worker; approvals/persistence need Netlify Blobs/Database
// (or Supabase free Postgres) connected at deploy time — see README.
const { TEAMS, EMPLOYEES, SOP, AUTO_ALLOWED, NEVER_AUTO, autopilotCycle } = require('../../lib/autopilot.js');

exports.handler = async (event) => {
  const action = (event.queryStringParameters || {}).action || 'health';
  const today = new Date().toISOString().slice(0, 10);
  const headers = { 'Content-Type': 'application/json' };
  if (action === 'health') {
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, mode: 'netlify_autopilot', approvalMode: '1', teams: 5, employees: 20, autopilotEmployees: EMPLOYEES.filter((e) => e.autopilot).length, whatsappExcluded: true, spendingINR: 0, time: new Date().toISOString() }) };
  }
  if (action === 'teams') return { statusCode: 200, headers, body: JSON.stringify({ teams: TEAMS, employees: EMPLOYEES }) };
  if (action === 'sop') return { statusCode: 200, headers, body: JSON.stringify({ sop: SOP, autoAllowed: AUTO_ALLOWED, neverAuto: NEVER_AUTO }) };
  if (action === 'cycle') {
    const cycle = autopilotCycle(today);
    return { statusCode: 200, headers, body: JSON.stringify(cycle) };
  }
  return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: 'Unknown action' }) };
};
