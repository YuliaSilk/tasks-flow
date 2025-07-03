import {lazy} from 'react';

// Lazy load modal components
export const BaseModal = lazy(() => import('./BaseModal'));
export const CreateBoardModal = lazy(() => import('./CreateBoardModal'));
export const CreateCardModal = lazy(() => import('./CreateCardModal'));
export const EditCardModal = lazy(() => import('./EditCardModal'));
export const DeleteDialog = lazy(() => import('./DeleteDialogBasic')); 