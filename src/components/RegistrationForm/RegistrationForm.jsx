import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import css from "../ContactForm/ContactForm.module.css";
import { register } from "../../redux/auth/operations";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label htmlFor={nameId} className={css.label}>
          Name
        </label>
        <Field name="name" id={nameId} type="text" className={css.input} />
        <ErrorMessage name="name" component="span" className={css.error} />

        <label htmlFor={emailId} className={css.label}>
          Email
        </label>
        <Field name="email" id={emailId} type="email" className={css.input} />
        <ErrorMessage name="email" component="span" className={css.error} />

        <label htmlFor={passwordId} className={css.label}>
          Password
        </label>
        <Field
          name="password"
          id={passwordId}
          type="password"
          className={css.input}
        />
        <ErrorMessage name="password" component="span" className={css.error} />

        <button className={css.button} type="submit">
          Register
        </button>
      </Form>
    </Formik>
  );
}
