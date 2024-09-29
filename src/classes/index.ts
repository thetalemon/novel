export class ClassName {
  constructor(private className: string) {}

  getClassName() {
    return this.className
  }

  getSelector() {
    return '.' + this.className
  }
}
