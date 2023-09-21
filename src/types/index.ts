
export interface FetchOptions {
  page?: number;
  per_page?: number;
  query?: string;
}

export interface PhotosResponse {
  page: number;
  per_page: number;
  photos: Photo[];
  total_results: number;
  next_page: string;
}

export interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: Src;
  liked: boolean;
  alt: string;
}

export interface Src {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

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
