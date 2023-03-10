import * as useHistory from 'modules/useHistory';

export type State<T> = [T, React.Dispatch<T>];

export interface metadata{
  format: string;
  size: number,
  width: number,
  height: number,
  space: string;
  channels: number,
  depth: string;
  density: number,
  chromaSubsampling: string
  isProgressive: boolean;
  hasProfile: boolean;
  hasAlpha: boolean;
}

export interface result {
  file_metadata: metadata;
  converted_metadata: metadata;
  converted_hash: string;
  converted_basename: string;
  converted_path: string;
  converted_url: string;
}

export interface props {
  history: useHistory.history;
}

export type ImageUploader = (props: props) => JSX.Element;
export const ImageUploader: ImageUploader;
export default ImageUploader;