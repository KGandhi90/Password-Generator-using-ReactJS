import React, { useCallback, useEffect, useState, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [isNumber, setIsNumber] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(isNumber) str+= "0124356789"
    if(isChar) str+= "!@#$%^&*(){}[]`~-_+=|\\/?"

    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, isNumber, isChar, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 21)
    window.navigator.clipboard.writeText(password);
  }, [password, ])

  useEffect(() => {
    passwordGenerator();
  }, [length, isNumber, isChar, passwordGenerator]);

  return(
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700">
        <h1 className='text-white text-center mb-5'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly ref={passwordRef}/>
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={8} max={20} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}}/>
            <label>Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox" 
            defaultChecked={isNumber} 
            id="numberInput" 
            onChange={() => {
              setIsNumber((prev) => !prev);
            }} />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox" 
            defaultChecked={isChar} 
            id="charInput" 
            onChange={() => {
              setIsChar((prev) => !prev);
            }} />
            <label htmlFor="charInput">Characters</label>
          </div>

        </div>
        
      </div>
    </>
  )
}

export default App
