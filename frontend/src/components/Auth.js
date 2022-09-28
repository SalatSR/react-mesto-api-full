import { useState } from 'react';

function Auth(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /** следим за состоянием input email */
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  /** следим за состоянием input password */
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  /** отправляем данные и обнуляем оба input */
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(email, password);
    setEmail('');
    setPassword('');
  }

  return (
    <main className="content">
      <section className="entrance">
        <h2 className="entrance__title">{props.title}</h2>
        <form
          className="entrance__form"
          onSubmit={handleSubmit}
        >
          <input
            name="email"
            id="email"
            type="email"
            minLength="5"
            className="entrance__input entrance__input_type_email"
            placeholder="Email"
            required
            value={email}
            onChange={handleEmail}
            autoComplete="off"
          />
          <input
            name="password"
            id="password"
            type="password"
            minLength="6"
            className="entrance__input entrance__input_type_password"
            placeholder="Пароль"
            required
            value={password}
            onChange={handlePassword}
            autoComplete="off"
          />
          <button className="entrance__submit-button" type="submit">{props.btnText}</button>
        </form>
        {props.children}
      </section>
    </main>
  )
}

export default Auth;