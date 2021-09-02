export const form1Validator = ({
  title,
  obligationType,
  proponent,
  investmentReq,
  implementationPeriod: { start: startYear, end: endYear },
}) => {
  var result = {
    title: {
      error: false,
      messages: [],
    },
    obligationType: {
      error: false,
      messages: [],
    },
    proponent: {
      error: false,
      messages: [],
    },
    investmentReq: [
      { error: false, messages: [] },
      { error: false, messages: [] },
      { error: false, messages: [] },
      { error: false, messages: [] },
      { error: false, messages: [] },
    ],
    startYear: {
      error: false,
      messages: [],
    },
    endYear: {
      error: false,
      messages: [],
    },
  };

  if (title.length > 100) {
    result.title.error = true;
    result.title.messages.push("too long");
  }
  if (title === "") {
    result.title.error = true;
    result.title.messages.push("Title cannot be blank");
  }
  if (title.length < 3) {
    result.title.error = true;
    result.title.messages.push("too short");
  }
  if (obligationType === "") {
    result.obligationType.error = true;
    result.obligationType.messages.push("please put your Obligation type");
  }
  if (proponent === "") {
    result.proponent.error = true;
    result.proponent.messages.push("Proponent section cannot be blank");
  }
  if (startYear === null) {
    result.startYear.error = true;
    result.startYear.messages.push("implementation of year cannot be blank");
  }
  if (endYear === null) {
    result.endYear.error = true;
    result.endYear.messages.push("implementation of year cannot be blank");
  }

  investmentReq.forEach((item, index) => {
  if(item.value === '') {
    result.investmentReq[index].error = true;
    result.investmentReq[index].messages.push('please put a value');
  } 
  if(item.value > 100000000) {
    result.investmentReq[index].error = true;
    result.investmentReq[index].messages.push('it must not exceeded by 100M')
  }
  if(isNaN(item.value)) {
    result.investmentReq[index].error = true;
    result.investmentReq[index].messages.push('numbers only');
  }
  })

  return result;
};
