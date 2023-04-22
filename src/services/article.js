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
            /*length => length of the paragraphs
            encodeURIComponent() => Encodes a text string as a valid component of a Uniform Resource Identifier (URI). It is best to wrap the URL with this fn() while passing user generated content, as the URI may contain any special characters, which may cause any errors.
            */
            query: (params) => 
            `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
        })
    })
})

/*
Redux Toolkit Query generates a hook useGetSummaryQuery, automatically, out of the endpoint

useGetSummaryQuery => would call this endpoint immediately(once the page/app loads) at the start
useLazyGetSummaryQuery => allows to fire teh hook on demand, post submit 
*/
export const { useLazyGetSummaryQuery } = articleApi;