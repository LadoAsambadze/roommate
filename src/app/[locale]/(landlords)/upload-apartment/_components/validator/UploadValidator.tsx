import { GetPropertiesDataProps } from '@/graphql/query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function UploadValidator({ data }: { data?: GetPropertiesDataProps }) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    const apartmentTypeValues = data?.getPropertyTypes?.map((item) => item.id) || []
    const propertyAmenityValues = data?.getPropertyAmenities?.map((item) => item.id) || []
    const propertyHeatingValues = data?.getHousingHeatingTypes?.map((item) => item.id) || []
    const propertySafetyValues = data?.getHousingLivingSafeties?.map((item) => item.id) || []

    const FormSchema = z.object({
        apartmentType: z.enum(apartmentTypeValues as [string, ...string[]]),
        date: z.string().regex(dateRegex),
        minRentMonth: z.coerce.number().positive(),
        apartmentRooms: z.coerce.number().int().positive(),
        bathroomsInProperty: z.coerce.number().int().positive(),
        bathroomsInBedroom: z.coerce.number().int().positive(),
        floorAmount: z.coerce.number().int().positive(),
        flatFloor: z.coerce.number().int().positive(),
        status: z.string().min(1),
        condition: z.string().min(1),
        address: z.string().min(1),
        cadastralCode: z.string().min(1),
        showCadastral: z.boolean().optional(),
        propertyAmenities: z.array(z.enum(propertyAmenityValues as [string, ...string[]])).min(1),
        propertyHeating: z.array(z.enum(propertyHeatingValues as [string, ...string[]])).min(1),
        propertySafety: z.array(z.enum(propertySafetyValues as [string, ...string[]])).min(1),
        maxPersonLiving: z.string().min(1),
        petStatus: z.boolean().optional(),
        partyStatus: z.boolean().optional(),
    })

    type FormSchemaType = z.infer<typeof FormSchema>

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            apartmentType: undefined,
            date: undefined,
            minRentMonth: undefined,
            apartmentRooms: undefined,
            bathroomsInProperty: undefined,
            bathroomsInBedroom: undefined,
            floorAmount: undefined,
            flatFloor: undefined,
            status: undefined,
            condition: undefined,
            address: undefined,
            cadastralCode: undefined,
            showCadastral: false,
            propertyAmenities: [],
            propertyHeating: [],
            propertySafety: [],
            maxPersonLiving: undefined,
            petStatus: undefined,
            partyStatus: undefined,
        },
    })

    return form
}
