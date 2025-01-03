import { useState, useEffect, useMemo } from 'react';
import { isWithinInterval, parseISO } from 'date-fns';
import { PostAnalytics } from '../types/analytics';
import { parseCSVData } from '../services/analyticsService';

export const useAnalytics = (startDate: string, endDate: string) => {
  const [data, setData] = useState<PostAnalytics[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const parsedData = await parseCSVData();
      setData(parsedData);
    };
    loadData();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((post) => {
      if (!post.Date_Posted) return false;
      try {
        const postDate = parseISO(post.Date_Posted);
        return isWithinInterval(postDate, {
          start: parseISO(startDate),
          end: parseISO(endDate),
        });
      } catch {
        console.error(`Invalid date format: ${post.Date_Posted}`);
        return false;
      }
    });
  }, [data, startDate, endDate]);

  const metrics = useMemo(() => {
    if (filteredData.length === 0) return null;

    const totalLikes = filteredData.reduce((sum, post) => sum + post.Likes, 0);
    const totalShares = filteredData.reduce((sum, post) => sum + post.Shares, 0);
    const totalComments = filteredData.reduce((sum, post) => sum + post.Comments, 0);
    const postCount = filteredData.length;

    return {
      avgLikes: totalLikes / postCount,
      avgShares: totalShares / postCount,
      avgComments: totalComments / postCount,
      postCount,
    };
  }, [filteredData]);

  return { filteredData, metrics };
};
