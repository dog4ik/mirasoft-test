import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "./sagaApi/root";
import postsReducer from "./slices/postsSlice";
import userReducer from "./slices/userSlice";
import commentsReducer from "./slices/commentsSlice";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";

const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
    comments: commentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
