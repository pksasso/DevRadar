import React, { useEffect, useState } from 'react';

import './global.css';
import './App.css';
import './Main.css';

import api from './services/api';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';


function App() {

  const [devs, setDevs] = useState([]);


  useEffect(() => {
    async function loadDevs() {
      const respose = await api.get('/devs');

      setDevs(respose.data);
    }
    loadDevs();
  }, [devs]);

  async function handleAddDev(data) {

    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  async function handleDeleteDev(dev) {

    await api.delete(`/devs?github_username=${dev.github_username}`);

  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} handleDelete={handleDeleteDev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
