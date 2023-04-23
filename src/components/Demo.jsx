import { useState, useEffect } from 'react';

import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {

    const [article, setArticle] = useState({
        url: "",
        summary: ""
    });
    const [allArticles, setAllArticles] = useState([]);

    /* fn() to fetch the summary on btn click, check error and fetching state */
    const [ getSummary, { error, isFetching } ] = useLazyGetSummaryQuery();

    useEffect(()=>{
        // Fetching the articles from the local storage
        const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'));

        if(articlesFromLocalStorage){
            setAllArticles(articlesFromLocalStorage);
        }
    },[]);

    allArticles.map(a => console.log("url:\t", a.url));

    const handleSubmit = async (e) => {
        // preventDefault is called on the event when submitting the form to prevent a browser reload/refresh
        e.preventDefault();

        const { data } = await getSummary({ articleUrl: article.url });

        //If the response has a summary
        if(data?.summary){
            const newArticle = { ...article, summary: data.summary };
            const updatedAllArticles = [newArticle, ...allArticles]

            setArticle(newArticle);
            
            // Pushing the newArticle into the array of articles 
            setAllArticles(updatedAllArticles);

            /* Storing the updated list of articles in the local storage
            JSON.stringify() => Local storage can contain only strings*/
            localStorage.setItem('articles', JSON.stringify(updatedAllArticles));

            
        }else{
            console.log("Something's not right!!");
            if(error || data.error){
                console.log("Error:\t", error);
            }
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
            <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                {allArticles.map((item, index) =>(
                    <div 
                        key={`link-${index}`}
                        onClick={() => setArticle(item)}
                        className="link_card"
                    >
                        <div className="copy_btn">
                            <img
                                src={copy}
                                alt="copy_icon"
                                className="w-[40%] h-[40%] object-contain" 
                            />
                        </div>
                        <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                            {item.url}
                        </p>
                    </div>
                ))}
            </div>
        </div>
        {/*Results of the Summarize operation*/}
        <div className="my-10 max-w-full flex justify-center items-center">
            {isFetching ? (
                <img 
                    src={loader} 
                    alt="loader" 
                    className="w-20 h-20 object-contain" 
                />
            ) : error ? (
                <p className="font-inter font-bold text-center text-black">
                    Well, that wasn`&apos;`t supposed to happen..... 🤔
                    <br />
                    <span className="font-satoshi font-normal text-gray-700">
                        {error?.data?.error}
                    </span>
                </p>
            ) : (
                article.summary && (
                    <div className="flex flex-col gap-3">
                        <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                            Article <span className="blue_gradient">Summary</span>
                        </h2>
                        <div className="summary_box">
                            <p className="font-inter font-medium text-sm text-gray-700">
                                {article.summary}
                            </p>
                        </div>
                    </div>
                )
            )}
        </div>
    </section>
  )
}

export default Demo
