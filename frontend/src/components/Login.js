import Auth from "./Auth";

function Login(props) {

  function handleSubmit(email, password) {
    props.handleLogin(email, password)
  }

  return (
    <Auth
      title="Вход"
      onSubmit={handleSubmit}
      btnText="Войти"
    />
  );
};

export default Login;