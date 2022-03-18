import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { GetTableauProps } from '../../../models/GetTableau';
import styles from './style.module.css';

export const GetTableau: React.FC<GetTableauProps> = ({
   tableau,
   setTableau,
   letterPair,
   setLetterPair,
}) => {
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
      <>
         <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div>
               <span>current letter-pair: </span>
               <span className={styles.showLetterPair}>{letterPair}</span>
            </div>
            <label htmlFor="letterPair">Enter a new letter-pair: </label>
            <input
               id="letterPair"
               name="letterPair"
               type="text"
               onChange={formik.handleChange}
               value={formik.values.letterPair.toUpperCase()}
               className={styles.input}
            />
            <button type="submit">Submit</button>
            <div className={styles.error}>{formik.errors.letterPair}</div>
         </form>
         <div className={styles.displayTableau}>
            {/* first conditional allows program to compile, and MAYBE keeps app from breaking if no response from BE: */}
            {tableau &&
               // second conditionals keeps app from breaking if no response from BE:
               tableau.document && (
                  <div>
                     <div className={styles.tableauItem}>
                        <span>letter-pair: </span>
                        <span className={styles.tableauItemFont}>
                           {tableau.document.letter_pair}
                        </span>
                     </div>
                     <div className={styles.tableauItem}>
                        <span>starter-sentence: </span>
                        <span className={styles.tableauItemFont}>
                           {tableau.document.starter_sentence}
                        </span>
                     </div>
                     <div className={styles.tableauItem}>
                        <span>synopsis: </span>
                        <span className={styles.tableauItemFont}>
                           {tableau.document.elaboration.synopsis}
                        </span>
                     </div>
                     <div className={styles.tableauItem}>
                        <span>backstory: </span>
                        <span className={styles.tableauItemFont}>
                           {tableau.document.elaboration.backstory.story}
                        </span>
                     </div>
                  </div>
               )}
         </div>
      </>
   );
};
