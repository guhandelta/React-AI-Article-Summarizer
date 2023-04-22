import { configureStore } from "@reduxjs/toolkit";

import { articleApi } from './article'


export const store = configureStore({
    reducer:{
        // atricleApi is added as a slice here to get something from that API
        [articleApi.reducerPath]: articleApi.reducer
    },
    
    /*getDefaultMiddleware is useful if you want to add some custom middleware, but also still want to have the default middleware added as well */
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(articleApi.middleware)
    /*It is preferable to use the chainable .concat(...) and .prepend(...) methods of the returned MiddlewareArray instead of the array spread operator, as the latter can lose valuable type information under some circumstances. */
});