import { turnOnGreenBoxShadow, turnOnOffAllBoxShadow, turnOnRedBoxShadow } from "./dom";

export const emailIsValid = email => {
  const symbolIndex = email.indexOf("@");
  const dotIndex = email.indexOf(".");

  const parts1 = email.split("@");
  const parts2 = email.split(".");

  if (                                // good email : username@mail_server.domain
    symbolIndex < 0 ||                // @ not found
    dotIndex < 0 ||                   // . not found
    parts1.length !== 2 ||            // 1+ @
    symbolIndex === 0 ||              // missing username
    symbolIndex + 1 === dotIndex ||   // missing mail_server
    symbolIndex > dotIndex ||         // @ comes after .
    parts2.length !== 2 ||            // 1+ .
    dotIndex === email.length - 1     // domain not found
  ) {
    return false;
  }

  return true;
}

export const handleEmailOnChange = (e, setEmail, setErrors) => {
  const goodEmail = "(ex: username@mail_server.domain)";
  const element = e.target;
  const value = element.value;

  setEmail(value);

  if (!value.length) {
    turnOnOffAllBoxShadow(e);
    return setErrors(errors => ({ ...errors, "email": "" }));
  }

  turnOnRedBoxShadow(e);
  const symbolIndex = value.indexOf("@");
  const dotIndex = value.indexOf(".");

  if (symbolIndex < 0) {
    return setErrors(errors => ({ ...errors, "email": "Missing \"@\" " + goodEmail }));
  }

  if (dotIndex < 0) {
    return setErrors(errors => ({ ...errors, "email": "Missing \".\" " + goodEmail }));
  }

  let parts = value.split("@");
  if (parts.length != 2) {
    return setErrors(errors => ({ ...errors, "email": "Only 1 \"@\" is allowed " + goodEmail }));
  }

  if (symbolIndex === 0) {
    return setErrors(errors => ({ ...errors, "email": "Missing username " + goodEmail }));
  }

  if (symbolIndex + 1 === dotIndex) {
    return setErrors(errors => ({ ...errors, "email": "Missing mail server " + goodEmail }));
  }

  if (symbolIndex > dotIndex) {
    return setErrors(errors => ({ ...errors, "email": "\"@\" must come before \".\" " + goodEmail }));
  }

  parts = value.split(".");
  if (parts.length != 2) {
    return setErrors(errors => ({ ...errors, "email": "Only 1 \".\" is allowed " + goodEmail }));
  }

  if (dotIndex === value.length - 1) {
    return setErrors(errors => ({ ...errors, "email": "Missing domain " + goodEmail }));
  }

  turnOnGreenBoxShadow(e);
  return setErrors(errors => ({ ...errors, "email": "" }));
}

export const handlePasswordOnChange = (e, setPassword, setErrors) => {
  setPassword(e.target.value);

  if (!e.target.value.length) {
    turnOnOffAllBoxShadow(e);
    return setErrors(errors => ({ ...errors, "password": "" }));
  }

  turnOnRedBoxShadow(e);
  if (e.target.value.length < 6) {
    return setErrors(errors => ({ ...errors, "password": "Must have at least 6 characters" }));
  }

  turnOnGreenBoxShadow(e);
  return setErrors(errors => ({ ...errors, "password": "" }));
}
