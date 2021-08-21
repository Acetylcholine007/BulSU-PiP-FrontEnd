import {
  HomeOutlined,
  AccountTreeOutlined,
  NotificationsNoneOutlined,
  SupervisorAccountOutlined,
  AccountCircleOutlined,
} from "@material-ui/icons";

export const SUCs = ["Main", "Bustos", "Hagonoy", "Meneses"];

export const colleges = ["COE", "COED", "CHTM", "CIT", "CICT", "CBA", "CS", "CSER", "CSSP", "CAL", "CAFA", "CCJE", "CON"];

export const institutes = [
  "Satellite - Bustos Campus",
  "Satellite - Meneses Campus",
  "Satellite - Sarmiento Campus",
  "Satellite - Hagonoy Campus",
  "College of Architecture and Fine Arts",
  "College of Arts and Letters",
  "College of Business Administration",
  "College of Criminal Justice Education",
  "College of Hospitality and Tourism Management",
  "College of Information and Communications Technology",
  "College of Industrial Technology",
  "College of Law",
  "College of Nursing",
  "College of Engineering",
  "College of Education",
  "College of Science",
  "College of Sports, Exercise and Recreation",
  "College of Social Sciences and Philosophy",
  "Graduate School",
  "Editor",
  "Administrator",
  "Other",
];

export const proponents = [
  {
    institute: "Satellite - Bustos Campus",
    proponents: [],
  },
  {
    institute: "Satellite - Meneses Campus",
    proponents: [],
  },
  {
    institute: "Satellite - Sarmiento Campus",
    proponents: [],
  },
  {
    institute: "Satellite - Hagonoy Campus",
    proponents: [],
  },
  {
    institute: "College of Architecture and Fine Arts",
    proponents: [],
  },
  {
    institute: "College of Arts and Letters",
    proponents: [],
  },
  {
    institute: "College of Business Administration",
    proponents: [],
  },
  {
    institute: "College of Criminal Justice Education",
    proponents: [],
  },
  {
    institute: "College of Hospitality and Tourism Management",
    proponents: [],
  },
  {
    institute: "College of Information and Communications Technology",
    proponents: [],
  },
  {
    institute: "College of Industrial Technology",
    proponents: [],
  },
  {
    institute: "College of Law",
    proponents: [],
  },
  {
    institute: "College of Nursing",
    proponents: [],
  },
  {
    institute: "College of Engineering",
    proponents: ["Civil Engineering", "Computer Engineering"],
  },
  {
    institute: "College of Education",
    proponents: [],
  },
  {
    institute: "College of Science",
    proponents: [],
  },
  {
    institute: "College of Sports, Exercise and Recreation",
    proponents: [],
  },
  {
    institute: "College of Social Sciences and Philosophy",
    proponents: [],
  },
  {
    institute: "Graduate School",
    proponents: [],
  },
];

export const accountTypes = ["Admin", "Client"];

export const obligationTypes = ["OO", "MYO"];

export const papLevels = [
  {
    value: 1,
    label: "PAP need to be implemented immediately",
  },
  {
    value: 2,
    label: "PAP can be postponed to the succeeding budget year.",
  },
  {
    value: 3,
    label: "PAP may be implemented any time",
  },
];

export const readinessLevels = [
  {
    value: 1,
    label:
      "Detailed project documents are available (i.e. F/S, DED, DEs, etc.)",
  },
  {
    value: 2,
    label:
      "Detailed project documents are expected to be completed within the 2nd quarter of the current year for FY 2022 PAPs or in the 4th quarter of the current year for the FY 2023 PAPs",
  },
  {
    value: 3,
    label:
      "Completion of detailed project documents is beyond the above time frame.",
  },
];

export const statuses = [
  {
    value: 0,
    label: "Dropped",
  },
  {
    value: 1,
    label: "Proposed",
  },
  {
    value: 2,
    label: "Revision",
  },
  {
    value: 3,
    label: "On-going",
  },
  {
    value: 4,
    label: "Completed",
  },
];

