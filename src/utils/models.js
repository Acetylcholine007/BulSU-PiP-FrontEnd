class User {
  constructor({
    id,
    suc,
    college,
    email,
    password,
    uri,
    type,
    verified,
    notificationList,
    projectList,
  }) {
    this.id = id;
    this.suc = suc;
    this.college = college;
    this.email = email;
    this.password = password;
    this.uri = uri;
    this.type = type;
    this.verified = verified;
    this.notificationList = notificationList;
    this.projectList = projectList;
  }

  hasError() {
    return (
      this.suc === "" &&
      this.college === "" &&
      this.email === "" &&
      this.password === "" &&
      this.type === ""
    );
  }

  toObject() {
    return {
      suc: this.suc,
      college: this.college,
      email: this.email,
      password: this.password,
      uri: this.uri,
      type: this.type,
      verified: this.verified,
      notificationList: this.notificationList,
      projectList: this.projectList,
    };
  }
}

class Notification {
  constructor(id, header, message, author, datetime) {
    this.id = id;
    this.header = header;
    this.message = message;
    this.author = author;
    this.datetime = datetime;
  }

  toObject() {
    return {
      header: this.header,
      message: this.message,
      author: this.author,
      datetime: this.datetime,
    };
  }
}

class Comment {
  constructor(id, message, author, datetime) {
    this.id = id;
    this.message = message;
    this.author = author;
    this.datetime = datetime;
  }

  toObject() {
    return {
      message: this.message,
      author: this.author,
      datetime: this.datetime,
    };
  }
}

class Project {
  constructor(
    id,
    ownerId,
    title,
    GSP,
    obligationType,
    proponent,
    investmentReq,
    implementationPeriod,
    papLevel,
    readiness,
    status,
    remarks,
    address,
    projectLocation,
    categorization,
    description,
    purpose,
    beneficiary,
    proponentName,
    designation,
    contactInformation,
    dateAccomplished,
    signature,
    fileList,
    commentList
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.title = title;
    this.GSP = GSP;
    this.obligationType = obligationType;
    this.proponent = proponent;
    this.investmentReq = investmentReq;
    this.implementationPeriod = implementationPeriod;
    this.papLevel = papLevel;
    this.readiness = readiness;
    this.status = status;
    this.remarks = remarks;
    this.address = address;
    this.projectLocation = projectLocation;
    this.categorization = categorization;
    this.description = description;
    this.purpose = purpose;
    this.beneficiary = beneficiary;
    this.proponentName = proponentName;
    this.designation = designation;
    this.contactInformation = contactInformation;
    this.dateAccomplished = dateAccomplished;
    this.signature = signature;
    this.fileList = fileList;
    this.commentList = commentList;
  }

  toObject() {
    return {
      ownerId: this.ownerId,
      title: this.title,
      GSP: this.GSP,
      obligationType: this.obligationType,
      proponent: this.proponent,
      investmentReq: this.investmentReq,
      implementationPeriod: this.implementationPeriod,
      papLevel: this.papLevel,
      readiness: this.readiness,
      status: this.status,
      remarks: this.remarks,
      address: this.address,
      projectLocation: this.projectLocation,
      categorization: this.categorization,
      description: this.description,
      purpose: this.purpose,
      beneficiary: this.beneficiary,
      proponentName: this.proponentName,
      designation: this.designation,
      contactInformation: this.contactInformation,
      dateAccomplished: this.dateAccomplished,
      signature: this.signature,
      fileList: this.fileList,
      commentList: this.commentList,
    };
  }
}

module.exports = {
  User,
  Notification,
  Project,
  Comment,
};
