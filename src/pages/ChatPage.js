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
    }
  }

  messagesEndRef = React.createRef()

  componentDidMount() {
    const { messagesActions } = this.props
    messagesActions.fetchMessagesRequest().then(() => {
      const { messages } = this.props
      this.setState({ messages: messages.data }, () => this.scrollToBottom())
    })
  }

  onSendMsg = (e, message) => {
    e.preventDefault()
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  render() {
    const { messages } = this.state
    return (
      <div className="chat-room">
        <div className="chat-room__message">
          <div className="chat-room__message__header">
            <h4>Chat Room</h4>
          </div>
          <div className="chat-room__message__body">
            <div className="chat-room__message__body__content">
              {/* {!isEmpty(messages) &&
                messages.map((message) => {
                  return <MessageItem data={message} key={message.id} />
                })} */}
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
