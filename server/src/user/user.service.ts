import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types'
import { genSalt, hash } from 'bcryptjs'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { UpdateDto } from './dto/update.dto'
import { UserModel } from './user.model'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>
	) {}

	async byId(id: string): Promise<DocumentType<UserModel>> {
		const user = await this.userModel.findById(id).exec()

		if (user) return user
		throw new NotFoundException('User not found')
	}

	async updateProfile(_id: string, data: UpdateDto) {
		const user = await this.userModel.findById(_id)
		const isSameUser = await this.userModel.findOne({ email: data.email })

		if (isSameUser && String(_id) !== String(isSameUser._id)) {
			throw new NotFoundException('Email busy')
		}

		if (user) {
			if (data.password) {
				const salt = await genSalt(10)
				user.password = await hash(data.password, salt)
			}
			user.email = data.email
			if (data.isAdmin || data.isAdmin === false) user.isAdmin = data.isAdmin

			await user.save()
			return
		}

		throw new NotFoundException('User not found')
	}

	async getFavoriteMovies(_id: string) {
		return this.userModel
			.findById(_id, 'favorites')
			.populate({
				path: 'favorites',
				populate: {
					path: 'genres',
				},
			})
			.exec()
			.then((data) => {
				return data.favorites
			})
	}

	async toggleFavorite(movieId: Types.ObjectId, user: UserModel) {
		const { favorites, _id } = user

		await this.userModel.findByIdAndUpdate(_id, {
			favorites: favorites.includes(movieId)
				? favorites.filter((id) => String(id) !== String(movieId))
				: [...favorites, movieId],
		})
	}

	async getCount() {
		return this.userModel.find().count().exec()
	}

	async getAll(searchTerm?: string): Promise<DocumentType<UserModel>[]> {
		let options = {}

		if (searchTerm) {
			options = {
				$or: [
					{
						email: new RegExp(searchTerm, 'i'),
					},
				],
			}
		}

		return this.userModel
			.find(options)
			.select('-password -updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.exec()
	}

	async delete(id: string): Promise<DocumentType<UserModel> | null> {
		return this.userModel.findByIdAndDelete(id).exec()
	}
}
