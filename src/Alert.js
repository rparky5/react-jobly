export default function Alert({ message, alertClass }) {
  return (
    <div className={`alert alert-${alertClass}`} role="alert">
      {message}
    </div>
  );
}
