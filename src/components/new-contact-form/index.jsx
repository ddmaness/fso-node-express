const NewContactForm = ({children, onSubmit}) => (
  <form onSubmit={onSubmit}>
    {children}
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default NewContactForm;