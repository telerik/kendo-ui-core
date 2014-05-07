package com.kendoui.spring.controllers.editor;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("editor-custom-tools-controller")
@RequestMapping(value="/editor/")
public class CustomToolsController {
    
    @RequestMapping(value = "/custom-tools", method = RequestMethod.GET)
    public String index() {       
        return "editor/custom-tools";
    }    
}