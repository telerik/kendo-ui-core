<?php

namespace Kendo\UI;

class TreeListExcel extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the file name of the exported Excel file.
    * @param string $value
    * @return \Kendo\UI\TreeListExcel
    */
    public function fileName($value) {
        return $this->setProperty('fileName', $value);
    }

    /**
    * Enables or disables column filtering in the Excel file. Not to be mistaken with the treelist filtering feature.
    * @param boolean $value
    * @return \Kendo\UI\TreeListExcel
    */
    public function filterable($value) {
        return $this->setProperty('filterable', $value);
    }

    /**
    * If set to true, the content will be forwarded to proxyURL even if the browser supports saving files locally.
    * @param boolean $value
    * @return \Kendo\UI\TreeListExcel
    */
    public function forceProxy($value) {
        return $this->setProperty('forceProxy', $value);
    }

    /**
    * The URL of the server side proxy which will stream the file to the end user.A proxy will be used when the browser isn't capable of saving files locally.
Such browsers are IE version 9 and lower and Safari.The developer is responsible for implementing the server-side proxy.The proxy will receive a POST request with the following parameters in the request body:The proxy should return the decoded file with set "Content-Disposition" header.
    * @param string $value
    * @return \Kendo\UI\TreeListExcel
    */
    public function proxyURL($value) {
        return $this->setProperty('proxyURL', $value);
    }

//<< Properties
}

?>
