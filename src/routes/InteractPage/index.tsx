import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// import styles from './style.module.css';

export const InteractPage: React.FC = () => {
   const [tableau, setTableau] = useState({
      document: { elaboration: { synopsis: '' } },
   });
   const dudmmyObj = { name: 'Justin' };

   const fetchData = () => {
      // need try-catch
      fetch('http://localhost:8000/api/tableau/BH')
         .then((res) => res.json())
         .then((jsObj) => setTableau(jsObj));
   };

   return (
      <>
         <div> Hello from INTERACTING page</div>
         <div onClick={() => fetchData()}>click to fetch data</div>
         <div>{tableau && tableau.document.elaboration.synopsis}</div>
         <nav>
            <Link to="/">back to HOME page</Link>
         </nav>
      </>
   );
};
