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
    EmailAddress: { input: any; output: any }
    JSON: { input: any; output: any }
    PhoneNumber: { input: any; output: any }
    StringOrInt: { input: any; output: any }
    StringTuple: { input: any; output: any }
}

export type AnswerObject = {
    __typename?: 'AnswerObject'
    createdAt: Scalars['DateTime']['output']
    deletedAt?: Maybe<Scalars['DateTime']['output']>
    id: Scalars['ID']['output']
    position: Scalars['Int']['output']
    question: QuestionObject
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

export type CheckCodeInput = {
    code: Scalars['StringOrInt']['input']
    codePurpose?: InputMaybe<Scalars['String']['input']>
    phone: Scalars['String']['input']
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

export type JwtObject = {
    __typename?: 'JwtObject'
    accessToken: Scalars['String']['output']
    refreshToken: Scalars['String']['output']
    sessionId: Scalars['String']['output']
}

/** Language enumeration */
export enum Language {
    En = 'en',
    Ka = 'ka',
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
    userType: Array<UserType>
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
    userType: Array<UserType>
}

export type Mutation = {
    __typename?: 'Mutation'
    checkCode: SmsCodeValidityStatus
    generateTwilioAccessToken: Scalars['String']['output']
    logConnectionError: Scalars['Boolean']['output']
    lookupOrCreateTwilioUserResource: Scalars['Boolean']['output']
    refreshToken: JwtObject
    resetPassword: Scalars['Boolean']['output']
    roommateSignUp: MeWithJwtObject
    sendCode: SmsSendStatus
    sendResetPasswordLink: SmsSendStatus
    signIn: JwtObject
    singOut: Scalars['Boolean']['output']
    updateConversationResourceState: ConversationResourceObject
    updateConversationStatus: ConversationStatus
}

export type MutationCheckCodeArgs = {
    input: CheckCodeInput
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

export type MutationRoommateSignUpArgs = {
    input: SignUpInput
}

export type MutationSendCodeArgs = {
    input: SendCodeInput
}

export type MutationSendResetPasswordLinkArgs = {
    input: SendResetPasswordLinkInput
}

export type MutationSignInArgs = {
    input: SignInCredentialsInput
}

export type MutationUpdateConversationResourceStateArgs = {
    sid: Scalars['String']['input']
    state: Scalars['String']['input']
}

export type MutationUpdateConversationStatusArgs = {
    conversationId: Scalars['String']['input']
    status: ConversationStatus
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

export type Query = {
    __typename?: 'Query'
    getConversationsForUser?: Maybe<PaginatedConversationWithUserObject>
    getCountries?: Maybe<Array<CountryObject>>
    getCountry?: Maybe<CountryObject>
    getDistrict?: Maybe<DistrictObject>
    getDistricts?: Maybe<Array<DistrictObject>>
    getGender?: Maybe<GenderObject>
    getGenders?: Maybe<Array<GenderObject>>
    getPaginatedFilteredRoommates?: Maybe<PaginatedFilteredRoommatesObject>
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

export type QueryGetPaginatedFilteredRoommatesArgs = {
    filters?: InputMaybe<Array<FilterInput>>
    locale?: InputMaybe<Language>
    pagination?: InputMaybe<PaginationInput>
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
    position: Scalars['Int']['output']
    step: Scalars['Int']['output']
    translations?: Maybe<Array<QuestionTranslatedObject>>
    uiFieldInfo: Scalars['JSON']['output']
    updatedAt: Scalars['DateTime']['output']
    userAnsweredQuestions?: Maybe<Array<UserAnsweredQuestionObject>>
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

export type ResetPasswordInput = {
    confirmPassword: Scalars['String']['input']
    password: Scalars['String']['input']
    token: Scalars['String']['input']
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

export type SendCodeInput = {
    codePurpose?: InputMaybe<Scalars['String']['input']>
    phone: Scalars['String']['input']
}

export type SendResetPasswordLinkInput = {
    identifier: Scalars['String']['input']
    resend?: InputMaybe<Scalars['Boolean']['input']>
}

export type SignInCredentialsInput = {
    identifier: Scalars['String']['input']
    password: Scalars['String']['input']
}

export type SignUpInput = {
    answeredQuestions: Array<AnsweredQuestionInput>
    birthDate: Scalars['Date']['input']
    confirmPassword: Scalars['String']['input']
    countryId: Scalars['Int']['input']
    email?: InputMaybe<Scalars['EmailAddress']['input']>
    firstname: Scalars['String']['input']
    genderId: Scalars['Int']['input']
    lastname: Scalars['String']['input']
    password: Scalars['String']['input']
    phone: Scalars['PhoneNumber']['input']
    profileImage?: InputMaybe<Scalars['String']['input']>
}

/** sent verification code status code enumeration */
export enum SmsCodeValidityStatus {
    Invalid = 'INVALID',
    NotFound = 'NOT_FOUND',
    Valid = 'VALID',
}

/** sms sending status code enumeration */
export enum SmsSendStatus {
    AlreadySent = 'ALREADY_SENT',
    Failed = 'FAILED',
    Success = 'SUCCESS',
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
