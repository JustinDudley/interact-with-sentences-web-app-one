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

   const postComment = (comment: string) => {
      // need error handling, need to inform user of post success or failure
      fetch(`http://localhost:8000/api/tableau/comment/${letterPair}`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ comment: comment }),
      })
         .then((res) => res.json())
         .then((resp) => {
            // should be 1
            alert(resp.mongoSuccessObj.modifiedCount);
         });
   };

   const yupSchemaValidator1 = yup.object().shape({
      letterPair: yup
         .string()
         .required('letter pair must be exactly 2 letters long')
         .length(2, 'letter pair must be exactly 2 letters long'),
   });

   const formik1 = useFormik({
      initialValues: { letterPair: letterPair },
      validationSchema: yupSchemaValidator1,
      onSubmit: (value) => {
         const letterPairUpper = value.letterPair.toUpperCase();
         setLetterPair(letterPairUpper);
         fetchTableau(letterPairUpper);
      },
   });

   const yupSchemaValidator2 = yup.object().shape({
      comment: yup.string().max(1500, 'Maximum character limit exceeded'),
   });

   const formik2 = useFormik({
      initialValues: { comment: '' },
      validationSchema: yupSchemaValidator2,
      onSubmit: (value, { resetForm }) => {
         postComment(value.comment);
         resetForm();
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
            onSubmit={formik1.handleSubmit}
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
               onChange={formik1.handleChange}
               value={formik1.values.letterPair.toUpperCase()}
               style={{ width: '50px', color: 'green', fontWeight: 'bold' }}
            />
            <button type="submit">Submit</button>
            <div style={{ height: '1.5rem', color: 'red', fontSize: '0.8rem' }}>
               {formik1.errors.letterPair}
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
         <div style={{ marginTop: '50px' }}>
            <form onSubmit={formik2.handleSubmit}>
               <div style={{ marginBottom: '20px' }}>
                  If you would like to comment on this sentence, or suggest a
                  new sentence, please write it in the box below. If you would
                  like, you can include your email or other identifying tag
                  within the comment
               </div>

               <label htmlFor="comment">{`Enter a comment for ${letterPair}  `}</label>
               <input
                  id="comment"
                  name="comment"
                  type="text"
                  onChange={formik2.handleChange}
                  value={formik2.values.comment}
                  style={{ width: '150px', color: 'blue', fontWeight: 'bold' }}
               />
               <button type="submit">Submit</button>
               <div
                  style={{ height: '1.5rem', color: 'red', fontSize: '0.8rem' }}
               >
                  {formik2.errors.comment}
               </div>
            </form>
         </div>
      </div>
   );
};
