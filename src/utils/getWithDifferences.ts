import { ExtendedSuggestion, ExtendedSuggestionWithDifference } from 'types'

export default function getWithDifferences(
  suggestions: ExtendedSuggestion[],
  time: Date
): ExtendedSuggestionWithDifference[] {
  const withDifference = suggestions.map((s, index) => {
    const rawDifference = (s.timezone.rawOffset - (suggestions[0].timezone.rawOffset ?? s.timezone.rawOffset)) /
    60 /
    60
    const dstDifference = (s.timezone.dstOffset - (suggestions[0].timezone.dstOffset ?? s.timezone.dstOffset)) /
    60 /
    60
    return({
      ...s,
      recentlyAdded: index === suggestions.length,
      index,
      difference:rawDifference+dstDifference,
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
          .replace('24:', '00:').replace(' at ', ' ')
      ),
    })})
  return withDifference
}
