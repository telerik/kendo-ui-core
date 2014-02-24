package com.kendoui.spring.controllers.sortable;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("sortable-sortable-panels-controller")
@RequestMapping(value="/web/sortable/")
public class SortablePanelsController {    
    
    @RequestMapping(value = {"/", "/sortable-panels"}, method = RequestMethod.GET)
    public String index() {
        return "web/sortable/sortable-panels";
    }
    
}