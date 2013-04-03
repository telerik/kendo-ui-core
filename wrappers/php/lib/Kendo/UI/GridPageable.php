<?php

namespace Kendo\UI;

class GridPageable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The number of data items which will be displayed in the grid.
    * @param float $value
    * @return \Kendo\UI\GridPageable
    */
    public function pageSize($value) {
        return $this->setProperty('pageSize', $value);
    }

    /**
    * If set to true the pager will display buttons for going to the first, previous, next and last pages. By default those buttons are displayed.
    * @param boolean $value
    * @return \Kendo\UI\GridPageable
    */
    public function previousNext($value) {
        return $this->setProperty('previousNext', $value);
    }

    /**
    * If set to true the pager will display buttons for navigating to specific pages. By default those buttons are displayed.
    * @param boolean $value
    * @return \Kendo\UI\GridPageable
    */
    public function numeric($value) {
        return $this->setProperty('numeric', $value);
    }

    /**
    * The maximum number of buttons displayed in the numeric pager. The pager will display ellipsis (...) if there are more pages than the specified number.
    * @param float $value
    * @return \Kendo\UI\GridPageable
    */
    public function buttonCount($value) {
        return $this->setProperty('buttonCount', $value);
    }

    /**
    * If set to true the pager will display an input element which allows the user to type a specific page number. By default the page input is not displayed.
    * @param boolean $value
    * @return \Kendo\UI\GridPageable
    */
    public function input($value) {
        return $this->setProperty('input', $value);
    }

    /**
    * If set to true the pager will display a dropdown list which allows the user to pick a page size. By default the page size dropdown list is not displayed.Can be set to an array with the available page sizes.
    * @param boolean|array $value
    * @return \Kendo\UI\GridPageable
    */
    public function pageSizes($value) {
        return $this->setProperty('pageSizes', $value);
    }

    /**
    * If set to true the pager will display the refresh button. Clicking the refresh button will refresh the grid. By default the refresh button is not displayed.
    * @param boolean $value
    * @return \Kendo\UI\GridPageable
    */
    public function refresh($value) {
        return $this->setProperty('refresh', $value);
    }

    /**
    * If set to true the pager will display information about the current page and total number of data items. By default the paging information is displayed.
    * @param boolean $value
    * @return \Kendo\UI\GridPageable
    */
    public function info($value) {
        return $this->setProperty('info', $value);
    }

    /**
    * The text messages displayed in pager. Use this option to customize or localize the pager messages.
    * @param \Kendo\UI\GridPageableMessages|array $value
    * @return \Kendo\UI\GridPageable
    */
    public function messages($value) {
        return $this->setProperty('messages', $value);
    }

//<< Properties
}

?>
