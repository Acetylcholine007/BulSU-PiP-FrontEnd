function form2Validator({
  projectLocation,
  description,
  purpose,
  beneficiaries,
  proponentName: { surname: surName, firstName },
  designation,
  contactInformation: { telNumber: telephoneNumber, email, phoneNumber },
}) {
  const result = {
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

    beneficiaries: {
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

  if (email === "") {
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

  if (projectLocation === "") {
    result.projectLocation.error = true;
    result.projectLocation.messages.push("Project Location cannot be blank");
  }

  if (description === "") {
    result.description.error = true;
    result.description.messages.push("Description cannot be blank");
  }

  if (purpose === "") {
    result.purpose.error = true;
    result.purpose.messages.push("Purpose cannot be blank");
  }

  if (beneficiaries === "") {
    result.beneficiaries.error = true;
    result.beneficiaries.messages.push("Beneficiary cannot be blank");
  }

  if (surName === "") {
    result.surName.error = true;
    result.surName.messages.push("Surname cannot be blank");
  }

  if (firstName === "") {
    result.firstName.error = true;
    result.firstName.messages.push("First Name cannot be blank");
  }

  if (designation === "") {
    result.designation.error = true;
    result.designation.messages.push("First Name cannot be blank");
  }

  if (telephoneNumber === "") {
    result.telephoneNumber.error = true;
    result.telephoneNumber.messages.push("Needs a Telephone Number");
  } else {
    var telephoneNo = /^\d{3}[-]\d{4}$/;
    var telephoneNo2 = /^\(\d{3}\)\d{3}[-]\d{4}$/;
    if (
      !telephoneNumber.match(telephoneNo) &&
      !telephoneNumber.match(telephoneNo2)
    ) {
      result.telephoneNumber.error = true;
      result.telephoneNumber.messages.push("Invalid Telephone Number");
    }
  }

  if (phoneNumber.length === "") {
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

  return result;
}

export default form2Validator;
