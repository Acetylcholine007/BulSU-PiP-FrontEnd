export const elForm2Validator = (proposedProjectCost) => {
  var result = {
    proposedProjectCost: [
      { error: false, messages: [] },
      { error: false, messages: [] },
      { error: false, messages: [] },
    ],
  };

  proposedProjectCost.forEach((item, index) => {
    if (item.cost === "") {
      result.proposedProjectCost[index].error = true;
      result.proposedProjectCost[index].messages.push("Please input a value");
    } else {
      let isNumber = !isNaN(item.cost);
      console.log(isNumber);
      if (isNumber) {
        let number = parseFloat(item.cost);
        if (number < 0) {
          result.proposedProjectCost[index].error = true;
          result.proposedProjectCost[index].messages.push(
            "The value is smaller than 0"
          );
        } else if (number > 10000000)
          result.proposedProjectCost[index].error = true;
        result.proposedProjectCost[index].messages.push(
          "The value is larger than 10,000,000"
        );
      } else {
        result.proposedProjectCost[index].error = true;
        result.proposedProjectCost[index].messages.push(
          "The value is not a number"
        )
      }
    }
  });

  return result;
};
