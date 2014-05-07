package com.kendoui.spring.controllers.menu;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller("menu-animation-controller")
@RequestMapping(value="/menu/")
public class AnimationController {
    
    @RequestMapping(value = "/animation", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("animation", "toggle");
        model.addAttribute("opacity", true);
        model.addAttribute("delay", 100);
        model.addAttribute("animationConfig", "fadeIn");
        
        return "menu/animation";
    }     
    
    @RequestMapping(value = "/animation", method = RequestMethod.POST)
    public String index(@RequestParam(value = "animation") String animation, 
            @RequestParam(value = "delay", required = false) Integer delay, 
            @RequestParam(value = "opacity") Boolean opacity, Model model) {
        
        delay = delay != null ? delay : 100;      
        String animationConfig = "";
        if(animation.equals("expand")){
            animationConfig = "expand:vertical ";     
        }        
        else if (animation.equals("slide")) {
            animationConfig = "slideIn:down ";
        }
        
        animationConfig += opacity ? "fadeIn" : "";
        
        model.addAttribute("animation", animation);
        model.addAttribute("animationConfig", animationConfig);
        model.addAttribute("delay", delay);
        model.addAttribute("opacity", opacity);
        
        return "menu/animation";
    } 
}
