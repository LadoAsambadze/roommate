import Image from 'next/legacy/image'
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface CustomFile extends File {
    preview: string
}

const ProfileImage = () => {
    const [files, setFiles] = useState<CustomFile[]>([])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )
        )
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
                        <span className="flex h-[38px] w-full items-center rounded-lg border border-[#828bab] bg-[#FFFFFF] px-3 py-2 text-sm text-placeholderColor placeholder:text-placeholderColor focus:outline-[#3dae8c] focus:ring-0">
                            <span className="flex cursor-pointer items-center justify-center border border-[#828bab] px-2 py-1 text-xs hover:bg-slate-100">
                                ჩააგდეთ ფოტო აქ
                            </span>
                        </span>
                    ) : (
                        <span className="flex h-[38px] w-full items-center rounded-lg border border-[#828bab] bg-[#FFFFFF] px-3 py-2 text-sm text-placeholderColor placeholder:text-placeholderColor focus:outline-[#3dae8c] focus:ring-0">
                            <span className="flex cursor-pointer items-center justify-center border border-[#828bab] px-2 py-1 text-xs hover:bg-slate-100">
                                ატვირთე ფოტო
                            </span>
                        </span>
                    )}
                </p>
            </div>
            <div className="mt-4">
                {files.map((file) => (
                    <div key={file.name} className="uploaded-file">
                        <Image
                            src={file.preview}
                            alt={file.name}
                            className="h-20 w-20 rounded object-cover"
                            layout="fill"
                        />
                        <p className="mt-2 text-center text-xs">{file.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProfileImage
