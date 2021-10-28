import { ExtendedSuggestion, ExtendedSuggestionWithDifference } from 'types'

export default function getWithDifferences(
  suggestions: ExtendedSuggestion[],
  time: Date
): ExtendedSuggestionWithDifference[] {
  return suggestions.map((s, index) => ({
    ...s,
    recentlyAdded: index === suggestions.length,
    index,
    difference:
      (s.timezone.rawOffset - (suggestions[0].timezone.rawOffset || s.timezone.rawOffset)) /
      60 /
      60,
    time: new Date(
      time
        .toLocaleString('en-us', {
          timeZone: s.timezone.timeZoneId,
          hour12: false,
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })
        .replace('24:', '00:')
    ),
  }))
}
