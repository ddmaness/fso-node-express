const SearchFilter = ({label, onChange, value}) => (
  <div>
    {label} <input type="text" onChange={onChange} value={value}/>
  </div>
)

export default SearchFilter;