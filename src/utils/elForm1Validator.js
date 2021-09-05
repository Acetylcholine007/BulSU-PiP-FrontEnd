export const form1Validator = ({
    investmentReq, 
  }) => {
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
