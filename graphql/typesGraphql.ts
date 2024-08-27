export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
    [_ in K]?: never
}
export type Incremental<T> =
    | T
    | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string }
    String: { input: string; output: string }
    Boolean: { input: boolean; output: boolean }
    Int: { input: number; output: number }
    Float: { input: number; output: number }
    Date: { input: any; output: any }
    DateTime: { input: any; output: any }
    StringTuple: { input: any; output: any }
}

export type AnswerObject = {
    __typename?: 'AnswerObject'
    createdAt: Scalars['DateTime']['output']
    deletedAt?: Maybe<Scalars['DateTime']['output']>
    id: Scalars['ID']['output']
    position: Scalars['Int']['output']
    questionId: Scalars['ID']['output']
    translations: Array<AnswerTranslatedObject>
    updatedAt: Scalars['DateTime']['output']
}

export type AnswerTranslatedObject = {
    __typename?: 'AnswerTranslatedObject'
    answerId: Scalars['ID']['output']
    createdAt: Scalars['DateTime']['output']
    id: Scalars['ID']['output']
    lang: Language
    title: Scalars['String']['output']
    updatedAt: Scalars['DateTime']['output']
}

export type AnsweredQuestionInput = {
    answerIds?: InputMaybe<Array<Scalars['String']['input']>>
    data?: InputMaybe<Scalars['String']['input']>
    dataRange?: InputMaybe<Scalars['StringTuple']['input']>
    questionId: Scalars['String']['input']
}

/** Code purpose enumeration */
export enum CodePurpose {
    LandlordSignUp = 'landlord_sign_up',
    ResetPassword = 'reset_password',
    RoommateSignUp = 'roommate_sign_up',
}

export type ConversationResourceObject = {
    __typename?: 'ConversationResourceObject'
    dateCreated: Scalars['DateTime']['output']
    dateUpdated: Scalars['DateTime']['output']
    sid: Scalars['String']['output']
    state: Scalars['String']['output']
}

/** Conversation status enumeration */
export enum ConversationStatus {
    Accepted = 'accepted',
    Rejected = 'rejected',
    Requested = 'requested',
}

export type ConversationWithUserObject = {
    __typename?: 'ConversationWithUserObject'
    createdAt: Scalars['DateTime']['output']
    creatorId: Scalars['Float']['output']
    id: Scalars['ID']['output']
    sid: Scalars['String']['output']
    status: ConversationStatus
    updatedAt: Scalars['DateTime']['output']
    user?: Maybe<UserPreviewObject>
}

export type CountryObject = {
    __typename?: 'CountryObject'
    alpha2Code: Scalars['String']['output']
    id: Scalars['ID']['output']
    position: Scalars['Float']['output']
    translations: Array<CountryTranslatedObject>
    visible: Scalars['Boolean']['output']
}

export type CountryTranslatedObject = {
    __typename?: 'CountryTranslatedObject'
    id: Scalars['ID']['output']
    lang: Language
    name: Scalars['String']['output']
}

export type DistrictObject = {
    __typename?: 'DistrictObject'
    id: Scalars['ID']['output']
    translations: Array<DistrictTranslatedObject>
    visible: Scalars['Boolean']['output']
}

export type DistrictTranslatedObject = {
    __typename?: 'DistrictTranslatedObject'
    id: Scalars['ID']['output']
    lang: Language
    name: Scalars['String']['output']
}

export type FilterInput = {
    answerIds?: InputMaybe<Array<Scalars['String']['input']>>
    columnName?: InputMaybe<Scalars['String']['input']>
    data?: InputMaybe<Scalars['String']['input']>
    dataRange?: InputMaybe<Scalars['StringTuple']['input']>
    questionId?: InputMaybe<Scalars['String']['input']>
    questionName?: InputMaybe<Scalars['String']['input']>
}

export type GenderObject = {
    __typename?: 'GenderObject'
    id: Scalars['ID']['output']
    translations: Array<GenderTranslatedObject>
    visible: Scalars['Boolean']['output']
}

