import * as useHistory from 'modules/useHistory';

export type State<T> = [T, React.Dispatch<T>];

export interface props {
  history: useHistory.history;
}

export type ImageUploader = (props: props) => JSX.Element;
export const ImageUploader: ImageUploader;
export default ImageUploader;