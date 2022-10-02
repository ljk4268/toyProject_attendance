import { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";



function Login(){
  
  // 실제 서버
  // const serverUrl = 'https://www.studywithme.p-e.kr';

  // 테스트용 서버
  const serverUrl = process.env.REACT_APP_HOME_URL;

  // 개발서버
  // const serverUrl = 'http://localhost:3000';

  const navigate = useNavigate();

  useEffect(()=>{
    async function getUserInfo(){
      const session = await axios.post(process.env.REACT_APP_API_ROOT + '/session')

      if(session.data.success !== 'ok') {
        return navigate('/')
      }
    }
    getUserInfo()
  },[])
  
  return(
    <>
      <div className="login-page">
        <div className="login-page-logo">
          <div className='login-page-logo-font'>
          {/* Well Begun is */}
          Study With Me
          </div>
          <div className='login-page-logo-font'>
            {/* Half Done ! */}
            
          </div>
        </div>
      <div className="login-line">
        간편 로그인하기
      </div>
      <div className="loginImg"
        onClick={()=>{
          window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=683a25bcc3f527d02f9db7c483c99196&redirect_uri=${serverUrl}/oauth/kakao/callback&response_type=code`}}
      >
        <img src={process.env.PUBLIC_URL + '/kakaotalk_logo_icon_147272.png'} 
        className="kakao-login"/>
        
      </div>
    </div>
        
    </>
  )
}

export default Login;