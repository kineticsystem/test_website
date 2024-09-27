import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IiwaComponent } from "./components/iiwa/iiwa_component";

import "academicons/css/academicons.min.css";

import "./App.css";
import "./index.css";

const App = () => {
  return (
    <>
      <div className="hero">
        <div className="hero-body">
          <div className="container is-max-desktop">
            <div className="columns is-centered">
              <div className="column has-text-centered">
                {/* Title. */}
                <h1 className="title is-1 publication-title">
                  Geodroix: Auto classification with Machine Learning
                </h1>

                {/* Authors. */}
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

                {/* Publication links. */}
                <div className="publication-links">
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

                <div style={{ margin: 20, color: "red" }}>Click on the scatter plot.</div>

                <IiwaComponent />

                {/* column has-text-centered */}
              </div>
              {/* columns is-centered */}
            </div>
            {/* container is-max-desktop */}
          </div>
          {/* hero-body */}
        </div>
        {/* hero */}
      </div>
    </>
  );
};

export default App;
