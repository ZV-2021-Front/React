import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'

function App() {
  return (
    <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
  );
}

export default App;
