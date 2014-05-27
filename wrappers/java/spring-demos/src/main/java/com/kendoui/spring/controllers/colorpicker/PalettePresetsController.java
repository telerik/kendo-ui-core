package com.kendoui.spring.controllers.colorpicker;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("colorpicker-palettepresets-controller")
@RequestMapping(value="/colorpicker/")
public class PalettePresetsController {
    
    @RequestMapping(value = {"/palette-presets"}, method = RequestMethod.GET)
    public String index() {       
        return "colorpicker/palette-presets";
    }    
}