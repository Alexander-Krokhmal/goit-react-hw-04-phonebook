import propTypes from 'prop-types';
import { ContactListItem } from './ContactListItem';
// import css from './ContactList.module.css';

export const ContactList = ({ items, deleteContactProps }) => {
  return (
    <ContactListItem
      items={items}
      deleteContactProps={deleteContactProps}>
      
    </ContactListItem>
    
  );
};

ContactList.propTypes = {
  deleteContactProps: propTypes.func.isRequired,
  items: propTypes.array.isRequired,
}