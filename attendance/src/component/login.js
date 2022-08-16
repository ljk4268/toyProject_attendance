function Login(){
  
  const serverUrl = 'http://3.36.247.2'
  // const serverUrl = 'http://localhost:3000'

  
  return(
    <div className="loginImg">
      <img src={process.env.PUBLIC_URL + '/kakao_login.png'} 
      className="kakao-login"/>
      <div className="shadow"
        onClick={()=>{
          window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=683a25bcc3f527d02f9db7c483c99196&redirect_uri=${serverUrl}/oauth/kakao/callback&response_type=code`}}>
      </div>
    </div>
    
    
  )
}

export default Login;