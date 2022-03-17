import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as yup from 'yup';
import { Tableau } from '../../models/Tableau';

// import styles from './style.module.css';

export const InteractPage: React.FC = () => {
   const [tableau, setTableau] = useState<Tableau | null>(null);
   const [letterPair, setLetterPair] = useState('AB');

   const fetchTableau = (letterPair: string) => {
      // need try-catch?
      fetch(`http://localhost:8000/api/tableau/${letterPair}`)
         .then((res) => res.json())
         .then((tableau) => setTableau(tableau));
   };

   const yupSchemaValidator = yup.object().shape({
      letterPair: yup
         .string()
         .required('letter pair must be exactly 2 letters long')
         .length(2, 'letter pair must be exactly 2 letters long'),
   });

   const formik = useFormik({
      initialValues: { letterPair: letterPair },
      validationSchema: yupSchemaValidator,
      onSubmit: (value) => {
         const letterPairUpper = value.letterPair.toUpperCase();
         setLetterPair(letterPairUpper);
         fetchTableau(letterPairUpper);
      },
   });

   useEffect(() => {
      fetchTableau('AB');
   }, []);

   return (
      <div style={{ padding: '15px' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div> INTERACT page</div>
            <nav>
               <Link to="/">back to HOME page</Link>
            </nav>
         </div>
         <form
            onSubmit={formik.handleSubmit}
            style={{ padding: '40px 0 20px' }}
         >
            <div>
               <span>current letter-pair: </span>
               <span style={{ color: 'green', fontWeight: 'bold' }}>
                  {letterPair}
               </span>
            </div>
            <label htmlFor="letterPair">Enter a new letter-pair: </label>
            <input
               id="letterPair"
               name="letterPair"
               type="text"
               onChange={formik.handleChange}
               value={formik.values.letterPair.toUpperCase()}
               style={{ width: '50px', color: 'green', fontWeight: 'bold' }}
            />
            <button type="submit">Submit</button>
            <div style={{ height: '1.5rem', color: 'red', fontSize: '0.8rem' }}>
               {formik.errors.letterPair}
            </div>
         </form>
         <div style={{ border: '1px solid purple', padding: '10px' }}>
            {/* first conditional allows program to compile, and MAYBE keeps app from breaking if no response from BE: */}
            {tableau &&
               // second conditionals keeps app from breaking if no response from BE:
               tableau.document && (
                  <div>
                     <div style={{ marginBottom: '10px' }}>
                        <span style={{ fontWeight: 'bold' }}>
                           letter-pair:{' '}
                        </span>
                        <span>{tableau.document.letter_pair}</span>
                     </div>
                     <div style={{ marginBottom: '10px' }}>
                        <span style={{ fontWeight: 'bold' }}>
                           starter-sentence:{' '}
                        </span>
                        <span>{tableau.document.starter_sentence}</span>
                     </div>
                     <div style={{ marginBottom: '10px' }}>
                        <span style={{ fontWeight: 'bold' }}>synopsis: </span>
                        <span>{tableau.document.elaboration.synopsis}</span>
                     </div>{' '}
                     <div style={{ marginBottom: '10px' }}>
                        <span style={{ fontWeight: 'bold' }}>backstory: </span>
                        <span>
                           {tableau.document.elaboration.backstory.story}
                        </span>
                     </div>
                  </div>
               )}
         </div>
      </div>
   );
};
