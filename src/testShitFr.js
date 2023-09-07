import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TestInstance from './TestInstance';
import AdminInstance from './AdminWebpage.js';
import './App.css';  // Importing the styles


function App() {
  const [showModal, setShowModal] = useState(true);
  const TypeSelectorModal = ({ setShowModal }) => {
    return (
      <div className="MainMenu">
        <main class="site-wrapper">
        <div class="pt-table desktop-768">
                  <div class="type-selector-overlay"></div>
                  <div class="type-selector-container">
                      <div class="row">
                          <div class="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-2 col-lg-8">
                              <div class="page-title  home text-center">
                                <span class="type-selector-heading-page"> Welcome to My Page
                                </span>
                                  <p class="mt20">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                              </div>

                              <div class="hexagon-menu clear">
                                  <div class="hexagon-item">
                                      <div class="hex-item">
                                          <div></div>
                                          <div></div>
                                          <div></div>
                                      </div>
                                      <div class="hex-item">
                                          <div></div>
                                          <div></div>
                                          <div></div>
                                      </div>
                                      <a  class="hex-content">
                                          <span class="hex-content-inner">
                                              <span class="icon">
                                                  <i class="fa fa-universal-access"></i>
                                              </span>
                                              <span class="title">Welcome</span>
                                          </span>
                                          <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#1e2530"></path></svg>
                                      </a>
                                  </div>
                                  <div class="hexagon-item">
                                      <div class="hex-item">
                                          <div></div>
                                          <div></div>
                                          <div></div>
                                      </div>
                                      <div class="hex-item">
                                          <div></div>
                                          <div></div>
                                          <div></div>
                                      </div>
                                      <a  class="hex-content">
                                          <span class="hex-content-inner">
                                              <span class="icon">
                                                  <i class="fa fa-bullseye"></i>
                                              </span>
                                              <span class="title">About</span>
                                          </span>
                                          <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#1e2530"></path></svg>
                                      </a>
                                  </div>
                                  <div class="hexagon-item">
                                      <div class="hex-item">
                                          <div></div>
                                          <div></div>
                                          <div></div>
                                      </div>
                                      <div class="hex-item">
                                          <div></div>
                                          <div></div>
                                          <div></div>
                                      </div>
                                      <a  class="hex-content">
                                          <span class="hex-content-inner">
                                              <span class="icon">
                                                  <i class="fa fa-braille"></i>
                                              </span>
                                              <span class="title">Services</span>
                                          </span>
                                          <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#1e2530"></path></svg>
                                      </a>    
                                  </div>
                                  <div class="hexagon-item">
                                      <div class="hex-item">
                                          <div></div>
                                          <div></div>
                                          <div></div>
                                      </div>
                                      <div class="hex-item">
                                          <div></div>
                                          <div></div>
                                          <div></div>
                                      </div>
                                      <a  class="hex-content">
                                          <span class="hex-content-inner">
                                              <span class="icon">
                                                  <i class="fa fa-id-badge"></i>
                                              </span>
                                              <span class="title">Resume</span>
                                          </span>
                                          <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#1e2530"></path></svg>
                                      </a>
                                  </div>
                                  <div class="hexagon-item">
                                      <div class="hex-item">
                                          <div></div>
                                          <div></div>
                                          <div></div>
                                      </div>
                                      <div class="hex-item">
                                          <div></div>
                                          <div></div>
                                          <div></div>
                                      </div>
                                      <a  class="hex-content">
                                          <span class="hex-content-inner">
                                              <span class="icon">
                                                  <i class="fa fa-life-ring"></i>
                                              </span>
                                              <span class="title">Works</span>
                                          </span>
                                          <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#1e2530"></path></svg>
                                      </a>
                                  </div>
                                  <div class="hexagon-item">
                                      <div class="hex-item">
                                          <div></div>
                                          <div></div>
                                          <div></div>
                                      </div>
                                      <div class="hex-item">
                                          <div></div>
                                          <div></div>
                                          <div></div>
                                      </div>
                                      <a  class="hex-content">
                                          <span class="hex-content-inner">
                                              <span class="icon">
                                                  <i class="fa fa-clipboard"></i>
                                              </span>
                                              <span class="title">Testimonials</span>
                                          </span>
                                          <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#1e2530"></path></svg>
                                      </a>
                                  </div>
                                  <div class="hexagon-item">
                                      <div class="hex-item">
                                          <div></div>
                                          <div></div>
                                          <div></div>
                                      </div>
                                      <div class="hex-item">
                                          <div></div>
                                          <div></div>
                                          <div></div>
                                      </div>
                                      <a  class="hex-content">
                                          <span class="hex-content-inner">
                                              <span class="icon">
                                                  <i class="fa fa-map-signs"></i>
                                              </span>
                                              <span class="title">Contact</span>
                                          </span>
                                          <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#1e2530"></path></svg>
                                      </a>
                                  </div>
                              </div>
                          </div>
                      </div>
              </div>
          </div>
        </main>
      </div>
    );
  };
  return (
    <div className="App">
      {showModal && <TypeSelectorModal setShowModal={setShowModal} />}
      <Router>
        <Switch>
          <Route exact path="/testInstance" component={TestInstance} />
          <Route path="/adminInstance" component={AdminInstance} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
