export interface UserDetails {
    fullname: string
    email: string
    phone: string
    avatar_url?: string | File
}

export interface ProfileFormInput {
    id: keyof UserDetails
    label: string
    type: string
}

export interface ProfileFormState {
    fullname: string
    email: string
    phone: string
    avatar_url: File
}