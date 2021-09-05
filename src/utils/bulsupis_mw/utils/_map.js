
// from lower_snaking to camelCase
// from server to front_end

function _account_camelCase(data){
    let new_data = {}

    const account_map = {
        "id" : "id",
        "email" : "email",
        "institute": "institute",
        "verified": "verified",
    }
    
    for(let k in account_map){
        if (k in data){
            new_data[account_map[k]] = data[k]
        }
    }

    if ("profile_img" in data){
        new_data["uri"] = data["profile_img"].src
    }

    if ("institute" in data){
        new_data["type"] = data["institute"].type
        new_data["notificationList"] = data["institute"].notification_list
        new_data["projectList"] = data["institute"].project_list
    }

    return new_data
}

function _project_camelCase(data){
    let new_data = {}

    const project_map = {
        // metadata
        "id" : "id",
        "created_at" : "created_at",
        "last_updated" : "last_updated",

        // Page 1 Specific
        "owner_id": "ownerId",
        "title": "title",
        "proponent": "proponent",
        "obligation_type": "obligationType",
        "investment_req": "investmentReq",
        "implementation_period": "implementationPeriod",
        "pap_level": "PAPLevel",
        "readiness": "readiness",
        "status": "status",
        "file_list" : "fileList",
        "remarks": "remarks",

        // Page 2
        "address" : "address",
        "project_location" : "projectLocation",
        "categorization" : "categorization",
        "description" : "description",
        "purpose" : "purpose",
        "beneficiary" : "beneficiaries",

        // Page 2.2
        "proponent_name" : "proponentName",
        "designation" : "designation",
        "contact_information" : "contactInformation",
        "date_accomplished" : "dateAccomplished",
        "proposed_projectcost": "proposedProjectCost",
        "signature": "signature",

        // PDO Forms
        "received_by": "recievedBy",
        "receiver_designation": "recieverDesignation",
        "date_received" : "dateRecieved",
        "pdo_signature": "pdoSignature",

        "comment_list": "commentList"
    }
    
    for(let k in project_map){
        if (k in data){
            new_data[project_map[k]] = data[k]
        }
    }

    if ("gsp" in data){
        // convert from {} to [...]
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
            [
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
            ],
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
        let g_temp = [
            null,
            null,
            null,
            null,
            null,
        ]

        for(let i in data.gsp){
            // Populate Subgoal
            if (g_temp[data.gsp[i].g - 1] == null){
                g_temp[data.gsp[i].g - 1] = [ ...s_temp[data.gsp[i].g - 1] ]
            }

            // Populate Key Performance
            if (g_temp[data.gsp[i].g - 1][data.gsp[i].s - 1] == null){
                g_temp[data.gsp[i].g - 1][data.gsp[i].s - 1] = [ ...p_temp[data.gsp[i].g - 1][data.gsp[i].s - 1] ]
            }
            g_temp[data.gsp[i].g - 1][data.gsp[i].s - 1][data.gsp[i].p - 1] = true
        }

        new_data["GSP"] = g_temp
    }

    return new_data
}

function _project_lower_snaking(data){
    let new_data = {}

    const project_map = {}
    const _flipproject_map = {
        // metadata
        "id" : "id",
        "created_at" : "created_at",
        "last_updated" : "last_updated",

        // Page 1 Specific
        "owner_id": "ownerId",
        "title": "title",
        "proponent": "proponent",
        "obligation_type": "obligationType",
        "investment_req": "investmentReq",
        "implementation_period": "implementationPeriod",
        "pap_level": "PAPLevel",
        "readiness": "readiness",
        "status": "status",
        "file_list" : "fileList",
        "remarks": "remarks",

        // Page 2
        "address" : "address",
        "project_location" : "projectLocation",
        "categorization" : "categorization",
        "description" : "description",
        "purpose" : "purpose",
        "beneficiary" : "beneficiaries",

        // Page 2.2
        "proponent_name" : "proponentName",
        "designation" : "designation",
        "contact_information" : "contactInformation",
        "date_accomplished" : "dateAccomplished",
        "proposed_projectcost": "proposedProjectCost",
        "signature": "signature",

        // PDO Forms
        "received_by": "recievedBy",
        "receiver_designation": "recieverDesignation",
        "date_received" : "dateRecieved",
        "pdo_signature": "pdoSignature",

        "comment_list": "commentList"
    }
    
    // flip project_map
    for (let k in _flipproject_map){
        project_map[_flipproject_map[k]] = k
    }

    for(let k in project_map){
        if (k in data){
            new_data[project_map[k]] = data[k]
        }
    }

    if ("GSP" in data){
        // convert from [...] to {}
        
        const g_temp = []

        for(let g in data["GSP"]){
            if (data["GSP"][g] != null){
                for(let s in data["GSP"][g]){
                    if (data["GSP"][g][s] != null){
                        for(let p in data["GSP"][g][s]){
                            if (data["GSP"][g][s][p]){
                                g_temp.push({
                                    g : Number(g)+1, s: Number(s)+1, p: Number(p)+1
                                })
                            }
                            
                        }
                    }
                }
            }
        }

        new_data["gsp"] = g_temp
    }

    return new_data
}

const Maps = {
    account_camelCase : _account_camelCase,
    project_camelCase : _project_camelCase,
    project_lowerSnaking : _project_lower_snaking
}


export default Maps