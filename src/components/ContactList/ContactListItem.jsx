import propTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactListItem = ({ items, deleteContactProps }) => {
    return (
        <ul className={css.contacts_list}>
        {items.map(({name, number, id}) => (
          <li  className={css.contact_item} key={id}>
            <span className={css.status}></span>
            <span>
              {' '}
              {name}: {number}
            </span>
            <button className={css.btn} onClick={() => deleteContactProps(id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    )
}

ContactListItem.propTypes = {
    deleteContactProps: propTypes.func.isRequired,
    items: propTypes.array.isRequired,
  }