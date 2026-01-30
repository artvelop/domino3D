export class PreventDragClick {
  public mouseMoved: boolean = false

  constructor(element: HTMLElement) {
    let clickStartX: number
    let clickStartY: number
    let clickStartTime: number

    element.addEventListener('mousedown', (event: MouseEvent) => {
      clickStartX = event.clientX
      clickStartY = event.clientY
      clickStartTime = Date.now()
    })

    element.addEventListener('mouseup', (event) => {
      const xGap = Math.abs(event.clientX - clickStartX)
      const yGap = Math.abs(event.clientY - clickStartY)
      const timeGap = Date.now() - clickStartTime

      const isMouseMoved = xGap > 5 || yGap > 5 || timeGap > 500

      this.mouseMoved = isMouseMoved
    })
  }
}
