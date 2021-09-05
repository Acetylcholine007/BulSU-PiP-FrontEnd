function form3Validator(recievedBy, recieverDesignation) {
    var result = {
      recievedBy: {
        error: false,
        messages: [],
      },
      recieverDesignation: {
        error: false,
        messages: [],
      },
    };
  
    if (recievedBy == "") {
      result.recievedBy.error = true;
      result.recievedBy.messages.push("Invalid Reciever Name");
    }
    if (recieverDesignation == "") {
      result.recieverDesignation.error = true;
      result.recieverDesignation.messages.push("Invalid Reciever Designation");
    }
  
  
    return result;
  }
  
  export default form3Validator;
  
  