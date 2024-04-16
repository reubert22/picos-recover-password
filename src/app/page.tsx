"use client";

import PasswordRecoveryForm from "@/components/PasswordRecoveryForm";
import React from "react";

export default function Home() {
  return (
    <main className="bg-yellowLight flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-16 xl:p-24">
      <div className="flex items-center flex-col">
        <p className="text-darker text-5xl md:text-5xl mb-5">Picos</p>
        <p className="text-darker text-2xl md:text-2xl">Redefinição de Senha</p>
      </div>

      <PasswordRecoveryForm />
    </main>
  );
}
