"use client";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <div className="flex items-end">
          <p className="relative dark:drop-shadow-[0_0_0.3rem_#000] text-white text-5xl">
            Picos
          </p>
        </div>
      </div>
      <p className="relative dark:drop-shadow-[0_0_0.3rem_#000] text-white text-xl"></p>

      <PasswordRecoveryForm />
    </main>
  );
}

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const PasswordRecoveryForm = () => {
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
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    // Handle password recovery logic here
    console.log("Form data submitted:", data);
    // Send data to the server or perform other necessary actions
  };

  return (
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
  );
};
