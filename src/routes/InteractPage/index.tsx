import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// import styles from './style.module.css';

export const InteractPage: React.FC = () => {
   const [tableau, setTableau] = useState({
      document: { elaboration: { synopsis: '' } },
   });

   useEffect(() => {
      // need try-catch
      fetch('http://localhost:8000/api/tableau/BJ')
         .then((res) => res.json())
         .then((jsObj) => setTableau(jsObj));
   });

   return (
      <>
         <div> Hello from INTERACTING page</div>
         <div>{tableau && tableau.document.elaboration.synopsis}</div>
         <nav>
            <Link to="/">back to HOME page</Link>
         </nav>
      </>
   );
};
