<?php

namespace Kendo\UI;

class GridExcel extends \Kendo\SerializableObject {
//>> Properties

    /**
    * If set to true the grid will export all pages of data. By default the grid exports only the current page.
    * @param boolean $value
    * @return \Kendo\UI\GridExcel
    */
    public function allPages($value) {
        return $this->setProperty('allPages', $value);
    }

    /**
    * Specifies the file name of the exported Excel file.
    * @param string $value
    * @return \Kendo\UI\GridExcel
    */
    public function fileName($value) {
        return $this->setProperty('fileName', $value);
    }

    /**
    * Enables or disables column filtering in the Excel file. Not to be mistaken with the grid filtering feature.
    * @param boolean $value
    * @return \Kendo\UI\GridExcel
    */
    public function filterable($value) {
        return $this->setProperty('filterable', $value);
    }

    /**
    * If set to true, the content will be forwarded to proxyURL even if the browser supports saving files locally.
    * @param boolean $value
    * @return \Kendo\UI\GridExcel
    */
    public function forceProxy($value) {
        return $this->setProperty('forceProxy', $value);
    }

    /**
    * The URL of the server side proxy which will stream the file to the end user.A proxy will be used when the browser isn't capable of saving files locally.
Such browsers are IE version 9 and lower and Safari.The developer is responsible for implementing the server-side proxy.The proxy will receive a POST request with the following parameters in the request body:The proxy should return the decoded file with set "Content-Disposition" header.
    * @param string $value
    * @return \Kendo\UI\GridExcel
    */
    public function proxyURL($value) {
        return $this->setProperty('proxyURL', $value);
    }

//<< Properties
}

?>
