import React from 'react'
import { shallow } from 'enzyme'

import Suggestions from '.'

const staticDate = new Date(1593019755664) // Wed Jun 24 2020 12:29:15 GMT-0500 (Central Daylight Time)

const children = () => <span>Hi</span>
describe('Suggestions', () => {
  it('renders without crashing', () => {
    shallow(<Suggestions children={children} time={staticDate} />)
  })
})
