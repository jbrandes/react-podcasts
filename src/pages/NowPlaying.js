import React, { Component } from 'react'
import Sound from 'react-sound'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { podcasts } from '../data/podcasts'
import Loader from '../components/Loader.component'
import ProgressiveImage from 'react-progressive-image'
import ProgressBar from '../components/ProgressBar.component'
import { pauseAudio, skip, stopAudio } from '../actions/player'

import '../css/NowPlaying.styles.css'

class NowPlaying extends Component {
  render() {
    const { playStatus, loading } = this.props.player
    const { img, title, podcast } = this.props.player.track
    const podcastLoading = playStatus === 'PLAYING' && loading

    let podcastImage = ''

    if (title) {
      podcastImage = podcasts
        .filter(p => p.name === podcast)[0]
        .img.replace(/100x100/g, '30x30')
    }

    return (
      <div>
        {title ? (
          <div className={`NowPlaying-player ${this.props.theme}`}>
            <i
              onClick={this.props.stopAudio}
              className='material-icons NowPlaying-close'
            >
              close
            </i>

            <div className='NowPlaying-img-wrapper'>
              {podcastLoading && <Loader />}
              <ProgressiveImage src={img} placeholder={podcastImage}>
                {src => (
                  <img
                    src={src}
                    alt='podcast image'
                    className={podcastLoading ? 'blur' : undefined}
                  />
                )}
              </ProgressiveImage>
            </div>

            <div className='NowPlaying-info'>
              <ProgressBar width='75%' wrapperPosition='relative' />
              <Link to={`/podcast/${podcast.replace(/ /g, '_')}`}>
                <h4>{podcast}</h4>
              </Link>
              <h3>{title}</h3>
            </div>

            <div className='NowPlaying-controls'>
              <i
                className='material-icons'
                onClick={() => this.props.skip(-5000)}
              >
                replay_5
              </i>
              <i
                onClick={this.props.pauseAudio}
                className='material-icons play-btn'
              >
                {playStatus === Sound.status.PAUSED
                  ? 'play_circle_outline'
                  : 'pause_circle_outline'}
              </i>
              <i
                className='material-icons'
                onClick={() => this.props.skip(10000)}
              >
                forward_10
              </i>
            </div>
          </div>
        ) : (
          <p className='middle'>
            There is nothing playing. Go find something awesome!
          </p>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  player: state.player,
  theme: state.theme.theme
})

export default connect(
  mapStateToProps,
  { pauseAudio, skip, stopAudio }
)(NowPlaying)
