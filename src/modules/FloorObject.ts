import * as THREE from 'three'
import * as CANNON from 'cannon-es'

interface Constructor {
  cannonWorld: CANNON.World
}

export class FloorObject {
  public mesh: THREE.Mesh
  public world: CANNON.World

  constructor({ cannonWorld }: Constructor) {
    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({
        color: '#a3c585',
      }),
    )

    this.mesh.rotation.x = THREE.MathUtils.degToRad(-90)

    this.world = cannonWorld

    const cannonPlaneShape = new CANNON.Plane()
    const cannonPlaneBody = new CANNON.Body({
      mass: 0,
      shape: cannonPlaneShape,
      position: new CANNON.Vec3(0, 0, 0),
      material: new CANNON.Material('floor'),
    })

    cannonPlaneBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), THREE.MathUtils.degToRad(90))
    this.world.addBody(cannonPlaneBody)
  }
}
