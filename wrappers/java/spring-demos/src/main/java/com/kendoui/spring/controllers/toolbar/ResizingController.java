package com.kendoui.spring.controllers.toolbar;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("toolbar-resizing-controller")
@RequestMapping(value="/toolbar/")
public class ResizingController {
    
    @RequestMapping(value = {"/", "/resizing"}, method = RequestMethod.GET)
    public String index() {      
        return "toolbar/resizing";
    }
}