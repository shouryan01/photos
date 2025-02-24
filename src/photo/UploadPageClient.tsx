'use client';

import AdminChildPage from '@/components/AdminChildPage';
import { PATH_ADMIN_UPLOADS } from '@/app/paths';
import { PhotoFormData, generateTakenAtFields } from './form';
import PhotoForm from './form/PhotoForm';
import { Tags } from '@/tag';
import usePhotoFormParent from './form/usePhotoFormParent';
import AiButton from './ai/AiButton';
import { AiAutoGeneratedField } from './ai';
import { useMemo } from 'react';

export default function UploadPageClient({
  blobId,
  formDataFromExif,
  uniqueTags,
  hasAiTextGeneration,
  textFieldsToAutoGenerate,
  imageThumbnailBase64,
  shouldStripGpsData,
}: {
  blobId?: string
  formDataFromExif: Partial<PhotoFormData>
  uniqueTags: Tags
  hasAiTextGeneration?: boolean
  textFieldsToAutoGenerate?: AiAutoGeneratedField[],
  imageThumbnailBase64?: string
  shouldStripGpsData?: boolean
}) {
  const {
    pending,
    setIsPending,
    updatedTitle,
    setUpdatedTitle,
    hasTextContent,
    setHasTextContent,
    aiContent,
  } = usePhotoFormParent({
    textFieldsToAutoGenerate,
    imageThumbnailBase64,
  });

  const initialPhotoForm = useMemo(() => ({
    ...formDataFromExif,
    // Generate missing dates on client to avoid timezone issues
    ...generateTakenAtFields(formDataFromExif),
  }), [formDataFromExif]);

  return (
    <AdminChildPage
      backPath={PATH_ADMIN_UPLOADS}
      backLabel="Uploads"
      breadcrumb={pending && updatedTitle
        ? updatedTitle
        : blobId}
      breadcrumbEllipsis
      accessory={hasAiTextGeneration &&
        <AiButton {...{ aiContent, shouldConfirm: hasTextContent }} />}
      isLoading={pending}
    >
      <PhotoForm
        initialPhotoForm={initialPhotoForm}
        uniqueTags={uniqueTags}
        aiContent={hasAiTextGeneration ? aiContent : undefined}
        shouldStripGpsData={shouldStripGpsData}
        onTitleChange={setUpdatedTitle}
        onTextContentChange={setHasTextContent}
        onFormStatusChange={setIsPending}
      />
    </AdminChildPage>
  );
}
