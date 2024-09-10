'use client'
import {  signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function SignOut(){
    const t= useTranslations('Status')
    return(
        <button type="button" onClick={()=>signOut()}>
            {t('signOut')}
        </button>
    )
}