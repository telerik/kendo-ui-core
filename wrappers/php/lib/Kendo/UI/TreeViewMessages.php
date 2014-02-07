<?php

namespace Kendo\UI;

class TreeViewMessages extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text message shown while the root level items are loading.
    * @param string $value
    * @return \Kendo\UI\TreeViewMessages
    */
    public function loading($value) {
        return $this->setProperty('loading', $value);
    }

    /**
    * The text message shown in the retry button.
    * @param string $value
    * @return \Kendo\UI\TreeViewMessages
    */
    public function retry($value) {
        return $this->setProperty('retry', $value);
    }

    /**
    * The text message shown when an error occurs while fetching the content.
    * @param string $value
    * @return \Kendo\UI\TreeViewMessages
    */
    public function requestFailed($value) {
        return $this->setProperty('requestFailed', $value);
    }

//<< Properties
}

?>
