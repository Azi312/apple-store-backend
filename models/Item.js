import mongoose from 'mongoose'

const memorySchema = new mongoose.Schema({
	value: Number,
	price: Number,
})

const infoSchema = new mongoose.Schema({
	icon: String,
	text: String,
})

const colorsSchema = new mongoose.Schema({
	value: String,
	name: String,
	images: [String],
})

const itemSchema = new mongoose.Schema({
	id: Number,
	name: String,
	category: Number,
	price: Number,
	discount: Number,
	rating: Number,
	memory: [memorySchema],
	info: [infoSchema],
	colors: [colorsSchema],
})

export default mongoose.model('Item', itemSchema)
