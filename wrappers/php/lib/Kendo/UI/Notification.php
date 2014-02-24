<?php

namespace Kendo\UI;

class Notification extends \Kendo\UI\Widget {
    public function name() {
        return 'Notification';
    }
//>> Properties

    /**
    * Indicates the period in milliseconds after which a notification can be dismissed (hidden) by the user.
    * @param float $value
    * @return \Kendo\UI\Notification
    */
    public function allowHideAfter($value) {
        return $this->setProperty('allowHideAfter', $value);
    }

    /**
    * Defines custom show and hide animations via an Kendo UI Animation object. Setting the value to false disables animations.
    * @param |boolean $value
    * @return \Kendo\UI\Notification
    */
    public function animation($value) {
        return $this->setProperty('animation', $value);
    }

    /**
    * Defines the element to which the notifications will be appended or prepended (depending on the stacking direction).
    * @param string $value
    * @return \Kendo\UI\Notification
    */
    public function appendTo($value) {
        return $this->setProperty('appendTo', $value);
    }

    /**
    * Indicates the period in milliseconds after which a notification disappears automatically. Setting a zero value disables this behavior.
    * @param float $value
    * @return \Kendo\UI\Notification
    */
    public function autoHideAfter($value) {
        return $this->setProperty('autoHideAfter', $value);
    }

    /**
    * Determines whether the notifications will include a hide button. This setting works with the built-in templates only.
    * @param boolean $value
    * @return \Kendo\UI\Notification
    */
    public function button($value) {
        return $this->setProperty('button', $value);
    }

    /**
    * Defines the notifications' height. Numbers are treated as pixels.
    * @param float|string $value
    * @return \Kendo\UI\Notification
    */
    public function height($value) {
        return $this->setProperty('height', $value);
    }

    /**
    * Determines whether notifications can be hidden by clicking anywhere on their content.
    * @param boolean $value
    * @return \Kendo\UI\Notification
    */
    public function hideOnClick($value) {
        return $this->setProperty('hideOnClick', $value);
    }

    /**
    * This setting applies to popup notifications only, i.e. in cases when appendTo is not set.
It determines the position of the first notification on the screen, as well as whether the notifications will move together with the page content during scrolling.
top takes precedence over bottom and left takes precedence over right.
    * @param \Kendo\UI\NotificationPosition|array $value
    * @return \Kendo\UI\Notification
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * Determines the direction in which multiple notification will stack (arrange) with regard to the first one. Possible values are "up", "right", "down", "left" and "default".
The "default" setting takes into consideration the applied position settings and is evaluated to "up" or "down".
    * @param string $value
    * @return \Kendo\UI\Notification
    */
    public function stacking($value) {
        return $this->setProperty('stacking', $value);
    }

    /**
    * Adds NotificationTemplate to the Notification.
    * @param \Kendo\UI\NotificationTemplate|array,... $value one or more NotificationTemplate to add.
    * @return \Kendo\UI\Notification
    */
    public function addTemplate($value) {
        return $this->add('templates', func_get_args());
    }

    /**
    * Defines the notifications' width. Numbers are treated as pixels.
    * @param float|string $value
    * @return \Kendo\UI\Notification
    */
    public function width($value) {
        return $this->setProperty('width', $value);
    }

    /**
    * Sets the hide event of the Notification.
    * Fires when a notification's hiding animation starts.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Notification
    */
    public function hide($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('hide', $value);
    }

    /**
    * Sets the show event of the Notification.
    * Fires when a notification's showing animation starts.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\Notification
    */
    public function show($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('show', $value);
    }


//<< Properties
}

?>
