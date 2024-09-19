import Form from "../components/Form";
import "../styles/form.css";

function Login() {
  return <Form route="/api/token/" method="login" />;
}

export default Login;
