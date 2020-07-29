import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isEmpty } from 'lodash'

import { MessageInput, MessageItem } from '../components/ChatRoom'
import { messagesActions } from '../actions'

class ChatPage extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      unread: 0,
      page: 0,
      isUpdating: false,
    }
  }

  messagesEndRef = React.createRef()

  componentDidMount() {
    this.__setMessageData()
    const message__container = document.querySelector(
      '.chat-room__message__body',
    )
    message__container.addEventListener('scroll', () => {
      if (message__container.scrollTop === 0) {
        this.__setMessageData(message__container.scrollHeight)
      }
    })
  }

  __setMessageData = (oldHeight) => {
    const { messagesActions } = this.props
    const { page } = this.state
    this.setState({ isUpdating: true })
    messagesActions.fetchMessagesRequest(page + 1).then(() => {
      const { messages } = this.props
      this.setState(
        {
          messages: [...messages.data.messages, ...this.state.messages],
          unread: messages.data.unread,
          page: page + 1,
          isUpdating: false,
        },
        () =>
          page === 0 ? this.scrollToBottom() : this.scrollToOffset(oldHeight),
      )
    })
  }

  onSendMsg = (e, content) => {
    e.preventDefault()
    const { messagesActions } = this.props
    const { messages } = this.state
    const newId = parseInt(messages[messages.length - 1].id) + 1
    const params = {
      id: newId,
      direction: 'out',
      status: 'sent',
      timestamp: Date.now().valueOf(),
      text: content,
    }
    messagesActions.postMessageRequest(params).then(() => {
      const { message } = this.props
      this.setState({ messages: [...this.state.messages, message.data] }, () =>
        this.scrollToBottom(),
      )
    })
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  scrollToOffset = (oldHeight = 0) => {
    const message__container = document.querySelector(
      '.chat-room__message__body',
    )
    const offset = message__container.scrollHeight - oldHeight
    message__container.scrollTop = offset
  }

  render() {
    const { messages, unread, isUpdating } = this.state
    return (
      <div className="chat-room">
        <div className="chat-room__message">
          <div className="chat-room__message__header">
            <h6>User101 ({unread} new messages)</h6>
          </div>
          {isUpdating && (
            <div className="chat-room__message__updating">
              Updating conversations...
            </div>
          )}
          <div className="chat-room__message__body">
            <div className="chat-room__message__body__content">
              {!isEmpty(messages) &&
                messages.map((message) => {
                  return <MessageItem data={message} key={message.id} />
                })}
              <div ref={this.messagesEndRef} />
            </div>
            <MessageInput onSendMsg={this.onSendMsg} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    message: state.message,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    messagesActions: bindActionCreators(messagesActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)
