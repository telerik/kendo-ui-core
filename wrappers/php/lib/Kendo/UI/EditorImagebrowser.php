<?php

namespace Kendo\UI;

class EditorImagebrowser extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the allowed file extensions.
    * @param string $value
    */
    public function fileTypes($value) {
        return $this->setProperty('fileTypes', $value);
    }

    /**
    * Defines the initial folder to display, relative to the root.
    * @param string $value
    */
    public function path($value) {
        return $this->setProperty('path', $value);
    }

    /**
    * Specifies the settings for loading and saving data.
    * @param \Kendo\UI\EditorImagebrowserTransport $value
    */
    public function transport(\Kendo\UI\EditorImagebrowserTransport $value) {
        return $this->setProperty('transport', $value);
    }

    /**
    * Set the object responsible for describing the image raw data format.
    * @param \Kendo\UI\EditorImagebrowserSchema $value
    */
    public function schema(\Kendo\UI\EditorImagebrowserSchema $value) {
        return $this->setProperty('schema', $value);
    }

    /**
    * Defines texts shown within the pager.
    * @param \Kendo\UI\EditorImagebrowserMessages $value
    */
    public function messages(\Kendo\UI\EditorImagebrowserMessages $value) {
        return $this->setProperty('messages', $value);
    }

//<< Properties
}

?>
