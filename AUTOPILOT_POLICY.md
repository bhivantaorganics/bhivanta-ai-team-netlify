# Bhivanta AI Team — Netlify Autopilot Policy (100% free ke andar jo sach me possible hai)

## Sachai jo pehle samajhni hai
- Netlify koi 24x7 jagta hua server NAHI hai. Wo static site (CDN) + serverless functions hai.
  Functions request ya schedule par jagte hain, kaam karke band ho jate hain, aur har
  invocation ki limit hoti hai. Isliye "continuous 24x7 server, free me" kisi bhi free
  host par nahi milta — SnapDeploy par bhi nahi, Netlify par bhi nahi.
- Jo free me sabse kareeb ban sakta hai, wo ye hai:
  **Site 24x7 online (CDN se hamesha khulegi) + Worker schedule par chalega (har ghante
  cycle) + Dashboard kholne par fresh cycle.** Dekhne me company 24x7 online lagegi,
  lekin andar compute schedule par hoga. Ye jhooth nahi, yehi serverless ka standard tareeka hai.
- Netlify Free (Sept 2026 sources, pricing page par verify karna): ~300 credits/month.
  Isliye deploy baar-baar mat karo, worker ko halka rakho, warna credits khatam ho jayenge.
  Koi card nahi, koi paid Always-On nahi.

## Hosting structure (nayi site, purani website ko chhede bina)
- Frontend: `public/` static site → Netlify CDN, free SSL, hamesha online.
- API: `netlify/functions/api.js` — health, teams, SOP, aaj ka cycle.
- Worker: `netlify/functions/worker-scheduled.js` — schedule `0 * * * *` (har ghante).
  Ye kabhi live publish nahi karta, kabhi WhatsApp nahi chhoota, kabhi kharch nahi karta.
- Purani site bhivantaorganics.com wali Netlify site ALAG rahegi. AI Team ke liye
  ALAG nayi Netlify site banegi (alag subdomain), taaki main website par koi asar na pade.
- SnapDeploy wala AI Team container tab tak live rakho jab tak Netlify version verify
  na ho jaye, phir use band karke hours bachao. Delete karne se pehle owner se poochna.

## Company structure — har kaam standard tareeke se
- 5 Teams, 20 Employees, 5 Managers, 1 CEO (Founder ko report).
- Har din ka standard cycle: Subah draft → Dopahar approval queue → Shaam CEO report.
- Har hafte: weekly review draft. Har mahine: brand audit draft (verified vs TBD alag).
- Har draft ki state: Pending → In Progress → Awaiting Approval (Manager) →
  Published (sirf real URL + manager approval ke saath) / Completed.
- Performance: sirf entered real data, warna TBD. Koi follower, sales, reach ka number
  invent nahi hoga.

## Autopilot — kya AUTO hai, kya KABHI AUTO NAHI
AUTO (safe):
- Draft banana, approval queue me bhejna, CEO report draft, reminder/follow-up, audit log.
KABHI AUTO NAHI:
- Live publish, customer/retailer/influencer ko live message, price/discount/offer,
  payment/kharch/financial ya legal commitment, certified/guaranteed/sabhi-paudhon wala dawa,
  koi number invent karna.
WHATSAPP: Poora WhatsApp autopilot se BAHAR hai (owner instruction). WhatsApp Marketing
employee ka koi auto draft bhi nahi banega. WhatsApp ka kaam sirf manual + existing
WhatsApp Web operator se hoga, jab operations shuru honge tab.

## All Safety
- Spending cap: ₹0 (code me hardcoded, koi paid API call nahi).
- Safety filter: certified / guaranteed / price ₹ / discount / offer% wale text block.
- Kill switch: Netlify env `AUTOPILOT_ENABLED=false` → worker turant pause.
- Pause/Resume + audit log har cycle me.
- Secrets: koi password/token repo me nahi. ADMIN_PASSWORD sirf owner Netlify UI me
  khud set karega, kabhi chat me nahi.
- Data: abhi drafts date + employee se deterministic bante hain (duplicate nahi).
  Approvals ko permanently save karne ke liye deploy ke waqt Netlify Blobs/Database ya
  Supabase free Postgres connect karna hoga — ye step deploy ke baad, bina card ke,
  owner ke Netlify sign-in se hoga. Uske bina approval history save nahi hogi, ye limit
  saaf likhi ja rahi hai, chhupayi nahi ja rahi.

## Performance best kaise
- Frontend static + CDN → pehla load fast, server wake ka wait nahi.
- Worker halka, ek cycle me max 19 drafts (WhatsApp excluded), koi bhaari kaam nahi.
- Deploy kam karo (har deploy credits khata hai), ek baar me sahi code bhejo.
