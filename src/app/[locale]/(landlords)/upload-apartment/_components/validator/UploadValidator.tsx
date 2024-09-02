import { GetPropertiesDataProps } from '@/graphql/query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { string, z } from 'zod'

export default function UploadValidator({ data }: { data?: GetPropertiesDataProps }) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    const apartmentTypeValues = data?.getPropertyTypes?.map((item) => item.id) || []
    const propertyAmenityValues = data?.getPropertyAmenities?.map((item) => item.id) || []
    const propertyHeatingValues = data?.getHousingHeatingTypes?.map((item) => item.id) || []
    const propertySafetyValues = data?.getHousingLivingSafeties?.map((item) => item.id) || []

    const FormSchema = z.object({
        propertyTypeId: z.enum(apartmentTypeValues as [string, ...string[]]),
        availableFrom: z.string().regex(dateRegex),
        minRentalPeriod: z.number().min(1),
        rooms: z.coerce.number().int().positive(),
        bathroomsInProperty: z.coerce.number().int().positive(),
        bathroomsInBedroom: z.number().min(1),
        totalFloors: z.coerce.number().int().positive(),
        floor: z.number().min(1),
        status: z.string().min(1),
        condition: z.string().min(1),
        street: z.string().min(1),
        cadastralCode: z.string().min(1),
        showCadastral: z.boolean().optional(),
        propertyAmenityIds: z.array(z.enum(propertyAmenityValues as [string, ...string[]])).min(1),
        housingHeatingTypeIds: z
            .array(z.enum(propertyHeatingValues as [string, ...string[]]))
            .min(1),
        housingLivingSafetyIds: z
            .array(z.enum(propertySafetyValues as [string, ...string[]]))
            .min(1),
        maxPersonLiving: z.string().min(1),
        petAllowed: z.boolean(),
        partyAllowed: z.boolean(),
        withDeposit: z.boolean().optional(),
        depositAmount: z.string().min(1),
        price: z.number().min(1),
        area: z.number().min(1),
        contactName: z.string().min(1),
        phone: z.string().refine((value) => isValidPhoneNumber(value)),
        description: z.string().min(1),
        images: z.union([z.any(), z.undefined()]),
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
            status: undefined,
            condition: undefined,
            street: undefined,
            cadastralCode: undefined,
            showCadastral: false,
            propertyAmenityIds: [],
            housingHeatingTypeIds: [],
            housingLivingSafetyIds: [],
            maxPersonLiving: undefined,
            petAllowed: undefined,
            partyAllowed: undefined,
            withDeposit: false,
            depositAmount: undefined,
            price: undefined,
            area: undefined,
            contactName: undefined,
            phone: undefined,
            description: undefined,
            images: [],
        },
    })

    return form
}
