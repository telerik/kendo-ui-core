package com.kendoui.spring.controllers.editor;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("editor-styles-controller")
@RequestMapping(value="/editor/")
public class StylesController {
    
    @RequestMapping(value = "/styles", method = RequestMethod.GET)
    public String index() {       
        return "editor/styles";
    }    
}
