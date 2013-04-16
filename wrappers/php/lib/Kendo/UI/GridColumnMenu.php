<?php

namespace Kendo\UI;

class GridColumnMenu extends \Kendo\SerializableObject {
//>> Properties

    /**
    * If set to true the column menu would allow the user to select (show and hide) grid columns. By default the column menu allows column selection.
    * @param boolean $value
    * @return \Kendo\UI\GridColumnMenu
    */
    public function columns($value) {
        return $this->setProperty('columns', $value);
    }

    /**
    * If set to true the column menu would allow the user to filter the grid. By default the column menu allows the user to filter if filtering is enabled via the filterable.
    * @param boolean $value
    * @return \Kendo\UI\GridColumnMenu
    */
    public function filterable($value) {
        return $this->setProperty('filterable', $value);
    }

    /**
    * If set to true the column menu would allow the user to sort the grid by the column field. By default the column menu allows the user to sort if sorting is enabled via the sortable option.
    * @param boolean $value
    * @return \Kendo\UI\GridColumnMenu
    */
    public function sortable($value) {
        return $this->setProperty('sortable', $value);
    }

    /**
    * The text messages displayed in the column menu. Use it to customize or localize the column menu messages.
    * @param \Kendo\UI\GridColumnMenuMessages|array $value
    * @return \Kendo\UI\GridColumnMenu
    */
    public function messages($value) {
        return $this->setProperty('messages', $value);
    }

//<< Properties
}

?>
