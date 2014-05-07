package com.kendoui.spring.controllers.colorpicker;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("colorpicker-palette-controller")
@RequestMapping(value="/colorpicker/")
public class PaletteController {
    
    @RequestMapping(value = {"/palette"}, method = RequestMethod.GET)
    public String index() {       
        return "colorpicker/palette";
    }    
}