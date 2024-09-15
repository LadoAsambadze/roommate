import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useMutation } from '@apollo/client'
import { gql } from '@apollo/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'


const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })

const IDENTITY_VERIFICATION_IMAGES_UPLOAD = gql`
    mutation IdentityVerificationImagesUpload($input: IdentityUploadInput!) {
        identityVerificationImagesUpload(input: $input)
    }
`

const FileUpload = ({ onFileUpload, title, preview }) => {
    const onDrop = useCallback(
        async (acceptedFiles) => {
            const file = acceptedFiles[0]
            const base64 = await fileToBase64(file)
            onFileUpload(base64)
        },
        [onFileUpload]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 })

    return (
        <div className="space-y-2">
            <div
                {...getRootProps()}
                className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition-colors hover:border-blue-500"
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the file here ...</p>
                ) : (
                    <p>Drag and drop {title} here, or click to select file</p>
                )}
            </div>
            {preview && (
                <div className="mt-2">
                    <img
                        src={preview}
                        alt={`${title} preview`}
                        className="max-h-40 rounded-lg object-cover"
                    />
                </div>
            )}
        </div>
    )
}

export default function Verification() {
    const [selfie, setSelfie] = useState(null)
    const [frontId, setFrontId] = useState(null)
    const [backId, setBackId] = useState(null)
    const [uploadImages, { loading, error }] = useMutation(IDENTITY_VERIFICATION_IMAGES_UPLOAD)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await uploadImages({
                variables: {
                    input: {
                        selfie,
                        idFrontImage: frontId,
                        idBackImage: backId,
                    },
                },
            })
            console.log('Upload result:', result)
            // Handle successful upload (e.g., show success message, redirect user)
        } catch (err) {
            console.error('Upload error:', err)
            // Handle error (e.g., show error message to user)
        }
    }

    return (
        <Card className="mx-auto w-full max-w-md">
            <CardHeader>
                <CardTitle>Verification</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <h3 className="mb-2 font-semibold">Selfie</h3>
                        <FileUpload onFileUpload={setSelfie} title="selfie" preview={selfie} />
                    </div>
                    <div>
                        <h3 className="mb-2 font-semibold">Front ID</h3>
                        <FileUpload onFileUpload={setFrontId} title="front ID" preview={frontId} />
                    </div>
                    <div>
                        <h3 className="mb-2 font-semibold">Back ID</h3>
                        <FileUpload onFileUpload={setBackId} title="back ID" preview={backId} />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Uploading...' : 'Submit'}
                    </Button>
                    {error && <p className="mt-2 text-red-500">Error: {error.message}</p>}
                </form>
            </CardContent>
        </Card>
    )
}
