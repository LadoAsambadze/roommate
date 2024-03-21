"use client";

import { useTranslation } from "react-i18next";
import { BankIcon } from "./svg";

export default function ExampleClientComponent() {
  const { t } = useTranslation();

  return (
    <>
      <h3>{t("hello")}</h3>
      <BankIcon />
    </>
  );
}
