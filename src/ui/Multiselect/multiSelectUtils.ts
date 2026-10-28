import type { SelectOption } from '../../types'

export const filterOptions = (options: SelectOption[], query: string) => {
  const term = query.toLowerCase()
  return term === '' ? options : options.filter(o => (o.filterTerm ?? o.label).toLowerCase().includes(term))
}

export const toggleAll = (value: string[], visibleValues: string[]) => {
  const allSelected = visibleValues.length > 0 && visibleValues.every(v => value.includes(v))
  return allSelected ? value.filter(v => !visibleValues.includes(v)) : Array.from(new Set([...value, ...visibleValues]))
}
