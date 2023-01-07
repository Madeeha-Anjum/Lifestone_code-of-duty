import HomeScreen from './screens/HomeScreen';
import "./App.css";
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <main>
      <Switch>
          <Route path="/" component={HomeScreen} exact />
          {/* <Route path="/about" component={About} />
          <Route path="/shop" component={Shop} /> */}
      </Switch>
    </main>
  );
}

export default App;
