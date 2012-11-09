package com.kendoui.spring.controllers.editor;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("editor-rtl-controller")
@RequestMapping(value="/web/editor/")
public class RtlController {
    
    @RequestMapping(value = {"/rtl"}, method = RequestMethod.GET)
    public String index() {       
        return "web/editor/rtl";
    }    
}