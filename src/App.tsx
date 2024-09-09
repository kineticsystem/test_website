import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "academicons/css/academicons.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import "./App.css";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="hero">
        <div className="hero-body">
          <div className="container is-max-desktop">
            <div className="columns is-centered">
              <div className="column has-text-centered">
                <h1 className="title is-1 publication-title">
                  Geodroix: Auto classification with Machine Learning
                </h1>

                <div className="is-size-5 publication-authors">
                  <span className="author-block">
                    Eliza M. Thornton
                    <sup>1,2</sup>,&nbsp;
                  </span>
                  <span className="author-block">
                    <a href="#" target="_blank">
                      Jonathan R. Wexler
                      <sup>1</sup>,&nbsp;
                    </a>
                  </span>
                  <span className="author-block">
                    Sophia Lanford
                    <sup>1</sup>,&nbsp;
                  </span>
                  <span className="author-block">
                    Marina Fenwick
                    <sup>1</sup>,&nbsp;
                  </span>
                  <span className="author-block">
                    Felix P. Nightingale
                    <sup>1</sup>
                  </span>
                </div>

                <div className="column has-text-centered">
                  <div className="publication-links"></div>
                  {/* arxiv Link. */}
                  <span className="link-block">
                    <a
                      href="https://arxiv.org/abs/2407.20179"
                      target="_blank"
                      className="external-link button is-normal is-rounded is-dark"
                    >
                      <span className="icon">
                        <i className="ai ai-arxiv"></i>
                      </span>
                      <span>arXiv</span>
                    </a>
                  </span>
                  {/* Code Link. */}
                  <span className="link-block">
                    <a
                      href="https://github.com/bdaiinstitute/#"
                      target="_blank"
                      className="external-link button is-normal is-rounded is-dark"
                    >
                      <span className="icon">
                        <FontAwesomeIcon icon={faGithub} />
                      </span>
                      <span>Code</span>
                    </a>
                  </span>
                  {/* Datasets. */}
                  <span className="link-block">
                    <a
                      href="https://github.com/bdaiinstitute/#"
                      target="_blank"
                      className="external-link button is-normal is-rounded is-dark"
                    >
                      <span className="icon">
                        <FontAwesomeIcon icon={faGithub} />
                      </span>
                      <span>Datasets</span>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="button">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>

      <div className="hero teaser">
        <div className="container is-max-desktop">
          <div className="hero-body">
            <h2 className="subtitle has-text-centered">
              <b>This project</b> is about bla and bla.
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
