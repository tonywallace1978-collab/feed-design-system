/* Profile v4 — additional fixtures inline (not in professional-data.js yet) */
window.PROFILE_V4_FIXTURES = {

  citizenship: "U.S. Citizen",
  citizenship_country_iso: "US",

  skilled_trades: [
    { name: "Industrial Electrician",   level: "Master",      years: 9, license: "MI EL-44182" },
    { name: "PLC Programmer",            level: "Expert",      years: 9, license: null },
    { name: "Robotic Integrator",        level: "Expert",      years: 7, license: "FANUC Cert. R-30iB" },
    { name: "Controls Technician",       level: "Master",      years: 9, license: null },
    { name: "Panel Builder (UL 508A)",   level: "Journeyman",  years: 6, license: "UL 508A — Panel Shop ID 22-1183" },
    { name: "Industrial Network Tech",   level: "Expert",      years: 6, license: "Cisco IND. CCNA" },
    { name: "Vision Systems Tech",       level: "Specialist",  years: 5, license: "Cognex Certified" },
    { name: "Functional Safety Eng.",    level: "Specialist",  years: 4, license: "TÜV FS Eng (TÜV Rheinland)" }
  ],

  professional_competencies: [
    { name: "FANUC robot programming (R-30iB / R-30iA)",       rating: 5.0, years: 7 },
    { name: "ABB IRC5 / OmniCore robot programming",            rating: 4.8, years: 5 },
    { name: "Siemens TIA Portal V18 / S7-1500",                 rating: 5.0, years: 8 },
    { name: "Allen-Bradley ControlLogix / Studio 5000",         rating: 5.0, years: 9 },
    { name: "FactoryTalk View ME / SE — HMI development",       rating: 4.7, years: 7 },
    { name: "WinCC Unified — SCADA architecture",                rating: 4.5, years: 4 },
    { name: "PROFINET / EtherNet/IP commissioning",              rating: 4.9, years: 7 },
    { name: "PROFIsafe / CIP Safety functional-safety design",   rating: 4.8, years: 4 },
    { name: "Cognex In-Sight 2D / 3D vision integration",        rating: 4.6, years: 5 },
    { name: "Servo / VFD drives — Kinetix, PowerFlex, Sinamics", rating: 4.7, years: 7 },
    { name: "FAT / SAT execution & documentation",               rating: 5.0, years: 9 },
    { name: "Brownfield retrofit project leadership",            rating: 4.9, years: 6 }
  ],

  watchlist_count: 18,
  on_user_watchlist_already: false,

  emergency_contact: {
    name: "Eduardo Lopez",
    relationship: "Spouse",
    phone: "(313) 555-0167"
  },

  industries_served: [
    { name: "Industrial / Manufacturing",  icon: "🏭", rating: 5.0, blurb: "Nine years across Tier-1 plants in MI, OH, IN, KY, SC. Lead engineer on 22 line-rate ramps and 9 brownfield retrofits." },
    { name: "Healthcare / Medical Devices",icon: "⚕️", rating: 4.5, blurb: "Three FDA-validated packaging-line builds for medical-device supplier. Documentation-heavy work, GAMP-5 fluent." },
    { name: "Food & Beverage",             icon: "🥫", rating: 4.5, blurb: "USDA-regulated dairy bottling line plus a frozen-foods palletizer cell. Sanitary design, washdown-rated controls." },
    { name: "Automotive",                  icon: "🚗", rating: 5.0, blurb: "Body-in-white, paint, final assembly. BMW, Stellantis, Ford repeat-engagements over six years." },
    { name: "Aerospace / Defense",         icon: "✈️", rating: 4.0, blurb: "ITAR-cleared work on two composite-layup cells. Torque-traceability + serialized-part tracking." },
    { name: "Logistics / Warehousing",     icon: "📦", rating: 4.5, blurb: "Distribution-center sortation upgrades, AS/RS retrofits. Comfortable across 6 conveyor brands and 3 WMS layers." }
  ],

  facilities_worked_at: [
    { name: "BMW Manufacturing — Plant Spartanburg",  location: "Spartanburg, SC",     from: "2024-08", to: "2024-12", logo: "assets/logos/bmw.png",        comments: "Body Shop Cell 14 FANUC R-30iB retrofit. Eight-week shutdown, returned to rate one week ahead of schedule." },
    { name: "Stellantis — Sterling Heights Assembly", location: "Sterling Heights, MI",from: "2024-04", to: "2024-08", logo: "assets/logos/stellantis.png", comments: "Paint shop PLC migration: Modicon → Allen-Bradley ControlLogix L8x. 14-truck change order, zero scrap days post-startup." },
    { name: "Ford — Rouge Complex (Dearborn Truck)",  location: "Dearborn, MI",        from: "2023-09", to: "2024-02", logo: "assets/logos/ford-motor-company.png", comments: "F-150 final-assembly torque-station rebuild. Tightened cycle time 4.1s." },
    { name: "Tesla — Fremont Factory",                location: "Fremont, CA",         from: "2022-11", to: "2023-04", logo: null,                          comments: "Drive-unit subassembly cell, KUKA KR Quantec re-tooling for Model Y refresh." },
    { name: "Toyota — Georgetown Plant",              location: "Georgetown, KY",      from: "2021-06", to: "2022-03", logo: null,                          comments: "Engine-block machining line PLC + HMI standardization. Trained eight maintenance techs to L2 troubleshooting." },
    { name: "Procter & Gamble — Iowa City",           location: "Iowa City, IA",       from: "2020-02", to: "2020-08", logo: null,                          comments: "Razor-blade packaging line FAT through SAT. Sanitary-rated controls." }
  ],

  references: [
    { name: "Karl Schmidt",   relationship: "Plant Engineering Manager — BMW Spartanburg",   phone: "(864) 555-0142", email: "k.schmidt@bmwgroup.example",     letter: true,  avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop&crop=face" },
    { name: "Maria Rivera",   relationship: "Project Manager — Stellantis Sterling Heights", phone: "(586) 555-0103", email: "m.rivera@stellantis.example",    letter: true,  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face" },
    { name: "Chris Wallace",  relationship: "Owner — Acme Robotics LLC",                     phone: "(248) 555-0188", email: "chris@acmerobotics.example",     letter: true,  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face" },
    { name: "Dr. Linda Park", relationship: "Faculty Advisor — Wayne State Univ. (EE)",       phone: "(313) 555-0119", email: "lpark@wayne.example",            letter: false, avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&h=120&fit=crop&crop=face" }
  ],

  interview_questions: [
    { q: "Willing to work more than 60 miles from home", a: "Yes" },
    { q: "Willing to take emergency contracts",          a: "Yes" },
    { q: "Has a work VISA that allows legal U.S. work",  a: "Yes" },
    { q: "Requires VISA sponsorship from a U.S. company",a: "No"  },
    { q: "Has a valid passport",                          a: "Yes" },
    { q: "Willing to work nights and afternoon shifts",  a: "Yes" },
    { q: "Willing to work Saturdays",                     a: "Yes" },
    { q: "Willing to work Sundays",                       a: "No"  }
  ],

  banking: {
    bank_name: "Chase Bank N.A.",
    account_name: "Maria E. Lopez",
    routing_last4: "4021",
    account_last4: "8814"
  },

  social_media: [
    { platform: "LinkedIn",   icon_class: "li", handle: "/in/maria-lopez-controls",       url: "#" },
    { platform: "GitHub",     icon_class: "gh", handle: "@mlopez-plc",                    url: "#" },
    { platform: "YouTube",    icon_class: "yt", handle: "@maria-controls-engineering",    url: "#" },
    { platform: "Instagram",  icon_class: "ig", handle: "@detroit.controls",              url: "#" }
  ],

  company_info: {
    name: "Lopez Controls LLC",
    classification: "Independent Contractor",
    website: "https://lopezcontrols.example",
    address: "2150 Woodward Ave, Suite 410",
    city: "Detroit, MI 48201",
    phone: "(313) 555-0192",
    email: "contact@lopezcontrols.example",
    industries: ["Industrial / Manufacturing", "Automotive", "Food & Beverage", "Healthcare"]
  },

  products_offered: [
    { name: "PLC Code Style Guide — ControlLogix",  desc: "84-page printable PDF + reference repo. Covers naming, tag standards, and AOI library structure used across 20+ projects.",                price: 149, sku: "LC-SG-AB-V3", boosted: false },
    { name: "Robotic Cell Pre-Commissioning Checklist", desc: "37-point laminated reference card + downloadable Excel. Covers FANUC, ABB, KUKA. Validated on 60+ cells.",                                price: 39,  sku: "LC-CL-RBT-01", boosted: true },
    { name: "Safety-Circuit Audit Template (CAT-3 / PL-d)",  desc: "Validated template package — risk assessment, safety-function spec, validation worksheet. ISO 13849 + ANSI B11 references.",          price: 249, sku: "LC-SF-AU-13", boosted: false }
  ],

  services_offered: [
    { name: "On-Site Commissioning",     desc: "PLC + HMI + drives commissioning, FAT through SAT. Travel-rate inclusive.",          rate: 148.50 },
    { name: "Remote Code Review",        desc: "Async or live screen-share PLC code review with deliverable report.",                rate: 135.00 },
    { name: "Emergency Site Response",   desc: "<48 hr arrival on-site, North America. Rate covers travel, lodging, billable hours.",rate: 195.00 },
    { name: "Training — L1 Maintenance", desc: "Two-day on-site curriculum: PLC fundamentals, HMI navigation, drive faults.",        rate: 135.00 }
  ],

  business_group: {
    name: "Detroit Plant",
    role: "Lead Engineer",
    joined_at: "2019-06-12",
    members_count: 11,
    available_now: 5,
    on_contract: 5,
    pending_apps: 7,
    shared: ["Contracts", "Job Postings", "Timesheets", "Expense Reports", "Employee Profiles"],
    permissions: "Edit"
  },

  accounting_contacts: {
    accounts_payable:    { name: "Diane Whitfield",  email: "ap@lopezcontrols.example",    phone: "(313) 555-0193" },
    accounts_receivable: { name: "Diane Whitfield",  email: "ar@lopezcontrols.example",    phone: "(313) 555-0193" },
    marketing:           { name: "Sasha Reeves",     email: "press@lopezcontrols.example", phone: "(313) 555-0194" },
    human_resources:     { name: "Eduardo Lopez",    email: "hr@lopezcontrols.example",    phone: "(313) 555-0195" }
  },

  media_gallery: [
    { type: "image", url: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=600&h=450&fit=crop", caption: "BMW Spartanburg — Body Shop Cell 14, post-retrofit handover" },
    { type: "video", url: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=600&h=450&fit=crop&sat=-20", caption: "FANUC R-30iB cell walkthrough (1:42)" },
    { type: "image", url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=450&fit=crop", caption: "Sterling Heights paint shop — control panel build" },
    { type: "image", url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=450&fit=crop", caption: "ControlLogix L8x rack — labelled & verified pre-FAT" },
    { type: "video", url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&h=450&fit=crop", caption: "Drive-unit cell startup — Tesla Fremont (3:10)" },
    { type: "image", url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=450&fit=crop", caption: "Style-guide section — naming conventions" }
  ]
};
