import validator from "validator";

const validateUrl = (url: string) => validator.isURL(url);
export default validateUrl;
