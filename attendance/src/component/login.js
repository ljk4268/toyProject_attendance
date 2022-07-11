import Button from '@mui/material/Button';
import axios from 'axios';


function Login(props){
  return(
    <img src={process.env.PUBLIC_URL + '/kakao_login.png'} 
    className="kakao-login"
    onClick={()=>{
        window.location.href = 'https://kauth.kakao.com/oauth/authorize?client_id=683a25bcc3f527d02f9db7c483c99196&redirect_uri=http://3.36.247.2/app/kakao/oauth&response_type=code'
        console.log('모지')
        axios.get('http://3.36.247.2/app/kakao/oauth')
        .then((data)=>{ console.log(data) })
      
      }}
        
    />
    
    // props.setMode('Calendar')
    
  )
}

export default Login;