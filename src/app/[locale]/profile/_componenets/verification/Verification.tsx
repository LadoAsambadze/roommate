import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useMutation } from '@apollo/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import { identityVerificationImagesUpload } from '@/graphql/mutation'
import { fileToBase64 } from '@/src/utils/fileToBase64'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const FileUpload = ({ onFileUpload, title, preview }: any) => {
    const { t } = useTranslation()
    const onDrop = useCallback(
        async (acceptedFiles: any) => {
            if (acceptedFiles.length > 1) {
                alert('You can only upload one image at a time.')
                return
            }

            const file = acceptedFiles[0]

            if (file.size > MAX_FILE_SIZE) {
                alert('File size exceeds 5MB. Please upload a smaller file.')
                return
            }

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
                <div className="relative mt-2 h-52 w-full bg-slate-100">
                    <Image
                        src={preview}
                        fill
                        alt={`${title} preview`}
                        className=" h-52 w-full rounded-md object-contain"
                    />
                </div>
            )}
        </div>
    )
}

export default function Verification() {
    const { t } = useTranslation()
    const [selfie, setSelfie] = useState(null)
    const [frontId, setFrontId] = useState(null)
    const [backId, setBackId] = useState(null)
    const [uploadImages, { loading, error }] = useMutation(identityVerificationImagesUpload)

    const handleSubmit = async (e: any) => {
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
        } catch (err) {
            console.error('Upload error:', err)
        }
    }

    return (
        <Card className=" w-full border-none ">
            <CardHeader>
                <CardTitle>{t('verification')}</CardTitle>
                <p className="mt-4">{t('verifyText')}</p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="grid  gap-4 md:grid-cols-1 lg:grid-cols-3">
                    <div className="max-w-80">
                        <h3 className="mb-2 font-semibold">{t('selfie')}</h3>
                        <FileUpload onFileUpload={setSelfie} title="selfie" preview={selfie} />
                    </div>
                    <div className="max-w-80">
                        <h3 className="mb-2 font-semibold">{t('frontId')}</h3>
                        <FileUpload onFileUpload={setFrontId} title="front ID" preview={frontId} />
                    </div>
                    <div className="max-w-80">
                        <h3 className="mb-2 font-semibold">{t('backId')}</h3>
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
