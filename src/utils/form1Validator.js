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

  if (title.length > 20) {
    result.title.error = true;
    result.title.messages.push("too long");
  }
  if (title.length < 5) {
    result.title.error = true;
    result.title.messages.push("too short");
  }
  if (title === "") {
    result.title.error = true;
    result.title.messages.push("please put your Title");
  }
  if (obligationType === "") {
    result.obligationType.error = true;
    result.obligationType.messages.push("please put your Obligation type");
  }
  if (proponent === "") {
    result.proponent.error = true;
    result.proponent.messages.push("Proponent section is required");
  }
  if (startYear === null) {
    result.startYear.error = true;
    result.startYear.messages.push("implementation of year is required");
  }
  if (endYear === null) {
    result.endYear.error = true;
    result.endYear.messages.push("implementation of year is required");
  }

  //Weird looking function input syntax is javascript destructuring, nakalimutan
  //kong iexplain kanina kasi lately ko lang rin narealize hahaha, eexplain ko sa
  //next meeting pero di bale, ala namang malaking nabago sa code logic nyo, 
  //ganun parin sya as is, sinunod ko lang sa naming convention saka
  //inalis ko yung negation sa if-expressions kasi nagfefailed yung validator 
  //na magscreen kapag may naviolate na input.

  //Inalis ko na rin pala yung validator for PAP at readiness, ngayon
  //ko lang rin narealize na di naman sya matatampered kasi menu na sya

  //TODO: Insert investmentReq validation code here

  return result;
};
