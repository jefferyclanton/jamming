import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.renderAction = this.renderAction.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction() {
  if(this.props.isRemoval === false) {
    return (
      <div>
        <a className="Track-action" onClick={this.addTrack}>+</a>
        </div>
    )
  } else {
    return (
      <div>
        <a className="Track-action" onClick={this.removeTrack}>-</a>
        </div>
    )
  }
}


  addTrack() {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === this.props.track.id)) {
  this.props.onAdd(this.props.track);
   } else {
     this.props.onRemove(this.props.track);
   }
 }

 removeTrack(track) {
   return this.props.track.splice(track);
 }

  render () {
  return (
      <div className="Track">
  <div className="Track-information">
    <h3>{this.props.track.name}</h3>
    <p>{this.props.track.artist} | {this.props.track.album}</p>
  </div>
  <a className="Track-action">{this.props.isRemoval === false ? '+' : '-'}</a>
</div>
);
  }
}


export default Track;