export type GenderTranslatedObject = {
    __typename?: 'GenderTranslatedObject'
    id: Scalars['ID']['output']
    lang: Language
    sex: Scalars['String']['output']
}

export type GenericInputObject = {
    __typename?: 'GenericInputObject'
    renderAs?: Maybe<RenderAs>
    type: InputType
    variant?: Maybe<Variant>
}

export type HousingConditionObject = {
    __typename?: 'HousingConditionObject'
    id: Scalars['ID']['output']
    translations: Array<HousingConditionTranslatedObject>
}

export type HousingConditionTranslatedObject = {
    __typename?: 'HousingConditionTranslatedObject'
    id: Scalars['ID']['output']
    lang: Language
    name: Scalars['String']['output']
}

export type HousingHeatingTypeObject = {
    __typename?: 'HousingHeatingTypeObject'
    id: Scalars['ID']['output']
    translations: Array<HousingHeatingTypeTranslatedObject>
}

export type HousingHeatingTypeTranslatedObject = {
    __typename?: 'HousingHeatingTypeTranslatedObject'
    id: Scalars['ID']['output']
    lang: Language
    name: Scalars['String']['output']
}

export type HousingLivingSafetyObject = {
    __typename?: 'HousingLivingSafetyObject'
    id: Scalars['ID']['output']
    translations: Array<HousingLivingSafetyTranslatedObject>
}

export type HousingLivingSafetyTranslatedObject = {
    __typename?: 'HousingLivingSafetyTranslatedObject'
    id: Scalars['ID']['output']
    lang: Language
    name: Scalars['String']['output']
}

export type HousingStatusObject = {
    __typename?: 'HousingStatusObject'
    id: Scalars['ID']['output']
    translations: Array<HousingStatusTranslatedObject>
}

export type HousingStatusTranslatedObject = {
    __typename?: 'HousingStatusTranslatedObject'
    id: Scalars['ID']['output']
    lang: Language
    name: Scalars['String']['output']
}

export type ImageInput = {
    original: Scalars['String']['input']
    thumb?: InputMaybe<Scalars['String']['input']>
}

export type InputObject = {
    __typename?: 'InputObject'
    renderAs?: Maybe<RenderAs>
    required: Scalars['Boolean']['output']
    type: InputType
    variant?: Maybe<Variant>
}

/** UI Field Info input type */
export enum InputType {
    Button = 'button',
    Numeric = 'numeric',
    Select = 'select',
    Text = 'text',
    Textarea = 'textarea',
}

export type JwtObject = {
    __typename?: 'JwtObject'
    accessToken: Scalars['String']['output']
    refreshToken: Scalars['String']['output']
    sessionId: Scalars['String']['output']
}

export type LandlordSignUpInput = {
    confirmPassword: Scalars['String']['input']
    email?: InputMaybe<Scalars['String']['input']>
    firstname: Scalars['String']['input']
    lastname: Scalars['String']['input']
    password: Scalars['String']['input']
    phone?: InputMaybe<Scalars['String']['input']>
}

/** Language enumeration */
export enum Language {
    En = 'en',
    Ka = 'ka',
}

/** Email sending status code enumeration */
export enum MailSendStatus {
    AlreadySent = 'ALREADY_SENT',
    Failure = 'FAILURE',
    Success = 'SUCCESS',
}

export type MeObject = {
    __typename?: 'MeObject'
    birthDate?: Maybe<Scalars['Date']['output']>
    countryId?: Maybe<Scalars['Float']['output']>
    createdAt: Scalars['DateTime']['output']
    email?: Maybe<Scalars['String']['output']>
    firstname?: Maybe<Scalars['String']['output']>
    genderId?: Maybe<Scalars['Float']['output']>
    id: Scalars['ID']['output']
    lastname?: Maybe<Scalars['String']['output']>
    phone?: Maybe<Scalars['String']['output']>
    profileImage?: Maybe<Scalars['String']['output']>
    userTypes: Array<UserType>
}

