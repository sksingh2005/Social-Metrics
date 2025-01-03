export interface EngagementMetrics {
  likes: number;
  shares: number;
  comments: number;
}

export interface PostAnalytics {
  id: string;
  type: 'carousel' | 'reel' | 'image';
  metrics: EngagementMetrics;
  timestamp: string;
}

export interface PerformanceInsight {
  title: string;
  description: string;
  metric: string;
  change: number;
}