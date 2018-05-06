import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.renderAction = this.renderAction.bind(this);
  }

  renderAction() {
    (this.props.isRemoval===false) ? '+' : '-';
  }

  addTrack() {
    if (this.props.isRemoval === false) {
     this.props.onAdd(this.props.track);
   } else {
     this.props.onRemove(this.props.track);
   }
 }

  render () {
  return (
      <div className="Track">
  <div className="Track-information">
    <h3>{this.props.track.name}</h3>
    <p>{this.props.track.artist} | {this.props.track.album}</p>
  </div>
  <a className="Track-action" onClick={this.renderAction}></a>
</div>
);
  }
}

export default Track;
