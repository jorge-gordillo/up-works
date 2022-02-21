import { DataTypes } from "sequelize"
import { sequelize } from '../database/database'
import User from "./User"
import Profile from './Profile'
import Contact from './Contact'
import Title from './Title'
import Experience from './Experience'
import Education from './Education'
import Skill from './Skill'
import Idiom from './Idiom'
import Link from './Link'
import Course from './Course'
import Aplication from './Aplication'

const Regular = sequelize.define(
	"regulars",
	{
		uid: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		matricula: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true,
		}
	},
	{
		timestamps: false,
		underscored: true,
	}
)

User.hasOne(Regular, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade' })
Regular.belongsTo(User, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade' })

Regular.hasOne(Profile, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade'})
Regular.hasOne(Contact, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade'})
Regular.hasOne(Title, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade'})
Regular.hasMany(Experience, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade'})
Regular.hasMany(Education, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade'})
Regular.hasMany(Skill, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade'})
Regular.hasMany(Idiom, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade'})
Regular.hasMany(Link, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade'})
Regular.hasMany(Course, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade'})
Regular.hasMany(Aplication, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade'})

Profile.belongsTo(Regular, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade'})
Contact.belongsTo(Regular, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade'})
Title.belongsTo(Regular, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade'})
Experience.belongsTo(Regular, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade'})
Education.belongsTo(Regular, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade'})
Skill.belongsTo(Regular, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade'})
Idiom.belongsTo(Regular, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade'})
Link.belongsTo(Regular, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade'})
Course.belongsTo(Regular, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade'})
Aplication.belongsTo(Regular, {foreignKey:'uid', sourceKey:'uid', onDelete: 'cascade'})

export default Regular