export type MeWithJwtObject = {
    __typename?: 'MeWithJwtObject'
    birthDate?: Maybe<Scalars['Date']['output']>
    countryId?: Maybe<Scalars['Float']['output']>
    createdAt: Scalars['DateTime']['output']
    email?: Maybe<Scalars['String']['output']>
    firstname?: Maybe<Scalars['String']['output']>
    genderId?: Maybe<Scalars['Float']['output']>
    id: Scalars['ID']['output']
    jwt: JwtObject
    lastname?: Maybe<Scalars['String']['output']>
    phone?: Maybe<Scalars['String']['output']>
    profileImage?: Maybe<Scalars['String']['output']>
    userTypes: Array<UserType>
}

export type Mutation = {
    __typename?: 'Mutation'
    generateTwilioAccessToken: Scalars['String']['output']
    landlordSendResetPasswordVerificationCode: SendResetPasswordVerificationCodeObject
    landlordSignIn: JwtObject
    landlordSignUp: MeWithJwtObject
    logConnectionError: Scalars['Boolean']['output']
    lookupOrCreateTwilioUserResource: Scalars['Boolean']['output']
    refreshToken: JwtObject
    resetPassword: Scalars['Boolean']['output']
    roommateSendResetPasswordVerificationCode: SendResetPasswordVerificationCodeObject
    roommateSignIn: JwtObject
    roommateSignUp: MeWithJwtObject
    sendCodeByEmail: SendCodeByEmailObject
    sendCodeBySms: SendCodeBySmsObject
    singOut: Scalars['Boolean']['output']
    updateConversationResourceState: ConversationResourceObject
    updateConversationStatus: ConversationStatus
    upsertProperty: Scalars['Boolean']['output']
    verifyCodeByEmail: VerifyCodeByEmailObject
    verifyCodeBySms: VerifyCodeBySmsObject
    verifyResetPasswordVerificationCode: VerifyResetPasswordVerificationCodeObject
}

export type MutationLandlordSendResetPasswordVerificationCodeArgs = {
    input: SendResetPasswordVerificationCodeInput
}

export type MutationLandlordSignInArgs = {
    input: SignInCredentialsInput
}

export type MutationLandlordSignUpArgs = {
    input: LandlordSignUpInput
}

export type MutationLogConnectionErrorArgs = {
    error: Scalars['String']['input']
}

export type MutationLookupOrCreateTwilioUserResourceArgs = {
    userId: Scalars['String']['input']
}

export type MutationRefreshTokenArgs = {
    input: RefreshTokenInput
}

export type MutationResetPasswordArgs = {
    input: ResetPasswordInput
}

export type MutationRoommateSendResetPasswordVerificationCodeArgs = {
    input: SendResetPasswordVerificationCodeInput
}

export type MutationRoommateSignInArgs = {
    input: SignInCredentialsInput
}

export type MutationRoommateSignUpArgs = {
    input: RoommateSignUpInput
}

export type MutationSendCodeByEmailArgs = {
    input: SendCodeByEmailInput
}

export type MutationSendCodeBySmsArgs = {
    input: SendCodeInput
}

export type MutationUpdateConversationResourceStateArgs = {
    sid: Scalars['String']['input']
    state: Scalars['String']['input']
}

export type MutationUpdateConversationStatusArgs = {
    conversationId: Scalars['String']['input']
    status: ConversationStatus
}

export type MutationUpsertPropertyArgs = {
    input: PropertyInput
}

export type MutationVerifyCodeByEmailArgs = {
    input: VerifyCodeByEmailInput
}

export type MutationVerifyCodeBySmsArgs = {
    input: VerifyCodeInput
}

export type MutationVerifyResetPasswordVerificationCodeArgs = {
    input: VerifyResetPasswordVerificationCodeInput
}

