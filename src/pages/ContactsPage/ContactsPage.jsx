import ContactList from "../../components/ContactList/ContactList";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import Loader from "../../components/Loader/Loader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contacts/operations";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import {
  selectContacts,
  selectError,
  selectLoading,
} from "../../redux/contacts/selectors";
import css from "./ContactsPage.module.css";

export default function ContactsPage() {
  const contacts = useSelector(selectContacts) || [];
  const loader = useSelector(selectLoading) || false;
  const error = useSelector(selectError) || null;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      {/* <h2>My ContactBook</h2> */}
      <DocumentTitle>My ContactsBook</DocumentTitle>
      <ContactForm />
      <SearchBox />
      {loader && <Loader />}
      {contacts.length > 0 && <ContactList contacts={contacts} />}
      {error && <b>Unknown error. Try to reload the page.</b>}
    </div>
  );
}
