import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppContent from './components/AppContent';
import AppHeader from './components/AppHeader';
import PageTitle from './components/PageTitle';
import styles_app from './styles/modules/app.module.scss';

function App() {
  return (
    <>    
      <div className='container'>
        <PageTitle>todo list</PageTitle>
        <div className={styles_app.app__wrapper}>
          <AppHeader />
          <AppContent />
        </div>
      </div>
      <Toaster toastOptions={{style: {fontSize: '1.5rem'}}} position='bottom-right'  />
    </>
  )
}

export default App;