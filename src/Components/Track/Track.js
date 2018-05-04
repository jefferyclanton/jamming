import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.renderAction = this.renderAction.bind(this);
  }
  renderAction() {
    if(this.isRemoval === true) {
      console.log('-');
    }
    console.log('+');
  }
  render () {
  return (
      <div className="Track">
  <div className="Track-information">
    <h3>{this.props.name}</h3>
    <p>{this.props.artist}</p>
  </div>
  <a className="Track-action"><Track onClick={this.renderAction} /></a>
</div>
);
  }
}

export default Track;
