import Contact from "../contact";

const ContactList = ({persons, filter, onClick}) =>  {
  // check for partial or full name match (case insensitive)
  const checkNameMatch = (name) => name.toLowerCase().includes(filter)
  
  return (
    <>
      <h2>Contacts</h2>
      <ul>
        {persons
          .filter(({name}) => checkNameMatch(name))
          .map(({name, number, id}) => (
          <Contact key={id} name={name} number={number} identification={id} onClick={(id) => onClick(id)}></Contact>
        ))
        }
      </ul>
    </>
  )
}

export default ContactList;