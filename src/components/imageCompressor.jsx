import React, {useState} from 'react';
import imageCompression from 'browser-image-compression';
import Card from 'react-bootstrap/Card'

const ImageCompressor = () => {
    // state to hold either image is uploaded or not
    const [UploadImage, SetUploadImage] = useState("")
    const [OriginalUploadImage, SetOrignalUploadImage] = useState("")
    const [CompressedImage, SetCompressedImage] = useState("")
    const [OutpitFileName, SetOutputFileName] = useState("")
    const [Uploaded, setUploaded] = useState(false)
    const [isCompressed, setIsCompressed]= useState(false)

    // function to handle the image upload
    const handleUpload = (e) =>{
        const imageFile = e.target.files[0]
        SetUploadImage(URL.createObjectURL(imageFile))
        SetOrignalUploadImage(imageFile)
        SetOutputFileName(imageFile.name)
        setUploaded(true)
    }

    const compressImageClick = (e) =>{
        e.preventDefault();

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight:500,
            useWebWorker: true
        }
        if (options.maxSizeMB >= UploadImage.size / 1024){
            alert("Image is too small, Cant be compressed");
            return 0;
        }
        let output;
        imageCompression(OriginalUploadImage, options).then(x=>{
            output=x;
            const downloadLink = URL.createObjectURL(output);
            SetCompressedImage(downloadLink);
            setIsCompressed(true)
        });
        return 1;
    }

    return(
        <div className="m-5 container">
            <div className="text-light text-center">
                <h1>Three Simple Steps</h1>
                <h3>1. Upload Image</h3>
                <h3>2. Click on Compress</h3>
                <h3>3. Download Compressed Image</h3>
            </div>
            <div className="row mt-5">
                <div className="d-flex justify-content-center">
                    <input type="file"
                        accept="image/*"
                        className="mt-2 btn btn-dark w-75"
                        onChange={e=>handleUpload(e)}
                    />
                </div>
                <div className="img-container">
                    <div className="upload-image-container">
                        {Uploaded ? (
                            <>
                                <h2 className="image-to-upload">Image uploaded</h2>
                                <Card.Img
                                    className="ht-image"
                                    variant="top"
                                    src={UploadImage}
                                ></Card.Img>
                            </>
                        ) : (
                            <>
                                <h2 className="image-to-upload">Image uploaded</h2>
                                <Card.Img
                                className="ht-image"
                                variant="top"
                                src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
                                ></Card.Img>
                            </>
                        )}
                    </div>
                    <div className="compressed-image-container">
                        {isCompressed && (
                            <>
                                <div>
                                    <h2 className="image-to-upload">Compressed Image</h2>
                                    <Card.Img
                                        className="ht-image"
                                        variant="top"
                                        src={CompressedImage}
                                    ></Card.Img>
                                </div>
                                <div className="d-flex justify-content-center download">
                                    <a
                                    href={CompressedImage}
                                    download={OutpitFileName}
                                    className="mt-2 btn btn-dark w-75"
                                    >
                                    Download
                                    </a>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="btn-container">
                    <button onClick={e=>compressImageClick(e)}>Compress Image</button>
                    
                </div>
            </div>
        </div>
    );
}

export default ImageCompressor;