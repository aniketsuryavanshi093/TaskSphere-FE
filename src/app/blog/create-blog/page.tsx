"use client"
import React, { useEffect, useRef, useState, useTransition } from 'react'
import "./createblog.scss"
import { Field, Form, Formik, FormikErrors } from 'formik'
import { createblogvalidation } from '@/lib/validations/AuthValidationsForm'
import { CustomInput } from '@/lib/customcomponents/customComponents'
import { Editor } from '@tinymce/tinymce-react'
import { storage } from '@/lib/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { Alert, Col, Row, Spinner } from 'reactstrap'
import { createBlogAction } from '@/actions/authactions/adminaction'
import Image from 'next/image'
import { generateslugs } from '@/lib'
import { useSearchParams } from 'next/navigation'
import { getPostFromParams } from '@/actions/blogsactions/blogservice'
import { bloginterface } from '@/commontypes'

const Page = () => {
    const [PreviewUrl, setPreviewUrl] = useState<{ name: string, preview: string, imgURI: File | null }>({ name: "", preview: "", imgURI: null });
    const params = useSearchParams()
    const [PostDetail, setPostDetail] = useState<bloginterface | null>(null)
    const getPostDetails = async () => {
        try {
            const data = await getPostFromParams(params.get("id")) as bloginterface
            setPostDetail(data)
            setPreviewUrl({ preview: data.previewImage, name: "", imgURI: null })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (params.get('id')) {
            getPostDetails()
        }
    }, [params.get('id')])
    const initialValues = {
        title: PostDetail?.title || "",
        previewImage: PostDetail?.previewImage || "",
        description: PostDetail?.description || ""
    }
    const [visible, setVisible] = useState(false);
    const [editorContent, setEditorContent] = useState('');
    const [isPending, startTransition] = useTransition()
    const handleEditorChange = (content: React.SetStateAction<string>, editor: any) => {
        setEditorContent(content);
    };
    const handlepublishblog = async ({ title, previewImage, description }) => {
        try {
            let profilePic = PostDetail?.previewImage || ""
            if (PreviewUrl?.imgURI) {
                const imageref = ref(storage, `user/${PreviewUrl.name}`);
                const uploadded = await uploadBytes(imageref, PreviewUrl.imgURI, 'data_url');
                profilePic = await getDownloadURL(uploadded?.ref);
            }
            const result = await createBlogAction({ postid: PostDetail?._id, mode: params.get("mode"), title, previewImage: profilePic, content: editorContent, description, slug: generateslugs(title) }) as { status: string, message: string }
            setVisible(true)
            window.scrollTo({ top: 0, left: 0 })
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (value: { title: any; previewImage: any; description: any }) => {
        startTransition(() => handlepublishblog({
            "title": value.title,
            previewImage: value.previewImage,
            description: value.description
        }))
    }
    function base64ToArrayBuffer(base64: string) {
        const binaryString = window.atob(base64); // Decodes the Base64 string
        const length = binaryString.length;
        const buffer = new ArrayBuffer(length);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < length; i++) {
            view[i] = binaryString.charCodeAt(i);
        }
        return buffer;
    }
    const handleImageUpload = async (blobInfo: { base64: () => string }, success: (arg0: string) => void, failure: any) => {
        try {
            const imageref = ref(storage, `user/${new Date().getTime()}`);
            const arrayBuffer = base64ToArrayBuffer(blobInfo.base64(),);
            const uploadded = await uploadBytes(imageref, arrayBuffer);
            const imaeurl = await getDownloadURL(uploadded?.ref);
            const updatedContent = editorContent + `<img src="${imaeurl}" />`;
            setEditorContent(updatedContent);
            success(imaeurl)
        } catch (error) {
            console.log(error);
        }
    };
    const inputref = useRef<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>(null)
    const onChangepofileImgUpload = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: { (field: string, value: any, shouldValidate?: boolean | undefined): Promise<void | FormikErrors<{ title: string; previewImage: string; description: any }>>; (arg0: string, arg1: string): void }) => {
        const fileHash: File = e?.target?.files[0];
        try {
            if (fileHash) {
                const preview = URL.createObjectURL(fileHash);
                setPreviewUrl({ preview, name: fileHash.name, imgURI: fileHash });
                setFieldValue("previewImage", preview)
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Alert color="info" isOpen={visible} toggle={() => setVisible(false)}>
                Blog post has been {params.get("mode") ? "Updated" : "published"}!
            </Alert>
            <h5 className='my-2'>{params.get("mode") ? "Edit Blog" : 'Create Blog'}</h5>
            <div className='wrapper justify-start'>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize
                    validationSchema={createblogvalidation}
                    onSubmit={(value) => {
                        handleSubmit(value)
                    }}
                >
                    {({ values, setFieldValue, errors, touched }) => (
                        <Form className='mt-2 w-100 ' >
                            <Row className='blogcreatewrapper'>
                                <Col lg={8}>
                                    <div className="w-100">
                                        <Field
                                            type="text"
                                            component={CustomInput}
                                            inputClassName='my-2 '
                                            name="title"
                                            placeholder="Blog title"
                                        />
                                    </div>
                                    <div className="w-100">
                                        <Field
                                            type="text"
                                            component={CustomInput}
                                            inputClassName='my-2 '
                                            name="description"
                                            placeholder="write a short post description"
                                        />
                                    </div>
                                    <Editor
                                        onEditorChange={handleEditorChange}
                                        apiKey='pzobufxb63z9bmxo7f7bj2s9g183542upuwlwd7o9c6yz0wm'
                                        initialValue={params.get("mode") ? PostDetail?.content : "<p>This is the initial content of the editor.</p>"}
                                        init={{
                                            height: 500,
                                            menubar: false,
                                            plugins: [
                                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', "codesample",
                                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                            ],
                                            toolbar: 'undo redo blocks image codesample preview ' +
                                                'bold italic forecolor fontsize lineheight | alignleft aligncenter  ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'help',
                                            font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
                                            images_upload_handler: handleImageUpload,
                                            line_height_formats: '1 1.2 1.4 1.6 2',
                                            content_style: 'body {font - family:Helvetica,Arial,sans-serif; font-size:14px }'
                                        }}
                                    />
                                    <button type='submit' className="admincreatebtn my-3">
                                        {isPending ? <Spinner size={"sm"} /> : params.get("mode") ? "Update Blog" : "Post Blog"}
                                    </button>
                                </Col>
                                <Col lg={4}>
                                    <div className="position-relative uploadimagecontainer">
                                        <Image unoptimized className='Blogimage' width={100} height={100} src={PreviewUrl?.preview || "/images/icons/userdummy.avif"} alt="dummy" />
                                        <Image
                                            src={"/images/icons/upload_img.svg"}
                                            alt='edit'
                                            width={25}
                                            onClick={() => inputref?.current?.click()}
                                            height={25}
                                            className="edit_icon_profile cp"
                                        />
                                        <input
                                            ref={inputref}
                                            type="file"
                                            name="image"
                                            id="upload-button"
                                            style={{ display: 'none' }}
                                            onChange={(e) => onChangepofileImgUpload(e, setFieldValue)}
                                        />
                                    </div>
                                    <p className='my-2 useruploadtext' >Blog Preview</p>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default Page