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
        } else if (number > 10000000) result.investmentReq[index].error = true;
        result.investmentReq[index].messages.push("Larger than 10,000,000");
      } else {
        result.investmentReq[index].error = true;
        result.investmentReq[index].messages.push("Not a number");
      }
    }

    if (item.value.length >= 9) {
      result.investmentReq[index].error = true;
      result.investmentReq[index].messages.push("It must not exceeded by 100M");
    }
    if (isNaN(item.value)) {
      result.investmentReq[index].error = true;
      result.investmentReq[index].messages.push("Numbers only");
    }
  });

  return result;
};
