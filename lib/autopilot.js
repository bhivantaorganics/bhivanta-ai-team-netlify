// Bhivanta AI Team — Netlify Autopilot Engine (pure logic, no paid deps)
// Design: site is ALWAYS online on Netlify CDN (static), worker is NOT
// a 24x7 continuous server — it runs on Netlify Scheduled Functions
// (bounded invocations) + on dashboard open. That is the closest
// 100% free shape: always-available web + scheduled work cycles.
// WhatsApp is EXCLUDED from autopilot by owner instruction.

const WHATSAPP_EXCLUDED = ['WhatsApp Marketing'];

const TEAMS = [
  { id: 1, name: 'Marketing' },
  { id: 2, name: 'Sales' },
  { id: 3, name: 'Customer' },
  { id: 4, name: 'Technology' },
  { id: 5, name: 'Operations' },
];

const EMPLOYEES = [
  // Team 1 Marketing (7) — WhatsApp Marketing excluded from autopilot
  { team_id: 1, name: 'WhatsApp Marketing', autopilot: false, reason: 'Owner excluded WhatsApp from autopilot' },
  { team_id: 1, name: 'Social Media Marketing', autopilot: true },
  { team_id: 1, name: 'Content Creation', autopilot: true },
  { team_id: 1, name: 'Email Marketing', autopilot: true },
  { team_id: 1, name: 'Performance Marketing & Paid Ads', autopilot: true, note: 'Drafts only — paid ads NEVER auto-spend' },
  { team_id: 1, name: 'SEO & Organic', autopilot: true },
  { team_id: 1, name: 'Growth / Influencer & Affiliate', autopilot: true, note: 'Drafts only — no commercial contact without approval' },
  // Team 2 Sales (3)
  { team_id: 2, name: 'Online Sales', autopilot: true },
  { team_id: 2, name: 'Nursery & Retail Sales', autopilot: true },
  { team_id: 2, name: 'Distributor & B2B Sales', autopilot: true },
  // Team 3 Customer (2)
  { team_id: 3, name: 'Customer Support', autopilot: true, note: 'Draft replies only — no live customer message auto-sent' },
  { team_id: 3, name: 'Customer Retention & Loyalty', autopilot: true },
  // Team 4 Technology (3)
  { team_id: 4, name: 'Website', autopilot: true },
  { team_id: 4, name: 'App', autopilot: true },
  { team_id: 4, name: 'Technology', autopilot: true },
  // Team 5 Operations (5)
  { team_id: 5, name: 'Order', autopilot: true, note: 'Enquiry drafts only — order Confirmed only by admin' },
  { team_id: 5, name: 'Inventory', autopilot: true },
  { team_id: 5, name: 'Logistics', autopilot: true },
  { team_id: 5, name: 'Finance', autopilot: true, note: 'Report drafts only — no payment, no financial commitment' },
  { team_id: 5, name: 'Quality & Compliance', autopilot: true },
];

// Safety: these claims are NEVER auto-generated, never published.
const BANNED = [/certified/i, /guaranteed/i, /sabhi paudhon/i, /every plant/i, /₹\s*\d/, /price\s*₹/i, /discount/i, /offer\s*\d+%/i];
function safetyCheck(text) {
  const t = String(text || '');
  const hit = BANNED.find((re) => re.test(t));
  return hit ? { ok: false, reason: 'Banned claim blocked: ' + hit } : { ok: true };
}

// Standard company SOP — same steps every cycle, every team.
const SOP = {
  morning: 'Har employee ka aaj ka draft task banao (approved wording only, no price/cert/guarantee).',
  midday: 'Approval Queue check karo — jo draft manager approval ke liye pending hai, use CEO Dashboard par dikhao.',
  evening: 'CEO Report banao: Teams Summary, Tasks Completed, Content Published (real links only), Actual Performance (entered data only, warna TBD), Target vs Achievement, Problems/Blockers, Approvals Required, Next-Day Action Plan.',
  weekly: 'Weekly review draft: 7 din ke approved drafts + pending approvals + blockers. Koi number invent mat karo.',
  monthly: 'Brand audit draft: verified vs TBD alag-alag likho.',
};

const AUTO_ALLOWED = [
  'Draft banana (post, reel script, email draft, report draft, SOP checklist)',
  'Approval Queue me bhejna',
  'CEO daily report ka draft banana',
  'Reminder / follow-up task banana',
  'Audit log likhna',
];
const NEVER_AUTO = [
  'Live publish karna (Instagram/Facebook/YouTube/website) bina manager approval + real URL ke',
  'Customer, retailer ya influencer ko live message/contact karna',
  'Price, discount, offer, payment, kharch ya financial/legal commitment karna',
  'WhatsApp par kuch bhi auto karna (poora WhatsApp autopilot se bahar hai)',
  'Certified / guaranteed / sabhi-paudhon / price / discount wala dawa banana',
  'Koi analytics, sales, follower ya performance number invent karna',
];

function autopilotCycle(dateStr) {
  const drafts = [];
  const skipped = [];
  for (const emp of EMPLOYEES) {
    if (!emp.autopilot || WHATSAPP_EXCLUDED.includes(emp.name)) {
      skipped.push({ employee: emp.name, reason: emp.reason || 'Excluded from autopilot' });
      continue;
    }
    const title = emp.name + ' — ' + dateStr + ' ka draft';
    const detail = 'Standard SOP ke hisab se aaj ka draft taiyaar karo, manager approval ke liye bhejo. ' + (emp.note || 'Approved wording only — koi daam, chhoot, ya pakka-result wali baat mat likho.');
    const check = safetyCheck(title + ' ' + detail);
    if (!check.ok) continue;
    drafts.push({ employee: emp.name, team_id: emp.team_id, title, detail, status: 'Awaiting Approval', date: dateStr });
  }
  const ceoReport = [
    'CEO Report to Founder — ' + dateStr,
    'Teams Summary: 5 teams, ' + drafts.length + ' autopilot drafts (WhatsApp excluded), ' + skipped.length + ' skipped.',
    'Tasks Completed: TBD (sirf approved/completed work ginna, invent mat karo)',
    'Content Published: Real links only, warna 0 / TBD',
    'Actual Performance: Entered data only, warna TBD — koi number invent mat karo',
    'Target vs Achievement: TBD until real data entered',
    'Problems or Blockers: Deploy quota / hosting limits / pending approvals yahan likho',
    'Approvals Required: Upar wale ' + drafts.length + ' drafts ke liye manager approval chahiye',
    'Next-Day Action Plan: Kal ke drafts + pending approvals ko aage badhao',
  ].join('\n');
  return {
    date: dateStr,
    drafts,
    skipped,
    ceoReport,
    audit: 'Autopilot cycle ' + dateStr + ': ' + drafts.length + ' drafts created, ' + skipped.length + ' skipped, 0 live publishes, 0 spends, WhatsApp excluded.',
    spendingINR: 0,
  };
}

module.exports = { TEAMS, EMPLOYEES, SOP, AUTO_ALLOWED, NEVER_AUTO, WHATSAPP_EXCLUDED, safetyCheck, autopilotCycle };
