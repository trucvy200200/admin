import { Ability } from '@casl/ability'
import jwtDefaultConfig from '@auth/jwt/jwtDefaultConfig'
import { initialAbility } from './initialAbility'

//  Read ability from localStorage
// * Handles auto fetching previous abilities if already logged in user
// ? You can update this if you store user abilities to more secure place
// ! Anyone can update localStorage so be careful and please update this
const userData = JSON.parse(localStorage.getItem(jwtDefaultConfig.storageUserData))
const existingAbility = userData ? userData.ability : null

export default new Ability(existingAbility || initialAbility)
