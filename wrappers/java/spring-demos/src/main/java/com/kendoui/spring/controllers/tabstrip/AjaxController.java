package com.kendoui.spring.controllers.tabstrip;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("tabstrip-ajax-controller")
@RequestMapping(value="/web/tabstrip/")
public class AjaxController {
    
    @RequestMapping(value = {"/ajax"}, method = RequestMethod.GET)
    public String index() {
        return "web/tabstrip/ajax";
    }    
}