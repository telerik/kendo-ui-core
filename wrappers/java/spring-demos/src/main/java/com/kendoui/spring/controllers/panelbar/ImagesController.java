package com.kendoui.spring.controllers.panelbar;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("panelbar-images-controller")
@RequestMapping(value="/panelbar/")
public class ImagesController {
    
    @RequestMapping(value = "/images", method = RequestMethod.GET)
    public String index() {       
        return "panelbar/images";
    }    
}