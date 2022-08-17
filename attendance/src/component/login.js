import MainLogo from "../component/mianLogo";


function Login(){
  
  const serverUrl = 'http://3.36.247.2'
  // const serverUrl = 'http://localhost:3000'

  
  return(
    <>
      <div className="login-page">
          <div className="login-logo">
            <MainLogo/>
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
            {/* <div className="shadow"
              onClick={()=>{
                window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=683a25bcc3f527d02f9db7c483c99196&redirect_uri=${serverUrl}/oauth/kakao/callback&response_type=code`}}>
            </div> */}
          </div>
        </div>
        
    </>
  )
}

export default Login;