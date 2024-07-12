import { Delete, Upload } from '@/src/components/svgs'
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface CustomFile extends File {
    preview: string
}

type ImageUploaderProps = {
    field: {
        value: CustomFile[] | undefined
        onChange: (files: CustomFile[]) => void
    }
}
const ImageUploader = ({ field }: ImageUploaderProps) => {
    const [files, setFiles] = useState<CustomFile[]>(field.value ? field.value : [])

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const updatedFiles: CustomFile[] = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )
            setFiles(updatedFiles)
            field.onChange(updatedFiles)
        },
        [field]
    )

    const deleteFile = useCallback((fileToDelete: CustomFile, event: React.MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()
        setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToDelete))
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
    })

    return (
        <div>
            <div {...getRootProps()} className="dropzone">
                <input
                    className="flex h-[38px] w-full rounded-lg border border-[#828bab] bg-[#FFFFFF] px-3 py-2 text-sm placeholder:text-placeholderColor focus:outline-[#3dae8c] focus:ring-0"
                    {...getInputProps()}
                />
                <p>
                    {isDragActive ? (
                        <div className="flex flex-row gap-3">
                            <div className="flex h-[38px] w-full cursor-pointer flex-row items-center gap-3  rounded-lg  border border-[#828bab] bg-[#FFFFFF] px-3 py-2 text-sm text-placeholderColor ">
                                <span className="text-center">Drop it here</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-row gap-3">
                            <div className="flex h-[38px] w-full cursor-pointer flex-row items-center gap-3  rounded-lg  border border-[#828bab] bg-[#FFFFFF] px-3 py-2 text-sm text-placeholderColor ">
                                {files.length ? (
                                    files.map((file) => (
                                        <div
                                            className="flex w-full flex-row justify-between gap-2"
                                            key={file.name}
                                        >
                                            <p className="w-0 flex-1 truncate">{file.name}</p>
                                            <Delete
                                                className="h-5 w-auto cursor-pointer fill-placeholderColor hover:fill-[red]"
                                                onClick={(
                                                    event: React.MouseEvent<Element, MouseEvent>
                                                ) => {
                                                    field.onChange([]), deleteFile(file, event)
                                                }}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-row items-center gap-2">
                                        <Upload className="h-5 w-5" />
                                        <span className="text-sm">
                                            Upload or drag and drop file here
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </p>
            </div>
        </div>
    )
}

export default ImageUploader