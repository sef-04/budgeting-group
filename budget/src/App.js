import AppController from './component/AppController';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <>
      <AppController/>
      <ToastContainer/>
      </>
    </div>
  );
}

export default App;
