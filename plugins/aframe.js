import Vue from 'vue'
import * as aframe from 'aframe'

Vue.config.ignoredElements = [
  'a-scene',
  'a-assets',
  'a-camera',
  'a-entity',
  'a-box',
  'a-sphere',
  'a-cylinder',
  'a-plane',
  'a-sky',
  'a-cursor',
]

Vue.use(aframe)
