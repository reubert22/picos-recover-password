import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { ErrorLabel } from "../ErrorLabel";
import { Input } from "../Input";
import { Label } from "../Label";
import { useFormHook } from "@/hooks/useFormHook";

const PasswordRecoveryForm = () => {
  const {
    handleSubmit,
    submitSuccess,
    formState: { errors },
    control,
    submitError,
  } = useFormHook();

  return (
    <div className="mt-4 w-full md:w-[30vw] w-[100%]">
      <form
        onSubmit={handleSubmit}
        className="w-full mt-8 p-6 bg-darker rounded shadow-md"
      >
        <div className="mb-4">
          <Label title="Email:" />
          <Controller
            name={"email" as any}
            control={control}
            render={({ field }) => <Input type="text" id="email" {...field} />}
          />
          <ErrorLabel error={errors.email?.message} />
        </div>

        <div className="mb-4">
          <Label title="Senha:" />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input type="password" id="password" {...field} />
            )}
          />
          <ErrorLabel error={errors.password?.message} />
        </div>

        <div className="mb-4">
          <Label title="Confirmar Senha:" />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input type="password" id="confirmPassword" {...field} />
            )}
          />
          <ErrorLabel error={errors.confirmPassword?.message} />
        </div>

        <button
          type="submit"
          className="bg-yellowDark text-yellowLight px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue"
        >
          Confirmar
        </button>
      </form>
      {submitSuccess && (
        <div className="p-6 mt-4 bg-success text-darker rounded shadow-md">
          <p className="text-center font-bold">Sucesso!</p>
          <p className="text-center">
            Tente entrar novamente no app usando a nova senha.
          </p>
        </div>
      )}
      {submitError && (
        <div className="p-6 mt-4 bg-danger text-darker rounded shadow-md">
          <p className="text-center font-bold">Erro ao recuperar senha!</p>
          <p className="text-center">
            Tente solicitar novamente um email pelo app.
          </p>
        </div>
      )}
    </div>
  );
};

export default PasswordRecoveryForm;
