import React from 'react'
import { formatCarbonDate } from '../../utils/helpers'

const MessageItem = ({ data }) => {
  const date = formatCarbonDate(parseInt(data.timestamp))
  const time = date.split(' ')[1]
  return (
    <div
      id={`message-${data.id}`}
      className={`chat-room__message__item ${
        data.direction === 'out' ? 'justify-content-end ml-5' : 'mr-5'
      }`}
    >
      <div className="chat-room__message__item__content">
        <div className="chat-room__message__item__text">
          <span data-testid="text">
            <strong>{data.text}</strong>
          </span>
        </div>
        <div className="chat-room__message__item__status">
          <span data-testid="time" className="time">
            {time}
          </span>
          {data.direction === 'out' && (
            <span data-testid="status" className="icon">
              {data.status === 'sent' ? (
                <i className="fa fa-check icon__sent" />
              ) : data.status === 'received' ? (
                <i className="fa fa-check-double icon__received" />
              ) : (
                <i className="fa fa-check-double icon__read" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageItem
