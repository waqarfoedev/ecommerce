import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About';
import PageNotFound from './pages/PageNotFound';
import Policy from './pages/Policy';
import Contact from './pages/Contact';


function App() {
  return (
    <div>
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/contact' element={<Contact />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/policy' element={<Policy />}/>
      <Route path='*' element={<PageNotFound />}/>
    </Routes>
    </div>
  );
}

export default App;
