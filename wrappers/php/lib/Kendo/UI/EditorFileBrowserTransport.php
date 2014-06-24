<?php

namespace Kendo\UI;

class EditorFileBrowserTransport extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Options or URL for remote file retrieval.
    * @param string|\Kendo\UI\EditorFileBrowserTransportRead|array $value
    * @return \Kendo\UI\EditorFileBrowserTransport
    */
    public function read($value) {
        return $this->setProperty('read', $value);
    }

    /**
    * The URL which will handle the upload of the new files. If not specified the Upload button will not be displayed.
    * @param string $value
    * @return \Kendo\UI\EditorFileBrowserTransport
    */
    public function uploadUrl($value) {
        return $this->setProperty('uploadUrl', $value);
    }

    /**
    * The URL responsible for serving the original file. A file name placeholder should be specified.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\UI\EditorFileBrowserTransport
    */
    public function fileUrl($value) {
        return $this->setProperty('fileUrl', $value);
    }

    /**
    * Options or URL which will handle the file and directory deletion. If not specified the delete button will not be present.
    * @param string|\Kendo\UI\EditorFileBrowserTransportDestroy|array $value
    * @return \Kendo\UI\EditorFileBrowserTransport
    */
    public function destroy($value) {
        return $this->setProperty('destroy', $value);
    }

    /**
    * Options or URL which will handle the directory creation. If not specified that create new folder button will not be present.
    * @param string|\Kendo\UI\EditorFileBrowserTransportCreate|array $value
    * @return \Kendo\UI\EditorFileBrowserTransport
    */
    public function create($value) {
        return $this->setProperty('create', $value);
    }

//<< Properties
}

?>
