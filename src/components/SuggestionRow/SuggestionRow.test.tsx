import React from 'react'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import info from '../Suggestions/info.json'
import SuggestionRow from '.'

const onRemove = sinon.spy()

describe('SuggestionRow', () => {
  it('renders without crashing', () => {
    shallow(
      <SuggestionRow
        difference={0}
        idx={0}
        suggestion={info[0]}
        onRemove={onRemove}
        time={new Date()}
      />
    )
  })

  it('contains a trash icon', () => {
    const wrapper = shallow(
      <SuggestionRow
        difference={0}
        idx={0}
        suggestion={info[0]}
        onRemove={onRemove}
        time={new Date()}
      />
    )
    expect(wrapper.find('.fa-trash')).toBeTruthy()
  })

  it('contains a home icon if idx is 0', () => {
    const wrapper = shallow(
      <SuggestionRow
        difference={0}
        idx={0}
        suggestion={info[0]}
        onRemove={onRemove}
        time={new Date()}
      />
    )
    expect(wrapper.find('.fa-home')).toBeTruthy()
  })

  describe('not fisrt suggestion', () => {
    const wrapper = shallow(
      <SuggestionRow
        difference={-5}
        idx={1}
        suggestion={info[0]}
        onRemove={onRemove}
        time={new Date()}
      />
    )

    it('does not contain a home icon if idx is not 0', () => {
      expect(wrapper.contains('.fa-home')).toBeFalsy()
    })

    it('contains the timezone difference when idx is not 0', () => {
      expect(wrapper.find('.circle').text()).toEqual('-5')
    })
  })

  it('should call onRemove when clicking the trash icon', () => {
    const wrapper = mount(
      <SuggestionRow
        difference={-5}
        idx={1}
        suggestion={info[0]}
        onRemove={onRemove}
        time={new Date()}
      />
    )

    wrapper.find('.fa-trash').simulate('click')
    expect(onRemove.calledOnce).toBe(true)
  })
})
