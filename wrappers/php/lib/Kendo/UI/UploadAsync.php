<?php

namespace Kendo\UI;

class UploadAsync extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The selected files will be uploaded immediately by default. You can change this behavior by setting
autoUpload to false.
    * @param boolean $value
    * @return \Kendo\UI\UploadAsync
    */
    public function autoUpload($value) {
        return $this->setProperty('autoUpload', $value);
    }

    /**
    * The selected files will be uploaded in separate requests, if this is supported by the browser.
You can change this behavior by setting batch to true.
    * @param boolean $value
    * @return \Kendo\UI\UploadAsync
    */
    public function batch($value) {
        return $this->setProperty('batch', $value);
    }

    /**
    * The name of the form field submitted to the Remove URL.
    * @param string $value
    * @return \Kendo\UI\UploadAsync
    */
    public function removeField($value) {
        return $this->setProperty('removeField', $value);
    }

    /**
    * The URL of the handler responsible for removing uploaded files (if any). The handler must accept POST
requests containing one or more "fileNames" fields specifying the files to be deleted.
    * @param string $value
    * @return \Kendo\UI\UploadAsync
    */
    public function removeUrl($value) {
        return $this->setProperty('removeUrl', $value);
    }

    /**
    * The HTTP verb to be used by the remove action.
    * @param string $value
    * @return \Kendo\UI\UploadAsync
    */
    public function removeVerb($value) {
        return $this->setProperty('removeVerb', $value);
    }

    /**
    * The name of the form field submitted to the save URL. The default value is the input name.
    * @param string $value
    * @return \Kendo\UI\UploadAsync
    */
    public function saveField($value) {
        return $this->setProperty('saveField', $value);
    }

    /**
    * The URL of the handler that will receive the submitted files. The handler must accept POST requests
containing one or more fields with the same name as the original input name.
    * @param string $value
    * @return \Kendo\UI\UploadAsync
    */
    public function saveUrl($value) {
        return $this->setProperty('saveUrl', $value);
    }

//<< Properties
}

?>
