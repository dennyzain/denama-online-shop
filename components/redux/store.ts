import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import reducers from './reducers';
// ...

const store = configureStore({
  reducer: reducers,
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
