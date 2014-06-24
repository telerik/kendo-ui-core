<?php

namespace Kendo\UI;

class EditorFileBrowser extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the allowed file extensions.
    * @param string $value
    * @return \Kendo\UI\EditorFileBrowser
    */
    public function fileTypes($value) {
        return $this->setProperty('fileTypes', $value);
    }

    /**
    * Defines the initial folder to display, relative to the root.
    * @param string $value
    * @return \Kendo\UI\EditorFileBrowser
    */
    public function path($value) {
        return $this->setProperty('path', $value);
    }

    /**
    * Specifies the settings for loading and saving data.
    * @param \Kendo\UI\EditorFileBrowserTransport|array $value
    * @return \Kendo\UI\EditorFileBrowser
    */
    public function transport($value) {
        return $this->setProperty('transport', $value);
    }

    /**
    * Set the object responsible for describing the file raw data format.
    * @param \Kendo\UI\EditorFileBrowserSchema|array $value
    * @return \Kendo\UI\EditorFileBrowser
    */
    public function schema($value) {
        return $this->setProperty('schema', $value);
    }

    /**
    * Defines texts shown within the file browser.
    * @param \Kendo\UI\EditorFileBrowserMessages|array $value
    * @return \Kendo\UI\EditorFileBrowser
    */
    public function messages($value) {
        return $this->setProperty('messages', $value);
    }

//<< Properties
}

?>
