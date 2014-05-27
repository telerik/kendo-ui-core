package com.kendoui.spring.controllers.treeview;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("treeview-dragdrop-controller")
@RequestMapping(value="/treeview/")
public class DragDropController {
    
    @RequestMapping(value = "/dragdrop", method = RequestMethod.GET)
    public String index() {
        return "treeview/dragdrop";
    }
}

