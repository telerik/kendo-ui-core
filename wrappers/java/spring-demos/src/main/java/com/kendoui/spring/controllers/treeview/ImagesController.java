package com.kendoui.spring.controllers.treeview;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("treeview-images-controller")
@RequestMapping(value="/treeview/")
public class ImagesController {
    
    @RequestMapping(value = "/images", method = RequestMethod.GET)
    public String index() {
        return "treeview/images";
    }
}

