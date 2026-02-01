import * as THREE from 'three'
import { Camera } from './modules/Camera'
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js'
import { Light } from './modules/Light'
import { FloorObject } from './modules/FloorObject'
import * as CANNON from 'cannon-es'
import { DominoObject } from './modules/DominoObject'
import { PreventDragClick } from './modules/PreventDragClick'
import { Renderer } from './modules/Renderer'
import { World } from './modules/World'
import { LoadingManager } from './modules/LoadingManager'
import { ParticleStar } from './modules/ParticleStar'

// cannon.js 문서
// http://schteppe.github.io/cannon.js/docs/
// 주의! https 아니고 http

export default function example() {
  const canvas = document.querySelector('#three-canvas')

  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error('Canvas element not found')
  }

  const loadingManager = new LoadingManager({ drawFunction: draw }).loadingManager
  const gltfLoader = new GLTFLoader(loadingManager)

  const renderer = new Renderer({ canvas }).renderer
  const cannonWorld = new World().world

  const scene = new THREE.Scene()

  //camera
  const cameraInstance = new Camera()
  scene.add(cameraInstance.camera)

  //light
  const lightInstance = new Light()
  scene.add(lightInstance.ambientLight, lightInstance.directionalLight)

  new OrbitControls(cameraInstance.camera, renderer.domElement)

  //mesh
  const floorMeshInstance = new FloorObject({ cannonWorld })
  scene.add(floorMeshInstance.mesh)

  const dominos: DominoObject[] = []
  let domino

  for (let index = 0; index < 20; index++) {
    domino = new DominoObject({
      scene,
      cannonWorld,
      gltfLoader,
      y: 0,
      z: -index * 0.8,
      index: index,
    })

    dominos.push(domino)
  }

  const particleStars = new ParticleStar({ textureLoader: new THREE.TextureLoader(loadingManager) })
  scene.add(particleStars.particles)

  const clock = new THREE.Clock()

  function draw() {
    const delta = clock.getDelta()

    let cannonStepTime = 1 / 60

    if (delta < 0.01) {
      cannonStepTime = 1 / 120
    }

    cannonWorld.step(cannonStepTime, delta, 3) // 시간단계 셋팅

    dominos.forEach((item) => {
      if (item.cannonBody) {
        item.modelMesh?.position.copy(item.cannonBody.position)
        item.modelMesh?.quaternion.copy(item.cannonBody.quaternion)
      }
    })

    renderer.render(scene, cameraInstance.camera)
    requestAnimationFrame(draw)
  }

  function setSize() {
    cameraInstance.camera.aspect = window.innerWidth / window.innerHeight
    cameraInstance.camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, cameraInstance.camera)
  }

  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  function checkIntersects() {
    raycaster.setFromCamera(mouse, cameraInstance.camera)

    const intersects = raycaster.intersectObjects(scene.children)

    for (let index = 0; index < intersects.length; index++) {
      if (intersects[index].object) {
        const intersectDomino = dominos.find((item) => item?.modelMesh?.name === `domino-${index}`)

        intersectDomino?.cannonBody?.applyForce(new CANNON.Vec3(0, 0, -100), new CANNON.Vec3(0, 0, 0))

        break
      }
    }
  }

  window.addEventListener('resize', setSize)
  canvas.addEventListener('click', (event) => {
    if (prevenDragClickInstance.mouseMoved) {
      return
    }

    mouse.x = (event.clientX / canvas.clientWidth) * 2 - 1
    mouse.y = -((event.clientY / canvas.clientHeight) * 2 - 1)

    checkIntersects()
  })

  const prevenDragClickInstance = new PreventDragClick(canvas)
}

example()
