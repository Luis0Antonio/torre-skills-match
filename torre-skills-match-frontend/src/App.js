import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import MatchSkill from './pages/MatchSkills'
import Info from './pages/Info'
import NotFound from './pages/NotFound'

import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={MatchSkill}/>
          <Route exact path="/matchskill" component={MatchSkill}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/info" component={Info}/>
          <Route component={NotFound}/>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
