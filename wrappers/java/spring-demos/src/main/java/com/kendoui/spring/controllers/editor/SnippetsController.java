package com.kendoui.spring.controllers.editor;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("editor-snippets-controller")
@RequestMapping(value="/editor/")
public class SnippetsController {
    
    @RequestMapping(value = "/snippets", method = RequestMethod.GET)
    public String index() {       
        return "editor/snippets";
    }    
}

