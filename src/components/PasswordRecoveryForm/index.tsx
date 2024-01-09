import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { supabaseClient } from "@/config/supabase";

const PasswordRecoveryForm = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Campo obrigatório."),
    password: Yup.string().required("Campo obrigatório."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "As senhas devem coincidir.")
      .required("Campo obrigatório."),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (params: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      await supabaseClient.auth.updateUser({
        password: params.password,
        email: params.email,
      });
      setSubmitSuccess(true);
      reset({
        email: "",
        password: "",
        confirmPassword: "",
      } as any);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-8 p-6 bg-black rounded shadow-md border border-blue-500"
      >
        <h2 className="text-2xl text-white mb-6 font-bold text-center">
          Redefinição de Senha
        </h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-white text-sm font-bold mb-2"
          >
            Email:
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="email"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 bg-gray-800 text-white"
              />
            )}
          />
          <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-white text-sm font-bold mb-2"
          >
            Senha:
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                id="password"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 bg-gray-800 text-white"
              />
            )}
          />
          <p className="text-red-500 text-xs italic">
            {errors.password?.message}
          </p>
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-white text-sm font-bold mb-2"
          >
            Confirmar Senha:
          </label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                id="confirmPassword"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 bg-gray-800 text-white"
              />
            )}
          />
          <p className="text-red-500 text-xs italic">
            {errors.confirmPassword?.message}
          </p>
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue"
          >
            Confirmar
          </button>
        </div>
      </form>
      {submitSuccess && (
        <div className="p-6 mt-4 bg-green-500 text-white rounded shadow-md">
          <p className="text-center font-bold">
            Recuperação de senha com sucesso!
          </p>
          <p className="text-center">
            Tente entrar novamente no app usando a nova senha.
          </p>
        </div>
      )}
    </div>
  );
};

export default PasswordRecoveryForm;
