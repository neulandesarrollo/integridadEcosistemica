import React, { Component } from 'react';

export default class GeekyIndexPage extends Component {
  getProjects() {
    return [
      {
        _id: "1",
        name: "NOPD Response Time 2016",
        description: "Explore how quickly NOPD respond to service calls across New Orelans.",
        url: "/nopd-response-time-2016"
      },
      {
        _id: "2",
        name: "ioPLEA.SE",
        description: "Do stuff with your IoT",
        url: "/ioplease"
      },
      {
        _id: "3",
        name: "mexEco",
        description: "Investigate envrionmental & ecological integrity in Mexico.",
        url: "/mexEco"
      }
    ];
  }

  renderProjects() {
    return this.getProjects().map((project) => (
      <div key={project._id} className="m-t-1 col-xs-12 col-md-6 col-lg-4 col-xl-6">
        <a href={project.url} className="geeky-card">
          <div className="card card-block project-card geeky-card">
            <h4 className="card-title">{project.name}</h4>
            <p className="card-text geeky-text m-t-1">{project.description}</p>
            <span className="card-link geeky-text m-t-2 geeky-link">Learn More</span>
          </div>
        </a>
      </div>
    ));
  }

  render() {
    return (
      <div className="container">
        <div className="p-t-2">
          <h1 className="geeky-title">Projects</h1>
        </div>

        <div className="row p-b-3">
          {this.renderProjects()}
        </div>
      </div>
    );
  }
}