export type OldUserObject = {
    __typename?: 'OldUserObject'
    answeredQuestions?: Maybe<Array<UserAnsweredQuestionObject>>
    birthDate?: Maybe<Scalars['Date']['output']>
    callingCode: Scalars['String']['output']
    countryId?: Maybe<Scalars['ID']['output']>
    createdAt: Scalars['DateTime']['output']
    deletedAt: Scalars['DateTime']['output']
    email?: Maybe<Scalars['String']['output']>
    firstname: Scalars['String']['output']
    genderId: Scalars['ID']['output']
    id: Scalars['ID']['output']
    lastname: Scalars['String']['output']
    password: Scalars['String']['output']
    phone: Scalars['String']['output']
    profileImage?: Maybe<Scalars['String']['output']>
    updatedAt: Scalars['DateTime']['output']
}

export type PaginatedConversationWithUserObject = {
    __typename?: 'PaginatedConversationWithUserObject'
    list?: Maybe<Array<ConversationWithUserObject>>
    pageInfo: PaginationInfoObject
}

export type PaginatedFilteredRoommatesObject = {
    __typename?: 'PaginatedFilteredRoommatesObject'
    list?: Maybe<Array<RoommateWithAdditionalInfoObject>>
    pageInfo: PaginationInfoObject
}

export type PaginationInfoObject = {
    __typename?: 'PaginationInfoObject'
    hasNextPage: Scalars['Boolean']['output']
    hasPrevious: Scalars['Boolean']['output']
    limit: Scalars['Int']['output']
    offset: Scalars['Int']['output']
    page: Scalars['Int']['output']
    total: Scalars['Int']['output']
}

export type PaginationInput = {
    limit?: Scalars['Int']['input']
    offset?: Scalars['Int']['input']
}

export type PropertyAmenityObject = {
    __typename?: 'PropertyAmenityObject'
    id: Scalars['ID']['output']
    translations: Array<PropertyAmenityTranslatedObject>
}

export type PropertyAmenityTranslatedObject = {
    __typename?: 'PropertyAmenityTranslatedObject'
    id: Scalars['ID']['output']
    lang: Language
    name: Scalars['String']['output']
}

export type PropertyDepositObject = {
    __typename?: 'PropertyDepositObject'
    amount?: Maybe<Scalars['Float']['output']>
    currency?: Maybe<Scalars['String']['output']>
    id: Scalars['ID']['output']
    percentage?: Maybe<Scalars['Float']['output']>
    translations?: Maybe<Array<PropertyDepositTranslatedObject>>
}

export type PropertyDepositTranslatedObject = {
    __typename?: 'PropertyDepositTranslatedObject'
    description: Scalars['String']['output']
    id: Scalars['ID']['output']
    lang: Language
}

export type PropertyInput = {
    area?: InputMaybe<Scalars['Float']['input']>
    availableFrom?: InputMaybe<Scalars['DateTime']['input']>
    bathroomsInBedroom?: InputMaybe<Scalars['Float']['input']>
    bathroomsInProperty?: InputMaybe<Scalars['Float']['input']>
    cadastralCode?: InputMaybe<Scalars['String']['input']>
    capacity?: InputMaybe<Scalars['Float']['input']>
    contactName?: InputMaybe<Scalars['String']['input']>
    contactPhone?: InputMaybe<Scalars['String']['input']>
    description?: InputMaybe<Scalars['String']['input']>
    districtId?: InputMaybe<Scalars['ID']['input']>
    floor?: InputMaybe<Scalars['Float']['input']>
    hideCadastralCode?: InputMaybe<Scalars['Boolean']['input']>
    housingConditionId?: InputMaybe<Scalars['ID']['input']>
    housingHeatingTypeIds?: InputMaybe<Array<Scalars['ID']['input']>>
    housingLivingSafetyIds?: InputMaybe<Array<Scalars['ID']['input']>>
    housingStatusId?: InputMaybe<Scalars['ID']['input']>
    id?: InputMaybe<Scalars['ID']['input']>
    imageUploadFiles?: InputMaybe<Array<Scalars['String']['input']>>
    images?: InputMaybe<Array<ImageInput>>
    minRentalPeriod?: InputMaybe<Scalars['Float']['input']>
    partyAllowed?: InputMaybe<Scalars['Boolean']['input']>
    petAllowed?: InputMaybe<Scalars['Boolean']['input']>
    price?: InputMaybe<Scalars['Float']['input']>
    propertyAmenityIds?: InputMaybe<Array<Scalars['ID']['input']>>
    propertyDepositId?: InputMaybe<Scalars['ID']['input']>
    propertyTypeId?: InputMaybe<Scalars['ID']['input']>
    rooms?: InputMaybe<Scalars['Float']['input']>
    street?: InputMaybe<Scalars['String']['input']>
    title?: InputMaybe<Scalars['String']['input']>
    totalFloors?: InputMaybe<Scalars['Float']['input']>
    withDeposit?: InputMaybe<Scalars['Boolean']['input']>
}

