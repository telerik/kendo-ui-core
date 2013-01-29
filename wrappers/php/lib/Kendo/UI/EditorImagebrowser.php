<?php

namespace Kendo\UI;

class EditorImagebrowser extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the allowed file extensions.
    * @param string $value
    * @return \Kendo\UI\EditorImagebrowser
    */
    public function fileTypes($value) {
        return $this->setProperty('fileTypes', $value);
    }

    /**
    * Defines the initial folder to display, relative to the root.
    * @param string $value
    * @return \Kendo\UI\EditorImagebrowser
    */
    public function path($value) {
        return $this->setProperty('path', $value);
    }

    /**
    * Specifies the settings for loading and saving data.
    * @param mixed|\Kendo\UI\EditorImagebrowserTransport $value
    * @return \Kendo\UI\EditorImagebrowser
    */
    public function transport($value) {
        return $this->setProperty('transport', $value);
    }

    /**
    * Set the object responsible for describing the image raw data format.
    * @param mixed|\Kendo\UI\EditorImagebrowserSchema $value
    * @return \Kendo\UI\EditorImagebrowser
    */
    public function schema($value) {
        return $this->setProperty('schema', $value);
    }

    /**
    * Defines texts shown within the pager.
    * @param mixed|\Kendo\UI\EditorImagebrowserMessages $value
    * @return \Kendo\UI\EditorImagebrowser
    */
    public function messages($value) {
        return $this->setProperty('messages', $value);
    }

//<< Properties
}

?>
