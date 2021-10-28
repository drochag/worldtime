export interface SuggestionsProps {
  children(props: SearchProps): JSX.Element
}

export interface SuggestionsState {
  loading: boolean
  existingSuggestion: boolean
  selectedSuggestions: ExtendedSuggestionWithDifference[]
}

export interface Timezone {
  dstOffset: number
  rawOffset: number
  status: string
  timeZoneId: string
  timeZoneName: string
}

export interface ServerSuggestion {
  timezone: Timezone
  abbreviation: string
  language: string
}

export type ExtendedSuggestion = ServerSuggestion &
  Suggestion & {
    recentlyAdded?: boolean
  }
export type ExtendedSuggestionWithDifference = ExtendedSuggestion & {
  index: number
  difference: number
  time: date
}

export interface SearchProps {
  onSelect(suggestion: Suggestion): void
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
  country?: string
  time: date
  abbreviation: string
}

export interface SuggestionProps
  extends Pick<
    ExtendedSuggestionWithDifference,
    | 'recentlyAdded'
    | 'formatted_address'
    | 'difference'
    | 'time'
    | 'address_components'
    | 'types'
    | 'abbreviation'
  > {
  onRemove(suggestionLocation: string): void
}

export interface SuggestionsListProps extends Pick<SuggestionProps, 'onRemove'> {
  selectedSuggestions: ExtendedSuggestionWithDifference[]
  moveSuggestion({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }): void
}

export interface TimesListProps {
  length: number
  selectedSuggestions: ExtendedSuggestionWithDifference[]
}

export interface TimesListState {
  styles: Record<string, string>
  highlightedStyles: Record<string, string>
}

export interface TimeProps {
  time: date
  difference: number
  setHighlighted(idx: number): void
}

export interface HourProps {
  idx: number
  difference: number
  time: date
  setHighlighted(idx: number): void
}
