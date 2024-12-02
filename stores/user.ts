import {defineStore} from "pinia";
import type {ProfileFormInput, UserDetails} from "~/types/user";
import {z} from "zod";
import {ref, computed} from 'vue'

const appPrefix = process.env.NODE_ENV === 'development' ? '/' : '/weather-app/';

export const useUser = defineStore('user', () => {
    const formInputs: Ref<ProfileFormInput[]> = ref([
        {
            id: 'fullname',
            label: 'Full name',
            type: 'text'
        },
        {
            id: 'email',
            label: 'Email',
            type: 'email'
        },
        {
            id: 'phone',
            label: 'Phone Number',
            type: 'text'
        }
    ])
    const userDetails: Ref<UserDetails> = ref({
        fullname: 'Jane Doe',
        email: 'younes@example.com',
        phone: '0123456789',
        avatar_url: `${appPrefix}images/avatar-sample.jpg`
    });

    const formSchema = z.object({
        fullname: z
            .string()
            .min(3, {message: "Full Name must be at least 3 characters long"})
            .max(50, {message: "Full Name must be 50 characters or less"}),
        email: z
            .string()
            .min(1, {message: "Email is required"})
            .email({message: "Invalid email address"}),
        phone: z
            .string()
            .min(1, {message: "Phone is required"})
            .max(10,{message: "Invalid phone number"}),
        avatar_url: z.string()
    });
    const formState: Ref<UserDetails> = ref({...userDetails.value});
    const formErrors: Ref<UserDetails> = ref({
        fullname: '',
        email: '',
        phone: '',
    });

    const isFormLoading = ref(false);
    const isProfileFormEditable = ref(false);

    const toggleProfileFormEditable = () => {
        isFormLoading.value = true;
        setTimeout(() => {
            isProfileFormEditable.value = !isProfileFormEditable.value;
            isFormLoading.value = false;
        }, 300)
    }

    const actionButtonText = computed(() => isProfileFormEditable.value ? "Submit" : "Edit");

    const handleProfileSubmission = () => {
        console.log('Submission: ', formState.value);
    }

    const validateField = (field: keyof UserDetails) => {
        const result = formSchema.shape[field].safeParse(
            formState.value[field]
        );
        formErrors.value[field] = result.success ? '' : result.error.errors[0].message;
    };
    const avatarPreview = ref('')

    const handleAvatarChange = (event: Event) => {
        const target = event.target as HTMLInputElement
        const avatar = target.files?.[0]

        if (avatar) {
            formState.value.avatar_url = avatar

            const reader = new FileReader();
            reader.onloadend = () => {
                avatarPreview.value = reader.result as string;
            };
            reader.readAsDataURL(avatar);
        }
    }

    const getProfilePictureUrl = () => {
        return avatarPreview.value || userDetails.value['avatar_url'];
    }

    return {
        userDetails,
        isProfileFormEditable,
        toggleProfileFormEditable,
        handleProfileSubmission,
        validateField,
        handleAvatarChange,
        getProfilePictureUrl,
        actionButtonText,
        formInputs,
        isFormLoading,
        formSchema,
        formState,
        formErrors,
        avatarPreview
    }
})