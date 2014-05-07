package com.kendoui.spring.controllers.treeview;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("treeview-rtl-controller")
@RequestMapping(value="/treeview/")
public class RtlController {
    
    @RequestMapping(value = {"/rtl"}, method = RequestMethod.GET)
    public String index() {       
        return "treeview/rtl";
    }    
}