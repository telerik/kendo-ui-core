<?php

namespace Kendo\UI;

class ListViewPageableMessages extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the info text.
    * @param string $value
    * @return \Kendo\UI\ListViewPageableMessages
    */
    public function display($value) {
        return $this->setProperty('display', $value);
    }

    /**
    * Defines the info text shown when there are no records to be displayed.
    * @param string $value
    * @return \Kendo\UI\ListViewPageableMessages
    */
    public function _empty($value) {
        return $this->setProperty('empty', $value);
    }

    /**
    * Defines the first part of the text of the input option.
    * @param string $value
    * @return \Kendo\UI\ListViewPageableMessages
    */
    public function page($value) {
        return $this->setProperty('page', $value);
    }

    /**
    * Defines the last part of the text of the input option.
    * @param string $value
    * @return \Kendo\UI\ListViewPageableMessages
    */
    public function of($value) {
        return $this->setProperty('of', $value);
    }

    /**
    * Defines the text displayed after the select element of the pageSizes mode.
    * @param string $value
    * @return \Kendo\UI\ListViewPageableMessages
    */
    public function itemsPerPage($value) {
        return $this->setProperty('itemsPerPage', $value);
    }

    /**
    * Defines the text of the first page button tooltip.
    * @param string $value
    * @return \Kendo\UI\ListViewPageableMessages
    */
    public function first($value) {
        return $this->setProperty('first', $value);
    }

    /**
    * Defines the text of the previous page button tooltip.
    * @param string $value
    * @return \Kendo\UI\ListViewPageableMessages
    */
    public function previous($value) {
        return $this->setProperty('previous', $value);
    }

    /**
    * Defines the text of the next page button tooltip.
    * @param string $value
    * @return \Kendo\UI\ListViewPageableMessages
    */
    public function next($value) {
        return $this->setProperty('next', $value);
    }

    /**
    * Defines the text of the last page button tooltip.
    * @param string $value
    * @return \Kendo\UI\ListViewPageableMessages
    */
    public function last($value) {
        return $this->setProperty('last', $value);
    }

    /**
    * Defines the text of the refresh button tooltip.
    * @param string $value
    * @return \Kendo\UI\ListViewPageableMessages
    */
    public function refresh($value) {
        return $this->setProperty('refresh', $value);
    }

//<< Properties
}

?>