export type PropertyTypeObject = {
    __typename?: 'PropertyTypeObject'
    id: Scalars['ID']['output']
    translations: Array<PropertyTypeTranslatedObject>
}

export type PropertyTypeTranslatedObject = {
    __typename?: 'PropertyTypeTranslatedObject'
    id: Scalars['ID']['output']
    lang: Language
    name: Scalars['String']['output']
}

export type Query = {
    __typename?: 'Query'
    getConversationsForUser?: Maybe<PaginatedConversationWithUserObject>
    getCountries?: Maybe<Array<CountryObject>>
    getCountry?: Maybe<CountryObject>
    getDistrict?: Maybe<DistrictObject>
    getDistricts?: Maybe<Array<DistrictObject>>
    getGender?: Maybe<GenderObject>
    getGenders?: Maybe<Array<GenderObject>>
    getHousingConditions?: Maybe<Array<HousingConditionObject>>
    getHousingHeatingTypes?: Maybe<Array<HousingHeatingTypeObject>>
    getHousingLivingSafeties?: Maybe<Array<HousingLivingSafetyObject>>
    getHousingStatuses?: Maybe<Array<HousingStatusObject>>
    getPaginatedFilteredRoommates?: Maybe<PaginatedFilteredRoommatesObject>
    getPropertyAmenities?: Maybe<Array<PropertyAmenityObject>>
    getPropertyDeposits?: Maybe<Array<PropertyDepositObject>>
    getPropertyTypes?: Maybe<Array<PropertyTypeObject>>
    getQuestionsWithAnswers?: Maybe<Array<QuestionObject>>
    getSharedConversation?: Maybe<ConversationWithUserObject>
    getUniversities?: Maybe<Array<UniversityObject>>
    getUniversity?: Maybe<UniversityObject>
    me: MeObject
}

export type QueryGetConversationsForUserArgs = {
    pagination?: InputMaybe<PaginationInput>
}

export type QueryGetCountriesArgs = {
    locale?: InputMaybe<Language>
}

export type QueryGetCountryArgs = {
    id: Scalars['Int']['input']
    locale?: InputMaybe<Language>
}

export type QueryGetDistrictArgs = {
    id: Scalars['Int']['input']
    locale?: InputMaybe<Language>
}

export type QueryGetDistrictsArgs = {
    locale?: InputMaybe<Language>
}

export type QueryGetGenderArgs = {
    id: Scalars['Int']['input']
    locale?: InputMaybe<Language>
}

export type QueryGetGendersArgs = {
    locale?: InputMaybe<Language>
}

export type QueryGetHousingConditionsArgs = {
    locale?: InputMaybe<Language>
}

export type QueryGetHousingHeatingTypesArgs = {
    locale?: InputMaybe<Language>
}

export type QueryGetHousingLivingSafetiesArgs = {
    locale?: InputMaybe<Language>
}

export type QueryGetHousingStatusesArgs = {
    locale?: InputMaybe<Language>
}

export type QueryGetPaginatedFilteredRoommatesArgs = {
    filters?: InputMaybe<Array<FilterInput>>
    locale?: InputMaybe<Language>
    pagination?: InputMaybe<PaginationInput>
}

export type QueryGetPropertyAmenitiesArgs = {
    locale?: InputMaybe<Language>
}

