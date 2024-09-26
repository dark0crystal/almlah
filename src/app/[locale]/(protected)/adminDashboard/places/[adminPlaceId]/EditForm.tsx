'use client'; // Add this directive for client-side components

import { useTranslations } from 'next-intl';
import React, { useState, useEffect } from 'react';

export default function EditForm({ params }: { params: { adminPlaceId: string | undefined } }) {
  const t = useTranslations('Forms');
  
  // Add is_checked field to formValues state
  const [formValues, setFormValues] = useState({
    name_ar: '',
    description_ar: '',
    note_ar: '',
    name_en: '',
    description_en: '',
    note_en: '',
    location: '',
    rating: null as number | null,
    place_type: null as number | null,
    governorate: null as number | null,
    is_checked: false,  // new field
  });

  const [changedValues, setChangedValues] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (params.adminPlaceId) {
        try {
          const response = await fetch(`/api/get-place/${params.adminPlaceId}`);

          if (!response.ok) {
            console.error('Failed to fetch place:', response.statusText);
            alert('Place not found or an error occurred.');
            return;
          }

          const { place } = await response.json();
          console.log('Fetched place data:', place);

          setFormValues({
            name_ar: place?.name_ar || '',
            description_ar: place?.description_ar || '',
            note_ar: place?.note_ar || '',
            name_en: place?.name_en || '',
            description_en: place?.description_en || '',
            note_en: place?.note_en || '',
            location: place?.location || '',
            rating: place?.rating || null,
            place_type: place?.place_type || null,
            governorate: place?.governorate || null,
            is_checked: place?.is_checked || false, // new field
          });
        } catch (error) {
          console.error('Error fetching place:', error);
          alert('An error occurred while fetching place data.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [params.adminPlaceId]);

  // Handle regular input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newValue = ['governorate', 'place_type', 'rating'].includes(name) ? (value ? Number(value) : null) : value;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));

    setChangedValues((prevChanged) => ({
      ...prevChanged,
      [name]: newValue,
    }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));

    setChangedValues((prevChanged) => ({
      ...prevChanged,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.keys(changedValues).length > 0) {
      try {
        const response = await fetch(`/api/update-place/${params.adminPlaceId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ updatedFields: changedValues }),
        });

        const result = await response.json();
        if (result.success) {
          alert('Place updated successfully!');
        } else {
          alert('Error updating place: ' + result.error);
        }
      } catch (error) {
        console.error('Error updating place:', error);
        alert('Something went wrong!');
      }
    } else {
      alert('No changes made to the form.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center">
      <form className="flex flex-col w-[80vw]" onSubmit={handleSubmit}>
        {/* Arabic fields */}
        <label>المعلومات باللغة العربية :</label>
        <input
          className="rounded-2xl border-2 border-yellow-300 p-2 m-2"
          type="text"
          name="name_ar"
          placeholder="إسم المكان"
          value={formValues.name_ar}
          onChange={handleInputChange}
        />

        <textarea
          className="rounded-2xl border-2 border-yellow-300 p-2 m-2"
          rows={5}
          name="description_ar"
          placeholder="وصف"
          value={formValues.description_ar}
          onChange={handleInputChange}
        />
        <input
          className="rounded-2xl border-2 border-yellow-300 p-2 m-2"
          type="text"
          name="note_ar"
          placeholder="ملاحظة"
          value={formValues.note_ar}
          onChange={handleInputChange}
        />

        {/* English fields */}
        <label>Information In English:</label>
        <input
          className="rounded-2xl border-2 border-yellow-300 p-2 m-2"
          type="text"
          placeholder="Place Name"
          name="name_en"
          value={formValues.name_en}
          onChange={handleInputChange}
        />

        <textarea
          className="rounded-2xl border-2 border-yellow-300 p-2 m-2"
          rows={5}
          name="description_en"
          placeholder="Description"
          value={formValues.description_en}
          onChange={handleInputChange}
        />
        <input
          className="rounded-2xl border-2 border-yellow-300 p-2 m-2"
          type="text"
          name="note_en"
          placeholder="Note"
          value={formValues.note_en}
          onChange={handleInputChange}
        />

        {/* Common fields */}
        <label>Location:</label>
        <input
          className="rounded-2xl border-2 border-yellow-300 p-2 m-2"
          type="text"
          name="location"
          placeholder="الموقع"
          value={formValues.location}
          onChange={handleInputChange}
        />

        <select
          title="governorate"
          className="rounded-2xl border-2 border-yellow-300 p-2 m-2"
          name="governorate"
          value={formValues.governorate ?? ''}
          onChange={handleInputChange}
        >
          <option value="" disabled>{t('selectGovernorate')}</option>
          <option value={1}>{t('muscat')}</option>
          <option value={2}>{t('dhofar')}</option>
          {/* Add other options */}
        </select>

        <label htmlFor="place_type">Select Place Type:</label>
        <select
          id="place_type"
          name="place_type"
          value={formValues.place_type ?? ''}
          onChange={handleInputChange}
          className="rounded-2xl border-2 border-yellow-300 p-2 m-2"
        >
          <option value="" disabled>{t('placeType')}</option>
          <option value={1}>{t('beach')}</option>
          <option value={2}>{t('mountain')}</option>
          {/* Add other options */}
        </select>

        <label>Rating:</label>
        <input
          className="rounded-2xl border-2 border-yellow-300 p-2 m-2"
          type="number"
          name="rating"
          placeholder={t('rating')}
          min="1"
          max="5"
          value={formValues.rating ?? ''}
          onChange={handleInputChange}
        />

        {/* New Checkbox Field */}
        <label htmlFor="is_checked">Is Checked:</label>
        <input
          className="rounded-2xl border-2 border-yellow-300 p-2 m-2"
          type="checkbox"
          name="is_checked"
          id="is_checked"
          checked={formValues.is_checked}
          onChange={handleCheckboxChange} // Handle checkbox change
        />

        <button type="submit" className="rounded-2xl bg-yellow-500 p-2 mt-4">
          Submit
        </button>
      </form>
    </div>
  );
}




