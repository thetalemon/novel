export class ClassName {
  constructor(private className: string) {}

  getClassName() {
    return this.className
  }

  getElement() {
    return document.querySelector('.' + this.className)
  }

  getAllElements() {
    return document.querySelectorAll('.' + this.className)
  }
}
