import {useCallback, useEffect, useRef, useState} from 'react'
import './App.css';


function App() {
  const[lenght,setlength] = useState(8);
  const[charAllowed,setcharAllowed]=useState(false)
  const[numberAllowed,setnumberAllowed]=useState(false)
  const[password,setpassword]=useState("")
  const passwordgenerator = useCallback(()=>{
    let pass=""
    let str="ASDFGHJKLQWERTYUIOPZXCVBNMasdfghjklqwertyuiopzxcvbnm"
    if(numberAllowed) str +="1234567890"
    if(charAllowed) str+="~`!@#$%^&*{}[]-_"
    for(let i=1;i<=lenght;i++){
        let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
    }
    setpassword(pass)
  
  },
  [lenght,charAllowed,numberAllowed,setpassword])
  useEffect(()=>{
    passwordgenerator();
  },
  
  [lenght,charAllowed,numberAllowed,passwordgenerator])
  let refitem = useRef(null);
   let refclipbordfun = useCallback(()=>{
      window.navigator.clipboard.writeText(password);
      refitem.current?.select()
   },[password])
  return (
    <div className="container">
      <div  className='pass-con'>
      <h1>Passwaord generator</h1>
        <div className='main-text'>
        <input className="input-text" type='text'
         value={password}
         placeholder='password'
         readonly
         ref={refitem}
         >
          
        </input>
        <button onClick={refclipbordfun}>copy</button>
        </div>
        
       <div className='flex-contain'>
          <input
           type="range"
           min={6}
           max={100}
           value={lenght}
           onChange={(e)=> setlength(e.target.value)}
          >
          </input>
          <lable>{lenght}</lable>
          <lable>AllowedNumber</lable>
          <input
           type="checkbox"
           readOnly
           defaultChecked={numberAllowed}
           onChange={()=>{
            setnumberAllowed((prev)=>!prev)
           }}
           
          >
          </input>
          <lable>AllowedCharacter</lable>
          <input
           type="checkbox"
           readOnly
           defaultChecked={charAllowed}
           onChange={()=>{
            setcharAllowed((prev)=>!prev)
           }}
          >
          </input>
          
       </div>
      </div>    
    </div>
  );
}

export default App;
