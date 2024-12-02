import {setActivePinia, createPinia} from 'pinia'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import {useUser} from '~/stores/user'

const appPrefix = process.env.NODE_ENV === 'development' ? '/' : '/weather-app/';

describe('User Store', () => {
    let userStore: ReturnType<typeof useUser>;

    beforeEach(() => {
        setActivePinia(createPinia())
        userStore = useUser()
    });

    describe('Initial State', () => {
        it('should have correct initial user details', () => {
            expect(userStore.userDetails).toEqual({
                fullname: 'Jane Doe',
                email: 'younes@example.com',
                phone: '0123456789',
                avatar_url: `${appPrefix}images/avatar-sample.jpg`
            })
        })

        it('should have predefined form inputs', () => {
            expect(userStore.formInputs).toHaveLength(3)
            expect(userStore.formInputs.map(input => input.id))
                .toEqual(['fullname', 'email', 'phone'])
        })
    })

    describe('Profile Form Editability', () => {
        it('should toggle profile form editability', async () => {
            const initialEditableState = userStore.isProfileFormEditable

            vi.useFakeTimers()

            userStore.toggleProfileFormEditable()

            vi.runAllTimers()

            expect(userStore.isProfileFormEditable).toBe(!initialEditableState)
            expect(userStore.isFormLoading).toBe(false)

            vi.useRealTimers()
        })

        it('should return correct action button text', () => {
            expect(userStore.actionButtonText).toBe('Edit')

            userStore.isProfileFormEditable = true

            expect(userStore.actionButtonText).toBe('Submit')
        })
    })

    describe('Form Validation', () => {
        it('should have errors with invalid user state', () => {
            userStore.formState = {
                fullname: 'Jo',
                email: 'invalid-email',
                phone: '123456789012',
                avatar_url: ''
            }

            userStore.validateField('fullname')
            userStore.validateField('email')
            userStore.validateField('phone')

            expect(userStore.formErrors.fullname).toBe('Full Name must be at least 3 characters long')
            expect(userStore.formErrors.email).toBe('Invalid email address')
            expect(userStore.formErrors.phone).toBe('Invalid phone number')
        })

        it('should have no errors with valid user state', () => {
            userStore.formState = {
                fullname: 'John Doe',
                email: 'john@example.com',
                phone: '1234567890',
                avatar_url: ''
            }

            userStore.validateField('fullname')
            userStore.validateField('email')
            userStore.validateField('phone')

            expect(userStore.formErrors.fullname).toBe('')
            expect(userStore.formErrors.email).toBe('')
            expect(userStore.formErrors.phone).toBe('')
        })
    })

    describe('Avatar Handling', () => {
        it('should get profile picture URL', () => {
            expect(userStore.getProfilePictureUrl()).toBe(`${appPrefix}images/avatar-sample.jpg`)

            userStore.avatarPreview = 'data:image/png;base64,newImageData'
            expect(userStore.getProfilePictureUrl()).toBe('data:image/png;base64,newImageData')
        })
    })

    describe('Profile Submission', () => {
        it('should log form submission', () => {
            const consoleSpy = vi.spyOn(console, 'log')

            userStore.handleProfileSubmission()

            expect(consoleSpy).toHaveBeenCalledWith('Submission: ', expect.any(Object))
        })
    })
})