import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import ModalBtn from './components/ModalBtn';
import NavTabs from './components/Tab';
import Context from './components/context';
import Router from './components/Router';


function App() {

  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    const getProfiles = async () => {
      let profilesFromServer = await fetchProfiles()
      setProfiles(profilesFromServer)
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

  return (
    <Context.Provider value={{ profiles, setProfiles, fetchProfile }}>
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
