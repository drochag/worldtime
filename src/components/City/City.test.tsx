import React from 'react'
import { shallow } from 'enzyme'

import info from '../Suggestions/info.json'
import City from '.'
import { getName } from '../SuggestionRow'

describe('City', () => {
  const staticDate = new Date(1593019755664) // Wed Jun 24 2020 12:29:15 GMT-0500 (Central Daylight Time)
  it('renders without crashing', () => {
    const country =
      info[0].address_components.find(component => component.types.find(type => type === 'country'))
        ?.short_name || ''
    shallow(
      <City
        name={getName(info[0].address_components, info[0].types)}
        abbreviation={info[0].abbreviation}
        difference={0}
        country={country}
        time={staticDate}
      />
    )
  })

  it('renders all the suggestion information', () => {
    const country =
      info[0].address_components.find(component => component.types.find(type => type === 'country'))
        ?.short_name || ''
    const container = shallow(
      <City
        name={getName(info[0].address_components, info[0].types)}
        abbreviation={info[0].abbreviation}
        country={country}
        time={staticDate}
      />
    )

    expect(container.find('.country').text()).toEqual('US')
    expect(container.find('.city').text()).toEqual('New York')
    expect(container.find('.time').text()).toEqual('12:29 pm EDT')
    expect(container.find('.date').text()).toEqual('Wed, Jun 24')
  })

  it('renders GMT and timezone when the abbreviation has a number', () => {
    const country =
      info[1].address_components.find(component => component.types.find(type => type === 'country'))
        ?.short_name || ''

    const container = shallow(
      <City
        name={getName(info[1].address_components, info[1].types)}
        abbreviation={info[1].abbreviation}
        country={country}
        time={staticDate}
      />
    )

    expect(container.find('.country').text()).toEqual('AR')
    expect(container.find('.city').text()).toEqual('Argentina')
    expect(container.find('.time').text()).toEqual('12:29 pm GMT-03')
    expect(container.find('.date').text()).toEqual('Wed, Jun 24')
  })

  it('renders correct time when the difference is not 0 ( > 0 )', () => {
    const country =
      info[1].address_components.find(component => component.types.find(type => type === 'country'))
        ?.short_name || ''
    const container = shallow(
      <City
        name={getName(info[1].address_components, info[1].types)}
        abbreviation={info[1].abbreviation}
        country={country}
        time={staticDate}
      />
    )

    expect(container.find('.time').text()).toEqual('2:29 pm GMT-03')
  })

  it('renders correct time when the difference is not 0 ( < 0 )', () => {
    const country =
      info[1].address_components.find(component => component.types.find(type => type === 'country'))
        ?.short_name || ''
    const container = shallow(
      <City
        name={getName(info[1].address_components, info[1].types)}
        abbreviation={info[1].abbreviation}
        country={country}
        time={staticDate}
      />
    )

    expect(container.find('.time').text()).toEqual('10:29 am GMT-03')
  })
})
