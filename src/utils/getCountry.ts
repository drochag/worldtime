import { AddressComponent } from 'types'

export default function (addressComponents: AddressComponent[]): string {
  return (
    addressComponents.find(component => component.types.find(type => type === 'country'))
      ?.short_name || ''
  )
}
