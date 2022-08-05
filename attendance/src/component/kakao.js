import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userDate }from '../redux/feature/user'
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

function Kakao(){
  let navigate = useNavigate();
  let dispatch = useDispatch();

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

      dispatch(userDate({kakaoId: _kakaoId, nickname: _nickname, email: _email}))

      return navigate('/main')

    }
    
  }
  kakaoToken()
    
  }, [])

  return(

    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
      <CircularProgress color="secondary" />
      <CircularProgress color="success" />
      <CircularProgress color="inherit" />
    </Stack>

  )
}

export default Kakao;