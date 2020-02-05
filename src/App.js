import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
const Header = lazy(() => import('./components/Header/Header'));
const Home = lazy(() => import('./components/Home/Home'));
const NewQuote = lazy(() => import('./components/NewQuote/NewQuote'));
const LoadFile = lazy(() => import('./components/LoadFile/LoadFile'));
const PrintPDF = lazy(() => import('./components/PrintPDF/PrintPDF'));
const styles = './app.module.scss';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <div className={styles.Body}>
              <Header />
              <Switch>
                <Route path='/' component={Home} exact />
                <Route path='/new' component={NewQuote} exact />
                <Route path='/load' component={LoadFile} exact />
                <Route path='/print/:data' component={PrintPDF} exact />
              </Switch>
              <div className={styles.Footer}>
                <Image />
                <p className='text-center font-weight-light sm'>
                  {'Created by '}
                  <Image
                    src={require('./assets/rose-labs-2.png')}
                    width={'95px'}
                    height={'71px'}
                    style={{ marginBottom: '30px', marginLeft: '-1px' }}
                  />
                  {'. Powered by  '}
                  <Image
                    src={require('./assets/images/react-icon.png')}
                    width={'20px'}
                    height={'20px'}
                  />
                  {'ReactJS'}
                </p>
              </div>
            </div>
          </BrowserRouter>
        </Suspense>
      </div>
    );
  }
}

export default App;
