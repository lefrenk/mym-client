import React from 'react';

import {
  NavLink
} from 'react-router-dom';

const itemStyle = {
  width: "100%",
  marginBottom: "10px",
  background: "#18192F",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};

const textStyle = {
  color: "white"
};

class ProjectItem extends React.Component {
  render() {
    // #18192F
    // #212a49
    return (
      <div style={itemStyle}>
        <h4 style={textStyle}>{this.props.project.title}</h4>
        <p style={textStyle}>{this.props.project.status}</p>
        <NavLink style={textStyle} to={`/project/${this.props.project._id}`}>more</NavLink>
      </div>
    );
  }
}

export default ProjectItem;
