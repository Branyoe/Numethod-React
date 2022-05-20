import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppBarComponent from './layout';
import RoutesComponent from './Routes';

const App = () => <AppBarComponent>
  <RoutesComponent/>
</AppBarComponent>
export default App;
