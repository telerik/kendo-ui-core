package com.kendoui.spring.controllers.editor;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("editor-api-controller")
@RequestMapping(value="/web/editor/")
public class ApiController {
    
    @RequestMapping(value = "/api", method = RequestMethod.GET)
    public String index() {       
        return "web/editor/api";
    }    
}