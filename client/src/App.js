import React, { Component } from 'react';
import ProductList from './component/product-list';
import AddEditComponent from './component/addEditComponent';
import HeaderComponent from './component/header';
import AboutComponent from './component/aboutComponent';
import { Switch, Route } from 'react-router-dom';
import SignUpComponent from './component/signUpComponent';
import LogInComponent from './component/logInComponent';
import LoadingComponent from './component/common/loadingComponent';
import AlertComponent from './component/common/alertComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoadingComponent />
        <AlertComponent />
        <Switch>
          <Route exact path="/" />
          <Route path="/login" />
          <Route path="/" component={HeaderComponent} />
        </Switch>
        <section className="container">
          <Route exact path='/' component={SignUpComponent} />
          <Route exact path='/login' component={LogInComponent} />
          <Route exact path='/productList' component={ProductList} />
          <Route exact path='/edit/:id' component={AddEditComponent} />
          <Route exact path='/add' component={AddEditComponent} />
          <Route exact path='/about' component={AboutComponent} />
        </section>
        {/* <footer className="footer">Global footer</footer> */}
      </div>
    );
  }
}

export default App;