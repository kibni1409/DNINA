import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthForm from "./Modules/AuthForm";
import Tables from "./Modules/Tables";
import Style from './../src/Modules/AuthForm.module.scss'

function App() {
  return (
    <div className={Style.App_wrapper}>
        <main>
          <Routes>
            <Route path="/" element={<AuthForm />} />
            <Route path="/tables" element={<Tables />} />
          </Routes>
        </main>
    </div>
  );
}

export default App
