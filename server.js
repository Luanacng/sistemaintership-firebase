const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 8084

app.use(express.static(__dirname + '/dist/projetoEstagio'))
app.use(cors())


app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/projetoEstagio/index.html')
})

app.listen(PORT, () =>{
    console.log('SERVIDOR INICIADO NA PORTA ' + PORT);
})