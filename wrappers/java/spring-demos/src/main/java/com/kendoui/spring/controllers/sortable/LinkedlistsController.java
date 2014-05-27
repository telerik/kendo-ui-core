package com.kendoui.spring.controllers.sortable;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("sortable-linkedlists-controller")
@RequestMapping(value="/sortable/")
public class LinkedlistsController {    
    
    @RequestMapping(value = {"/", "/linkedlists"}, method = RequestMethod.GET)
    public String index() {
        return "sortable/linkedlists";
    }
    
}