let setTitle = (title) => {
  return { type: 'TITLE', title: title }
}

let setText = (text) => {
  return { type: 'TEXT', text: text }
}

let setDate = (date) => {
  return { type: 'DATE', date: date }
}

let setTime = (time) => {
  return { type: 'TIME', time: time }
}
export {setTitle, setText, setDate, setTime}
