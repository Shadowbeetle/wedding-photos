import { extendObservable, action } from 'mobx'
import Api from '../util/api'
import page from 'page'
import { omit } from 'lodash'

const USER_VALIDATION_ERRORS = [
  'emailAlreadyRegistered',
  'accessionNotFound',
  'kitNotFound',
  'invalidEmailFormat'
]

class Store {
  constructor () {
    extendObservable(this, {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        kitNumber: '',
        gender: 'male',
        dateOfBirth: '',
        password: ''
      },
      isPasswordTooShort: false,
      fetchingUserValidation: false,
      sendingRegistration: false,
      emailAlreadyRegistered: false,
      invalidEmailFormat: false,
      accessionNotFound: false,
      kitNotFound: false
    })
  }

  verifyNewUser () {
    this.fetchingUserValidation = true
    return Api.verifyNewUser(this.user.email, this.user.kitNumber)
      .then(action((res) =>  {
        this.fetchingUserValidation = false
        page('/choose-password')
      }))
      .catch(action((err) => {
        this.fetchingUserValidation = false
        const { data: responseData } = err.response
        if (responseData.cause === 'EmailAlreadyRegistered') {
          this.setUserValidationError('emailAlreadyRegistered')
        } else if (responseData.cause === 'KitNotFound') {
          this.setUserValidationError('kitNotFound')
        } else if (responseData.cause === 'AccessionNotFound') {
          this.setUserValidationError('accessionNotFound')
        } else if (responseData.cause === 'InvalidEmailFormat') {
          this.setUserValidationError('invalidEmailFormat')
        } else {
          console.error(err)
        }
      }))
  }

  setUserValidationError (currentErrorKey) {
    this[ currentErrorKey ] = true
    USER_VALIDATION_ERRORS
      .filter((errorKey) => errorKey !== currentErrorKey)
      .forEach((errorKey) => {
        if (this[ errorKey ]) {
          this[ errorKey ] = false
        }
      })
  }

  sendRegister () {
    const user = Object.assign({}, omit(this.user, 'kitNumber'), { dateOfBirth: new Date(this.user.dateOfBirth) })
    this.sendingRegistration = true
    return Api.register(user)
      .then((res) => {
        this.sendingRegistration = false
        alert('Successful registration')
      })
      .catch((err) => {
        const { data: responseData } = err.response
        this.sendingRegistration = false
        if (responseData.cause === 'EmailAlreadyRegistered') {
          this.setUserValidationError('emailAlreadyRegistered')
          page('/verify-kit')
        } else {
          console.error(err)
        }
      })
  }
}

const globalStore = new Store()
export { globalStore }
