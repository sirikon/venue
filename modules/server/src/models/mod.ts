export type Talk = {
  id: number;
  slug: string;
  name: string;
  description: string;
  speaker_name: string;
  speaker_title: string;
  speaker_image: string | null;
  track: string;
  date: Date;
};

export type Question = {
  id: number;
  visitor_id: string;
  talk_id: number;
  question: string;
};

export type Rating = {
  visitor_id: string;
  talk_id: number;
  rating: number;
  comment: string;
};
