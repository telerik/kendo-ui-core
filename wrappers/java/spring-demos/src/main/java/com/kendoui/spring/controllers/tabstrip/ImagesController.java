package com.kendoui.spring.controllers.tabstrip;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("tabstrip-images-controller")
@RequestMapping(value="/tabstrip/")
public class ImagesController {
    
    @RequestMapping(value = {"/images"}, method = RequestMethod.GET)
    public String index() {       
        return "tabstrip/images";
    }    
}