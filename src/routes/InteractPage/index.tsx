import React from 'react';
import { Link } from 'react-router-dom';

// import styles from './style.module.css';

export const InteractPage: React.FC = () => {
   return (
      <>
         <div> Hello from INTERACTING page</div>
         <nav>
            <Link to="/">back to HOME page</Link>
         </nav>
      </>
   );
};
