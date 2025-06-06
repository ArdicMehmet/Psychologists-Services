import * as yup from "yup";
export const schemas = {
  signUp: yup.object().shape({
    name: yup.string().required("Ad zorunludur"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  }),
  login: yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  }),
  appointmentSchema: yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters"),

    phone: yup
      .string()
      .required("Phone number is required")
      .matches(
        /^\+90\d{10}$/,
        "Please enter a valid Turkey phone number (+90XXXXXXXXXX)"
      ),

    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email address"),

    time: yup.string().required("Please select an appointment time"),

    comment: yup.string().max(500, "Comment must be less than 500 characters"),
  }),
};
