'use client'
import FormWrapper from "./FormWrapper";
import { useTranslations } from "next-intl";
import {z } from 'zod'

type InfoData ={
  name :string              
  location :string       
  description :string   
  governorate :number     
  place_type :number       
  rating   :string        
  note:string
} 
type InfoProps=InfoData&{
  updateFields:(fields:Partial<InfoData>)=>void
  errors: Partial<Record<keyof InfoData, string>>; //===
}
const MAX_DESCRIPTION_LENGTH = 100;

export default function InfoForm({name , location ,description ,governorate ,place_type ,rating ,note,updateFields, errors}:InfoProps ){
   // Remove all white spaces for counting purposes
   const trimmedDescription = description.replace(/\s+/g, '');
   const remainingCharacters = MAX_DESCRIPTION_LENGTH - trimmedDescription.length;

  const t= useTranslations('Forms')
    return(
        <FormWrapper title={t("placeInformation")}>
         <input
         className="rounded-2xl border-2 border-yellow-300 p-2 m-2"
          type="text"
          name="name"
          placeholder={t("placeName")}
          value={name}
          onChange={e=>updateFields({name:e.target.value})}
        />
         {errors.name && <p className="text-red-500">{errors.name}</p>}
        <input
        className="rounded-2xl border-2 border-yellow-300 p-2 m-2"
          type="text"
          name="location"
          placeholder={t("location")}
          value={location}
          onChange={e=>updateFields({location:e.target.value})}
        />
         {errors.location && <p className="text-red-500">{errors.location}</p>}
        <textarea
          className="rounded-2xl border-2 border-yellow-300 p-2 m-2"
          rows={5}
          name="description"
          placeholder={t("description")}
          value={description}
          onChange={e=>updateFields({description:e.target.value})} 
        />
     {errors.description && <p className="text-red-500">{errors.description}</p>}
      <p className={`text-gray-500 ${remainingCharacters < 0 ? 'text-green-500' : ''} `}>
        {remainingCharacters >= 0 ? `Characters remaining (excluding spaces): ${remainingCharacters}` : ``}
      </p>
       <select
        className="rounded-2xl border-2 border-yellow-300 p-2 m-2"
        title="governorate"
        name="governorate"
        value={governorate ?? ""}
        onChange={e => updateFields({ governorate: +e.target.value })}
      >
      <option value="" disabled>{t('selectGovernorate')}</option>
      <option value={1}>{t('muscat')}</option>
      <option value={2}>{t('dhofar')}</option>
      <option value={3}>{t('alBuraimi')}</option>
      <option value={4}>{t('alDakhiliyah')}</option>
      <option value={5}>{t('alBatinahNorth')}</option>
      <option value={6}>{t('alBatinahSouth')}</option>
      <option value={7}>{t('alSharqiyahNorth')}</option>
      <option value={8}>{t('alSharqiyahSouth')}</option>
      <option value={9}>{t('alWusta')}</option>
      <option value={10}>{t('musandam')}</option>
      <option value={11}>{t('alDhahirah')}</option>

      </select>
      {errors.governorate && <p className="text-red-500">{errors.governorate}</p>}
        <label htmlFor="place_type">{t("placeType")}</label>
          <select
          id="place_type"
          value={place_type ?? ""}
          onChange={(e) => updateFields({ place_type: +e.target.value })}
          className="rounded-2xl border-2 border-yellow-300 p-2 m-2"
            >
          <option value="" disabled>{t("placeType")}</option>
          <option value={1}>{t("beach")}</option>
          <option value={2}>{t("mountain")}</option>
          <option value={3}>{t("souq")}</option>
          <option value={4}>{t("park")}</option>
          <option value={5}>{t("museum")}</option>
          <option value={6}>{t("castle")}</option>
          <option value={7}>{t("fort")}</option>
          <option value={8}>{t("wadi")}</option>
          <option value={9}>{t("hike")}</option>
          <option value={10}>{t("animalsPark")}</option>
          <option value={11}>{t("factory")}</option>
          <option value={12}>{t("cave")}</option>
          <option value={13}>{t("festival")}</option>
          <option value={14}>{t("hotSpring")}</option>
          <option value={15}>{t("walkingTrack")}</option>
          <option value={16}>{t("dam")}</option>
          <option value={17}>{t("falaj")}</option>
          <option value={18}>{t("mosque")}</option>
          <option value={19}>{t("plantsPark")}</option>
      
          
        </select>
        {errors.place_type && <p className="text-red-500">{errors.place_type}</p>}
         <input
         className="rounded-2xl border-2 border-yellow-300 p-2 m-2"
          type="number"
          name="rating"
          placeholder={t("rating")}
          min="1"
          max="5"
          value={rating}
          onChange={e=>updateFields({rating:e.target.value})}
          
        />
        {errors.rating && <p className="text-red-500">{errors.rating}</p>}
        <input
        className="rounded-2xl border-2 border-yellow-300 p-2 m-2"
          type="text"
          name="note"
          placeholder={t("note")}
          value={note}
          onChange={e=>updateFields({note:e.target.value})}
         
        />
        {errors.note && <p className="text-red-500">{errors.note}</p>}
        </FormWrapper>
    )
}