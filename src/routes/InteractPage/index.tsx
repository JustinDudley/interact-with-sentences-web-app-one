import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Tableau } from '../../models/Tableau';
import { GetTableau } from './GetTableau';

// import styles from './style.module.css';

export const InteractPage: React.FC = () => {
   const [tableau, setTableau] = useState<Tableau | null>(null);
   const [letterPair, setLetterPair] = useState('AB');

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

   return (
      <div style={{ padding: '15px' }}>
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
