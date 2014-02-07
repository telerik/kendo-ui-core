<?php

namespace Kendo\UI;

class GridPageableMessages extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The pager info text. Uses kendo.format.Contains three placeholders:
- {0} - the first data item index
- {1} - the last data item index
- {2} - the total number of data items
    * @param string $value
    * @return \Kendo\UI\GridPageableMessages
    */
    public function display($value) {
        return $this->setProperty('display', $value);
    }

    /**
    * The text displayed when the grid is empty.
    * @param string $value
    * @return \Kendo\UI\GridPageableMessages
    */
    public function _empty($value) {
        return $this->setProperty('empty', $value);
    }

    /**
    * The label displayed before the pager input.
    * @param string $value
    * @return \Kendo\UI\GridPageableMessages
    */
    public function page($value) {
        return $this->setProperty('page', $value);
    }

    /**
    * The label displayed before the pager input. Uses kendo.format. Contains one optional placeholder {0} which represents the total number of pages.
    * @param string $value
    * @return \Kendo\UI\GridPageableMessages
    */
    public function of($value) {
        return $this->setProperty('of', $value);
    }

    /**
    * The label displayed after the page size dropdown list.
    * @param string $value
    * @return \Kendo\UI\GridPageableMessages
    */
    public function itemsPerPage($value) {
        return $this->setProperty('itemsPerPage', $value);
    }

    /**
    * The tooltip of the button which goes to the first page.
    * @param string $value
    * @return \Kendo\UI\GridPageableMessages
    */
    public function first($value) {
        return $this->setProperty('first', $value);
    }

    /**
    * The tooltip of the button which goes to the last page.
    * @param string $value
    * @return \Kendo\UI\GridPageableMessages
    */
    public function last($value) {
        return $this->setProperty('last', $value);
    }

    /**
    * The tooltip of the button which goes to the next page.
    * @param string $value
    * @return \Kendo\UI\GridPageableMessages
    */
    public function next($value) {
        return $this->setProperty('next', $value);
    }

    /**
    * The tooltip of the button which goes to the previous page.
    * @param string $value
    * @return \Kendo\UI\GridPageableMessages
    */
    public function previous($value) {
        return $this->setProperty('previous', $value);
    }

    /**
    * The tooltip of the refresh button.
    * @param string $value
    * @return \Kendo\UI\GridPageableMessages
    */
    public function refresh($value) {
        return $this->setProperty('refresh', $value);
    }

    /**
    * The tooltip of the ellipsis ("...") button, which appears when the number of pages is greater than the buttonCount.
    * @param string $value
    * @return \Kendo\UI\GridPageableMessages
    */
    public function morePages($value) {
        return $this->setProperty('morePages', $value);
    }

//<< Properties
}

?>
