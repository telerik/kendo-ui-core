<?php

namespace Kendo\UI;

class EditorImageBrowserMessages extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines text for upload button.
    * @param string $value
    * @return \Kendo\UI\EditorImageBrowserMessages
    */
    public function uploadFile($value) {
        return $this->setProperty('uploadFile', $value);
    }

    /**
    * Defines text for order by label.
    * @param string $value
    * @return \Kendo\UI\EditorImageBrowserMessages
    */
    public function orderBy($value) {
        return $this->setProperty('orderBy', $value);
    }

    /**
    * Defines text for Name item of order by drop down list.
    * @param string $value
    * @return \Kendo\UI\EditorImageBrowserMessages
    */
    public function orderByName($value) {
        return $this->setProperty('orderByName', $value);
    }

    /**
    * Defines text for Size item of order by drop down list.
    * @param string $value
    * @return \Kendo\UI\EditorImageBrowserMessages
    */
    public function orderBySize($value) {
        return $this->setProperty('orderBySize', $value);
    }

    /**
    * Defines text for dialog shown when the directory not found error occurs.
    * @param string $value
    * @return \Kendo\UI\EditorImageBrowserMessages
    */
    public function directoryNotFound($value) {
        return $this->setProperty('directoryNotFound', $value);
    }

    /**
    * Defines text displayed when folder does not contain items.
    * @param string $value
    * @return \Kendo\UI\EditorImageBrowserMessages
    */
    public function emptyFolder($value) {
        return $this->setProperty('emptyFolder', $value);
    }

    /**
    * Defines text for dialog shown when the file or directory is deleted.
    * @param string $value
    * @return \Kendo\UI\EditorImageBrowserMessages
    */
    public function deleteFile($value) {
        return $this->setProperty('deleteFile', $value);
    }

    /**
    * Defines text for dialog shown when an invalid file is set for upload.
    * @param string $value
    * @return \Kendo\UI\EditorImageBrowserMessages
    */
    public function invalidFileType($value) {
        return $this->setProperty('invalidFileType', $value);
    }

    /**
    * Defines text for dialog shown when an already existing file is set for upload.
    * @param string $value
    * @return \Kendo\UI\EditorImageBrowserMessages
    */
    public function overwriteFile($value) {
        return $this->setProperty('overwriteFile', $value);
    }

    /**
    * Defines text for search box pleaceholder.
    * @param string $value
    * @return \Kendo\UI\EditorImageBrowserMessages
    */
    public function search($value) {
        return $this->setProperty('search', $value);
    }

//<< Properties
}

?>
