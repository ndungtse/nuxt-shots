import axios from "axios";
import { FetchOptions } from "~/types";

// const runtimeConfig = useRuntimeConfig();

export const PHOTOS_API = axios.create({
  baseURL: "https://api.pexels.com/v1",
  headers: {
    Authorization: process.env.NUXT_API_KEY,
  },
});

export const VIDEO_API = axios.create({
  baseURL: "https://api.pexels.com/videos",
  headers: {
    Authorization: process.env.NUXT_API_KEY,
  },
});

export const searchPhotos = async (query: string, options?: FetchOptions) => {
  console.log("API_KEY", useRuntimeConfig().public.API_KEY);

  const response = await PHOTOS_API.get(
    `/search?query=${query}&per_page=${options?.per_page ?? 10}&page=${
      options?.page ?? 1
    }`,
    {
      headers: {
        Authorization: useRuntimeConfig().public.API_KEY,
      },
    }
  );
  return response.data;
};

export const getCuratedPhotos = async (options?: FetchOptions) => {
  const response = await PHOTOS_API.get(
    `/curated?per_page=${options?.per_page ?? 10}&page=${options?.page ?? 1}`,
    {
      headers: {
        Authorization: useRuntimeConfig().public.API_KEY,
      },
    }
  ); //
  return response.data;
};

export const getPhoto = async (id: string, options?: FetchOptions) => {
  const response = await PHOTOS_API.get(`/photos/${id}`, {
    headers: {
      Authorization: useRuntimeConfig().public.API_KEY,
    },
  });
  return response.data;
};

export const getVideo = async (id: string, options?: FetchOptions) => {
  const response = await VIDEO_API.get(`/videos/${id}`, {
    headers: {
      Authorization: useRuntimeConfig().public.API_KEY,
    },
  });
  return response.data;
};

export const getCuratedVideos = async (options?: FetchOptions) => {
  const response = await VIDEO_API.get(
    `/popular?per_page=${options?.per_page ?? 10}&page=${options?.page ?? 1}`,
    {
      headers: {
        Authorization: useRuntimeConfig().public.API_KEY,
      },
    }
  );
  return response.data;
};

export const searchVideos = async (query: string, options?: FetchOptions) => {
  const response = await VIDEO_API.get(
    `/search?query=${query}&per_page=${options?.per_page ?? 10}&page=${
      options?.page ?? 1
    }`,
    {
      headers: {
        Authorization: useRuntimeConfig().public.API_KEY,
      },
    }
  );
  return response.data;
};

export const getVideoFormats = async (id: string, options?: FetchOptions) => {
  const response = await VIDEO_API.get(`/videos/${id}/formats`, {
    headers: {
      Authorization: useRuntimeConfig().public.API_KEY,
    },
  });
  return response.data;
};

export const getVideoStream = async (
  id: string,
  format: string,
  options?: FetchOptions
) => {
  const response = await VIDEO_API.get(
    `/videos/${id}/stream?format=${format}`,
    {
      headers: {
        Authorization: useRuntimeConfig().public.API_KEY,
      },
    }
  );
  return response.data;
};
