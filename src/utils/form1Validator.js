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
    result.title.messages.push("Too long");
  }
  if (title === "") {
    result.title.error = true;
    result.title.messages.push("Title cannot be blank");
  }
  if (title.length < 3) {
    result.title.error = true;
    result.title.messages.push("Too short");
  }
  if (obligationType === "") {
    result.obligationType.error = true;
    result.obligationType.messages.push("Please put your Obligation type");
  }
  if (proponent === "") {
    result.proponent.error = true;
    result.proponent.messages.push("Proponent section cannot be blank");
  }
  if (startYear === null) {
    result.startYear.error = true;
    result.startYear.messages.push("Implementation of year cannot be blank");
  }
  if (endYear === null) {
    result.endYear.error = true;
    result.endYear.messages.push("Implementation of year cannot be blank");
  }

  investmentReq.forEach((item, index) => {
    if (item.value === "") {
      result.investmentReq[index].error = true;
      result.investmentReq[index].messages.push("Please put a value");
    } else {
      let isNumber = !isNaN(item.value);
      console.log(isNumber);
      if (isNumber) {
        let number = parseFloat(item.value);
        if (number < 0) {
          result.investmentReq[index].error = true;
          result.investmentReq[index].messages.push("Smaller than 0");
        }
      } else {
        result.investmentReq[index].error = true;
        result.investmentReq[index].messages.push("Not a number");
      }
    }
  });

  return result;
};
