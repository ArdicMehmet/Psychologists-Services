import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemas } from "../../schemas/index";
import useSignUp from "../../hooks/useSignUp";

const SignUpForm = ({ callback }) => {
  const { loading: signUpLoading, error: signUpError } = useSignUp();
  const signUpSchemas = schemas.signUp;
  const {
    register,
    handleSubmit,
    formState: { errors: signUpErrors },
  } = useForm({
    resolver: yupResolver(signUpSchemas),
  });

  const onSubmit = async (data) => {
    callback(data);
  };

  return (
    <>
      {signUpLoading ? (
        <div>Loading</div>
      ) : (
        <div className="">
          <h2 className="">Kayıt Formu</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label>Ad</label>
              <input {...register("name")} className="" />
              {signUpErrors.name && (
                <p className="">{signUpErrors.name.message}</p>
              )}
            </div>

            <div>
              <label>Email</label>
              <input {...register("email")} className="" />
              {signUpErrors.email && (
                <p className="">{signUpErrors.email.message}</p>
              )}
            </div>

            <div>
              <label>Şifre</label>
              <input type="password" {...register("password")} className="" />
              {signUpErrors.password && (
                <p className="">{signUpErrors.password.message}</p>
              )}
            </div>

            <button type="submit" className="">
              Gönder
            </button>
          </form>
        </div>
      )}
      {signUpError && <p>Hata : {signUpError}</p>}
    </>
  );
};

export default SignUpForm;
