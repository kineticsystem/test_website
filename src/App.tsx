import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

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
                  Geodroix: Auto classification of crystalline solids using Machine
                  Learning.
                </h1>

                <div className="is-size-5 publication-authors">
                  <span className="author-block">
                    Eliza M. Thornton
                    <sup>1,2</sup>,
                  </span>
                  <span className="author-block">
                    Jonathan R. Wexler
                    <sup>1</sup>,
                  </span>
                  <span className="author-block">
                    Sophia Lanford
                    <sup>1</sup>,
                  </span>
                  <span className="author-block">
                    Marina Fenwick
                    <sup>1</sup>,
                  </span>
                  <span className="author-block">
                    Felix P. Nightingale
                    <sup>1</sup>,
                  </span>
                </div>

                <div className="column has-text-centered">
                  <div className="publication-links"></div>
                  {/* arxiv Link. */}
                  <span className="link-block">
                    <a
                      href="https://arxiv.org/abs/#"
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
                  {/* Hugging Face Model Weights Link. */}
                  <span className="link-block">
                    <a
                      href="https://huggingface.co/#"
                      target="_blank"
                      className="external-link button is-normal is-rounded is-dark"
                    >
                      <span>Models</span>
                    </a>
                  </span>
                  {/* Hugging Face Demo Link. */}
                  <span className="link-block">
                    <a
                      href="https://huggingface.co/spaces/theaiinstitute/#"
                      target="_blank"
                      className="external-link button is-normal is-rounded is-dark"
                    >
                      <span className="icon">
                        <FontAwesomeIcon icon={faCube} />
                      </span>
                      <span>Demo</span>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
