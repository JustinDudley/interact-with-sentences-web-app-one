import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as yup from 'yup';

// import styles from './style.module.css';

export const InteractPage: React.FC = () => {
   const [tableau, setTableau] = useState({
      document: { elaboration: { synopsis: '' } },
   });
   const [letterPair, setLetterPair] = useState('');

   const yupSchemaValidator = yup.object().shape({
      letterPair: yup
         .string()
         .required()
         .length(2, 'letter pair must be exactly 2 letters long'),
   });

   const formik = useFormik({
      initialValues: { letterPair: '' },
      validationSchema: yupSchemaValidator,
      onSubmit: (value) => {
         setLetterPair(value.letterPair);
      },
   });

   useEffect(() => {
      // need try-catch
      fetch(`http://localhost:8000/api/tableau/${letterPair}`)
         .then((res) => res.json())
         .then((jsObj) => setTableau(jsObj));
   });

   return (
      <>
         <div> Hello from INTERACT page</div>
         <div>{tableau && tableau.document.elaboration.synopsis}</div>
         <nav>
            <Link to="/">back to HOME page</Link>
         </nav>
         <div> --- </div>
         <form onSubmit={formik.handleSubmit}>
            <label htmlFor="letterPair">your letter pair</label>
            <input
               id="letterPair"
               name="letterPair"
               type="text"
               onChange={formik.handleChange}
               value={formik.values.letterPair}
            />
         </form>
      </>
   );
};
