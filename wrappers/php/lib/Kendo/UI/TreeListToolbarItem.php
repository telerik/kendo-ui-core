<?php

namespace Kendo\UI;

class TreeListToolbarItem extends \Kendo\SerializableObject {
    function __construct($name = null) {
        $this->name($name);
    }
//>> Properties

    /**
    * The name of the toolbar command. Either a built-in ("create" and "excel") or custom. The name is reflected in one of the CSS classes, which is applied to the button - k-grid-name.
This class can be used to obtain reference to the button after TreeList initialization and attach click handlers.
    * @param string $value
    * @return \Kendo\UI\TreeListToolbarItem
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * The text displayed by the command button. If not set the name` option would be used as the button text instead.
    * @param string $value
    * @return \Kendo\UI\TreeListToolbarItem
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

//<< Properties
}

?>
