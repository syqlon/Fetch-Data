import logo from './logo.svg';
import './App.css';
import { useEffect , useState } from 'react';


function App() {
  const [todo, setTodo] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [isFetching , setFetching] = useState(false);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const fetchTodo = async () => {
      setFetching(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      console.log("Response =",response);
      const data = await response.json();
      setFetching(false)
      console.log("Data =",data)
      // Parse the response as JSON
      setTodo(data); // Update state with the fetched data
    };
    
    fetchTodo(); // Call the function to fetch the data
  }, [3]); // Empty dependency array means this effect runs only once, when the component mounts

  if(isFetching){
   return <div>Data Loading ...</div>
  }

  const changeTitle = () => {
    if (todo) {
      setTodo({ ...todo, title: newTitle }); // Update the title
    }
  };

  return (
    <div>
      Hello Fetch <br />
      <span> Title: {todo?.title}</span><br />
      <input
        type="text"
        placeholder="Enter new title"
        value={newTitle} // Bind input value to newTitle
        onChange={(e) => setNewTitle(e.target.value)} // Update newTitle on input change
      />
      <button onClick={changeTitle}>Change Title</button>
    </div>
  );
}

export default App;