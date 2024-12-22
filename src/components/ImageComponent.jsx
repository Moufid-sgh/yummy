import { useState, useEffect } from "react";
import { Blurhash } from 'react-blurhash';


const ImageComponent = ({ src, className }) => {

    const [imageLoaded, setImageLoaded] = useState(false)

    useEffect(() => {
        const img = new Image()
        img.onload = () => {
            setImageLoaded(true)
        }
        img.src = src
    }, [src])


    return (
        <>
            <div style={{ display: imageLoaded ? 'none' : 'inline' }}>
                <Blurhash
                    hash="LSN],,o}WURi?^kCbERiysf4RjWA"
                    width="280px"
                    height="350px"
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                />
            </div>

            <img
                src={src}
                alt="Recipe image"
                width="100%"
                height="100%"
                onLoad={() => setImageLoaded(true)} 
                className={className}
                style={{ display : !imageLoaded ? 'none' : 'inline'}}
            />
        </>
    )
}

export default ImageComponent