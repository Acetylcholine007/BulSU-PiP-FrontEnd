export const elForm1Validator = (investmentReq) => {
  var result = {
    investmentReq: [
      { error: false, messages: [] },
      { error: false, messages: [] },
      { error: false, messages: [] },
      { error: false, messages: [] },
      { error: false, messages: [] },
    ],
  };

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
