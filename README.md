# H5 Audio Controls

[![NPM version][npm-image]][npm-url]
[![David deps][david-image]][david-url]
[![devDependencies Status][david-dev-image]][david-dev-url]
[![npm download][download-image]][download-url]
[![jsdelivr][jsdelivr-image]][jsdelivr-url]
[![npm license][license-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/h5-audio-controls.svg?style=flat-square
[npm-url]: https://npmjs.org/package/h5-audio-controls
[david-image]: https://img.shields.io/david/cycdpo/h5-audio-controls.svg?style=flat-square
[david-url]: https://david-dm.org/cycdpo/h5-audio-controls
[david-dev-image]: https://david-dm.org/cycdpo/h5-audio-controls/dev-status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/cycdpo/h5-audio-controls?type=dev
[download-image]: https://img.shields.io/npm/dm/h5-audio-controls.svg?style=flat-square
[download-url]: https://npmjs.org/package/h5-audio-controls
[jsdelivr-image]: https://data.jsdelivr.com/v1/package/npm/h5-audio-controls/badge
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/h5-audio-controls
[license-image]: https://img.shields.io/npm/l/h5-audio-controls.svg?style=flat-square

## This package has been deprecated
[new-url]: https://github.com/cycjimmy/h5-audio-controls

**This package has been migrated to [@cycjimmy/h5-audio-controls][new-url] for scoped NPM package. Please switch to [@cycjimmy/h5-audio-controls][new-url] to stay up to date.**

## How to use
### Install
  ```shell
  $ npm install h5-audio-controls --save
  # or
  $ yarn add h5-audio-controls
  ```

### Usage
  ```javascript
  import H5AudioControls from 'h5-audio-controls';
  # OR
  let H5AudioControls = require('h5-audio-controls');
  ```

  ```javascript
  new H5AudioControls(audioSrc [, options])
  ```

* `audioSrc`: [string] a url to an audio file
* The `options` supports:
  * `context`: [string|element] the context of audio controller. Default `document.body`.
  * `position`: [string] the position of audio controller.
    * Choose one of the four options:
      * `'left-top'`
      * `'top-right'`(Default)
      * `'right-bottom'`
      * `'left-bottom'`
  * `buttonSize`: [string|number] Set button wrapper size. Default `''`
  * `picSize`: [string|number] Set button picture size. Default `''`
  * `autoPlay`: [boolean] Whether to play immediately after loading. Default `true`

* `H5AudioControls` instance supports the following methods:
  * `load()`: init controller.
  * `play()`: play the audio.
  * `pause()`: pause the audio.
  * `stop()`: stop the audio.

### Use in browser
```html
<script src="H5AudioControls.min.js"></script>
<script>
  var audioSrc = '../media/test_audio.mp3';
  new H5AudioControls(audioSrc).load();
</script>
```

## CDN
To use via a CDN include this in your html:
```text
<script src="https://cdn.jsdelivr.net/npm/h5-audio-controls@1/build/H5AudioControls.min.js"></script>
```

