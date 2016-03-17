import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Artwork } from '../components/Artwork';
import { Actions } from '../components/Actions';
import { isSameTrackAndPlaying, isSameTrack } from '../utils/player';

const TrackItem = ({ activity, activateTrack, addTrackToPlaylist, isPlaying, activeTrackId, userEntities }) => {
  const { avatar_url, username } = userEntities[activity.user];

  const isVisible = isSameTrack(activeTrackId)(activity.id);
  const trackIsPlaying = isSameTrackAndPlaying(activeTrackId, activity.id, isPlaying);
  const configuration = [
    {
      className: trackIsPlaying ? 'fa fa-pause' : 'fa fa-play',
      fn: () => activateTrack(activity.id),
    },
    {
      className: 'fa fa-th-list',
      fn: () => addTrackToPlaylist(activity)
    }
  ];

  return (
    <div className="item">
      <div>
        <Artwork image={activity.artwork_url} title={activity.title} optionalImage={avatar_url} size={40} />
      </div>
      <div className="item-content">
        <div className="item-content-name">
          <a href={activity.permalink_url}>
            {username} - {activity.title}
          </a>
        </div>
        <div className="item-content-info">
          <div className="item-content-info-item">
            <i className="fa fa-play"></i>&nbsp;{activity.playback_count}
          </div>
          <div className="item-content-info-item">
            <i className="fa fa-heart"></i>&nbsp;{activity.favoritings_count}
          </div>
          <div className="item-content-info-item">
            <i className="fa fa-comment"></i>&nbsp;{activity.comment_count}
          </div>
        </div>
        <Actions configuration={configuration} isVisible={isVisible} />
      </div>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    activity: ownProps.activity,
    userEntities: state.entities.users,
    isPlaying: state.player.isPlaying,
    activeTrackId: state.player.activeTrackId
  };
}

export const TrackItemContainer = connect(mapStateToProps, actions)(TrackItem);
