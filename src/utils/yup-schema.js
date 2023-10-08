/* eslint-disable import/no-extraneous-dependencies */
const googlePhoneNumber = require("google-libphonenumber");
// eslint-disable-next-line node/no-unpublished-require
const { isEmpty } = require("lodash");
const moment = require("moment");
const yup = require("yup");

const phoneUtil = googlePhoneNumber.PhoneNumberUtil.getInstance();

yup.setLocale({
  mixed: {
    required: "This field is required",
  },
  string: {
    email: "Invalid Email Address",
  },
  array: {
    min: "This field is required",
  },
});

yup.addMethod(
  yup.string,
  "dateFormat",
  function dateFormat(format = "YYYY-MM-DD", message = "Invalid Date") {
    return this.test({
      name: "dateFormat",
      exclusive: true,
      message,
      test: (value) => isEmpty(value) || moment(value, format, true).isValid(),
    }).nullable();
  },
);

yup.addMethod(
  yup.string,
  "timeFormat",
  function timeFormat(
    message = 'Invalid time, time format should be "HH:MM A/P" (eg. 08:00 A)',
  ) {
    return this.test({
      name: "timeFormat",
      exclusive: true,
      message,
      test: (value) =>
        isEmpty(value) ||
        moment(moment(value).format("hh:mm"), "hh:mm", true).isValid(),
    }).nullable();
  },
);

yup.addMethod(yup.string, "legalAge", function legalAge() {
  return this.test({
    name: "legalAge",
    exclusive: true,
    message: "You must be 15 years old or above",
    test: (value) =>
      isEmpty(value) ||
      moment(value).isBefore(moment(moment()).subtract(15, "years")),
  });
});

yup.addMethod(yup.string, "phone", function phone() {
  return this.test({
    name: "phone",
    exclusive: true,
    message: "Invalid Mobile Number",
    test: (value) => {
      try {
        return (
          isEmpty(value) ||
          (phoneUtil.isValidNumber(phoneUtil.parse(value, "PH")) &&
            /(\+?\d{2}?\s?\d{3}\s?\d{3}\s?\d{4})|([0]\d{3}\s?\d{3}\s?\d{4})/g.test(
              value.replace(/^/, "63"),
            ))
        );
      } catch (e) {
        return false;
      }
    },
  });
});

return yup;
