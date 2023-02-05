import logo from './logo.svg';
import './App.css';
import { useState, useCallback } from 'react';
function App() {
  const [search, setSearch ] = useState([]);
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if(timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        func.apply(context, args);
      }, 500)
    }
  }
  const handleChange = (event) => {
    const {value} = event.target;
    fetch(`https://demo.dataverse.org/api/search?q=${value}`)
    .then(res => res.json())
    .then(json=> setSearch(json.data.items));
  }
  const optimisedVersion = useCallback(debounce(handleChange),[]);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input type={'text'} name={'search'} placeholder={'Enter Something...'}
      className={'search'} onChange={optimisedVersion} /> 
      {search?.length > 0 && 
      <div className={'autocomplete'}>
        {search?.map((el, item) => 
        <div key={item} className={'autocompleteItems'}>
              <span>
                {el.name}
              </span>
        </div>
        )}
      </div>
      }
      </header>
    </div>
  );
}

export default App;
