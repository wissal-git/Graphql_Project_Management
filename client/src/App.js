
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Header from './components/Header';
import {ApolloProvider,ApolloClient,InMemoryCache} from '@apollo/client';
import Clients from './components/Clients';
import AddClienntModal from './components/AddClientModal';
import Projects from './components/Projects';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Project from './pages/Project';



const cache = new InMemoryCache({
  typePolicies :{
    Query:{
      fields:{
        clients:{
          merge (existing,incoming){
            return incoming;
          },
        },
        projects:{
          merge (existing,incoming){
            return incoming;
          },
        },
      },
    },
  },
});


const client = new ApolloClient ({
  uri:'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
  
});

 
function App() {
  return (
    <>
    <ApolloProvider client={client}>
       <Router>
          <Header></Header>
          <div className='container'>
           <Routes>
              <Route path='/' element={<Home></Home>}/>
              <Route path='*' element={<NotFound></NotFound>}/>
              <Route path='/Projects/:id' element={<Project></Project>}/>

            </Routes>
          </div>
        </Router> 
    </ApolloProvider>
   
    </>
    //any component will have access to the apollo client 
  );
}

export default App;
