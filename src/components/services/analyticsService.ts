import Papa from 'papaparse';
import { PostAnalytics } from '../types/analytics';
import { sampleData } from '../data/sampleData';

export const parseCSVData = (): Promise<PostAnalytics[]> => {
  return new Promise((resolve) => {
    Papa.parse(sampleData, {
      header: true,
      complete: (results) => {
        resolve(results.data as PostAnalytics[]);
      },
    });
  });
};