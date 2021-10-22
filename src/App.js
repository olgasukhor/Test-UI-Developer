import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import ModalBtn from './components/ModalBtn';
import NavTabs from './components/NavTabs';
import Context from './components/context';
import Router from './components/Router';
import headCells from './components/headCells';


function App() {

  const [profiles, setProfiles] = useState([])
  const [headCheck, setHeadCheck] = useState(headCells)
  const [newProfiles, setNewProfiles] = useState([])

  useEffect(() => {
    const getProfiles = async () => {
      let profilesFromServer = await fetchProfiles()
      setProfiles(profilesFromServer)
      setNewProfiles(profilesFromServer)
    }
    getProfiles()
  }, [])

  const fetchProfiles = async () => {
    const res = await fetch('http://localhost:5000/profiles')
    const data = await res.json()
    return (data)
  }

  const fetchProfile = async (id) => {
    const res = await fetch('http://localhost:5000/profiles/' + id)
    const data = await res.json()
    return (data)
  }

  useEffect(() => {
    const rowFromLocalStorage = localStorage.getItem('columns' || [])
    setHeadCheck(JSON.parse(rowFromLocalStorage))
  }, [])


  const checkedColumnsBtn = () => {
    let profilesNewBtn = [];
    let elementC = [];
    for (let i = 0; i < headCheck.length; i++) {
      elementC.push(headCheck[i].id)
    }
    let checkedColumns = elementC.join(', ');

    for (let i = 0; i < profiles.length; i++) {
      const element = profiles[i];
      const keys = Object.keys(element).filter(key => checkedColumns.includes(key));
      const sortedObj = Object.fromEntries(
        keys.map(key => [key, element[key]])
      );
      console.log(sortedObj)
      profilesNewBtn.push(sortedObj)
    }
    return setNewProfiles(profilesNewBtn)
  }


  return (
    <Context.Provider value={{ profiles, setProfiles, fetchProfile, headCheck, setHeadCheck, checkedColumnsBtn, newProfiles }}>
      <BrowserRouter>
        <div className="App">
          <NavTabs />
          <ModalBtn />
          <Router />
        </div>
      </BrowserRouter>
    </Context.Provider>

  );
}

export default App;
