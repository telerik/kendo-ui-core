package com.kendoui.spring.controllers.editor;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("editor-inline-editing-controller")
@RequestMapping(value="/editor/")
public class InlineEditingController {
    @RequestMapping(value = "/inline-editing", method = RequestMethod.GET)
    public String index() {
        return "editor/inline-editing";
    }
}