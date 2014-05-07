package com.kendoui.spring.controllers.colorpicker;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("colorpicker-flatcolorpicker-controller")
@RequestMapping(value="/colorpicker/")
public class FlatColorPickerController {
    
    @RequestMapping(value = {"/flatcolorpicker"}, method = RequestMethod.GET)
    public String index() {       
        return "colorpicker/flatcolorpicker";
    }    
}