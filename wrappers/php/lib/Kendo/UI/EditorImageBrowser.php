<?php

namespace Kendo\UI;

class EditorImageBrowser extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the allowed file extensions.
    * @param string $value
    * @return \Kendo\UI\EditorImageBrowser
    */
    public function fileTypes($value) {
        return $this->setProperty('fileTypes', $value);
    }

    /**
    * Defines the initial folder to display, relative to the root.
    * @param string $value
    * @return \Kendo\UI\EditorImageBrowser
    */
    public function path($value) {
        return $this->setProperty('path', $value);
    }

    /**
    * Specifies the settings for loading and saving data.
    * @param \Kendo\UI\EditorImageBrowserTransport|array $value
    * @return \Kendo\UI\EditorImageBrowser
    */
    public function transport($value) {
        return $this->setProperty('transport', $value);
    }

    /**
    * Set the object responsible for describing the image raw data format.
    * @param \Kendo\UI\EditorImageBrowserSchema|array $value
    * @return \Kendo\UI\EditorImageBrowser
    */
    public function schema($value) {
        return $this->setProperty('schema', $value);
    }

    /**
    * Defines texts shown within the image browser.
    * @param \Kendo\UI\EditorImageBrowserMessages|array $value
    * @return \Kendo\UI\EditorImageBrowser
    */
    public function messages($value) {
        return $this->setProperty('messages', $value);
    }

//<< Properties
}

?>
