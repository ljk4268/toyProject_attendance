import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userDate }from '../redux/feature/user'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Kakao(){
  let navigate = useNavigate();
  let dispatch = useDispatch();
  // 실제 서버
  // const serverUrl = 'https://www.studywithme.p-e.kr';
  // 테스트용 서버
  const serverUrl = process.env.REACT_APP_HOME_URL;
  // 개발서버
  // const serverUrl = 'http://localhost:3000';

  useEffect(()=>{
    async function kakaoToken(){
    let params = new URL(window.location.href).searchParams;
    let code = params.get("code");
    let grant_type = "authorization_code";
    let client_id = "683a25bcc3f527d02f9db7c483c99196";

    const data = await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${serverUrl}/oauth/kakao/callback&code=${code}`
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

    const loginData = await axios.post(process.env.REACT_APP_API_ROOT + '/sign-in', {
      "email": _email,
      "isAutoLogin": false,
      "kakaoId": _kakaoId,
      "nickname" : _nickname
    },)

    const session = await axios.post(process.env.REACT_APP_API_ROOT + '/session')

    if(session.data.success === 'ok') {
      dispatch(userDate({
        kakaoId: _kakaoId, 
        nickname: _nickname, 
        email: _email,
        adminStatus: session.data.attendanceUser.adminStatus
      }))
      
      return navigate('/main')

    }
    
  }
  kakaoToken()
    
  }, [])

  return(
      <div className="loding">
        <Box>
            <CircularProgress className='circularprogress' size='10vw'/>
        </Box>
      </div>

  )
}

export default Kakao;