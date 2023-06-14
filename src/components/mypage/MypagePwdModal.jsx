import { useState } from 'react';
import styled from 'styled-components';
import NicknameX from '../../assets/nicknameX.png';
import api from '../../api/axios';

const MypagePwdModal = ({ onAccess }) => {
  const [pwdInput, setPwdInput] = useState('');
  const [pwdSameInput, setPwdSameInput] = useState('');
  const [pwdCheck, setPwdCheck] = useState(true);
  const [pwdSameCheck, setPwdSameCheck] = useState(false);
  const [pwdSameHelper, setPwdSameHelper] = useState(true);
  const pwdOnChange = e => {
    const { value } = e.target;
    const passwordRegExp = /^(?=.*[A-Za-z])(?=.*[0-9]).{8,15}$/;
    setPwdInput(value);
    if (!passwordRegExp.test(value)) {
      setPwdCheck(false);
    } else {
      setPwdCheck(true);
    }
  };
  const pwdSameOnChange = e => {
    const { value } = e.target;
    setPwdSameInput(value);
    setPwdSameHelper(true);
  };

  const editPasswordHandle = async () => {
    if (pwdInput === pwdSameInput) {
      setPwdSameCheck(true);
    } else {
      setPwdSameCheck(false);
    }
    if (pwdSameCheck === false) {
      setPwdSameHelper(false);
      return;
    }
    try {
      await api.post('/user/change/password', { newPassword: pwdInput });
    } catch (error) {
      console.log(error);
    }
    onAccess(false);
  };
  return (
    <NickNameModalWrapDiv>
      <NicknameUpdataDiv>
        <NicknameTitleP>비밀번호 변경</NicknameTitleP>
        <NicknameXDiv onClick={() => onAccess(true)} />
        <NicknameInputWrapDiv>
          <PasswordInputBox>
            <p>비밀번호</p>
            <NicknameInput
              placeholder="변경하실 비밀번호를 입력해주세요"
              name="password"
              value={pwdInput}
              onChange={pwdOnChange}
              type="password"
            />
          </PasswordInputBox>
          <HelperTextP>
            {!pwdCheck && '영어(대소문자 구분), 숫자로 8~15자로 입력해주세요'}
          </HelperTextP>
          <PasswordInputBox>
            <p>비밀번호 확인</p>
            <NicknameInput
              value={pwdSameInput}
              placeholder="다시 한번 입력해주세요"
              type="password"
              onChange={pwdSameOnChange}
            />
          </PasswordInputBox>
          <HelperTextP>
            {!pwdSameHelper && '비밀번호가 일치하지 않습니다'}
          </HelperTextP>
        </NicknameInputWrapDiv>

        <NicknameButton onClick={editPasswordHandle}>
          회원정보 수정하기
        </NicknameButton>
      </NicknameUpdataDiv>
    </NickNameModalWrapDiv>
  );
};

export default MypagePwdModal;

const NickNameModalWrapDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;
const NicknameUpdataDiv = styled.div`
  width: 560px;
  height: 305px;
  background: #ffffff;
  border-radius: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const NicknameTitleP = styled.p`
  font-weight: 800;
  font-size: 18px;
  line-height: 34px;
  margin-bottom: 25px;
`;

const NicknameXDiv = styled.div`
  width: 18px;
  height: 18px;
  background-image: url(${NicknameX});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 17px;
  right: 21px;
`;

const NicknameInputWrapDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 25px; */
`;

const NicknameInput = styled.input`
  background: #ededed;
  border-radius: 10px;
  width: 265px;
  height: 34px;
  background: #ffffff;
  border: 1.5px solid #d9d9d9;
  border-radius: 5px;
  outline: none;
  text-indent: 10px;
`;

const NicknameButton = styled.button`
  margin-top: 19px;
  background: #fa5938;
  border-radius: 32px;
  width: 380px;
  height: 40px;
  border: none;
  cursor: pointer;

  color: #ffffff;
  font-weight: 900;
  font-size: 15px;
  line-height: 34px;
  &:hover {
    box-shadow: 3px 3px 2px rgba(175, 174, 183, 0.5);
  }
`;

const HelperTextP = styled.p`
  color: #fa5938;
  font-size: 13px;
  margin-left: 80px;
`;

const PasswordInputBox = styled.div`
  width: 357px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  margin-top: 8px;

  font-weight: 600;
  font-size: 13px;
  line-height: 34px;
`;
