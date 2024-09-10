'use client'
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function SignIn(){
    const t= useTranslations('Status')
    return(
        <button type="button" onClick={()=>signIn()}>
            {t('signIn')}
        </button>
    )
}