export interface SuggestionsProps {
  time: date
  children(props: SearchProps): JSX.Element
}

export interface Timezone {
  dstOffset: number
  rawOffset: number
  status: string
  timeZoneId: string
  timeZoneName: string
}

export interface ExtendedSuggestion extends Suggestion {
  timezone: Timezone
  abbreviation: string
}

export interface SuggestionsState {
  selectedSuggestions: ExtendedSuggestion[]
  loading: boolean
  existingSuggestion: boolean
  noSuggestions: boolean
}

export interface SearchProps {
  onSelect: (suggestion: Suggestion) => void
  onSuggestionsShown: (isEmpty: boolean) => void
  loading: boolean
}

export interface Location {
  lat: number
  lng: number
}

export interface AddressComponent {
  long_name: string
  short_name: string
  types: string[]
}

export interface Suggestion {
  address_components: AddressComponent[]
  formatted_address: string
  geometry: {
    bounds: {
      northeast: Location
      southwest: Location
    }
    location: Location
    location_type: string
    viewport: {
      northeast: Location
      southwest: Location
    }
  }
  place_id: string
  types: string[]
}

export interface Timezone {
  dstOffset: number
  rawOffset: number
  status: string
  timeZoneId: string
  timeZoneName: string
}

export interface ExtendedSuggestion extends Suggestion {
  timezone: Timezone
  abbreviation: string
}

export interface CityProps {
  name: string
  country: string
  time: date
  difference: number
  abbreviation: string
}

export interface SuggestionProps {
  onRemove: (idx: number) => void
  setHome: (idx: number) => void
  suggestion: ExtendedSuggestion
  difference: number
  idx: number
  time: date
}

export interface SuggestionsListProps extends Pick<SuggestionProps, 'onRemove' | 'setHome'> {
  selectedSuggestions: ExtendedSuggestion[]
  time: date
}

export interface TimesListProps
  extends Pick<SuggestionsListProps, 'selectedSuggestions' | 'time'> {}

export interface TimeProps {
  time: date
  difference: number
  setHighlighted: (idx: number) => void
}

export interface HourProps {
  idx: number
  difference: number
  time: date
  setHighlighted: (idx: number) => void
}
