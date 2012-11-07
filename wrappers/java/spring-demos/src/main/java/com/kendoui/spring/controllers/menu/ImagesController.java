package com.kendoui.spring.controllers.menu;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("menu-images-controller")
@RequestMapping(value="/web/menu/")
public class ImagesController {
    
    @RequestMapping(value = {"/images"}, method = RequestMethod.GET)
    public String index() {       
        return "web/menu/images";
    }    
}