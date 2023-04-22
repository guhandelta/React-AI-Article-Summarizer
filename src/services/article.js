import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const RAPID_API_KEY = import.meta.env.RAPID_API_ARTICLE_KEY;
const RAPID_API_URL = import.meta.env.RAPID_API_ARTICLE_URL;

const options = {
    method: 'GET',
    url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
    params: {url: 'https://time.com/6266679/musk-ai-open-letter/', length: '3'},
    headers: {
      'X-RapidAPI-Key': '13e2810994msh948dfb418dee1e4p1ef656jsn70c2441337be',
      'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
    }
  };

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', RAPID_API_KEY);
            headers.set('X-RapidAPI-Host', RAPID_API_URL);

            return headers;
        }
    }),
     /* Endpoints = A fn(), where a builder is available as the 1st param, which is fn() that returns an obj, within which the names of the-
    enpoints can be mentioned/specified */
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => `test`
        })
    })
})