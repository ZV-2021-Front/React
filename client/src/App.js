import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import moment from 'moment';
import 'moment/locale/ru' 
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  moment.locale('ru')
  return (
    <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
  );
}

export default App;
