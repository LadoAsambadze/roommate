import { GetPropertiesDataProps } from '@/graphql/query'
import { Language } from '@/graphql/typesGraphql'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { string, z } from 'zod'

export default function UploadValidator({ data }: { data?: GetPropertiesDataProps }) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    const cadastralCodeRegex = /^\d{2}.\d{2}.\d{2}.\d{3}.\d{3}$/
    const apartmentTypeValues = data?.getPropertyTypes?.map((item) => item.id) || []
    const propertyAmenityValues = data?.getPropertyAmenities?.map((item) => item.id) || []
    const propertyHeatingValues = data?.getHousingHeatingTypes?.map((item) => item.id) || []
    const propertySafetyValues = data?.getHousingLivingSafeties?.map((item) => item.id) || []
    const descriptionSchema = z.object({
        text: z.string().min(1),
        lang: z.enum([Language.En, Language.Ka]),
    })
    const titlesSchema = z.object({
        text: z.string().min(1),
        lang: z.enum([Language.En, Language.Ka]),
    })

    const FormSchema = z.object({
        propertyTypeId: z.enum(apartmentTypeValues as [string, ...string[]]),
        availableFrom: z.string().regex(dateRegex),
        minRentalPeriod: z.number().min(1),
        rooms: z.coerce.number().int().positive(),
        bathroomsInProperty: z.coerce.number().int().positive(),
        bathroomsInBedroom: z.number().min(1),
        totalFloors: z.coerce.number().int().positive(),
        floor: z.number().min(1),
        housingStatusId: z.string().min(1),
        housingConditionId: z.string().min(1),
        street: z.string().min(1),
        cadastralCode: z.string().regex(cadastralCodeRegex).optional(),
        hideCadastralCode: z.boolean().optional(),
        propertyAmenityIds: z.array(z.enum(propertyAmenityValues as [string, ...string[]])).min(1),
        housingHeatingTypeIds: z
            .array(z.enum(propertyHeatingValues as [string, ...string[]]))
            .min(1),
        housingLivingSafetyIds: z
            .array(z.enum(propertySafetyValues as [string, ...string[]]))
            .min(1),
        capacity: z.number().min(1),
        petAllowed: z.boolean(),
        partyAllowed: z.boolean(),
        withDeposit: z.boolean().optional(),
        propertyDepositId: z.string().min(1).nullish(),
        price: z.number().min(1),
        area: z.number().min(1),
        contactName: z.string().min(1),
        phone: z.string().refine((value) => isValidPhoneNumber(value)),
        descriptions: z.array(descriptionSchema),
        titles: z.array(titlesSchema),
        imageUploadFiles: z.union([z.any(), z.undefined()]),
        code: z.string().optional(),
    })

    type FormSchemaType = z.infer<typeof FormSchema>

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            propertyTypeId: undefined,
            availableFrom: undefined,
            minRentalPeriod: undefined,
            rooms: undefined,
            bathroomsInProperty: undefined,
            bathroomsInBedroom: undefined,
            totalFloors: undefined,
            floor: undefined,
            housingStatusId: undefined,
            housingConditionId: undefined,
            street: undefined,
            cadastralCode: undefined,
            hideCadastralCode: false,
            propertyAmenityIds: [],
            housingHeatingTypeIds: [],
            housingLivingSafetyIds: [],
            capacity: undefined,
            petAllowed: undefined,
            partyAllowed: undefined,
            withDeposit: false,
            propertyDepositId: null,
            price: undefined,
            area: undefined,
            contactName: undefined,
            phone: undefined,
            code: undefined,
            descriptions: [
                { text: '', lang: Language.En },
                { text: '', lang: Language.Ka },
            ],
            titles: [
                { text: '', lang: Language.En },
                { text: '', lang: Language.Ka },
            ],
            imageUploadFiles: [],
        },
    })

    return form
}
