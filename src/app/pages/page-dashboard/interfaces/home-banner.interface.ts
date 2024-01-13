import { CloudinaryImgRef } from '../../../interfaces/cloudinary.interface';

export interface HomeBanner {
  _id?: string;
  banner: string;
  description: string;
  images: {
    _id: string;
    imgRef: CloudinaryImgRef;
  }[];
  createdAt: string;
  updatedAt: string;
}
