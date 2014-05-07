package com.kendoui.spring.controllers.sortable;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("sortable-handlers-controller")
@RequestMapping(value="/sortable/")
public class HandlersController {    
    
    @RequestMapping(value = {"/", "/handlers"}, method = RequestMethod.GET)
    public String index() {
        return "sortable/handlers";
    }
}