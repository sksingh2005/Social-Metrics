export interface EngagementMetrics {
  likes: number;
  shares: number;
  comments: number;
}

export interface PostAnalytics {
  Post_ID: string;
  Post_Type: 'Static' | 'Carousel' | 'Reel';
  Likes: number;
  Shares: number;
  Comments: number;
  Date_Posted: string;
}

export interface PerformanceInsight {
  title: string;
  description: string;
  metric: string;
  change: number;
}