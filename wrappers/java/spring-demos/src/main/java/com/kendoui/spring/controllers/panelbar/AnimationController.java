package com.kendoui.spring.controllers.panelbar;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller("panelbar-animation-controller")
@RequestMapping(value="/panelbar/")
public class AnimationController {
    
    @RequestMapping(value = "/animation", method = RequestMethod.GET)
    public String index(Model model) {        
        return "panelbar/animation";
    }
    
    @RequestMapping(value = "/animation", method = RequestMethod.POST)
    public String index(@RequestParam String animation, Model model) {
        model.addAttribute("animation", animation);        
        return "panelbar/animation";
    }
}