import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { ProductsController } from './controllers/index.js'

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log('Connected to MongoDB')
	})
	.catch(err => {
		console.log('Error MongoDB', err)
	})

const app = express()
const port = 3001

app.use(express.json())
app.use(cors())

app.get('/products', ProductsController.getAll)
app.get('/products/:id', ProductsController.getById)

app.listen(process.env.PORT || 3001, err => {
	if (err) {
		return console.log('something bad happened', err)
	}
	console.log(`App listening on port ${port}`)
})
