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
    // Nique, je veux mon API. Chien.
    axios.get('http://localhost:4000/tasks')
    .then(res => {
      setTasks(res.data);
    })
  }, [])

  function deleteTask(id) {
    axios.delete('http://localhost:4000/tasks/'+id)
    .then(() => {
      // Dès que la tâche est supprimée, alors je la supprime 
      // de mes données React.JS
      
      // Objectif, ça va être de filtrer mon tableau de tâches
      // pour ne garder que celles dont l'id est différent de la variable id

      // Exemple avec id:7 et 
      /* 
        tasks = [
          {id:1, title: "nji"}, 
          {id: 4, title: "ijj"},
          {id: 7, title: "jijijijij"}
        ]
      */
      // 1 !== 7 OUI, va dans filterTasks
      // 4 !== 7 OUI, va dans filterTasks
      // 7 !== 7 -> NON, ne va pas dans filterTasks
      const filterTasks = tasks.filter(task => task.id !== id)
      setTasks(filterTasks);
    })
  }

  const tasksJSX = tasks.map(task => {
    return <li>{task.id}: {task.title} 
        <button onClick={() => deleteTask(task.id)}>Supprimer</button>
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
