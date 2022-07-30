import { useSelector } from "react-redux";
import MainBar from "../component/mainBar";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';





function MainPage() {

  let navigate = useNavigate();

  let [userName, setUserName] = useState('')


  // 리덕스 새로고침시 state 정보 날아가는 문제! 
  // 목적1. 리덕스에 데이터 저장 
  // 이유 :  사용자가 수정, 삭제, 등록 등의 기능을 원할 때 사용자 정보를 서버에 넘겨줄 필요가 있어서 
  // 목적2. 화면 첫 렌더링에서 사용자 정보(=이름)을 보여주고 싶음. 
  // 목적2를 이루기 위해서는 첫 렌더링에 사용자 정보를 바로 보여주기 힘들었음. 
  // useEffect로 첫 렌더링 이후에 사용자 정보에 대한 데이터를 받아오기 때문 
  // 그래서 useState를 써서 첫 렌더링 이후 useEffect의 결과로 값이 바뀌는 순간 바로 적용이 되게끔 
  // useState의 특징 : 값이 바뀌는 순간 바로 렌더링 해줌 
  // 그냥 변수 ( let or const )를 사용하면 값이 바뀌어도 렌더링이 안됨. 


  useEffect(()=>{
    async function getUserInfo(){
      
      const session = await axios.post('/session')
      
      let $nickname = session.data.attendanceUser.nickname;
      // let $accountId = session.data.attendanceUser.accountId;

      if(session.data.success === 'ok') {

        setUserName($nickname)

        return navigate('/main')

      } 
      // if(session.data.success === 'ok') 가 false면 로그인 페이지로 
      return navigate('/')
    }
    getUserInfo()
  },[])

  return(


    <>
      <MainBar/>
      <div className="main-top">
        <div>
          <div className="greeting">Well Begun is</div>
          <div className="greeting2">Half Done !</div>
        </div>
      </div>
      <p className="userHi"> {userName} 님, 반가워요!! </p>
      <div className="main-bottom">


      </div>
      
    </>
  
  
  )

};

export default MainPage;