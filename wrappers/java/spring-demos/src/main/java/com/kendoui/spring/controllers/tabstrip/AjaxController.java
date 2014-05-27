package com.kendoui.spring.controllers.tabstrip;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("tabstrip-ajax-controller")
@RequestMapping(value="/tabstrip/")
public class AjaxController {
    
    @RequestMapping(value = {"/ajax"}, method = RequestMethod.GET)
    public String index() {
        return "tabstrip/ajax";
    }
    
    @RequestMapping(value = "/content/{page}", method = RequestMethod.GET)
    public String content(@PathVariable int page) {       
        return "tabstrip/content" + page;
    }
}