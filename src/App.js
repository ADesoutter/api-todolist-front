import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

// Je veux quelquechose de dynamique
// -> ma liste des tâches

function App() {
  const [tasks,setTasks] = useState([
    {title: "coucou"}
  ])

  // Ca se lance au démarrage du composant
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
    .then(res => {
      setTasks(res.data);
    })
  }, [])

  // [{title: "coucou"}]
  // <li>coucou</li>

  const tasksJSX = tasks.map(task => {
    return <li>{task.title} 
        <button>Supprimer</button>
      </li>
  })

  return (
    <div className="App">
      <h1>Ma liste de tâches</h1>
      <ul>
        {tasksJSX}
      </ul>
    </div>
  );
}

export default App;
