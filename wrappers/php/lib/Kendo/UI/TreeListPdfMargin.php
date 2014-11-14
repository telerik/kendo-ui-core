<?php

namespace Kendo\UI;

class TreeListPdfMargin extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The bottom margin. Numbers are considered as "pt" units.
    * @param float|string $value
    * @return \Kendo\UI\TreeListPdfMargin
    */
    public function bottom($value) {
        return $this->setProperty('bottom', $value);
    }

    /**
    * The left margin. Numbers are considered as "pt" units.
    * @param float|string $value
    * @return \Kendo\UI\TreeListPdfMargin
    */
    public function left($value) {
        return $this->setProperty('left', $value);
    }

    /**
    * The right margin. Numbers are considered as "pt" units.
    * @param float|string $value
    * @return \Kendo\UI\TreeListPdfMargin
    */
    public function right($value) {
        return $this->setProperty('right', $value);
    }

    /**
    * The top margin. Numbers are considered as "pt" units.
    * @param float|string $value
    * @return \Kendo\UI\TreeListPdfMargin
    */
    public function top($value) {
        return $this->setProperty('top', $value);
    }

//<< Properties
}

?>
