package com.kendoui.spring.controllers.tabstrip;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller("tabstrip-animation-controller")
@RequestMapping(value="/tabstrip/")
public class AnimationController {
    
    @RequestMapping(value = "/animation", method = RequestMethod.GET)
    public String index() {       
        return "tabstrip/animation";
    }
    
    @RequestMapping(value = "/animation", method = RequestMethod.POST)
    public String index(@RequestParam String animation, Model model) {
        model.addAttribute("animation", animation);        
        return "tabstrip/animation";
    }
}