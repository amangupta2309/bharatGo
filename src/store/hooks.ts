import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './userStore';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;