export type QueryGetPropertyDepositsArgs = {
    locale?: InputMaybe<Language>
}

export type QueryGetPropertyTypesArgs = {
    locale?: InputMaybe<Language>
}

export type QueryGetQuestionsWithAnswersArgs = {
    getFor?: InputMaybe<QuestionsWithAnswersFor>
    lang?: InputMaybe<Language>
}

export type QueryGetSharedConversationArgs = {
    participantId: Scalars['String']['input']
}

export type QueryGetUniversitiesArgs = {
    locale?: InputMaybe<Language>
}

export type QueryGetUniversityArgs = {
    id: Scalars['Int']['input']
    locale?: InputMaybe<Language>
}

export type QuestionObject = {
    __typename?: 'QuestionObject'
    answers?: Maybe<Array<AnswerObject>>
    createdAt: Scalars['DateTime']['output']
    deletedAt?: Maybe<Scalars['DateTime']['output']>
    id: Scalars['ID']['output']
    name: Scalars['String']['output']
    position: Scalars['Float']['output']
    step: Scalars['Float']['output']
    translations: Array<QuestionTranslatedObject>
    uiFieldInfo: UiFieldInfoObject
    updatedAt: Scalars['DateTime']['output']
}

export type QuestionTranslatedObject = {
    __typename?: 'QuestionTranslatedObject'
    createdAt: Scalars['DateTime']['output']
    deletedAt?: Maybe<Scalars['DateTime']['output']>
    filterTitle?: Maybe<Scalars['String']['output']>
    id: Scalars['ID']['output']
    lang: Language
    questionId: Scalars['ID']['output']
    title: Scalars['String']['output']
    updatedAt: Scalars['DateTime']['output']
}

/** Get questions with answers for enumeration */
export enum QuestionsWithAnswersFor {
    Filter = 'FILTER',
    Signup = 'SIGNUP',
}

export type RefreshTokenInput = {
    refreshToken?: InputMaybe<Scalars['String']['input']>
    sessionId: Scalars['String']['input']
}

/** UI Field Info input render ui type */
export enum RenderAs {
    Range = 'range',
}

export type ResetPasswordInput = {
    code: Scalars['String']['input']
    confirmPassword: Scalars['String']['input']
    identifier: Scalars['String']['input']
    password: Scalars['String']['input']
}

/** Reset password sending status code enumeration */
export enum ResetPasswordResponse {
    AlreadySent = 'ALREADY_SENT',
    SendFailed = 'SEND_FAILED',
    SuccessfullySend = 'SUCCESSFULLY_SEND',
}

export type RoommateSignUpInput = {
    answeredQuestions: Array<AnsweredQuestionInput>
    birthDate: Scalars['DateTime']['input']
    confirmPassword: Scalars['String']['input']
    countryId: Scalars['Float']['input']
    email?: InputMaybe<Scalars['String']['input']>
    firstname: Scalars['String']['input']
    genderId: Scalars['Float']['input']
    lastname: Scalars['String']['input']
    password: Scalars['String']['input']
    phone: Scalars['String']['input']
    profileImage?: InputMaybe<Scalars['String']['input']>
}

export type RoommateWithAdditionalInfoObject = {
    __typename?: 'RoommateWithAdditionalInfoObject'
    age: Scalars['Float']['output']
    bio: Scalars['String']['output']
    budget: Scalars['Float']['output']
    createdAt: Scalars['DateTime']['output']
    districtNames: Scalars['String']['output']
    firstname: Scalars['String']['output']
    id: Scalars['ID']['output']
    isFavourite: Scalars['Boolean']['output']
    lastname: Scalars['String']['output']
    profileImage?: Maybe<Scalars['String']['output']>
}

export type SendCodeByEmailInput = {
    codePurpose?: InputMaybe<CodePurpose>
    email: Scalars['String']['input']
}

export type SendCodeByEmailObject = {
    __typename?: 'SendCodeByEmailObject'
    status: MailSendStatus
}

