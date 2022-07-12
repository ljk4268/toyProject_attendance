function Login(){
  

  return(
    <div className="loginImg">
      <img src={process.env.PUBLIC_URL + '/kakao_login.png'} 
      className="kakao-login"/>
        <div className="shadow"
          onClick={()=>{
            window.location.href = 'https://kauth.kakao.com/oauth/authorize?client_id=683a25bcc3f527d02f9db7c483c99196&redirect_uri=http://localhost:3000/auth/kakao/callback&response_type=code'}}>
        </div>
    </div>
    
    
  )
}

export default Login;