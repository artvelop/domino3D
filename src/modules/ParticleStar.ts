import { BufferAttribute, BufferGeometry, Points, PointsMaterial, TextureLoader } from 'three'

interface Constructor {
  textureLoader: TextureLoader
}

export class ParticleStar {
  public particles: Points

  constructor({ textureLoader }: Constructor) {
    const geometry = new BufferGeometry()
    const count = 1000

    const positions = new Float32Array(count * 3) // x y z 좌표라서 3배
    // const colors = new Float32Array(count * 3)

    for (let i = 0; i < positions.length; i++) {
      positions[i] = (Math.random() - 0.5) * 10
      // colors[i] = Math.random()
    }

    geometry.setAttribute('position', new BufferAttribute(positions, 3))
    // geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particleTexture = textureLoader.load('/images/star.png')

    const material = new PointsMaterial({
      size: 0.1,
      map: particleTexture,
      color: 'white',
      //파티클 이미지를 투명하게 셋팅
      transparent: true,
      alphaMap: particleTexture,
      depthWrite: false,
      // 색상
    })

    const particles = new Points(geometry, material)
    this.particles = particles
  }
}
