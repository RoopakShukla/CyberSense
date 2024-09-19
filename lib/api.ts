interface Prompt {
  text: string
}

function getPrompt(): Promise<Prompt[]> {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')
  headers.set('X_Custom-Header', 'CustomValue')

  const request: RequestInfo = new Request('./users.json', {
    method: 'GET',
    headers: headers
  })

  return fetch(request)
  .then(res => res.json())
  .then(res => {
    return res as Prompt[]
  })
}

const result = document.getElementById('result')
if (!result) {
  throw new Error('Element with id `result` not found')
}

getPrompt()
  .then(prompts => {
    result.innerHTML = prompts.map(p => p.text).toString()
  })