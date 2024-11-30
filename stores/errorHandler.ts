import { ref } from 'vue'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'

interface ErrorEntry {
    id: string
    message: string
    type: 'error' | 'info'
    timestamp: number
}

export const useErrorHandler = defineStore('errorHandler', () => {
    const errors = ref<ErrorEntry[]>([])

    const NOTIFICATION_OPTIONS = {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000,
    }
    const DEDUPLICATION_WINDOW = 60 * 1000 // 1 minute

    const normalizeErrorMessage = (message: string): string => {
        return message
            .toLowerCase()
            .replace(/[^\w\s]/g, '') // Remove special characters
            .trim()
    }

    const findSimilarError = (newMessage: string) => {
        const normalizedNewMessage = normalizeErrorMessage(newMessage)
        const currentTime = Date.now()

        return errors.value.find(error =>
            normalizeErrorMessage(error.message) === normalizedNewMessage &&
            currentTime - error.timestamp < DEDUPLICATION_WINDOW
        )
    }

    const handleError = (
        error: any,
        options: {
            type?: 'error' | 'info'
            customMessage?: string
        } = {}
    ) => {
        const { type = 'error', customMessage } = options

        const errorMessage = customMessage ||
            error.response?.data?.message ||
            error.message ||
            'An unexpected error occurred'

        const existingError = findSimilarError(errorMessage)

        if (existingError) {
            return
        }

        const errorEntry: ErrorEntry = {
            id: crypto.randomUUID(),
            message: errorMessage,
            type,
            timestamp: Date.now()
        }
        errors.value.push(errorEntry)

        switch(type) {
            case 'info':
                toast.info(errorMessage, NOTIFICATION_OPTIONS)
                break
            default:
                toast.error(errorMessage, NOTIFICATION_OPTIONS)
        }
    }

    return {
        errors,
        handleError
    }
})