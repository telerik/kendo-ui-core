<?php

namespace Kendo\UI;

class EditorImagebrowserTransport extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Options or URL for remote image retrieval.
    * @param Object|string $value
    * @returns \Kendo\UI\EditorImagebrowserTransport
    */
    public function read($value) {
        return $this->setProperty('read', $value);
    }

    /**
    * The URL for retrieving the thumbnail version of the image. If not specified a default image icon will be shown.
    * @param string $value
    * @returns \Kendo\UI\EditorImagebrowserTransport
    */
    public function thumbnailUrl($value) {
        return $this->setProperty('thumbnailUrl', $value);
    }

    /**
    * The URL which will handle the upload of the new images. If not specified the Upload button will not be displayed.
    * @param string $value
    * @returns \Kendo\UI\EditorImagebrowserTransport
    */
    public function uploadUrl($value) {
        return $this->setProperty('uploadUrl', $value);
    }

    /**
    * The URL responsible for serving the original image. A file name placeholder should be specifed.
    * @param string|\kendo\JavaScriptFunction $value
    * @returns \Kendo\UI\EditorImagebrowserTransport
    */
    public function imageUrl($value) {
        return $this->setProperty('imageUrl', $value);
    }

    /**
    * Options or URL which will handle the file and directory deletion. If not specified the delete button will not be present.
    * @param Object|string $value
    * @returns \Kendo\UI\EditorImagebrowserTransport
    */
    public function destroy($value) {
        return $this->setProperty('destroy', $value);
    }

    /**
    * Options or URL which will handle the directory creation. If not specified that create new folder button will not be present.
    * @param Object|string $value
    * @returns \Kendo\UI\EditorImagebrowserTransport
    */
    public function create($value) {
        return $this->setProperty('create', $value);
    }

//<< Properties
}

?>
