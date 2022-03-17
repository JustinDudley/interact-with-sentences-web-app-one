import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as yup from 'yup';

// import styles from './style.module.css';

export const InteractPage: React.FC = () => {
   const [tableau, setTableau] = useState({
      document: { elaboration: { synopsis: '' } },
   });
   const [letterPair, setLetterPair] = useState('AB');

   const yupSchemaValidator = yup.object().shape({
      letterPair: yup
         .string()
         .required('letter pair must be exactly 2 letters long')
         .length(2, 'letter pair must be exactly 2 letters long'),
   });

   const formik = useFormik({
      initialValues: { letterPair: 'AB' },
      validationSchema: yupSchemaValidator,
      onSubmit: (value) => {
         const pairUpper = value.letterPair.toUpperCase();
         setLetterPair(pairUpper);
         fetch(`http://localhost:8000/api/tableau/${pairUpper}`)
            .then((res) => res.json())
            .then((jsObj) => setTableau(jsObj));
      },
   });

   useEffect(() => {
      // need try-catch
      fetch(`http://localhost:8000/api/tableau/AB`)
         .then((res) => res.json())
         .then((jsObj) => setTableau(jsObj));
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
            {formik.errors.letterPair && <div>{formik.errors.letterPair}</div>}
         </form>
         <div>{tableau && tableau.document.elaboration.synopsis}</div>
      </div>
   );
};
