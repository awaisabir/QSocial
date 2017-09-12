import express from 'express'

const PORT = process.env.PORT || 4200
const app = express()

app.listen(PORT, () => console.log(`App listening on ${PORT}`))