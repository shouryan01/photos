import CommandKClient, {
  CommandKSection,
} from '@/components/cmdk/CommandKClient';
import {
  getPhotosMetaCached,
  getUniqueCamerasCached,
  getUniqueFilmSimulationsCached,
  getUniqueTagsCached,
} from '@/photo/cache';
import {
  pathForCamera,
  pathForFilmSimulation,
  pathForFocalLength,
} from './paths';
import { formatCameraText } from '@/camera';
import { photoQuantityText } from '@/photo';
import { formatCount, formatCountDescriptive } from '@/utility/string';
import PhotoFilmSimulationIcon from '@/simulation/PhotoFilmSimulationIcon';
import { IoMdCamera } from 'react-icons/io';
import { ADMIN_DEBUG_TOOLS_ENABLED, SHOW_FILM_SIMULATIONS } from './config';
import { labelForFilmSimulation } from '@/vendors/fujifilm';
import { getUniqueFocalLengths } from '@/photo/db/query';
import { formatFocalLength } from '@/focal';
import { TbCone } from 'react-icons/tb';
import { cookies } from 'next/headers';
import { TIMEZONE_COOKIE_NAME } from '@/utility/timezone';

export default async function CommandK() {
  const timezone = (await cookies()).get(TIMEZONE_COOKIE_NAME)?.value;

  const [
    count,
    tags,
    cameras,
    filmSimulations,
    focalLengths,
  ] = await Promise.all([
    getPhotosMetaCached()
      .then(({ count }) => count)
      .catch(() => 0),
    getUniqueTagsCached().catch(() => []),
    getUniqueCamerasCached().catch(() => []),
    SHOW_FILM_SIMULATIONS
      ? getUniqueFilmSimulationsCached().catch(() => [])
      : [],
    getUniqueFocalLengths().catch(() => []),
  ]);

  const SECTION_CAMERAS: CommandKSection = {
    heading: 'Cameras',
    accessory: <IoMdCamera />,
    items: cameras.map(({ camera, count }) => ({
      label: formatCameraText(camera),
      annotation: formatCount(count),
      annotationAria: formatCountDescriptive(count),
      path: pathForCamera(camera),
    })),
  };

  const SECTION_FILM: CommandKSection = {
    heading: 'Film Simulations',
    accessory: <span className="w-3">
      <PhotoFilmSimulationIcon className="translate-y-[0.5px]" />
    </span>,
    items: filmSimulations.map(({ simulation, count }) => ({
      label: labelForFilmSimulation(simulation).medium,
      annotation: formatCount(count),
      annotationAria: formatCountDescriptive(count),
      path: pathForFilmSimulation(simulation),
    })),
  };

  const SECTION_FOCAL: CommandKSection = {
    heading: 'Focal Lengths',
    accessory: <TbCone
      className="rotate-[270deg] text-[14px]"
    />,
    items: focalLengths.map(({ focal, count }) => ({
      label: formatFocalLength(focal)!,
      annotation: formatCount(count),
      annotationAria: formatCountDescriptive(count),
      path: pathForFocalLength(focal),
    })),
  };

  return <CommandKClient
    tags={tags}
    serverSections={[
      SECTION_CAMERAS,
      SECTION_FILM,
      SECTION_FOCAL,
    ]}
    showDebugTools={ADMIN_DEBUG_TOOLS_ENABLED}
    footer={photoQuantityText(count, false)}
    timezone={timezone}
  />;
}
