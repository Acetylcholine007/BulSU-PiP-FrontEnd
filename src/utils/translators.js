import { institutes } from "./constants";

export const projectTranslator = (project) => {
  let newProject = {
    id: project.id,
    title: project.title,
    GSP: project.gsp,
    obligationType: project.obligation_type,
    proponent: project.proponent,
    investmentReq: project.investment_req,
    implementationPeriod: project.implementation_period,
    PAPLevel: project.pap_level,
    readiness: project.readiness,
    status: project.status,
    suc: "Bulacan State University",
    address: project.address,
    projectLocation: project.project_location,
    categorization: project.categorization,
    description: project.description,
    purpose: project.purpose,
    beneficiaries: project.beneficiaries,
    proposedProjectCost: project.proposed_projectcost,
    proponentName: project.proponent_name,
    designation: project.designation,
    contactInformation: project.contact_information,
    dateAccomplished: project.date_accomplished,
    recievedBy: project.recieved_by,
    recieverDesignation: project.reciever_designation,
    dateRecieved: project.date_recieved,
    commentList: project.comment_list,
    fileList: project.file_list,
    signature: project.signature,
    recieverSignature: project.reciever_signature,
  };

  return newProject;
};

export const projectListTranslator = (projectList) => {
  let newProjectList = projectList.map(projectTranslator);

  return newProjectList;
};

export const institutesTranslator = (rawInstitutes) => {
  let newInstitutes = rawInstitutes.map((institute) => ({
    projectList: projectListTranslator(institute.project_list),
    abbv: institutes.find((item) => item.institute === institute.institute)
      .abbv,
  }));

  return newInstitutes;
};

export const GSPTranslator = (gsp) => {
  let p_temp = [
    [
      [false, false, false, false, false, false, false, false, false],
      [false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false],
    ],
    [
      [false, false, false, false, false, false, false, false, false, false],
      [false, false],
      [false, false, false],
      [false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false],
    ],
    [
      [false, false, false, false],
      [false, false, false, false, false, false, false, false, false],
      [false],
      [false],
    ],
    [
      [false, false],
      [false, false, false],
      [false],
      [false],
      [false],
      [false],
      [false],
      [false],
    ],
    [
      [false, false, false, false, false, false, false, false],
      [false, false],
      [false, false],
      [false, false, false, false],
      [false, false],
      [false],
      [false],
      [false],
      [false, false],
    ],
  ];
  let s_temp = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
  ];
  let g_temp = [null, null, null, null, null];

  for (let i in gsp) {
    // Populate Subgoal
    if (g_temp[gsp[i].g - 1] == null) {
      g_temp[gsp[i].g - 1] = [...s_temp[gsp[i].g - 1]];
    }

    // Populate Key Performance
    if (g_temp[gsp[i].g - 1][gsp[i].s - 1] == null) {
      g_temp[gsp[i].g - 1][gsp[i].s - 1] = [
        ...p_temp[gsp[i].g - 1][gsp[i].s - 1],
      ];
    }
    g_temp[gsp[i].g - 1][gsp[i].s - 1][gsp[i].p - 1] = true;
  }

  return g_temp;
};
