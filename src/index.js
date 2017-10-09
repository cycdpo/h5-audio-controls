import _style from './audio.scss';

/**
 * H5AudioControls
 * @param audioSrc
 * @param context default: body
 * @param position 'left-top'|'top-right'(default)|'right-bottom'|'left-bottom'
 *
 * Property:
 * audioSrc
 * config: {
 *   context
 *   position
 * }
 * audioElement: {
 *   audioButton
 *   audio
 *   audioPic
 * }
 *
 * Function:
 * load
 * play
 * pause
 * isPlaying
 * _runAutoPlay
 * _changeUI
 * _changeUIToPlay
 * _changeUIToPause
 */
export default class H5AudioControls {
  constructor(audioSrc, {
    context = document.body,
    position = 'top-right',
  } = {}) {
    this.config = {
      context: isString(context)
        ? document.querySelector(context)
        : context,
      position: position,
    };

    this.config.context.style.position = 'relative';
    this.audioSrc = audioSrc;

    this.audioElement = {
      audioButton: document.createElement('a'),
      audio: null,
      audioPic: null,
    };
  };


  load() {
    return new Promise(resolve => {
      this.audioElement.audioButton.href = 'javascript:;';
      this.audioElement.audioButton.classList.add(_style.musicControlWrapper, this.config.position);

      this.audioElement.audioButton.innerHTML = `
        <span class=${_style.musicControl} ${_style.play}>
          <audio style="display: none;" loop preload controls>
            <source src=${this.audioSrc} type="audio/mpeg">
          </audio>
        </span>
      `;

      this.config.context.appendChild(this.audioElement.audioButton);

      this.audioElement.audioPic = this.audioElement.audioButton.querySelector('.' + _style.musicControl);
      this.audioElement.audio = this.audioElement.audioPic.querySelector('audio');

      this._runAutoPlay();
      this.eventBind();

      setTimeout(() => resolve(), 0);
    });

  };

  eventBind() {
    this.audioElement.audioButton.addEventListener('click', e => {
      e.stopPropagation();

      if (this.audioElement.audioPic.classList.contains(_style.play)) {
        // 正在播放
        this.pause();
      } else {
        // 暂停中
        this.play();
      }
    });
  };

  _runAutoPlay() {
    this.play();
    document.addEventListener("WeixinJSBridgeReady", () => {
      this.play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', () => {
      this.play();
    }, false);
  };

  play() {
    this.audioElement.audio.play();
    setTimeout(() => this._changeUI(), 0);
  };

  pause() {
    this.audioElement.audio.pause();
    setTimeout(() => this._changeUI(), 0);
  };

  _changeUIToPlay() {
    this.audioElement.audioPic.classList.remove(_style.pause);
    this.audioElement.audioPic.classList.add(_style.play);
  };

  _changeUIToPause() {
    this.audioElement.audioPic.classList.remove(_style.play);
    this.audioElement.audioPic.classList.add(_style.pause);
  };

  _changeUI() {
    if (this.isPlaying()) {
      this._changeUIToPlay();
    } else {
      this._changeUIToPause();
    }
  };

  isPlaying() {
    return !this.audioElement.audio.paused;
  };
};

// private
let
  isString = (str) => {
    return (typeof str === 'string') && str.constructor === String;
  }
;