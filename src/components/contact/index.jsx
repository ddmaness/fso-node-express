const Contact = ({name, number, identification, onClick}) => (
  <li key={name}>
    <span>{name}: {number}</span><button onClick={() => onClick(identification)}>delete</button>
  </li>
)

export default Contact;