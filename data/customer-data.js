// customer-data.js — Rebecca Chen / Ford Rouge
window.CUSTOMER_DATA = {
  "$schema": "Automate America — Customer (Personal/Hiring) Profile (max-data reference fixture, EXHAUSTIVE)",
  "$source": "Composite fictional record. Plant Engineering Manager who hires through the platform.",
  "$rendered_for": "Claude Design — Customer Profile prototype, Rebecca Chen / Ford Rouge Complex",
  "$version": "2.0 — exhaustive arrays",
  "$last_updated": "2026-04-25",

  "user_id": 14072,
  "user_uuid": "01HZX9P4M2K7N3R5T8V6W1Y3R8",
  "username": "rebecca.chen",
  "user_type": "Customer",
  "approval_status": "Approved",
  "is_enabled": 1,
  "is_email_verified": 1,
  "is_phone_verified": 1,
  "is_id_verified": 1,
  "is_company_verified": 1,
  "two_factor_enabled": 1,
  "created_at": "2019-06-22T10:14:00Z",
  "last_active_at": "2026-04-25T08:11:00Z",
  "tenure_years": 6,

  "header": {
    "first_name": "Rebecca",
    "last_name": "Chen",
    "display_name": "Rebecca Chen",
    "preferred_pronouns": "she/her",
    "title": "Plant Engineering Manager",
    "company_name": "Ford Rouge Complex",
    "company_id": 4471,
    "department": "Body Shop / Final Assembly",
    "headline": "Plant Engineering Manager · Ford Rouge Complex · Dearborn, MI"
  },

  "photo": {
    "main_url": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    "main_size_px": 144,
    "verified_check": true,
    "tier_glow_color": "#B9F2FF"
  },

  "company": {
    "id": 4471,
    "name": "Ford Rouge Complex",
    "logo": "assets/logos/ford-motor-company.png",
    "tier": "Tier 1 OEM",
    "city": "Dearborn",
    "state": "MI",
    "address": "3001 Miller Rd, Dearborn, MI 48120",
    "year_founded": 1928,
    "employee_count": 7400,
    "naics": "336111",
    "naics_label": "Automobile Manufacturing",
    "industry": "Automotive Assembly",
    "departments_hiring": ["Body Shop", "Body-in-White", "Paint Shop", "Final Assembly", "Plant Maintenance", "Quality Control"],
    "primary_trades_hired": ["PLC Programmer", "Robot Programmer", "Controls Engineer", "Maintenance Technician", "Vision Specialist", "Functional Safety Engineer"]
  },

  "location": {
    "city": "Dearborn",
    "state": "MI",
    "country": "United States",
    "country_iso": "US",
    "country_flag_svg": "https://flagcdn.com/us.svg"
  },

  "social_links": [
    { "platform": "linkedin", "url": "https://www.linkedin.com/in/rebecca-chen-ford", "icon": "in" },
    { "platform": "company-website", "url": "https://corporate.ford.com/operations/locations/dearborn.html", "icon": "globe" }
  ],

  "quick_stats": {
    "active_contracts_posted": 47,
    "lifetime_contracts_hired": 218,
    "avg_rate_paid": 142.00,
    "lifetime_spend_usd": 12480000,
    "avg_rating_given": 4.6,
    "reviews_given_count": 184,
    "rehire_rate_pct": 41,
    "tenure_years_on_platform": 6,
    "profile_strength_pct": 92
  },

  "ctas_visitor": [
    { "id": "apply",       "label": "Apply to open contracts",  "kind": "primary",   "icon": "briefcase" },
    { "id": "follow",      "label": "Follow company",            "kind": "secondary", "icon": "bell" },
    { "id": "message",     "label": "Message",                   "kind": "secondary", "icon": "envelope" },
    { "id": "view-jobs",   "label": "View open jobs (47)",       "kind": "tertiary",  "icon": "list" }
  ],
  "ctas_owner": [
    { "id": "post-contract", "label": "Post new contract",      "kind": "primary",   "icon": "plus" },
    { "id": "view-applicants", "label": "View applicants",       "kind": "secondary", "icon": "users" },
    { "id": "edit-profile",  "label": "Edit profile",            "kind": "tertiary",  "icon": "pencil" },
    { "id": "preview",       "label": "Preview as visitor",      "kind": "tertiary",  "icon": "eye" }
  ],

  "open_contracts": [
    { "id": 28140, "title": "PLC programmer · Robotic palletizer commissioning", "type": "Hourly · 4 wk", "rate": 148.50, "applicants": 12, "posted_at": "2026-04-21", "closes_at": "2026-04-28", "status": "Live", "white_glove": false },
    { "id": 28139, "title": "Body Shop FANUC retrofit — Cell 14",                "type": "Hourly · 6 wk", "rate": 165.00, "applicants": 18, "posted_at": "2026-04-19", "closes_at": "2026-05-03", "status": "Live", "white_glove": true  },
    { "id": 28138, "title": "Paint Shop HMI migration — WinCC to FactoryTalk",   "type": "Hourly · 8 wk", "rate": 155.00, "applicants": 9,  "posted_at": "2026-04-15", "closes_at": "2026-05-12", "status": "Live", "white_glove": false },
    { "id": 28136, "title": "Senior Controls Engineer — Final Assembly",         "type": "Direct W-2",    "rate": null,   "applicants": 24, "posted_at": "2026-04-12", "closes_at": "2026-05-15", "status": "Live", "white_glove": false, "salary_band": "180k–235k" },
    { "id": 28132, "title": "Maintenance Tech — 2nd shift",                      "type": "Direct W-2",    "rate": null,   "applicants": 41, "posted_at": "2026-04-08", "closes_at": "2026-05-08", "status": "Live", "white_glove": false, "salary_band": "78k–95k" },
    { "id": 28118, "title": "Cognex vision integration — body line",             "type": "Hourly · 3 wk", "rate": 175.00, "applicants": 6,  "posted_at": "2026-04-04", "closes_at": "2026-04-26", "status": "Live", "white_glove": false },
    { "id": 28102, "title": "Functional Safety Engineer — TÜV cert.",             "type": "Direct W-2",    "rate": null,   "applicants": 14, "posted_at": "2026-03-30", "closes_at": "2026-04-30", "status": "Live", "white_glove": false, "salary_band": "172k–215k" }
  ],

  "hire_history": [
    { "contract_id": 27184, "title": "Body Shop Cell 14 — FANUC retrofit",           "contractor": "Maria Lopez",     "contractor_id": 38291, "rate": 148.50, "duration_weeks": 4,  "rating_given": 5, "completed_at": "2026-02-15", "white_glove": false, "rehired": true,  "value_usd": 23760 },
    { "contract_id": 26991, "title": "Sterling Heights paint shop PLC migration",    "contractor": "Maria Lopez",     "contractor_id": 38291, "rate": 155.00, "duration_weeks": 8,  "rating_given": 5, "completed_at": "2025-11-01", "white_glove": false, "rehired": true,  "value_usd": 49600 },
    { "contract_id": 26442, "title": "Assembly line 4 — AB CompactLogix migration",  "contractor": "Maria Lopez",     "contractor_id": 38291, "rate": 145.00, "duration_weeks": 6,  "rating_given": 5, "completed_at": "2025-08-19", "white_glove": false, "rehired": true,  "value_usd": 34800 },
    { "contract_id": 26201, "title": "[White Glove Contract]",                       "contractor": "[Anonymous]",     "contractor_id": null,  "rate": null,    "duration_weeks": 12, "rating_given": 5, "completed_at": "2025-05-30", "white_glove": true,  "rehired": false, "value_usd": null  },
    { "contract_id": 25887, "title": "Cedar Rapids Mill modernization",              "contractor": "Acme Robotics",   "contractor_id": 1147,  "rate": null,    "duration_weeks": 14, "rating_given": 4, "completed_at": "2025-03-15", "white_glove": false, "rehired": false, "value_usd": 312000 },
    { "contract_id": 25612, "title": "Paint Shop Cognex vision retrofit",            "contractor": "Lisa Park",       "contractor_id": 41502, "rate": 175.00, "duration_weeks": 3,  "rating_given": 5, "completed_at": "2025-02-08", "white_glove": false, "rehired": false, "value_usd": 21000 },
    { "contract_id": 25401, "title": "Robot palletizer line 7 commissioning",         "contractor": "Tony Rivera",     "contractor_id": 40117, "rate": 158.00, "duration_weeks": 5,  "rating_given": 5, "completed_at": "2024-12-12", "white_glove": false, "rehired": true,  "value_usd": 31600 },
    { "contract_id": 25199, "title": "Allen-Bradley HMI rewrite — final assembly",   "contractor": "Maria Lopez",     "contractor_id": 38291, "rate": 145.00, "duration_weeks": 4,  "rating_given": 5, "completed_at": "2024-10-22", "white_glove": false, "rehired": true,  "value_usd": 23200 },
    { "contract_id": 24988, "title": "Functional Safety SIL-2 upgrade",              "contractor": "Karen Mitchell",  "contractor_id": 39102, "rate": 165.00, "duration_weeks": 6,  "rating_given": 5, "completed_at": "2024-08-30", "white_glove": false, "rehired": true,  "value_usd": 39600 },
    { "contract_id": 24744, "title": "[White Glove Contract]",                       "contractor": "[Anonymous]",     "contractor_id": null,  "rate": null,    "duration_weeks": 8,  "rating_given": 5, "completed_at": "2024-06-18", "white_glove": true,  "rehired": false, "value_usd": null  },
    { "contract_id": 24502, "title": "PLC migration — paint robot line",              "contractor": "Acme Robotics",   "contractor_id": 1147,  "rate": null,    "duration_weeks": 9,  "rating_given": 5, "completed_at": "2024-04-12", "white_glove": false, "rehired": false, "value_usd": 47360 },
    { "contract_id": 24290, "title": "Emergency support — line 3 robotic stack",     "contractor": "Maria Lopez",     "contractor_id": 38291, "rate": 195.00, "duration_weeks": 1,  "rating_given": 5, "completed_at": "2024-04-08", "white_glove": false, "rehired": true,  "value_usd": 7800  },
    { "contract_id": 24081, "title": "Vision system retrofit — quality station",      "contractor": "Sarah Bennett",   "contractor_id": 41208, "rate": 152.00, "duration_weeks": 3,  "rating_given": 5, "completed_at": "2024-02-26", "white_glove": false, "rehired": false, "value_usd": 18240 },
    { "contract_id": 23854, "title": "Body shop functional safety upgrade",           "contractor": "Acme Robotics",   "contractor_id": 1147,  "rate": null,    "duration_weeks": 6,  "rating_given": 5, "completed_at": "2024-01-08", "white_glove": false, "rehired": false, "value_usd": 39600 },
    { "contract_id": 23612, "title": "[White Glove Contract]",                       "contractor": "[Anonymous]",     "contractor_id": null,  "rate": null,    "duration_weeks": 4,  "rating_given": 5, "completed_at": "2023-11-22", "white_glove": true,  "rehired": false, "value_usd": null  },
    { "contract_id": 23409, "title": "Robot path optimization — paint cell",         "contractor": "Maria Lopez",     "contractor_id": 38291, "rate": 152.00, "duration_weeks": 3,  "rating_given": 5, "completed_at": "2023-10-04", "white_glove": false, "rehired": true,  "value_usd": 18240 },
    { "contract_id": 23188, "title": "PLC migration — assembly line 7",              "contractor": "Maria Lopez",     "contractor_id": 38291, "rate": 148.00, "duration_weeks": 7,  "rating_given": 5, "completed_at": "2023-08-15", "white_glove": false, "rehired": true,  "value_usd": 41440 },
    { "contract_id": 22971, "title": "Cognex vision setup — paint inspection",       "contractor": "Lisa Park",       "contractor_id": 41502, "rate": 158.00, "duration_weeks": 2,  "rating_given": 5, "completed_at": "2023-06-29", "white_glove": false, "rehired": true,  "value_usd": 12640 },
    { "contract_id": 22754, "title": "FANUC R-2000 commissioning",                   "contractor": "Tony Rivera",     "contractor_id": 40117, "rate": 148.00, "duration_weeks": 5,  "rating_given": 4, "completed_at": "2023-05-11", "white_glove": false, "rehired": true,  "value_usd": 29600 },
    { "contract_id": 22501, "title": "Allen-Bradley HMI redesign",                    "contractor": "Maria Lopez",     "contractor_id": 38291, "rate": 145.00, "duration_weeks": 4,  "rating_given": 5, "completed_at": "2023-03-22", "white_glove": false, "rehired": true,  "value_usd": 23200 },
    { "contract_id": 22288, "title": "Body shop cell 12 — full retrofit",             "contractor": "Acme Robotics",   "contractor_id": 1147,  "rate": null,    "duration_weeks": 9,  "rating_given": 5, "completed_at": "2023-01-30", "white_glove": false, "rehired": false, "value_usd": 53280 },
    { "contract_id": 22042, "title": "[White Glove Contract]",                       "contractor": "[Anonymous]",     "contractor_id": null,  "rate": null,    "duration_weeks": 8,  "rating_given": 5, "completed_at": "2022-12-12", "white_glove": true,  "rehired": false, "value_usd": null  }
  ],

  "watched_pros": [
    { "id": 38291, "name": "Maria Lopez",     "occupation": "Senior Controls Engineer", "city": "Detroit, MI",      "rating": 4.96, "available": true,  "added_at": "2025-12-04", "times_hired": 8, "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces" },
    { "id": 39102, "name": "Karen Mitchell",  "occupation": "Electrical Engineer",      "city": "Spartanburg, SC",  "rating": 4.88, "available": false, "added_at": "2025-09-18", "times_hired": 3, "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces" },
    { "id": 40117, "name": "Tony Rivera",     "occupation": "ABB Robot Programmer",     "city": "Spartanburg, SC",  "rating": 4.91, "available": true,  "added_at": "2025-07-22", "times_hired": 2, "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces" },
    { "id": 41208, "name": "Sarah Bennett",   "occupation": "KUKA Robot Programmer",    "city": "Louisville, KY",   "rating": 4.85, "available": true,  "added_at": "2025-06-10", "times_hired": 1, "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=faces" },
    { "id": 41502, "name": "Lisa Park",       "occupation": "Vision Systems Specialist","city": "Detroit, MI",      "rating": 4.92, "available": false, "added_at": "2025-04-30", "times_hired": 2, "avatar": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=faces" },
    { "id": 41334, "name": "Derek Simmons",   "occupation": "PLC Programmer",            "city": "Detroit, MI",      "rating": 4.79, "available": false, "added_at": "2025-03-15", "times_hired": 0, "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces" },
    { "id": 41822, "name": "Jake Morrison",   "occupation": "FANUC Robot Programmer",    "city": "Detroit, MI",      "rating": 4.87, "available": true,  "added_at": "2025-02-04", "times_hired": 1, "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=faces" },
    { "id": 41709, "name": "Alicia Reyes",    "occupation": "HMI / SCADA Engineer",      "city": "Louisville, KY",   "rating": 4.81, "available": true,  "added_at": "2024-12-20", "times_hired": 0, "avatar": "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=200&h=200&fit=crop&crop=faces" },
    { "id": 42118, "name": "Megan Torres",    "occupation": "Safety Systems Tech",       "city": "Spartanburg, SC",  "rating": 4.74, "available": false, "added_at": "2024-10-08", "times_hired": 0, "avatar": "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop&crop=faces" },
    { "id": 42301, "name": "Victor Huang",    "occupation": "Welding Engineer",          "city": "Louisville, KY",   "rating": 4.69, "available": false, "added_at": "2024-08-19", "times_hired": 0, "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces" }
  ],

  "preferred_business_groups": [
    { "id": 304, "name": "Detroit Plant",                     "company": "Acme Robotics", "members": 11, "rating": 4.8, "since": "2023-04-12" },
    { "id": 412, "name": "Great Lakes Automation Network",    "company": "(open network)","members": 138,"rating": 4.7, "since": "2024-08-22" },
    { "id": 587, "name": "Body-in-White Specialists",         "company": "(open network)","members": 28, "rating": 4.85, "since": "2025-01-30" }
  ],

  "spending_breakdown": {
    "$visibility": "owner_only",
    "ytd_2026_usd": 1840000,
    "fy_2025_usd": 4220000,
    "fy_2024_usd": 3110000,
    "fy_2023_usd": 1990000,
    "by_trade": [
      { "trade": "Controls Engineer",      "ytd": 612000, "pct": 33 },
      { "trade": "Robot Programmer",       "ytd": 524000, "pct": 28 },
      { "trade": "PLC Programmer",         "ytd": 308000, "pct": 17 },
      { "trade": "Maintenance Technician", "ytd": 244000, "pct": 13 },
      { "trade": "Vision Specialist",       "ytd": 92000,  "pct": 5  },
      { "trade": "Other",                  "ytd": 60000,  "pct": 4  }
    ],
    "by_tier": [
      { "tier": "Standard",  "ytd": 1252000, "pct": 68 },
      { "tier": "White Glove","ytd": 442000,  "pct": 24 },
      { "tier": "Direct W-2","ytd": 146000,  "pct": 8  }
    ]
  },

  "secure_files": {
    "$visibility": "owner_only",
    "files": [
      { "id": 7001, "name": "COI Requirements — Ford Rouge Vendor Manual",  "type": "policy",  "status": "uploaded", "uploaded_at": "2026-01-12", "expires_at": null,         "size_kb": 1240 },
      { "id": 7002, "name": "Plant Safety Orientation Packet",              "type": "policy",  "status": "uploaded", "uploaded_at": "2026-01-12", "expires_at": null,         "size_kb": 880  },
      { "id": 7003, "name": "Standard Master Service Agreement (MSA)",      "type": "legal",   "status": "uploaded", "uploaded_at": "2025-08-20", "expires_at": null,         "size_kb": 412  },
      { "id": 7004, "name": "Direct Deposit / ACH Authorization",            "type": "payment", "status": "uploaded", "uploaded_at": "2024-04-08", "expires_at": null,         "size_kb": 198  },
      { "id": 7005, "name": "W-9 (FoMoCo)",                                  "type": "tax",     "status": "uploaded", "uploaded_at": "2026-01-08", "expires_at": "2026-12-31", "size_kb": 184  },
      { "id": 7006, "name": "Cybersecurity Vendor Questionnaire (NIST)",     "type": "compliance","status":"uploaded","uploaded_at": "2025-11-04", "expires_at": "2026-11-04", "size_kb": 612  },
      { "id": 7007, "name": "Insurance Requirements Schedule (2026)",        "type": "policy",  "status": "uploaded", "uploaded_at": "2026-01-10", "expires_at": "2027-01-10", "size_kb": 312  }
    ]
  },

  "private_info": {
    "$visibility": "owner_only",
    "fields": [
      { "label": "Direct phone",  "value": "(313) 555-1881" },
      { "label": "Plant address", "value": "3001 Miller Rd, Dearborn, MI 48120" },
      { "label": "AP contact",    "value": "ap-rouge@ford.example · (313) 555-2210" },
      { "label": "PO terms",      "value": "Net 30 · Sage Intacct · Coupa-routed" },
      { "label": "Tax ID",        "value": "•••• •• ••12" },
      { "label": "Cost center",   "value": "FORD-ROUGE-PE-COST-04471" },
      { "label": "Vendor portal", "value": "https://ford.coupahost.com (SSO)" }
    ]
  },

  "key_contacts": [
    { "id": "kc-1", "name": "Rebecca Chen",    "role": "Plant Engineering Manager",   "email": "rchen@ford.example",     "phone": "(313) 555-1881", "primary": true,  "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face" },
    { "id": "kc-2", "name": "Marcus Whitaker", "role": "Maintenance Lead",            "email": "mwhitaker@ford.example",  "phone": "(313) 555-1929", "primary": false, "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
    { "id": "kc-3", "name": "Diane Rodriguez", "role": "AP / Vendor Onboarding",       "email": "drodriguez@ford.example", "phone": "(313) 555-2210", "primary": false, "avatar": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face" },
    { "id": "kc-4", "name": "James Holloway",  "role": "Director of Plant Engineering","email": "jhalloway@ford.example",  "phone": "(313) 555-1742", "primary": false, "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
    { "id": "kc-5", "name": "Sarah Pham",      "role": "Senior Controls Engineer",     "email": "spham@ford.example",      "phone": "(313) 555-1855", "primary": false, "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
    { "id": "kc-6", "name": "Mike Reynolds",   "role": "Health & Safety Lead",         "email": "mreynolds@ford.example",  "phone": "(313) 555-1931", "primary": false, "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" }
  ],

  "badges_earned": [
    { "id": "cust-spend-diamond",     "name": "Diamond Spender",     "category": "Spend",       "tier": "Diamond",  "earned_at": "2024-11-30", "criterion": "$10M+ lifetime platform spend",      "asset": "assets/badges/Cust-Spend-Diamond.png" },
    { "id": "cust-hired-platinum",    "name": "Platinum Hirer",      "category": "Hires",       "tier": "Platinum", "earned_at": "2025-04-12", "criterion": "100+ contractors hired",             "asset": "assets/badges/Cust-Hired-Platinum.png" },
    { "id": "cust-tenure-platinum",   "name": "Platinum Tenure",     "category": "Tenure",      "tier": "Platinum", "earned_at": "2024-06-22", "criterion": "5+ years on platform",                "asset": "assets/badges/Cust-Tenure-Platinum.png" },
    { "id": "cust-payment-diamond",   "name": "Diamond Payer",       "category": "Payment",     "tier": "Diamond",  "earned_at": "2024-09-01", "criterion": "100% on-time payments, 2+ years",     "asset": "assets/badges/Cust-Payment-Diamond.png" },
    { "id": "cust-rehire-gold",       "name": "Loyalty Hirer",       "category": "Rehire",      "tier": "Gold",     "earned_at": "2025-01-20", "criterion": "40%+ rehire rate",                    "asset": "assets/badges/Cust-Rehire-Gold.png" },
    { "id": "cust-reviews-gold",      "name": "Active Reviewer",     "category": "Reviews",     "tier": "Gold",     "earned_at": "2024-12-15", "criterion": "100+ contractor reviews left",        "asset": "assets/badges/Cust-Reviews-Gold.png" },
    { "id": "cust-jobs-gold",         "name": "Active Hirer",        "category": "Jobs",        "tier": "Gold",     "earned_at": "2025-03-04", "criterion": "30+ contracts posted in 12 months",   "asset": "assets/badges/Cust-Jobs-Gold.png" },
    { "id": "cust-approval-diamond",  "name": "Verified Buyer",      "category": "Verification","tier": "Diamond",  "earned_at": "2019-09-01", "criterion": "Full KYC + COI + tax + AP verified",  "asset": "assets/badges/Cust-Approval-Diamond.png" }
  ],

  "reviews_left_for_contractors": [
    { "id": "rl-1",  "rating": 5, "contractor_name": "Maria Lopez",    "contractor_id": 38291, "contract_title": "Body Shop Cell 14 — FANUC retrofit",         "date": "2026-02-18", "text": "Maria is the calmest engineer on the floor under deadline. Hire her again, no hesitation." },
    { "id": "rl-2",  "rating": 5, "contractor_name": "Maria Lopez",    "contractor_id": 38291, "contract_title": "Sterling Heights paint shop PLC migration",  "date": "2025-11-04", "text": "Documented every block. Trained our two in-house engineers during commissioning." },
    { "id": "rl-3",  "rating": 5, "contractor_name": "Maria Lopez",    "contractor_id": 38291, "contract_title": "Assembly line 4 — AB CompactLogix migration","date": "2025-08-22", "text": "Said what was wrong, said what to do, did it. Migrated the line on a Sunday." },
    { "id": "rl-4",  "rating": 5, "contractor_name": "Lisa Park",      "contractor_id": 41502, "contract_title": "Paint Shop Cognex vision retrofit",          "date": "2025-02-08", "text": "Cognex retrofit was clean. Pictures-to-stable-deployment in 11 days. Will rehire." },
    { "id": "rl-5",  "rating": 5, "contractor_name": "Tony Rivera",    "contractor_id": 40117, "contract_title": "Robot palletizer line 7 commissioning",       "date": "2024-12-12", "text": "ABB integration on a tight schedule. Showed up day one, ran first pallet end-of-week-two." },
    { "id": "rl-6",  "rating": 5, "contractor_name": "Maria Lopez",    "contractor_id": 38291, "contract_title": "Allen-Bradley HMI rewrite — final assembly", "date": "2024-10-22", "text": "HMI rewrite was the cleanest we've seen in a 30-year-old line. Operators said it was easier." },
    { "id": "rl-7",  "rating": 5, "contractor_name": "Karen Mitchell", "contractor_id": 39102, "contract_title": "Functional Safety SIL-2 upgrade",            "date": "2024-08-30", "text": "TÜV-grade work. Validation report was airtight. Hand-back to plant team was complete." },
    { "id": "rl-8",  "rating": 4, "contractor_name": "Acme Robotics",   "contractor_id": 1147,  "contract_title": "Cedar Rapids Mill modernization",            "date": "2025-03-15", "text": "Strong PLC integration. Scope drift from our side, not theirs." },
    { "id": "rl-9",  "rating": 5, "contractor_name": "Maria Lopez",    "contractor_id": 38291, "contract_title": "Emergency support — line 3 robotic stack",   "date": "2024-04-08", "text": "Robotic stack went down at 11 PM. On-site by 6 AM, line was running by noon. Worth every dollar." },
    { "id": "rl-10", "rating": 5, "contractor_name": "Sarah Bennett",  "contractor_id": 41208, "contract_title": "Vision system retrofit — quality station",   "date": "2024-02-26", "text": "Three-week scope, three-week delivery. Documentation was perfect." },
    { "id": "rl-11", "rating": 5, "contractor_name": "Acme Robotics",   "contractor_id": 1147,  "contract_title": "Body shop functional safety upgrade",        "date": "2024-01-08", "text": "Acme team was thorough and on-budget." },
    { "id": "rl-12", "rating": 5, "contractor_name": "Maria Lopez",    "contractor_id": 38291, "contract_title": "Robot path optimization — paint cell",        "date": "2023-10-04", "text": "Cycle time improved 7% on a path we thought was already optimized." },
    { "id": "rl-13", "rating": 5, "contractor_name": "Maria Lopez",    "contractor_id": 38291, "contract_title": "PLC migration — assembly line 7",             "date": "2023-08-15", "text": "Live-line migration, zero unplanned stops. Will hire her exclusively for line 7 going forward." },
    { "id": "rl-14", "rating": 5, "contractor_name": "Lisa Park",      "contractor_id": 41502, "contract_title": "Cognex vision setup — paint inspection",     "date": "2023-06-29", "text": "Calibration was thorough. Repeatable, documented, ready to hand off." }
  ],

  "company_brief": {
    "$visibility": "all",
    "about": "Ford Rouge Complex is the historic and active manufacturing flagship of Ford Motor Company in Dearborn, Michigan. It builds the F-150, employs 7,400+ on site, and runs continuous body-shop and assembly operations. We hire automation talent through the platform for retrofits, migrations, and continuous-improvement projects across body, paint, and final assembly.",
    "facility_photos": [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
      "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800"
    ]
  },

  "admin_notes": {
    "$visibility": "admin_only",
    "trust_score": 99,
    "kyc_passed_at": "2019-06-22",
    "compliance_status": "Tier 1 — frictionless",
    "warnings": [],
    "free_text_admin_note": "Strategic enterprise account. White-glove relationship managed by AA Sales (S. Patel)."
  }
}
;
