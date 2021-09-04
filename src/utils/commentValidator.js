function commentValidator(
    message 
  ) {
      var result = {
        message: {
            error: false,
            messages: [],
        },
      };

    if (message.length > 20) {
        result.message.error = true;
        result.message.messages.push("Comment is too long");
    }
    if (message.length < 5) {
        result.message.error = true;
        result.message.messages.push("Comment is too short");
    }
    if (message === "") {
        result.message.error = true;
        result.message.messages.push("Comment cannot be blank");
    }
    return result;
  }
export default commentValidator;
