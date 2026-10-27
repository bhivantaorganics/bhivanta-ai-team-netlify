// Netlify Scheduled Function — the autopilot worker.
// Runs on Netlify's schedule (bounded invocation, NOT a 24x7 server).
// Each run: generates today's drafts for all autopilot employees,
// EXCEPT WhatsApp, enforces safety, spends 0, publishes nothing live.
// Kill switch: set AUTOPILOT_ENABLED=false in Netlify env to pause.
const { autopilotCycle } = require('../../lib/autopilot.js');

exports.handler = async () => {
  if (process.env.AUTOPILOT_ENABLED === 'false') {
    return { statusCode: 200, body: JSON.stringify({ ok: true, paused: true, reason: 'AUTOPILOT_ENABLED=false kill switch' }) };
  }
  const today = new Date().toISOString().slice(0, 10);
  const cycle = autopilotCycle(today);
  // In production this is where drafts/audit would be written to
  // Netlify Blobs/Database. This function itself never publishes live,
  // never contacts WhatsApp, never spends.
  return { statusCode: 200, body: JSON.stringify({ ok: true, date: cycle.date, drafts: cycle.drafts.length, skipped: cycle.skipped, spendingINR: 0, audit: cycle.audit }) };
};

// Netlify scheduled-function config: hourly cycle.
exports.config = { schedule: '0 * * * *' };
