<?php

namespace Kendo\Data;

class DataSourceTransportRead extends \Kendo\SerializableObject {
//>> Properties

    /**
    * If set to false the request result will not be cached by the browser. Setting cache to false will only work correctly with HEAD and GET requests. It works by appending "_={timestamp}" to the GET parameters.
By default "jsonp" requests are not cached.Refer to the jQuery.ajax documentation for further info.
    * @param boolean $value
    * @return \Kendo\Data\DataSourceTransportRead
    */
    public function cache($value) {
        return $this->setProperty('cache', $value);
    }

    /**
    * The content-type HTTP header sent to the server. Default is "application/x-www-form-urlencoded". Use "application/json" if the content is JSON.
Refer to the jQuery.ajax documentation for further info.
    * @param string $value
    * @return \Kendo\Data\DataSourceTransportRead
    */
    public function contentType($value) {
        return $this->setProperty('contentType', $value);
    }

    /**
    * Additional parameters which are sent to the remote service.Refer to the jQuery.ajax documentation for further info.
    * @param |\Kendo\JavaScriptFunction $value
    * @return \Kendo\Data\DataSourceTransportRead
    */
    public function data($value) {
        return $this->setProperty('data', $value);
    }

    /**
    * The type of result expected from the server. Commonly used values are "json" and "jsonp".Refer to the jQuery.ajax documentation for further info.
    * @param string $value
    * @return \Kendo\Data\DataSourceTransportRead
    */
    public function dataType($value) {
        return $this->setProperty('dataType', $value);
    }

    /**
    * The type of request to make ("POST", "GET", "PUT" or "DELETE"), default is "GET".Refer to the jQuery.ajax documentation for further info.
    * @param string $value
    * @return \Kendo\Data\DataSourceTransportRead
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * The URL to which the request is sent.If set to function the data source will invoke it and use the result as the URL.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Data\DataSourceTransportRead
    */
    public function url($value) {
        return $this->setProperty('url', $value);
    }

//<< Properties
}

?>
