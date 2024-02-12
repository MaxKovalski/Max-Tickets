export default function SignUpForm({ handleSubmit }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="first" />
        <label>Last Name:</label>
        <input type="text" name="last" />
        <label>Email:</label>
        <input type="text" name="email" />
        <label>Password:</label>
        <input type="text" name="password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
