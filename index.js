const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

let notes = [{
  'userId': 1,
  'id': 1,
  'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  'body': 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
},
{
  'userId': 1,
  'id': 2,
  'title': 'qui est esse',
  'body': 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
},
{
  'userId': 1,
  'id': 3,
  'title': 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
  'body': 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut'
}]

app.get('/', (req,res) =>{
  res.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (req, res) =>{
  res.json(notes)
})

app.delete('/api/notes/:id', (req, res) =>{
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})


app.get('/api/notes/:id', (req, res) =>{
  const id = req.params.id
  const note = notes.find(note => note.id === parseInt(id))
  if(note){
    res.json(note)
  }else{
    res.status(404).end()
  }

})

app.post('/api/notes', (req, res) =>{
  const note = req.body
  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId +1,
    content: note.content,
    important: true,
    date: new Date().toISOString()
  }

  notes = [...notes , newNote]
  res.status(201).json(newNote)
    
})

const PORT = process.env.PORT || 3001
app.listen(PORT)