const FormInput = ({label, onChange, value}) => (
  <div>
    {label} <input onChange={onChange} value={value}/>
  </div>
)

export default FormInput;