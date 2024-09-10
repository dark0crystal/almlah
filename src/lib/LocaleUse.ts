

import { useLocale } from "next-intl";

export default function Locale(){
    const locale = useLocale();
    return{
        locale
    }
}

