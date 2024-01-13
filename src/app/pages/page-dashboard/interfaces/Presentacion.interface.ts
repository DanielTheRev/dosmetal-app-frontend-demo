import { CloudinaryImgRef } from 'src/app/interfaces/cloudinary.interface';

export interface PresentacionInfo {
  _id?: string;
  description: string;
  images: {
    _id: string;
    imgRef: CloudinaryImgRef;
  }[];
}

export interface News {
  _id?: string;
  title: string;
  description: string;
  images: { _id: string; imgRef: CloudinaryImgRef }[];
}
