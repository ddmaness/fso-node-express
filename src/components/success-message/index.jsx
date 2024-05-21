import './index.css'

export default function SuccessMessage({message}) {
  if (!message) {
    return null
  }
  return (
    <span className="success-message">{message}</span>
  )
}