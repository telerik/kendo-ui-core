package com.kendoui.spring.controllers.button;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("button-images-controller")
@RequestMapping(value="/button/")
public class ImagesController {
    
    @RequestMapping(value = {"/images"}, method = RequestMethod.GET)
    public String index() {       
        return "button/images";
    }    
}