import * as THREE from 'three'

export class Light {
  public ambientLight: THREE.AmbientLight
  public directionalLight: THREE.DirectionalLight

  constructor() {
    this.ambientLight = new THREE.AmbientLight('white', 0.5)
    this.directionalLight = new THREE.DirectionalLight('white', 2.5)

    this.directionalLight.position.x = 1
    this.directionalLight.position.y = 2
  }
}
