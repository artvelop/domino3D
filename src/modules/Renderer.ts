import * as THREE from 'three'

interface Constructor {
  canvas: HTMLCanvasElement | THREE.OffscreenCanvas
}

export class Renderer {
  public renderer

  constructor({ canvas }: Constructor) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    })

    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
  }
}
