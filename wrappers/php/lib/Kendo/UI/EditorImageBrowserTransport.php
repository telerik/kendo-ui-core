<?php

namespace Kendo\UI;

class EditorImageBrowserTransport extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Options or URL for remote image retrieval.
    * @param string|\Kendo\UI\EditorImageBrowserTransportRead|array $value
    * @return \Kendo\UI\EditorImageBrowserTransport
    */
    public function read($value) {
        return $this->setProperty('read', $value);
    }

    /**
    * The URL for retrieving the thumbnail version of the image. If not specified a default image icon will be shown.
If function is assigned, the current path and image name will be provided.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\UI\EditorImageBrowserTransport
    */
    public function thumbnailUrl($value) {
        return $this->setProperty('thumbnailUrl', $value);
    }

    /**
    * The URL which will handle the upload of the new images. If not specified the Upload button will not be displayed.
    * @param string $value
    * @return \Kendo\UI\EditorImageBrowserTransport
    */
    public function uploadUrl($value) {
        return $this->setProperty('uploadUrl', $value);
    }

    /**
    * The URL responsible for serving the original image. A file name placeholder should be specified.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\UI\EditorImageBrowserTransport
    */
    public function imageUrl($value) {
        return $this->setProperty('imageUrl', $value);
    }

    /**
    * Options or URL which will handle the file and directory deletion. If not specified the delete button will not be present.
    * @param string|\Kendo\UI\EditorImageBrowserTransportDestroy|array $value
    * @return \Kendo\UI\EditorImageBrowserTransport
    */
    public function destroy($value) {
        return $this->setProperty('destroy', $value);
    }

    /**
    * Options or URL which will handle the directory creation. If not specified that create new folder button will not be present.
    * @param string|\Kendo\UI\EditorImageBrowserTransportCreate|array $value
    * @return \Kendo\UI\EditorImageBrowserTransport
    */
    public function create($value) {
        return $this->setProperty('create', $value);
    }

//<< Properties
}

?>
