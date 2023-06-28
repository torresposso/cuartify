import { FunctionComponent } from "preact";

type Props = {
  images?: string[];
};

const ImageGallery: FunctionComponent<Props> = ({ images }) => {
  return (
    <div>
      {images?.map((image) => (
        <div>
          <img src={image} alt="" />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
