<?php

namespace kendo\html;

include_once 'Node.php';

class Element implements Node {
    private $tagName;
    private $selfClosing;
    private $children = array();
    private $innerHtml = '';

    function __construct($tagName, $selfClosing = false) {
        $this->tagName = $tagName;
        $this->selfClosing = $selfClosing;
    }

    public function text($value) {
        $this->innerHtml = htmlentities($value);
        $this->children = array();

        return $this;
    }

    public function append(Node $node) {
        $this->children[] = $node;

        return $this;
    }

    public function render() {
        return $this->outerHtml();
    }

    public function outerHtml() {
        $html = array();

        $html[] = '<';
        $html[] = $this->tagName;

        if ($this->selfClosing) {
            $html[] = ' />';
        } else {
            $html[] = '>';

            if ($this->innerHtml !== '') {
                $html[] = $this->innerHtml;
            }

            foreach ($this->children as $child) {
                $html[] = $child->render();
            }

            $html[] = '</';
            $html[] = $this->tagName;
            $html[] = '>';
        }

        return implode($html);
    }
}

?>
