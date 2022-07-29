import MainBar from "../component/mainBar";


function MainPage() {

  let greeting = 'Well Begun is' + '\n' + 'Half Done'

  return(


    <>
      <MainBar/>
      <div className="main-top">
        <div className="line">
          <div className="greeting">Well Begun is</div>
          <div className="greeting2">Half Done !</div>
        </div>
      </div>
      
    </>
  
  
  )

};

export default MainPage;