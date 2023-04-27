import Item from '../models/Item.js'

export const getAll = async (req, res) => {
	try {
		const {
			_page = 1,
			_limit,
			category,
			id: modalId,
			search: searches,
			price_gte: lowestPrice,
			price_lte: highestPrice,
			_sort: sortById,
			_order: order = 'desc',
		} = req.query

		const filter = {}

		if (category) {
			filter.category = category
		}
		if (modalId) {
			filter.id = modalId
		}

		if (lowestPrice && highestPrice) {
			filter.price = {
				$gte: lowestPrice,
				$lte: highestPrice,
			}
		}

		if (searches) {
			filter.name = {
				$regex: new RegExp(searches, 'i'),
			}
		}

		const sortOrder = order === 'desc' ? -1 : 1

		const itemsCount = await Item.countDocuments(filter)

		const totalPages = Math.ceil(itemsCount / _limit)

		const currentPage = parseInt(_page, 10) || 1

		const nextPage = currentPage < totalPages ? currentPage + 1 : null

		const prevPage = currentPage > 1 ? currentPage - 1 : null

		const startIndex = (_page - 1) * _limit

		const items = await Item.find(filter)
			.sort({ [sortById]: sortOrder })
			.limit(_limit)
			.skip(startIndex)

		res.json(items)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Failed to get items',
		})
	}
}

export const getById = async (req, res) => {
	try {
		const productId = req.params.id
		await Item.findById(productId).then((product, err) => {
			if (err) {
				return res.status(500).json({ error: 'Server error' })
			}
			if (!product) {
				return res.status(404).json({ error: 'Product not found' })
			}
			res.json(product)
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Failed to get post',
		})
	}
}
