import { AddressComponent } from 'types'

// eslint-disable-next-line import/no-anonymous-default-export
export default function (addressComponents: AddressComponent[]): string {
  return (
    addressComponents.find(component => component.types.find(type => type === 'country'))
      ?.short_name || ''
  )
}
