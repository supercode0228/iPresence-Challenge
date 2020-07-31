import React from 'react'
import { render } from '@testing-library/react'
import { MessageItem } from './components/ChatRoom'

test('message item text exist', () => {
  const { getByTestId } = render(
    <MessageItem
      data={{
        id: 1,
        direction: 'in',
        status: 'read',
        timestamp: '1577834102',
        text: 'Alice was beginning.',
      }}
    />,
  )
  expect(getByTestId(/text/i).textContent).toBe('Alice was beginning.')
})

test('message item time exist', () => {
  const { getByTestId } = render(
    <MessageItem
      data={{
        id: 1,
        direction: 'in',
        status: 'read',
        timestamp: '1577834102',
        text: 'Alice was beginning.',
      }}
    />,
  )
  expect(getByTestId(/time/i)).toBeTruthy()
})

test('message item status exist', () => {
  const { getByTestId } = render(
    <MessageItem
      data={{
        id: 1,
        direction: 'out',
        status: 'read',
        timestamp: '1577834102',
        text: 'Alice was beginning.',
      }}
    />,
  )
  expect(getByTestId(/status/i)).toBeTruthy()
})
