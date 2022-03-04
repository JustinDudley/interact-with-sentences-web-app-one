import React from 'react';
import { Link } from 'react-router-dom';

// import styles from './style.module.css';

export const HomePage: React.FC = () => {
   return (
      <>
         <div>Welcome to INTERACT-WITH-SENTENCES-- WEB-APP-ONE !</div>
         <nav>
            <Link to="/interactPage">start interacting</Link>
         </nav>
      </>
   );
};
