import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { GLTFLoader, GLTF } from 'three/examples/jsm/Addons.js'

interface Constructor {
  scene: THREE.Scene
  cannonWorld: CANNON.World
  gltfLoader: GLTFLoader
  x?: number
  y?: number
  z?: number
  width?: number
  height?: number
  depth?: number
  rotationY?: number
  index: number
}

export class DominoObject {
  public scene: THREE.Scene
  public cannonWorld: CANNON.World
  public x: number
  public y: number
  public z: number
  public width: number
  public height: number
  public depth: number
  public rotationY: number

  public modelMesh: THREE.Object3D<THREE.Object3DEventMap> | undefined
  public cannonBody: CANNON.Body | undefined

  constructor({ scene, cannonWorld, gltfLoader, x, y, z, width, height, depth, rotationY, index }: Constructor) {
    this.scene = scene
    this.cannonWorld = cannonWorld

    this.width = width || 0.6
    this.height = height || 1
    this.depth = depth || 0.2

    this.x = x || 0
    this.y = y || 0.5
    this.z = z || 0

    this.rotationY = rotationY || 0

    const modelUrl = new URL('../models/domino.glb', import.meta.url).href

    gltfLoader.load(modelUrl, (glb: GLTF) => {
      this.modelMesh = glb.scene.children[0] as THREE.Object3D<THREE.Object3DEventMap>
      this.modelMesh.castShadow = true
      this.modelMesh.position.set(this.x, this.y, this.z)
      this.scene.add(this.modelMesh)
      this.modelMesh.name = `domino-${index}`
      this.setCannonBody()
    })
  }

  private setCannonBody() {
    const shape = new CANNON.Box(new CANNON.Vec3(this.width / 2, this.height / 2, this.depth / 2))
    this.cannonBody = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(this.x, this.y, this.z),
      shape,
    })

    this.cannonBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), this.rotationY)
    this.cannonWorld.addBody(this.cannonBody)
  }
}
