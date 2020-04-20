<template>
  <div id="container">
    <canvas id="canvas" ref="canvas"/>
  </div>
</template>

<script lang="ts">
  import * as THREE from 'three'
  import {Component, Vue} from 'vue-property-decorator'

  const scene = new THREE.Scene()

  let box: THREE.Mesh
  let earth: THREE.Mesh
  let camera: THREE.PerspectiveCamera
  let renderer: THREE.WebGLRenderer

  // カメラを作成
  const setCamera = (width: number, height: number) => {
    camera = new THREE.PerspectiveCamera(45, width / height)
    camera.position.set(0, 0, +1000)
  }

  // 箱を作成
  const makeBox = () => {
    const geometry = new THREE.BoxGeometry(400, 400, 400)
    const material = new THREE.MeshNormalMaterial()
    box = new THREE.Mesh(geometry, material)
    scene.add(box)
  }

  const boxTick = () => {
    box.rotation.y += 0.01
    renderer.render(scene, camera) // レンダリング
    renderer.xr.enabled = true
    requestAnimationFrame(boxTick)
  }

  // 地球を作成
  const makeEarth = () => {
    const geometry = new THREE.SphereGeometry(300, 30, 30)
    // マテリアルにテクスチャーを設定
    const material = new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load('/earth-texture.jpg'),
    })
    earth = new THREE.Mesh(geometry, material)
    scene.add(earth)

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)
  }

  const earthTick = () => {
    earth.rotation.y += 0.01
    renderer.render(scene, camera)
    requestAnimationFrame(earthTick)
  }

  const setRenderer = (width: number, height: number) => {
    renderer = new THREE.WebGLRenderer({
      canvas: <HTMLCanvasElement>document.querySelector('#canvas')
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)
  }

  @Component
  export default class Index extends Vue {
    canvas = {
      width: 0,
      height: 0,
    }

    // 画面とcanvasサイズを同期させる
    setWindowResize() {
      const height = window.innerHeight
      const width = window.innerWidth
      this.canvas.height = height
      this.canvas.width = width
      setRenderer(width, height)
      if (!window.onresize) {
        window.onresize = this.setWindowResize
      }
    }

    mounted() {
      this.setWindowResize()
      setCamera(this.canvas.width, this.canvas.height)
      setRenderer(this.canvas.width, this.canvas.height)
      // makeBox()
      // boxTick()
      makeEarth()
      earthTick()
    }
  }
</script>

