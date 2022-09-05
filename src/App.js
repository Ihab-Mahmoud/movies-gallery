import { React } from 'react';
import { Provider } from "react-redux"
import { store } from "./movies-gallery/store/store"
import Header from "./movies-gallery/components/nav"
import Home from "./movies-gallery/components/home"
import Footer from "./movies-gallery/components/footer"
import Error from "./movies-gallery/components/Error"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"


function App()
{
  return (
    <div className="homepage">
      <Provider store={store}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/movie/:id" children={<Home />}>
            </Route>
            <Route path="*" >
              <Error />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
