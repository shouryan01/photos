import AppGrid from '@/components/AppGrid';
import { getUniqueTags } from '@/photo/db/query';
import PhotoTag from '@/tag/PhotoTag';
import FavsTag from '@/tag/FavsTag';
import { isTagFavs, sortTagsByCount } from '@/tag';
import { Fragment } from 'react';

export default async function Tags() {
  const tags = await getUniqueTags().catch(() => []);

  return (
    <AppGrid
      contentMain={
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">All Collections</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
              gap-4">
              {sortTagsByCount(tags).map(({ tag, count }) =>
                <Fragment key={tag}>
                  {isTagFavs(tag)
                    ? <FavsTag
                      // countOnHover={count}
                      badged
                      contrast="high"
                    />
                    : <div className="flex items-center gap-2">
                      <PhotoTag
                        tag={tag}
                        // countOnHover={count}
                        badged
                        contrast="high"
                      />
                      <span className="text-sm text-gray-500">({count})</span>
                    </div>}
                </Fragment>)}
            </div>
          </div>
        </div>}
    />
  );
}
