<?php

namespace Kendo\UI;

class ListViewPageable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the number of records which will be displyed.
    * @param float $value
    * @return \Kendo\UI\ListViewPageable
    */
    public function pageSize($value) {
        return $this->setProperty('pageSize', $value);
    }

    /**
    * Defines if buttons for navigating to the first, last, previous and next pages will be shown.
    * @param boolean $value
    * @return \Kendo\UI\ListViewPageable
    */
    public function previousNext($value) {
        return $this->setProperty('previousNext', $value);
    }

    /**
    * Defines if numeric portion of the pager will be shown.
    * @param boolean $value
    * @return \Kendo\UI\ListViewPageable
    */
    public function numeric($value) {
        return $this->setProperty('numeric', $value);
    }

    /**
    * Defines the number of buttons displayed in the numeric pager.
    * @param float $value
    * @return \Kendo\UI\ListViewPageable
    */
    public function buttonCount($value) {
        return $this->setProperty('buttonCount', $value);
    }

    /**
    * Defines if an input element which allows the user to navigate to given page will be displayed.
    * @param boolean $value
    * @return \Kendo\UI\ListViewPageable
    */
    public function input($value) {
        return $this->setProperty('input', $value);
    }

    /**
    * Displayes a list with predefined page sizes. An array of values to be displayed can be provided.
    * @param boolean|array $value
    * @return \Kendo\UI\ListViewPageable
    */
    public function pageSizes($value) {
        return $this->setProperty('pageSizes', $value);
    }

    /**
    * Defines if a refresh button will be displayed.
    * @param boolean $value
    * @return \Kendo\UI\ListViewPageable
    */
    public function refresh($value) {
        return $this->setProperty('refresh', $value);
    }

    /**
    * Defines if a label showing current paging information will be displayed.
    * @param boolean $value
    * @return \Kendo\UI\ListViewPageable
    */
    public function info($value) {
        return $this->setProperty('info', $value);
    }

    /**
    * Defines texts shown within the pager.
    * @param \Kendo\UI\ListViewPageableMessages|array $value
    * @return \Kendo\UI\ListViewPageable
    */
    public function messages($value) {
        return $this->setProperty('messages', $value);
    }

//<< Properties
}

?>
