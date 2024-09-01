type StyleHelperProps = {
  name: string
  value: string
}

export const styleHelper = (array: StyleHelperProps[]) => {
  return array.reduce((acc, cur) => {
    const { name, value } = cur
    const tmp = `--${name}: ${value};`
    return `${acc} ${tmp}`
  }, '')
}
