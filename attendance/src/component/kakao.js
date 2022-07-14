import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Kakao(){
  let navigate = useNavigate();

  useEffect(()=>{
    async function kakaoToken(){
    let params = new URL(window.location.href).searchParams;
    let code = params.get("code");
    let grant_type = "authorization_code";
    let client_id = "683a25bcc3f527d02f9db7c483c99196";

    const data = await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=http://localhost:3000/oauth/kakao/callback&code=${code}`
        ,{
    headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    });
    
    window.Kakao.init(client_id);
    window.Kakao.Auth.setAccessToken(data.data.access_token);

    
    let userData = await window.Kakao.API.request({
      url: "/v2/user/me"
    })
    
    let _email = userData.kakao_account.email;
    let _kakaoId = userData.id;
    let _nickname = userData.properties.nickname;

    const loginData = await axios.post('/sign-in', {
      "email": _email,
      "isAutoLogin": false,
      "kakaoId": _kakaoId,
      "nickname" : _nickname
    },)

    const session = await axios.post('/session')

    if(session.data.success === 'ok') {
      return navigate('/main')
    }
    
  }
  kakaoToken()
    
  }, [])

  return(

    <div>
      로그인 중 입니다. 
    </div>

  )
}

export default Kakao;