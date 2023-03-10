// @ts-check

import React from 'react';
import pb from 'pretty-bytes';

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
        const response = await fetch('/api/image-uploader/images', {
          method: 'POST',
          body: form_data,
        });

        console.log(response.status);
        console.log(response.headers);

        if (response.status >= 400) {
          const response_text = await response.text();
          throw new Error(response_text);
        }
        if (response.status >= 200) {
          if (response.headers.has('content-type') === true) {
            if (response.headers.get('content-type').includes('application/json') === true) {
              const response_json = await response.json();
              console.log(response_json);
              set_result(response_json);
              return;
            }
          }
          const response_text = await response.text();
          console.log(response_text);
        }
      } catch (e) {
        console.error(e);
        alert(e.message);
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
          Anonymous image uploader supporting modern image formats. Applies MozJPEG which improves JPEG compression efficiency achieving higher visual quality and smaller file sizes at the same time.
        </div>

        { result instanceof Object ? (
          <div className="p-2 w-full sm:w-4/5 md:w-2/3">
            <div className="my-2 p-2 h-48 w-full bg-indigo-200 rounded">
              <img className="h-full w-full object-scale-down" alt="result" src={result.converted_url} />
            </div>
            <div className="my-2 p-2 w-full bg-indigo-50 rounded">
              <div className="p-1 w-full text-left text-xs font-light">
                { `Original file: ${pb(result.file_metadata.size)}, ${result.file_metadata.format}` }
              </div>
              <div className="p-1 w-full text-left text-xs font-light">
                { `Converted file: ${pb(result.converted_metadata.size)}, ${result.converted_metadata.format}` }
              </div>
              <textarea className="p-1 w-full bg-slate-50 resize-none" rows={2} value={window.location.origin.concat(result.converted_url)} readOnly />
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.origin.concat(result.converted_url));
                  }}
                >
                  copy link
                </button>
                <button
                  type="button"
                  onClick={() => {
                    set_result(null);
                  }}
                >
                  upload another image
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-2 w-full sm:w-4/5 md:w-2/3">
            <div className="my-2 p-2 w-full bg-indigo-50 rounded">
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
                select image
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