import React from 'react'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import Hour from '.'

describe('Hour', () => {
  const staticDate = new Date(1593019755664) // Wed Jun 24 2020 12:29:15 GMT-0500 (Central Daylight Time)
  it('renders without crashing', () => {
    const setHighlighted = sinon.spy()
    shallow(<Hour difference={0} idx={1} setHighlighted={setHighlighted} time={staticDate} />)
  })

  it('should call setHighlighted when mouse enters', () => {
    const setHighlighted = sinon.spy()
    const wrapper = mount(
      <Hour difference={0} idx={1} setHighlighted={setHighlighted} time={staticDate} />
    )

    wrapper.simulate('mouseenter')
    expect(setHighlighted.calledOnce).toBe(true)
    expect(setHighlighted.calledWith(1)).toBe(true)
  })

  it('should render proper info / index set as current time', () => {
    const setHighlighted = sinon.spy()
    const wrapper = shallow(
      <Hour difference={0} idx={1} setHighlighted={setHighlighted} time={staticDate} />
    )
    expect(wrapper.find('.hour').text()).toEqual('12')
    expect(wrapper.find('.time').text()).toEqual('pm')
  })

  it('should render proper info / index set as current time with -1 of difference', () => {
    const setHighlighted = sinon.spy()
    const wrapper = shallow(
      <Hour difference={-1} idx={1} setHighlighted={setHighlighted} time={staticDate} />
    )
    expect(wrapper.find('.hour').text()).toEqual('11')
    expect(wrapper.find('.time').text()).toEqual('am')
  })

  it('should render proper info / index set as the first element with -1 of difference', () => {
    const setHighlighted = sinon.spy()
    const wrapper = shallow(
      <Hour difference={-1} idx={0} setHighlighted={setHighlighted} time={staticDate} />
    )
    expect(wrapper.find('.hour').text()).toEqual('10')
    expect(wrapper.find('.time').text()).toEqual('am')
  })

  it('should render proper info and classes / index set as the first element', () => {
    const setHighlighted = sinon.spy()
    const wrapper = shallow(
      <Hour difference={0} idx={0} setHighlighted={setHighlighted} time={staticDate} />
    )
    expect(wrapper.find('.hour').text()).toEqual('11')
    expect(wrapper.find('.time').text()).toEqual('am')
    expect(wrapper.hasClass('rounded-l-lg')).toBeTruthy()
  })

  it('should render proper info and classes / index set as the last element', () => {
    const setHighlighted = sinon.spy()
    const wrapper = shallow(
      <Hour difference={0} idx={23} setHighlighted={setHighlighted} time={staticDate} />
    )
    expect(wrapper.find('.hour').text()).toEqual('10')
    expect(wrapper.find('.time').text()).toEqual('am')
    expect(wrapper.hasClass('rounded-r-lg')).toBeTruthy()
  })

  it('should render proper info and classes / index set as the last from day', () => {
    const setHighlighted = sinon.spy()
    const wrapper = shallow(
      <Hour difference={0} idx={12} setHighlighted={setHighlighted} time={staticDate} />
    )
    expect(wrapper.find('.hour').text()).toEqual('11')
    expect(wrapper.find('.time').text()).toEqual('pm')
    expect(wrapper.hasClass('rounded-r-lg')).toBeTruthy()
  })

  it('should render proper info and classes / index set as the first from day', () => {
    const setHighlighted = sinon.spy()
    const wrapper = shallow(
      <Hour difference={0} idx={13} setHighlighted={setHighlighted} time={staticDate} />
    )

    expect(wrapper.find('.hour').length).toBe(0)
    expect(wrapper.find('.time').length).toBe(0)
    expect(wrapper.find('.month').text()).toEqual('Jun')
    expect(wrapper.find('.day').text()).toEqual('Thu')
    expect(wrapper.find('.date').text()).toEqual('25')
    expect(wrapper.hasClass('rounded-l-lg')).toBeTruthy()
  })

  it("should be dark if it's on the evening or night", () => {
    const setHighlighted = sinon.spy()
    const wrapper = shallow(
      <Hour difference={0} idx={13} setHighlighted={setHighlighted} time={staticDate} />
    )

    expect(wrapper.hasClass('bg-blue-900')).toBeTruthy()
    expect(wrapper.hasClass('text-white')).toBeTruthy()
  })

  it("should be ligher if it's on the afternoon or morning", () => {
    const setHighlighted = sinon.spy()
    const wrapper = shallow(
      <Hour difference={0} idx={7} setHighlighted={setHighlighted} time={staticDate} />
    )

    expect(wrapper.hasClass('bg-blue-200')).toBeTruthy()
  })

  it("should be ligher if it's on the afternoon or morning", () => {
    const setHighlighted = sinon.spy()
    const wrapper = shallow(
      <Hour difference={0} idx={1} setHighlighted={setHighlighted} time={staticDate} />
    )

    expect(wrapper.hasClass('bg-gray-200')).toBeTruthy()
  })
})
