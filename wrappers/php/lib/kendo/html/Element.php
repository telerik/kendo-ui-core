<?php

namespace kendo\html;

class Element {
    private $tagName;
    private $selfClosing;

    function __construct($tagName, $selfClosing = false) {
        $this->tagName = $tagName;
        $this->selfClosing = $selfClosing;
    }

    public function outerHtml() {
        $html = array();

        $html[] = '<';
        $html[] = $this->tagName;

        if ($this->selfClosing) {
            $html[] = ' />';
        } else {
            $html[] = '></';
            $html[] = $this->tagName;
            $html[] = '>';
        }

        return implode($html);
    }
}

?>
