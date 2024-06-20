import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import css from "../ContactForm/ContactForm.module.css";
import { useId } from "react";
import { logIn } from "../../redux/auth/operations";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export default function LoginForm() {
  const emailId = useId();
  const passwordId = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={LoginSchema}
    >
      <Form className={css.form}>
        <label name="email" htmlFor={emailId} className={css.label}>
          Email
        </label>
        <Field name="email" id={emailId} type="phone" className={css.input} />
        <ErrorMessage name="email" component="span" className={css.error} />
        <label name="password" htmlFor={passwordId} className={css.label}>
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
          Log In
        </button>
      </Form>
    </Formik>
  );
}
