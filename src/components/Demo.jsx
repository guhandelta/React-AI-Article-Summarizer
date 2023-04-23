import { useState, useEffect } from 'react';

import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {

    const [article, setArticle] = useState({
        url: "",
        summary: ""
    });

    /* fn() to fetch the summary on btn click, check error and fetching state */
    const [ getSummary, { error, isFetching } ] = useLazyGetSummaryQuery();

    const handleSubmit = async (e) => {
        // preventDefault is called on the event when submitting the form to prevent a browser reload/refresh
        e.preventDefault();

        const { data } = await getSummary({ articleUrl: article.url });

        //If the response has a summary
        if(data?.summary){
            const newArticle = { ...article, summary: data.summary };

            setArticle(newArticle);
            console.log(newArticle);
        }else{
            console.log("Something's not right!!");
        }

        if(error){
            console.log("Error:\t", error);
        }
    }

  return (
    <section className="mt-16 w-full max-w-xl">
        <div className="flex flex-col w-full gap-2">
            <form 
                className="relative flex justify-center items-center"
                onSubmit={handleSubmit}
            >
                <img 
                    src={linkIcon} 
                    alt="link_icon" 
                    className="absolute my-2 left-0 ml-3 w-5" 
                />

                {/*To style an element based on the state of a cyclic element, the sibling element can be marked with a peer class(in tailwind), and then modifiers can be used */}
                <input 
                    type="text" 
                    className="url_input peer" 
                    placeholder="Enter a URL"
                    value={article.url}
                    onChange={e => {setArticle({...article, url: e.target.value})}}
                    required
                />
                
                {/* peer-focus:border-gray-700 peer-focus:text-gray-700
                    The button would also be focussed as well, when the text box(i.e. sibling element) is focussed
                */}
                <button 
                    type="submit"
                    className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
                >
                    ↵
                </button>
            </form>
            {/*Browse URL History*/}
        </div>
        {/*Results of the Summarize operation*/}
    </section>
  )
}

export default Demo
