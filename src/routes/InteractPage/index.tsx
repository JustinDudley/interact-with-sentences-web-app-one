import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Tableau } from '../../models/Tableau';
import { GetTableau } from './GetTableau';
import { PostComments } from './PostComments';

import styles from './style.module.css';

// import styles from './style.module.css';

export const InteractPage: React.FC = () => {
   const [tableau, setTableau] = useState<Tableau | null>(null);
   const [letterPair, setLetterPair] = useState('AB');

   return (
      <div className={styles.interactPage}>
         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div> INTERACT page</div>
            <nav>
               <Link to="/">back to HOME page</Link>
            </nav>
         </div>
         <GetTableau
            tableau={tableau}
            setTableau={setTableau}
            letterPair={letterPair}
            setLetterPair={setLetterPair}
         />
         <PostComments letterPair={letterPair} />
      </div>
   );
};
