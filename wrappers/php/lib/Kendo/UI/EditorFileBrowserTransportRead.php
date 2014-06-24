<?php

namespace Kendo\UI;

class EditorFileBrowserTransportRead extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The content-type HTTP header sent to the server. Use "application/json" if the content is JSON.
Refer to the jQuery.ajax documentation for further info.
    * @param string $value
    * @return \Kendo\UI\EditorFileBrowserTransportRead
    */
    public function contentType($value) {
        return $this->setProperty('contentType', $value);
    }

    /**
    * Data to be send to the server.
Refer to the jQuery.ajax documentation for further info.
    * @param |string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\UI\EditorFileBrowserTransportRead
    */
    public function data($value) {
        return $this->setProperty('data', $value);
    }

    /**
    * The type of data that you're expecting back from the server. Commonly used values are "json" and "jsonp".
Refer to the jQuery.ajax documentation for further info.
    * @param string $value
    * @return \Kendo\UI\EditorFileBrowserTransportRead
    */
    public function dataType($value) {
        return $this->setProperty('dataType', $value);
    }

    /**
    * The type of request to make ("POST", "GET", "PUT" or "DELETE"), default is "GET".
Refer to the jQuery.ajax documentation for further info.
    * @param string $value
    * @return \Kendo\UI\EditorFileBrowserTransportRead
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * The remote url to call when fetching list of items.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\UI\EditorFileBrowserTransportRead
    */
    public function url($value) {
        return $this->setProperty('url', $value);
    }

//<< Properties
}

?>
