![Maintaner](https://img.shields.io/badge/maintainer-extrawest.com-blue)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/extrawest/firebase-chat-list-component/graphs/commit-activity)
![GitHub release](https://img.shields.io/github/v/release/extrawest/firebase-chat-list-component)
[![GitHub tag](https://img.shields.io/github/v/tag/extrawest/firebase-chat-list-component)](https://github.com/extrawest/firebase-chat-list-component/tags/)
# Extrawest Firebase Chat List Component
Extrawest Chat List Component for Firebase

## Installation

Extrawest Firebase Chat List Component requires **React 16.8.0 or later** and **Firebase v8.0.0 or later**.

```bash
# with npm
npm install --save extrawest-firebase-chat-list-component

# with yarn
yarn add extrawest-firebase-chat-list-component
```

This assumes that you’re using the [npm](https://npmjs.com) or [yarn](https://yarnpkg.com/) package managers with a module bundler like [Webpack](https://webpack.js.org/) or [Browserify](http://browserify.org/) to consume [CommonJS](http://webpack.github.io/docs/commonjs.html) modules.

## Demo

[Check a simple live demo](https://extrawest-firebase-chat.web.app/)

## Available settings

| Prop  | Type | Description |
| ------------- | ------------- |  ------------- |
| chatMessagePlaceholder | string | Placeholder message for input field  |
| loading | boolean | status if list of messages loading or not  |
| messages | func | list of available message |
| handleSubmitMessage | func | callback to handle submit a new message  |
| currentAuthUid | string or undefined | current user id to mark user messages |

## How to use

```jsx

import ChatBox from "extrawest-firebase-chat-list-component";

<ChatBox
  chatMessagePlaceholder="Type a message"
  messages={snapshots}
  loading={loading}
  handleSubmitMessage={handleSubmit}
  currentAuthUid={currentUserId}
/>

```

## Firebase Database rules

Before using chat, you need to configure firebase application and rules for Realtime Database

```
{
  "rules": {
    "chat": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$messageId": {
       ".validate": "newData.hasChildren(['message', 'timestamp', 'author']) && newData.child('message').isString() && newData.child('author').isString() && newData.child('timestamp').isNumber()"
      }  
    }
  }
}
```

## License

- See [LICENSE](/LICENSE)

---
Created by Extrawest React.js Team
[Extrawest.com](https://www.extrawest.com), 2021
---