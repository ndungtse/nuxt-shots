export interface VideoResponse {
  page: number;
  per_page: number;
  videos: Video[];
  total_results: number;
  next_page: string;
  url: string;
}

export interface Video {
  id: number;
  width: number;
  height: number;
  duration: number;
  full_res: any;
  tags: any[];
  url: string;
  image: string;
  avg_color: any;
  user: User;
  video_files: VideoFile[];
  video_pictures: VideoPicture[];
}

export interface User {
  id: number;
  name: string;
  url: string;
}

export interface VideoFile {
  id: number;
  quality: string;
  file_type: string;
  width: number;
  height: number;
  fps?: number;
  link: string;
}

export interface VideoPicture {
  id: number;
  nr: number;
  picture: string;
}
