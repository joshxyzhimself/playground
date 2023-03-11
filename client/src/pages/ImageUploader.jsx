// @ts-check

import React from 'react';
import pb from 'pretty-bytes';
import Spinner from '../components/Spinner';

/**
 * @type {import('./ImageUploader').ImageUploader}
 */
export const ImageUploader = (props) => {

  const { history } = props;

  const file_input_ref = React.useRef(null);

  /**
   * @type {import('./ImageUploader').State<import('./ImageUploader').result>}
   */
  const [result, set_result] = React.useState(null);

  const [uploading, set_uploading] = React.useState(false);

  // read from file
  const read_file = React.useCallback((file) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', async (event) => {
      try {
        /**
         * @type {ArrayBuffer}
         */
        // @ts-ignore
        const file_arraybuffer = event.target.result;
        const file_buffer = new Uint8Array(file_arraybuffer);

        console.log({ file, file_buffer });

        const form_data = new FormData();
        form_data.append('file', file);

        set_uploading(true);

        const response = await fetch('/api/image-uploader/images', {
          method: 'POST',
          body: form_data,
        });

        if (response.status >= 400) {
          const response_text = await response.text();
          throw new Error(response_text);
        }
        if (response.status >= 200) {
          if (response.headers.has('content-type') === true) {
            if (response.headers.get('content-type').includes('application/json') === true) {
              const response_json = await response.json();
              set_result(response_json);
            }
          }
        }
      } catch (e) {
        console.error(e);
        alert(e.message);
      } finally {
        set_uploading(false);
      }
    });
    reader.readAsArrayBuffer(file);
    file_input_ref.current.value = '';
  }, []);

  return (
    <div style={{ padding: 8 }}>
      <div className="p-4">

        <div className="p-1 text-left text-2xl font-medium">
          Image Uploader
        </div>

        <div className="p-1 w-full sm:w-3/4 md:w-2/3 text-left text-base font-light">
          Image uploader for modern image formats. Applies MozJPEG which improves JPEG compression efficiency achieving higher visual quality and smaller file sizes at the same time.
        </div>

        { result instanceof Object ? (
          <div className="p-2 w-full sm:w-4/5 md:w-1/2 lg:w-1/3">
            <div className="my-2 p-2 h-48 w-full bg-slate-100 rounded">
              <img className="h-full w-full object-scale-down" alt="" src={result.converted_url} />
            </div>
            <div className="my-2 p-2 w-full bg-slate-100 rounded">
              <div className="p-1 w-full text-left text-xs font-light">
                { `Original file: ${pb(result.file_metadata.size)}, ${result.file_metadata.format}` }
              </div>
              <div className="p-1 w-full text-left text-xs font-light">
                { `Converted file: ${pb(result.converted_metadata.size)}, ${result.converted_metadata.format}` }
              </div>
              <textarea className="p-1 w-full bg-slate-100 resize-none" rows={3} value={window.location.origin.concat(result.converted_url)} readOnly />
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.origin.concat(result.converted_url));
                  }}
                >
                  Copy Link
                </button>
                <button
                  type="button"
                  onClick={() => {
                    set_result(null);
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-2 w-full sm:w-4/5 md:w-1/2 lg:w-1/3">
            <div className="my-2 p-2 w-full bg-slate-100 rounded">
              { uploading === true ? (
                <React.Fragment>
                  <Spinner />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <button
                    type="button"
                    onClick={() => {
                      if (file_input_ref.current instanceof Object) {
                        if (file_input_ref.current.click instanceof Function) {
                          file_input_ref.current.click();
                        }
                      }
                    }}
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
                </React.Fragment>
              ) }
            </div>
          </div>
        ) }

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