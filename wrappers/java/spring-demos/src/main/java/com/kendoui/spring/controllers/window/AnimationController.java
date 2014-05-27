package com.kendoui.spring.controllers.window;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller("window-animation-controller")
@RequestMapping(value="/window/")
public class AnimationController {
    
    @RequestMapping(value = "/animation", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("animation", "expand");
        model.addAttribute("opacity", true);        
        model.addAttribute("animationConfigOpen", "expand:vertical fade:in");
        model.addAttribute("animationConfigClose", "expand:vertical fade:in");
        return "window/animation";
    }     
    
    @RequestMapping(value = "/animation", method = RequestMethod.POST)
    public String index(@RequestParam(value = "animation") String animation,             
            @RequestParam(value = "opacity") Boolean opacity, Model model) {
                   
        String animationConfigOpen = "";
        String animationConfigClose = "";
        if(animation.equals("expand")){
            animationConfigOpen = animationConfigClose = "expand:vertical ";     
        }        
        else if (animation.equals("zoom")) {
            animationConfigOpen = "zoom:in ";
            animationConfigClose = "zoom:out ";
        }
        
        animationConfigOpen += opacity ? "fadeIn" : "";
        animationConfigClose += opacity ? "fadeIn" : "";
        
        model.addAttribute("animation", animation);
        model.addAttribute("animationConfigOpen", animationConfigOpen);
        model.addAttribute("animationConfigClose", animationConfigClose);      
        model.addAttribute("opacity", opacity);
        
        return "window/animation";
    } 
}
