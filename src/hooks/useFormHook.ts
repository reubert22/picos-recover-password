import { supabaseClient } from "@/config/supabase";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const validationSchema: Yup.SchemaOf<FormValues> = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Campo obrigatório."),
  password: Yup.string().required("Campo obrigatório."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "As senhas devem coincidir.")
    .required("Campo obrigatório."),
});

export const useFormHook = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (params: FormValues) => {
    try {
      const response = await supabaseClient.auth.updateUser({
        password: params.password,
        email: params.email,
      });

      if (response.error) throw new Error();
      setSubmitSuccess(true);
    } catch (err) {
      setSubmitError(true);
    }
  };

  const handleResetForm = () => {
    setSubmitSuccess(false);
    setSubmitError(false);
    reset({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  useEffect(() => {
    if (submitError || submitSuccess)
      setTimeout(() => {
        handleResetForm();
      }, 3000);
  }, [submitError, submitSuccess]);

  return {
    handleSubmit: handleSubmit(onSubmit),
    submitSuccess,
    control,
    formState: { errors },
    submitError,
  };
};
