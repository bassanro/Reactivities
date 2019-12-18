import React, {Component} from 'react';
import './App.css';
import axios from "axios";

class App extends Component  {
  
  state = {
    values: []
  }

  componentDidMount() { 
    // rerender of component. 
    axios.get("http://localhost:5000/api/values")
    .then((response) => { 
      console.log(response.data);
      this.setState({values : response.data })
    })
  }

  render() {
  return (
    <div className="App">
      <ul>
        { this.state.values.map((value: any) => (
          <li key={value.id}>{value.name}</li>
        ))}
      </ul>
    </div>
  );
  }
}

export default App;
