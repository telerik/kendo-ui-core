<?php

namespace Kendo\UI;

class EditorFileBrowserTransportCreate extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The content-type HTTP header sent to the server. Default is "application/x-www-form-urlencoded". Use "application/json" if the content is JSON.
Refer to the jQuery.ajax documentation for further info.
    * @param string $value
    * @return \Kendo\UI\EditorFileBrowserTransportCreate
    */
    public function contentType($value) {
        return $this->setProperty('contentType', $value);
    }

    /**
    * Data to be send to the server.
Refer to the jQuery.ajax documentation for further info.
    * @param |string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\UI\EditorFileBrowserTransportCreate
    */
    public function data($value) {
        return $this->setProperty('data', $value);
    }

    /**
    * The type of data that you're expecting back from the server. Commonly used values are "json" and "jsonp".
Refer to the jQuery.ajax documentation for further info.
    * @param string $value
    * @return \Kendo\UI\EditorFileBrowserTransportCreate
    */
    public function dataType($value) {
        return $this->setProperty('dataType', $value);
    }

    /**
    * The type of request to make ("POST", "GET", "PUT" or "DELETE"), default is "GET".
Refer to the jQuery.ajax documentation for further info.
    * @param string $value
    * @return \Kendo\UI\EditorFileBrowserTransportCreate
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * The remote url to call when creating a new record.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\UI\EditorFileBrowserTransportCreate
    */
    public function url($value) {
        return $this->setProperty('url', $value);
    }

//<< Properties
}

?>
