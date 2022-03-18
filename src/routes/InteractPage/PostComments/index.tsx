import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import styles from './style.module.css';

export const PostComments: React.FC<{ letterPair: string }> = ({
   letterPair,
}) => {
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

   const yupSchemaValidator = yup.object().shape({
      comment: yup.string().max(1500, 'Maximum character limit exceeded'),
   });

   const formik = useFormik({
      initialValues: { comment: '' },
      validationSchema: yupSchemaValidator,
      onSubmit: (value, { resetForm }) => {
         postComment(value.comment);
         resetForm();
      },
   });

   return (
      <div className={styles.postComment}>
         <form onSubmit={formik.handleSubmit}>
            <div className={styles.instructions}>
               If you would like to comment on this sentence, or suggest a new
               sentence, please write it in the box below. If you would like,
               you can include your email or other identifying tag within the
               comment
            </div>

            <label htmlFor="comment">{`Enter a comment for ${letterPair}  `}</label>
            <input
               id="comment"
               name="comment"
               type="text"
               onChange={formik.handleChange}
               value={formik.values.comment}
               className={styles.input}
            />
            <button type="submit">Submit</button>
            <div className={styles.error}>{formik.errors.comment}</div>
         </form>
      </div>
   );
};
