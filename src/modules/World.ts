import * as CANNON from 'cannon-es'

export class World {
  public world: CANNON.World

  constructor() {
    this.world = new CANNON.World()
    this.world.gravity.set(0, -9.82, 0)
    this.world.broadphase = new CANNON.SAPBroadphase(this.world)

    const defaultMaterial = new CANNON.Material('default')
    const defaultContactMaterial = new CANNON.ContactMaterial(defaultMaterial, defaultMaterial, {
      friction: 0.01,
      restitution: 0.9,
    })

    this.world.defaultContactMaterial = defaultContactMaterial
  }
}
