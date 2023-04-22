import { useState, useEffect } from 'react';

import { copy, linkIcon, loader, tick } from '../assets'

const Demo = () => {
  return (
    <section className="mt-16 w-full max-w-xl">
        <div className="flex flex-col w-full gap-2">
            <form 
                className="relative flex justify-center items-center"
                onSubmit={() => {}}
            >
                <img 
                    src={linkIcon} 
                    alt="" 
                    className="absolute my-2 left-0 ml-3 w-5" 
                />

                {/*To style an element based on the state of a cyclic element, the sibling element can be marked with a peer class(in tailwind), and then modifiers can be used */}
                <input 
                    type="text" 
                    className="url_input peer" 
                    placeholder="Enter a URL"
                    value=""
                    onChange={() => {}}
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
