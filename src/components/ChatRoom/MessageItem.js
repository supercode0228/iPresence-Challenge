import React from 'react';

const MessageItem = ({ data }) => {
	return (
		<div className="chat-room__message__item">
			<div className="chat-room__message__item__username">
				<span><strong>{data.sender.name}</strong></span>
				<span>{data.created_at}</span>
			</div>
			<div className="chat-room__message__item__content">
				<span>{data.content}</span>
			</div>
		</div>
	)
}

export default MessageItem;
