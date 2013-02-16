package com.kendoui.spring.controllers.menu;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller("menu-animation-controller")
@RequestMapping(value="/web/menu/")
public class AnimationController {
    
    @RequestMapping(value = "/animation")
    public String index(@RequestParam(value = "animation", required = false) String animation, 
            @RequestParam(value = "delay", required = false) Integer delay, 
            @RequestParam(value = "opacity", required = false) Boolean opacity, Model model) {
        animation = animation != null ? animation : "toggle"; 
        opacity = opacity != null ? opacity : true;
        delay = delay != null ? delay : 100;      
        String animationString = "";
        if( animation.equals("expand")){
            animationString = "expand:vertical ";     
        }        
        else if (animation.equals("slide")) {
            animationString = "slideIn:down ";
        }
        
        animationString += opacity ? "fadeIn" : "";
        
        model.addAttribute("animation", animation);
        model.addAttribute("animationString", animationString);
        model.addAttribute("delay", delay);
        model.addAttribute("opacity", opacity);
        
        return "web/menu/animation";
    }      
}
