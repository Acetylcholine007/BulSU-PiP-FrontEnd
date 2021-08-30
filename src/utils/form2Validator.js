function form2Validator({
  projectLocation,
  description,
  purpose,
  beneficiary,
  proposedProjectCost,
  proponentName: { surname: surName, firstName },
  designation,
  contactInformation: { telNumber: telephoneNumber, email, phoneNumber },
}) {
  const result = {
    proposedProjectCost: [
      {error: false, messages: []},
      {error: false, messages: []},
      {error: false, messages: []},
    ],

    email: {
      error: false,
      messages: [],
    },
    projectLocation: {
      error: false,
      messages: [],
    },
    description: {
      error: false,
      messages: [],
    },

    purpose: {
      error: false,
      messages: [],
    },

    beneficiary: {
      error: false,
      messages: [],
    },

    surName: {
      error: false,
      messages: [],
    },

    firstName: {
      error: false,
      messages: [],
    },

    designation: {
      error: false,
      messages: [],
    },

    telephoneNumber: {
      error: false,
      messages: [],
    },

    phoneNumber: {
      error: false,
      messages: [],
    },
  };

  if (email == "") {
    result.email.error = true;
    result.email.messages.push("Email cannot be blank");
  } else {
    var mailformat =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(mailformat)) {
      result.email.error = true;
      result.email.messages.push("Invalid email format");
    }
  }
  
  if (projectLocation == "") {
    result.projectLocation.error = true;
    result.projectLocation.messages.push("Project Location cannot be blank");
  }

  if (description == "") {
    result.description.error = true;
    result.description.messages.push("Description cannot be blank");
  }

  if (purpose == "") {
    result.purpose.error = true;
    result.purpose.messages.push("Purpose cannot be blank");
  }

  if (beneficiary == "") {
    result.beneficiary.error = true;
    result.beneficiary.messages.push("Beneficiary cannot be blank");
  }

  if (surName == "") {
    result.surName.error = true;
    result.surName.messages.push("Surname cannot be blank");
  }

  if (firstName == "") {
    result.firstName.error = true;
    result.firstName.messages.push("First Name cannot be blank");
  }

  if (designation == "") {
    result.designation.error = true;
    result.designation.messages.push("First Name cannot be blank");
  }

  if (telephoneNumber.length < 8) {
    result.telephoneNumber.error = true;
    result.telephoneNumber.messages.push("Needs a Telephone Number");
  } else {
    var telephoneNo = /^\d{8}$/;
    if (!phoneNumber.match(telephoneNo)) {
      result.phoneNumber.error = true;
      result.phoneNumber.messages.push("Invalid Phone Number");
    }
  }

  if (phoneNumber.length == "") {
    result.phoneNumber.error = true;
    result.phoneNumber.messages.push(
      "Needs a Phone Number for Contact purposes"
    );
  } else {
    var phoneNo = /^\d{11}$/;
    if (!phoneNumber.match(phoneNo)) {
      result.phoneNumber.error = true;
      result.phoneNumber.messages.push("Invalid Phone Number");
    }
  }

  proposedProjectCost.forEach((item, index) => {
    if(item.cost==='') {
      result.proposedProjectCost[index].error = true;
      result.proposedProjectCost[index].messages.push('Not Null')
    }
    })

  //Weird looking function input syntax is javascript destructuring, nakalimutan
  //kong iexplain kanina kasi lately ko lang rin narealize hahaha, eexplain ko sa
  //next meeting pero di bale, ala namang nabago sa code logic nyo, ganun parin sya
  //as is pati kung pano nyo tawagin yung variable

  //TODO: Insert proposedProjectCost validation here

  return result;
}

export default form2Validator;
