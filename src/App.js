import './App.css';
import Autocomplete from './component/Autocomplete';
import { countries, products } from './filterData';
const App = () => {

  return (
    
    <div className="App">
      <label>Search box :</label>
      <Autocomplete
        suggestions={countries}
        products={products}
      />
    </div>
  );
}

export default App;
