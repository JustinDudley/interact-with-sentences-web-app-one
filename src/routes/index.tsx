import React from 'react';
import {
   BrowserRouter,
   Route,
   Routes as RouterDomRoutes,
} from 'react-router-dom';
import { HomePage } from './HomePage';
import { InteractPage } from './InteractPage';

export const Routes: React.FC = () => {
   return (
      <BrowserRouter>
         <RouterDomRoutes>
            <Route path="/" element={<HomePage />} />
            <Route path="interactPage" element={<InteractPage />} />
         </RouterDomRoutes>
      </BrowserRouter>
   );
};