export type SendCodeBySmsObject = {
    __typename?: 'SendCodeBySmsObject'
    status: SmsSendStatus
}

export type SendCodeInput = {
    codePurpose?: InputMaybe<CodePurpose>
    phone: Scalars['String']['input']
}

export type SendResetPasswordVerificationCodeInput = {
    identifier: Scalars['String']['input']
}

export type SendResetPasswordVerificationCodeObject = {
    __typename?: 'SendResetPasswordVerificationCodeObject'
    status: ResetPasswordResponse
}

export type SignInCredentialsInput = {
    identifier: Scalars['String']['input']
    password: Scalars['String']['input']
}

/** sms sending status code enumeration */
export enum SmsSendStatus {
    AlreadySent = 'ALREADY_SENT',
    Failure = 'FAILURE',
    Success = 'SUCCESS',
}

export type UiFieldInfoObject = {
    __typename?: 'UIFieldInfoObject'
    filterInput?: Maybe<GenericInputObject>
    input: InputObject
    otherInput?: Maybe<GenericInputObject>
}

export type UniversityObject = {
    __typename?: 'UniversityObject'
    id: Scalars['ID']['output']
    translations: Array<UniversityTranslatedObject>
    visible: Scalars['Boolean']['output']
}

export type UniversityTranslatedObject = {
    __typename?: 'UniversityTranslatedObject'
    id: Scalars['ID']['output']
    lang: Language
    name: Scalars['String']['output']
}

export type UserAnsweredQuestionObject = {
    __typename?: 'UserAnsweredQuestionObject'
    answer?: Maybe<AnswerObject>
    answerId?: Maybe<Scalars['ID']['output']>
    createdAt: Scalars['DateTime']['output']
    dateRangeData?: Maybe<Array<Scalars['DateTime']['output']>>
    deletedAt?: Maybe<Scalars['DateTime']['output']>
    id: Scalars['ID']['output']
    intData?: Maybe<Scalars['Int']['output']>
    question?: Maybe<QuestionObject>
    questionId: Scalars['ID']['output']
    textData?: Maybe<Scalars['String']['output']>
    updatedAt: Scalars['DateTime']['output']
    user?: Maybe<OldUserObject>
    userId: Scalars['ID']['output']
}

export type UserPreviewObject = {
    __typename?: 'UserPreviewObject'
    conversationStatus: ConversationStatus
    firstname: Scalars['String']['output']
    id: Scalars['ID']['output']
    lastname: Scalars['String']['output']
    profileImage?: Maybe<Scalars['String']['output']>
}

/** User Type purpose enumeration */
export enum UserType {
    Admin = 'admin',
    Landlord = 'landlord',
    Roommate = 'roommate',
}

/** UI Field Info input type variant */
export enum Variant {
    Calendar = 'calendar',
    Multiple = 'multiple',
    Single = 'single',
}

/** sent verification code status code enumeration */
export enum VerificationCodeValidityStatus {
    Invalid = 'INVALID',
    NotFound = 'NOT_FOUND',
    Valid = 'VALID',
}

export type VerifyCodeByEmailInput = {
    code: Scalars['String']['input']
    codePurpose?: InputMaybe<CodePurpose>
    email: Scalars['String']['input']
}

export type VerifyCodeByEmailObject = {
    __typename?: 'VerifyCodeByEmailObject'
    status: VerificationCodeValidityStatus
}

export type VerifyCodeBySmsObject = {
    __typename?: 'VerifyCodeBySmsObject'
    status: VerificationCodeValidityStatus
}

export type VerifyCodeInput = {
    code: Scalars['String']['input']
    codePurpose?: InputMaybe<CodePurpose>
    phone: Scalars['String']['input']
}

export type VerifyResetPasswordVerificationCodeInput = {
    code: Scalars['String']['input']
    identifier: Scalars['String']['input']
}

export type VerifyResetPasswordVerificationCodeObject = {
    __typename?: 'VerifyResetPasswordVerificationCodeObject'
    status: VerificationCodeValidityStatus
}
