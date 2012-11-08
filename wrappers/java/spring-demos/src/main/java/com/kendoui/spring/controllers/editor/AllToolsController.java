package com.kendoui.spring.controllers.editor;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("editor-all-tools-controller")
@RequestMapping(value="/web/editor/")
public class AllToolsController {
    
    @RequestMapping(value = "/all-tools", method = RequestMethod.GET)
    public String index() {       
        return "web/editor/all-tools";
    }    
}