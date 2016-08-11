import React, { Component } from 'react';

import Footer from '../components/Footer.jsx';
import Results from '../components/Results.jsx';
import Search from '../components/Search.jsx';
import Submit from '../components/Submit.jsx';


export default class SubmitPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div id='ioplease-submit'>

        <div id="ioplease-footer">
          <Footer />
        </div>
      </div>
    )
  }

}
