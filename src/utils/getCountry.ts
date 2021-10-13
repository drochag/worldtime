import { Suggestion } from 'types'

export default function (suggestion: Suggestion): string {
  return (
    suggestion.address_components.find(component =>
      component.types.find(type => type === 'country')
    )?.short_name || ''
  )
}
