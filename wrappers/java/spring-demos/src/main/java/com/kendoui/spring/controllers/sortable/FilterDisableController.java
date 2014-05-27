package com.kendoui.spring.controllers.sortable;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("sortable-filter-disable-controller")
@RequestMapping(value="/sortable/")
public class FilterDisableController {    
    
    @RequestMapping(value = {"/", "/filter-disable"}, method = RequestMethod.GET)
    public String index() {
        return "sortable/filter-disable";
    }
    
}