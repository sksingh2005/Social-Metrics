import React from 'react';
import { Image, Film, Images } from 'lucide-react';
import { PostAnalytics } from '../../types/analytics';

interface Props {
  data: PostAnalytics[];
}

export function PostTypeAnalysis({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Post Type Performance</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
          <Image className="w-6 h-6 text-blue-500" />
          <div>
            <p className="text-sm text-gray-600">Images</p>
            <p className="font-semibold">32% Engagement</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
          <Film className="w-6 h-6 text-purple-500" />
          <div>
            <p className="text-sm text-gray-600">Reels</p>
            <p className="font-semibold">45% Engagement</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
          <Images className="w-6 h-6 text-green-500" />
          <div>
            <p className="text-sm text-gray-600">Carousels</p>
            <p className="font-semibold">23% Engagement</p>
          </div>
        </div>
      </div>
    </div>
  );
}