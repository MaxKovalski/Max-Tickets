export default function LoginForm({ handleSubmit }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="text" name="email" />
        <label>Password:</label>
        <input type="text" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
