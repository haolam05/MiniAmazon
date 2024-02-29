import { turnOnGreenBoxShadow, turnOnOffAllBoxShadow, turnOnRedBoxShadow } from "./dom";

export const handleEmailOnChange = (e, setEmail, setErrors) => {
  const goodEmail = "(ex: username@mail_server.domain)";
  const element = e.target;
  const value = element.value;

  setEmail(value);

  if (!value.length) {
    turnOnOffAllBoxShadow(e);
    return setErrors({ "email": "" });
  }

  turnOnRedBoxShadow(e);
  const symbolIndex = value.indexOf("@");
  const dotIndex = value.indexOf(".");

  if (symbolIndex < 0) {
    return setErrors({ "email": "Missing \"@\" " + goodEmail });
  }

  if (dotIndex < 0) {
    return setErrors({ "email": "Missing \".\" " + goodEmail });
  }

  let parts = value.split("@");
  if (parts.length != 2) {
    return setErrors({ "email": "Only 1 \"@\" is allowed " + goodEmail })
  }

  if (symbolIndex === 0) {
    return setErrors({ "email": "Missing username " + goodEmail })
  }

  if (symbolIndex + 1 === dotIndex) {
    return setErrors({ "email": "Missing mail server " + goodEmail })
  }

  if (symbolIndex > dotIndex) {
    return setErrors({ "email": "\"@\" must come before \".\" " + goodEmail })
  }

  parts = value.split(".");
  if (parts.length != 2) {
    return setErrors({ "email": "Only 1 \".\" is allowed " + goodEmail })
  }

  if (dotIndex === value.length - 1) {
    return setErrors({ "email": "Missing domain " + goodEmail })
  }

  turnOnGreenBoxShadow(e);
  return setErrors({ "email": "" });
}
