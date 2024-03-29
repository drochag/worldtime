import React from 'react'
import { shallow } from 'enzyme'
import App from '.'

describe('App', () => {
  it('renders without crashing', () => {
    shallow(<App />)
  })

  it('contains a title', () => {
    const app = shallow(<App />)
    const title = (
      <h1 className="text-4xl md:text-6xl text-secondary duration-300 transition-colors ease-linear dark:text-darkSecondary leading-tight mt-12 text-center">
        Worldtime Clock
      </h1>
    )
    expect(app.contains(title)).toEqual(true)
  })
})
