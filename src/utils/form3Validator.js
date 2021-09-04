function form3Validator(recievedBy, recievedDesignation) {
    var result = {
      recievedBy: {
        error: false,
        messages: [],
      },
      recievedDesignation: {
        error: false,
        messages: [],
      },
    };
  
    if (recievedBy == "") {
      result.recievedBy.error = true;
      result.recievedBy.messages.push("Invalid Reciever Name");
    }
    if (recievedDesignation == "") {
      result.recievedDesignation.error = true;
      result.recievedDesignation.messages.push("Invalid Reciever Designation");
    }
  
  
    return result;
  }
  
  export default form3Validator;
  
  