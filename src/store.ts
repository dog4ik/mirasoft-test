import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "./sagaApi/root";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";

const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
