import * as THREE from 'three'

interface Constructor {
  drawFunction: Function
}

export class LoadingManager {
  public loadingManager
  private loadingElement: Element | null
  private drawFunction: Function

  constructor({ drawFunction }: Constructor) {
    this.loadingManager = new THREE.LoadingManager()
    this.loadingElement = document.querySelector('#loading')
    this.drawFunction = drawFunction

    this.loadingManager.onProgress = (url: string, itemsLoaded: number, itemsTotal: number) => {
      this.onProgress(url, itemsLoaded, itemsTotal)
    }

    this.loadingManager.onLoad = () => {
      this.onLoad()
    }

    this.loadingManager.onError = () => {
      this.onError()
    }
  }

  private onProgress(_url: string, itemsLoaded: number, itemsTotal: number) {
    if (!this.loadingElement) {
      return
    }

    const progress = itemsTotal === 0 ? 100 : Math.round((itemsLoaded / itemsTotal) * 100)
    this.loadingElement.textContent = `Loading ${progress}%`
  }

  private onLoad() {
    if (this.loadingElement) {
      this.loadingElement.classList.add('is-hidden')
    }

    this.drawFunction()
  }

  private onError() {
    if (this.loadingElement) {
      this.loadingElement.textContent = 'Loading failed'
    }
  }
}
