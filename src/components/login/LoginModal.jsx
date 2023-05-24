import { useState } from 'react';

const LoginModal = () => {
  const [inputValue, setInputValue] = useState({
    nickname: '',
    password: '',
  });
  const { nickname, password } = inputValue;
  const inputChange = e => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const submitLogin = () => {};

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '560px',
        height: '620px',
        margin: '0 auto',
        border: '1px solid black',
      }}
    >
      <input
        name="nickname"
        value={nickname}
        onChange={inputChange}
        type="text"
      />
      <input
        name="password"
        value={password}
        onChange={inputChange}
        type="password"
      />
      <button onClick={submitLogin} type="button">
        Login
      </button>
    </div>
  );
};

export default LoginModal;
