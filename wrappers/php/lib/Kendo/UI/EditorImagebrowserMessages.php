<?php

namespace Kendo\UI;

class EditorImagebrowserMessages extends \Kendo\SerializableObject {
//>> Properties

    public function uploadFile($value) {
        return $this->setProperty('uploadFile', $value);
    }

    public function orderBy($value) {
        return $this->setProperty('orderBy', $value);
    }

    public function orderByName($value) {
        return $this->setProperty('orderByName', $value);
    }

    public function orderBySize($value) {
        return $this->setProperty('orderBySize', $value);
    }

    public function directoryNotFound($value) {
        return $this->setProperty('directoryNotFound', $value);
    }

    public function emptyFolder($value) {
        return $this->setProperty('emptyFolder', $value);
    }

    public function deleteFile($value) {
        return $this->setProperty('deleteFile', $value);
    }

    public function invalidFileType($value) {
        return $this->setProperty('invalidFileType', $value);
    }

    public function overwriteFile($value) {
        return $this->setProperty('overwriteFile', $value);
    }

//<< Properties
}

?>
