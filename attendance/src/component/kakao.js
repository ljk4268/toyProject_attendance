import axios from 'axios';
import { useEffect } from 'react';

function Kakao(){
  
  const href = window.location.href;
  let url = new URL(href);
  let urlParams = url.searchParams;
  let code = urlParams.get('code');
  console.log(code)

  
    try{
      axios.get(`http://3.36.247.2/app/kakao/oauth?code=${code}`)
      .then((reponse)=>{console.log(reponse)})
    } catch(error){
      console.error(error);
    }
  

  return(

    <h1>안녕하세요</h1>
  )
}

export default Kakao;