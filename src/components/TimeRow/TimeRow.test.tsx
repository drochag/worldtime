import React from 'react'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import TimeRow from '.'

describe('TimeRow', () => {
  const staticDate = new Date(1593019755664) // Wed Jun 24 2020 12:29:15 GMT-0500 (Central Daylight Time)
  const setHighlighted = sinon.spy()
  it('renders without crashing', () => {
    shallow(<TimeRow difference={0} setHighlighted={setHighlighted} time={staticDate} />)
  })

  it('should render 24 hours', () => {
    const wrapper = mount(
      <TimeRow difference={0} setHighlighted={setHighlighted} time={staticDate} />
    )

    expect(wrapper.find('.hour').length).toBe(23)
  })
})
