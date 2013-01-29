<?php

namespace Kendo\UI;

class EditorImagebrowserMessages extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines text for upload button.
    * @param string $value
    * @returns \Kendo\UI\EditorImagebrowserMessages
    */
    public function uploadFile($value) {
        return $this->setProperty('uploadFile', $value);
    }

    /**
    * Defines text for order by label.
    * @param string $value
    * @returns \Kendo\UI\EditorImagebrowserMessages
    */
    public function orderBy($value) {
        return $this->setProperty('orderBy', $value);
    }

    /**
    * Defines text for Name item of order by drop down list.
    * @param string $value
    * @returns \Kendo\UI\EditorImagebrowserMessages
    */
    public function orderByName($value) {
        return $this->setProperty('orderByName', $value);
    }

    /**
    * Defines text for Size item of order by drop down list.
    * @param string $value
    * @returns \Kendo\UI\EditorImagebrowserMessages
    */
    public function orderBySize($value) {
        return $this->setProperty('orderBySize', $value);
    }

    /**
    * Defines text for dialog shown when the directory not found error occurs.
    * @param string $value
    * @returns \Kendo\UI\EditorImagebrowserMessages
    */
    public function directoryNotFound($value) {
        return $this->setProperty('directoryNotFound', $value);
    }

    /**
    * Defines text displayed when folder does not contain items.
    * @param string $value
    * @returns \Kendo\UI\EditorImagebrowserMessages
    */
    public function emptyFolder($value) {
        return $this->setProperty('emptyFolder', $value);
    }

    /**
    * Defines text for dialog shown when the file or directory is deleted.
    * @param string $value
    * @returns \Kendo\UI\EditorImagebrowserMessages
    */
    public function deleteFile($value) {
        return $this->setProperty('deleteFile', $value);
    }

    /**
    * Defines text for dialog shown when an invalid file is set for upload.
    * @param string $value
    * @returns \Kendo\UI\EditorImagebrowserMessages
    */
    public function invalidFileType($value) {
        return $this->setProperty('invalidFileType', $value);
    }

    /**
    * Defines text for dialog shown when an already existing file is set for upload.
    * @param string $value
    * @returns \Kendo\UI\EditorImagebrowserMessages
    */
    public function overwriteFile($value) {
        return $this->setProperty('overwriteFile', $value);
    }

//<< Properties
}

?>
