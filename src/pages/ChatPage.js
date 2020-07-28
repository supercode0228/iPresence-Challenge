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
    }
  }

  messagesEndRef = React.createRef()

  componentDidMount() {
    const { messagesActions } = this.props
    messagesActions.fetchMessagesRequest().then(() => {
      const { messages } = this.props
      this.setState(
        {
          messages: [...messages.data.messages, ...this.state.messages],
          unread: messages.data.unread,
        },
        () => this.scrollToBottom(),
      )
    })
  }

  onSendMsg = (e, message) => {
    e.preventDefault()
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  render() {
    const { messages, unread } = this.state
    return (
      <div className="chat-room">
        <div className="chat-room__message">
          <div className="chat-room__message__header">
            <h6>User101 ({unread} new messages)</h6>
          </div>
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
