import * as yup from "yup";
export const schemas = {
  signUp: yup.object().shape({
    name: yup.string().required("Ad zorunludur"),
    email: yup
      .string()
      .email("Geçersiz e-posta")
      .required("E-posta zorunludur"),
    password: yup
      .string()
      .min(6, "En az 6 karakter olmalı")
      .required("Şifre zorunludur"),
  }),
};
