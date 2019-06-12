import React from 'react'
import ReactDOM from 'react-dom'
import Form from 'react-jsonschema-form'

// const schema = {
//   title: 'Todo',
//   type: 'object',
//   required: ['title'],
//   properties: {
//     title: {type: 'string', title: 'Title', default: 'A new task'},
//     done: {type: 'boolean', title: 'Done?', default: false}
//   }
// }
// <Form schema={schema}
//         onChange={console.log('changed')}
//         onSubmit={console.log('submitted')}
//         onError={console.log('errors')} />

const App = () => (
  <div>
    client
  </div>
)

ReactDOM.render(
  <App />,
  document.getElementById('app')
)