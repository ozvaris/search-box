import React from 'react';
import style from './App.scss';
import SearchBarCancel from './components/SearchBarCancel';
import SearchBarAbort from './components/SearchBarAbort';

import { Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Navigation from './Navigation';
import { NotFound } from './NotFound';

function App(props) {
  // return (
  //   <div className={style.App}>
  //     <SearchBar />
  //   </div>
  // );

  return (
    <div>
      <Container>
        <Navigation />
        <Row>
          <div style={{ display: 'contents' }}>
            <Col xs="0"></Col>
            <Col xs="9">
              <Routes>
                <Route exact path="/" element={<SearchBarCancel />} />
                <Route path="/search1" element={<SearchBarCancel />}></Route>
                <Route path="/search2" element={<SearchBarAbort />}></Route>

                <Route element={<NotFound />}></Route>
              </Routes>
            </Col>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default App;
