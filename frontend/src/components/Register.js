import Auth from './Auth';
import { Link } from 'react-router-dom';

function Register(props) {

  function handleSubmit(email, password) {
    props.handleRegister(email, password)
  }

  return(
    <Auth
      title="Регистрация"
      btnText="Зарегистрироваться"
      onSubmit={handleSubmit}
    >
      <span className="entrance__welcom-phrase">Уже зарегистрированы?
        <Link to="/sign-in" className="entrance__welcom-phrase-link">Войти</Link>
      </span>
    </Auth>
  );
};

export default Register;