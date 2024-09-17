'use client'
import FormWrapper from "./FormWrapper";
import { useTranslations } from "next-intl";

type PlaceStatusData = {
  isShadyPlace: number | null;
  isCamping: number | null;
  place_services: number | null;
  road: number | null;
}

type PlaceStatusProps = PlaceStatusData & {
  updateFields: (fields: Partial<PlaceStatusData>) => void;
  errors: Partial<Record<keyof PlaceStatusData, string>>; //===
}

export default function InfoForm({ isShadyPlace, isCamping, place_services, road, updateFields ,errors }: PlaceStatusProps) {
  const t = useTranslations("Forms");

  return (
    <FormWrapper title={t("placeStatus")}>
      <select
        title="isCamping"
        className="rounded-2xl border-2 border-yellow-300 p-2 m-2"
        name="isCamping"
        value={isCamping ?? ""}
        onChange={(e) => updateFields({ isCamping: e.target.value ? +e.target.value : null })}
      >
        <option value="" disabled>{t("selectCamping")}</option>
        <option value={1}>{t('allowed')}</option>
        <option value={2}>{t('notAllowed')}</option>
        <option value={3}>{t('allowedButNotRecommended')}</option>
      </select>
      {errors.isCamping && <p className="text-red-500">{errors.isCamping}</p>}

      <select
        title="isShadyPlace"
        className="rounded-2xl border-2 border-yellow-300 p-2 m-2"
        name="isShadyPlace"
        value={isShadyPlace ?? ""}
        onChange={(e) => updateFields({ isShadyPlace: e.target.value ? +e.target.value : null })}
      >
        <option value="" disabled>{t('selectShady')}</option>
        <option value={1}>{t('shady')}</option>
        <option value={2}>{t('notShady')}</option>
      </select>
      {errors.isShadyPlace && <p className="text-red-500">{errors.isShadyPlace}</p>}
      <select
        className="rounded-2xl border-2 border-yellow-300 p-2 m-2"
        title="place_services"
        name="place_services"
        value={place_services ?? ""}
        onChange={(e) => updateFields({ place_services: e.target.value ? +e.target.value : null })}
      >
        <option value="" disabled>{t('placeServices')}</option>
        <option value={1}>{t('nothing')}</option>
        <option value={2}>{t('few')}</option>
        <option value={3}>{t('alot')}</option>
      </select>
      {errors.place_services && <p className="text-red-500">{errors.place_services}</p>}
      <select
        className="rounded-2xl border-2 border-yellow-300 p-2 m-2"
        title="road"
        name="road"
        value={road ?? ""}
        onChange={(e) => updateFields({ road: e.target.value ? +e.target.value : null })}
      >
        <option value="" disabled>{t('roadStatus')}</option>
        <option value={1}>{t('easy')}</option>
        <option value={2}>{t('mid')}</option>
        <option value={3}>{t('tough')}</option>
      </select>
      {errors.road && <p className="text-red-500">{errors.road}</p>}
    </FormWrapper>
  )
}

