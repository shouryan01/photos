'use client';

import { useAppText } from '@/i18n/state/client';
import SwitcherItem from '@/components/SwitcherItem';
import IconTag from '@/components/icons/IconTag';
import { PATH_TAGS } from './paths';

export default function TagsSwitcher() {
  const appText = useAppText();

  return (
    <SwitcherItem
      icon={<IconTag />}
      href={PATH_TAGS}
      tooltip={{ content: appText.nav.tags }}
    />
  );
}
