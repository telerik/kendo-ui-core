package com.kendoui.spring.controllers.treeview;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("treeview-checkboxes-controller")
@RequestMapping(value="/treeview/")
public class CheckboxesController {
    
    @RequestMapping(value = "/checkboxes", method = RequestMethod.GET)
    public String index() {
        return "treeview/checkboxes";
    }
}

