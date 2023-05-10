import { configureStore } from '@reduxjs/toolkit';
import {authApi} from "./services/AuthAPI";
import {itemApi} from "./services/ItemAPI";
import {tableApi} from "./services/TablesAPI";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [itemApi.reducerPath]: itemApi.reducer,
    [tableApi.reducerPath]: tableApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, itemApi.middleware, tableApi.middleware),
});
