<?php

namespace Kendo\UI;

class NotificationTemplate extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Required. Specified a unique identifier, which is used to retrieve the correct template when a notification of this type is shown.See the example above.
    * @param string $value
    * @return \Kendo\UI\NotificationTemplate
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * Sets the template option of the NotificationTemplate.
    * Defines a Kendo UI template to be used with the corresponding notification type.See the example above.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\NotificationTemplate
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the NotificationTemplate.
    * Defines a Kendo UI template to be used with the corresponding notification type.See the example above.
    * @param string $value The template content.
    * @return \Kendo\UI\NotificationTemplate
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

//<< Properties
}

?>
