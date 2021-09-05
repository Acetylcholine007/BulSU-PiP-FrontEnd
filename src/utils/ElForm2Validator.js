export const ElForm2Validator = ({
  proposedProjectCost,
  
}) => {
  var result = {
    proposedProjectCost: [
      { error: false, messages: [] },
      { error: false, messages: [] },
      { error: false, messages: [] },
    ],
  };

  proposedProjectCost.forEach((item, index) => {
  if(item.value === '') {
    result.proposedProjectCost[index].error = true;
    result.proposedProjectCost[index].messages.push('please put a value');
  }
  if(item.value > 100000000) {
    result.proposedProjectCost[index].error = true;
    result.proposedProjectCost[index].messages.push('it must not exceed by 100M');
  }
  if(isNan(item.value)) {
    result.proposedProjectCost[index].error = true;
    result.proposedProjectCost[index].messages.push('numbers only');
  }
  
  })
  
  return result;

};
