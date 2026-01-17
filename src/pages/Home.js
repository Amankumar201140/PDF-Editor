import React from 'react'
import TextArea from "./TextArea";

function Home({isLoggedIn}) {
  return (
    // insted of flex-1 we can use h-full 
    <div className="flex items-center justify-center flex-1 text-3xl text-white" >
       <TextArea />
    </div>
  );
}

export default Home;
