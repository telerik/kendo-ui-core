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
    * The URL of the server side proxy which will stream the Excel file to the end user. Used when the browser isn't capable of saving files from JavaScript. Such browsers are IE<10 and Safari.
The developer is responsible for implementing the server-side proxy. Implementation instructions are available here.
    * @param string $value
    * @return \Kendo\UI\GridExcel
    */
    public function proxyURL($value) {
        return $this->setProperty('proxyURL', $value);
    }

//<< Properties
}

?>
