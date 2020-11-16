import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import ItemModal from './components/ItemModal';
//import ToDoList from './components/ToDoList';
import {Provider }from 'react-redux';
import {Container} from 'reactstrap';
import store from './store';
import KanbanBoard from './components/KanbanBoard';

function App() {
  return (
    <Provider store = {store}>
    <div className="App">
      <AppNavbar />
      <Container>
      <ItemModal />
      <KanbanBoard />
      </Container>
     </div>
    </Provider>
  );
}

export default App;
