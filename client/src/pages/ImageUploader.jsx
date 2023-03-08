// @ts-check

import React from 'react';

/**
 * @type {import('./ImageUploader').ImageUploader}
 */
export const ImageUploader = (props) => {

  const { history } = props;

  const file_input_ref = React.useRef(null);

  /**
   * @type {import('./ImageUploader').State<string>}
   */
  const [link, set_link] = React.useState('');


  // read from file
  const read_file = React.useCallback((file) => {
    const reader = new FileReader();
    reader.onloadend = async (event) => {
      /**
         * @type {ArrayBuffer}
         */
      // @ts-ignore
      const file_arraybuffer = event.target.result;
      const file_buffer = new Uint8Array(file_arraybuffer);

      console.log({ file, file_buffer });

    };
    reader.readAsArrayBuffer(file);
    file_input_ref.current.value = '';
  }, []);

  React.useEffect(() => {

  }, []);

  return (
    <div style={{ padding: 8 }}>
      <div className="p-4">

        <div className="p-1 text-left text-2xl font-medium">
          Image Uploader
        </div>

        <div className="p-1 w-full sm:w-3/4 md:w-2/3 text-left text-base font-light">
          Anonymous image uploader supporting modern image formats. Applies MozJPEG which improves JPEG compression efficiency achieving higher visual quality and smaller file sizes at the same time.
        </div>

        <div className="w-32">
          <button
            onClick={() => {
              if (file_input_ref.current instanceof Object) {
                if (file_input_ref.current.click instanceof Function) {
                  file_input_ref.current.click();
                }
              }
            }}
            type="button"
          >
            Select Image
          </button>
          <input
            type="file"
            className="hidden"
            ref={file_input_ref}
            onChange={(e) => {
              const [file] = e.target.files;
              read_file(file);
            }}
            accept="image/*"
          />
        </div>

        <div className="px-1 py-2">
          <hr />
        </div>

        <div className="p-1 text-left text-xs font-light">
          Crafted by @joshxyzhimself.
        </div>

      </div>
    </div>
  );
};

export default ImageUploader;