package com.kendoui.spring.controllers.sortable;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("sortable-constraints-controller")
@RequestMapping(value="/sortable/")
public class ConstraintsController {    
    
    @RequestMapping(value = {"/", "/constraints"}, method = RequestMethod.GET)
    public String index() {
        return "sortable/constraints";
    }
    
}