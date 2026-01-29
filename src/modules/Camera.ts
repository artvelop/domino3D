import * as THREE from 'three'

export class Camera {
  public camera: THREE.PerspectiveCamera

  constructor() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    this.camera.position.y = 90
    this.camera.position.z = 20
  }
}