export const GSPs = [
  {
    value: "PROVIDE RELEVANT, QUALITY AND ACCESSIBLE EDUCATION",
    contents: [
      {
        value: "Foster the BulSU Brand",
        contents: [
          "Qualified applicants are accepted for enrolment",
          "Strengthen the Retention Policy as per the University Student Manual",
          "Offering of Doctor of Medicine and other Allied Medical Courses in the Main Campus in realization of the aim of the Charter by 2025",
          "Programs with Levels III and IV AACCUP Accreditation status are granted by CHED with Center of Excellence (COE) or Center of Development (COD) status by 2025",
          "Complied with the requirements of Dark Green University certification/award",
          "Attained Level IV in SUC Levelling in 2019-2021 timeline; Level V in 2025",
          "Transformed BulSU into a University System by year 2021",
          "BulSU is a recognized Research University by the year 2025",
          "A leading university in advanced education achievements",
        ],
      },
      {
        value: "Sustained Quality Enhancement Culture",
        contents: [
          "All programs are granted with Certificate of Program Compliance (COPC) by CHED",
          "All AACCUP non-accredited programs will be certified Candidate for Level 1 status; All accredited programs will attain higher level status while programs with Level 3 AACCUP re-accredited status will attain Level 4 status based on prescribed timeline.",
          "BulSU attained various certifications and relevant awards such as: ISO 9001:2015, Institutional Sustainability Assessment (ISA), Philippine Quality Award (PQA), Higher Level of Institutional Accreditation (IA), and Philippine Technological Council.",
        ],
      },
      {
        value: "Competitive Academic and Non-academic Undertakings",
        contents: [
          "100% of the total takers in 2025 in various Licensure Examinations and in the BAR Examination passed; produced more topnotchers; and has established its niche among the top-performing universities, the same being a regular annual achievement",
          "Increased number of faculty members and students with relevant national/international certification",
          "Increased number of employed graduates",
          "Increased number of partnerships with regional, national and international institutions for student mobility and internships, faculty-immersion, and system development.",
          "Sustained status as leader in academic competitions, technology and research-based activities",
          "Sustained status as the over-all champion in socio-cultural competitions such as SCUAA, CAASUC, and relevant competitions",
        ],
      },
      {
        value: "Competitive Faculty and Staff",
        contents: [
          "Increased number of regular faculty members with Master’s and Doctorate attained from world’s top 1000 universities",
          "Increased number of regular faculty members whose Educational Qualification is vertically aligned",
          "All regular faculty members attended relevant seminars and training in line with their areas of specialization as scheduled annually",
          "Increased number of highly qualified tenured faculty members in industry-related courses with immersion experiences",
        ],
      },
      {
        value: "21st Century Learning Environment",
        contents: [
          "Increased number of state-of-the art facilities in all campuses compliant with the Dark Green University requirements, and 21st century learning environment.",
          "Increased number of new completed facilities in Main Campus 2 and other external campuses compliant with the Dark Green University requirements , and 21st century learning environment.",
          "More reliable university IT Infrastructure",
          "Smarter operation of the University by 2025. (BulSU Smart Campus)",
          "Increased and sustained quality E-learning resources",
          "Increased University security",
        ],
      },
      {
        value: "Equiptable Access to Quality Education",
        contents: [
          "Accommodate students belonging to marginalized sectors of the society (i.e. PWDs, IPs, children of/ and Solo Parents)",
          "Increased number of student-scholars.",
          "Established and launched the university’s program from Massive Open Online Course (MOOC) by the year 2024.",
          "Established and launched the university’s selected programs for Open University",
          "Established and launched the University’s Transnational Program ",
        ],
      },
    ],
  },
  {
    value: "INNOVATIVE AND ADVANCED RELEVANT RESEARCHES",
    contents: [
      {
        value: "Responsive Research Programs",
        contents: [
          "Number of Research Programs",
          "Number of Completed Research Studies",
          "Percentage of Faculty Researchers ",
          "Percentage of Publications",
          "Number of Papers Presented (International)",
          "Number of Papers Presented (National)",
          "Number of Papers Presented (Regional)",
          "Number of Citations",
          "Number of IP Filed Applications to IPOPHL",
          "Number of Research outputs resulted to community or extension works",
        ],
      },
      {
        value: "Enhanced Support System",
        contents: [
          "Percentage of Trained Faculty as Expert or Consultant",
          "Number of Researchers (Non teaching staff/Graduate student)",
        ],
      },
      {
        value: "Expanded R&D Networks and Partnerships",
        contents: [
          "Number of Industry, Government, Private Partners, and Collaborators",
          "Number of External Research Grants",
          "Number of utility models commercialized/ adopted",
        ],
      },
      {
        value: "Human Capacity Development",
        contents: ["Number of research centers actively pursuing research"],
      },
      {
        value: "Establishment of Innovation and Entrepreneurial Center",
        contents: [
          "Active linkages / partners with other organizations/educational institutions",
          "Number of adopters engaged in profitable enterprises ",
          "Average yearly percent increase in number of adopters.",
          "Number of viable demonstration projects based on positive return of investment annually. ",
          "Establish a Incubator Hubs",
          "Number of Incubatees assisted by Technology Business Incubators",
        ],
      },
      {
        value: "Increase Marketing Strategies",
        contents: [
          "Inventions patented and/or commercialized",
          "Percentage Science & Technology research outputs patented over the total of Science and Technology Outputs",
          "Invention not patented but utilized by the local community",
          "Number of adopters engaged in profitable enterprises ",
          "Average yearly percent increase in number of adopters.",
          "Number of viable demonstration projects based on positive return of investment annually.",
          "Establish a Incubator Hubs.",
          "Number of Incubatees assisted by Technology Business Incubators.",
        ],
      },
      {
        value: "Increase External Funding Agencies",
        contents: [
          "Active linkages/ partners with other organizations / educational institutions.",
          "Research funded by external agencies.",
        ],
      },
    ],
  },
  {
    value: "RELEVANT EXTENSION SERVICES",
    contents: [
      {
        value: "Human Capacity Development",
        contents: [
          "Number of active partnerships with LGUs, industries, NGOs, NGAs, SMEs and other stakeholders as a result of extension activities, (International; National; Regional)",
          "Number of trainees weighted by the length of training",
          "Number of extension programs organized and supported consistent with the SUCs mandated and priority programs",
          "Percentage of beneficiaries who rate the training course/s and advisory services as satisfactory or higher in terms of quality and relevance",
        ],
      },
      {
        value: "Responsive Extension Programs",
        contents: [
          "Number of adopters engaged in profitable enterprises ",
          "Number of viable demonstration projects based on positive return on investment (ROI) analysis",
          "Number of Technology-Based Extension Programs, Activities and Projects implemented with a partner",
          "Number of communities directly benefitting from the technology-based extension services",
          "Number of beneficiaries directly benefitting from the technology-based extension services ",
          "Number of industry collaborators",
          "Number of community collaborators or partners ",
          "Number of projects conducted jointly with industry",
          "Number of science and technology-based innovations adopted by partner communities",
        ],
      },
      {
        value: "Dynamic Marketing Activities",
        contents: [
          "Number of extension projects that integrate marketing, market studies or market analysis and customer development",
        ],
      },
      {
        value: "Sustained Extension Programs",
        contents: ["Number of External Funding Sources"],
      },
    ],
  },
  {
    value: "GOOD GOVERNANCE, SUSTAINED RESOURCE GENERATION AND MANAGEMENT",
    contents: [
      {
        value: "Sustained Resource Generation",
        contents: [
          "Percentage of internally generated income (actual income) to total subsidy (allotment from the General Appropriations Act).",
          "Financial sustainability plan",
        ],
      },
      {
        value: "Competitive Management of Resources",
        contents: [
          "Increased percentage of the total obligations to total allotment.",
          "Increased percentage of the total disbursement to total obligations.",
          "Faculty and Staff Development Program:\n(a) Percentage of plantilla faculty members with doctoral degrees in their field of specialization earned from the national university, the top 1000 universities based on world ranking, or in programs with at least Level III accreditation or COE/COD status);\n(b) Relevant 1,500 training hours attended by the faculty and staff members including attendance to conference/trainings).",
        ],
      },
      {
        value: "Prudent Spending",
        contents: [
          "Percentage of priority projects awarded over approved priority projects.",
        ],
      },
      {
        value: "Sustained Compliance with Audit Findings",
        contents: [
          "Percentage of fully implemented recommendations over total audit recommendations",
        ],
      },
      {
        value: "Compliance with Procurement Requriements",
        contents: [
          "All required procurement information as required by RA 9184 (Procurement Law) have been posted.",
        ],
      },
      {
        value: "Compliance with Quarterly Submission of Financial Reports",
        contents: [
          "Actual submission and posting of financial reports to the required government agencies.",
        ],
      },
      {
        value: "Maintain and Update the Transparency Seal",
        contents: [
          "PhilGEPS posting\nSALN submission\nCompliance with FOI; ARTA Certification\nAnnual reports (BAR and FARs)\nApproved budget and corresponding targets; MARC-1; MARC-2\nCitizen's Charter\nSystem of ranking\nISO Certificate\nUpdating of agency mandate\nvision, mission and key officials",
        ],
      },
      {
        value: "Equity to all Officials and Personnel",
        contents: [
          "Acceptable satisfaction rating of employees based on the Employees Satisfaction Survey (ESS)",
        ],
      },
    ],
  },
  {
    value: "BULSU IN REGIONAL DEVELOPMENT",
    contents: [
      {
        value: "Influence Regional Development",
        contents: [
          "Programs offerings aligned responsive to the region’s specific development needs",
          "Maintained the number of students enrolled in CHED Priority Programs",
          "All non-CHED Priority Programs are certified by Regional Development Council (RDC) under the supervision of National Economic Development Authority (NEDA)",
          "Identified Flagship Program in conformity with the CHED's List of Priority Programs and RDC-certified Programs",
          "Membership of units/office in the university to Regional Development Council Sub-committees",
          "Adaptation of BulSU policy recommendation adopted by the RDC by 2025",
          "Increased number of projects implemented by BulSU and its regional partners by 2025",
          "Utilization of the regional development research centers in the region.",
        ],
      },
      {
        value:
          "Conduct of Industry and Market-Oriented Research Innovation and Development",
        contents: [
          "Researches conducted and implemented every year",
          "Alternative schemes that constitute an innovation developed annually",
        ],
      },
      {
        value:
          "Enable Students to Benefit from Overseas Educatinal Opportunities",
        contents: [
          "Students in exchange programs and OJT local/abroad annually",
          "Increased number of BulSU graduates employed outside Bulacan (Regional, National, International Level) increased by 20% starting 2023",
        ],
      },
      {
        value: "Dynamic Technical Support Program",
        contents: [
          "Capacity building activities associated with resources and tools development and cascaded to the partner organization in the Region annually starting 2022",
          "Training activities each year conducted for organizations that received capacity building services from BulSU-supported organizations starting 2022",
          "Capacity building programs that address the needs of the region",
          "Training materials developed inclusive for the region",
        ],
      },
      {
        value: "Strong International Linakages",
        contents: [
          "Number of MOA / MOU with International Academic Institution / Industries",
          "Number of Participation to International Meetings & Conference",
        ],
      },
      {
        value: "Active Linkage with CHED - International Affairs Services",
        contents: [
          "Percentage of Participation to Relevant CHED IAS Activities",
        ],
      },
      {
        value: "Percentage of Involvement in CHED-IAS Sponsored Projects",
        contents: [
          "Participation to CHED-IAS\nSponsored Projects:\n\na. English Proficiency Assessment\n\nb. Innovation Laboratory (iLab)\n\nc. Edu Tourism",
        ],
      },
      {
        value: "Dynamic Community Linkages",
        contents: [
          "Number of MOA / MOU with Government / Private Organizations",
        ],
      },
      {
        value: "Active Alumni Engagement",
        contents: [
          "Attendance to Alumni Reunion / Homecoming",
          "Number of Expert Services Rendered by Alumni",
        ],
      },
    ],
  },
];

export const menuItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
    path: "/dashboard",
    for: ["Admin", "Client"],
  },
  {
    text: "Projects",
    icon: <AccountTreeOutlined />,
    path: "/projects",
    for: ["Admin", "Client"],
  },
  {
    text: "Notifications",
    icon: <NotificationsNoneOutlined />,
    path: "/notifications",
    for: ["Admin", "Client"],
  },
  {
    text: "Accounts",
    icon: <SupervisorAccountOutlined />,
    path: "/accounts",
    for: ["Admin"],
  },
  {
    text: "My Account",
    icon: <AccountCircleOutlined />,
    path: "/myaccount",
    for: ["Admin", "Client"],
  },
];
