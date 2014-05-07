package com.kendoui.spring.controllers.treeview;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller("treeview-animation-controller")
@RequestMapping(value="/treeview/")
public class AnimationController {
    
    @RequestMapping(value = "/animation", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("animation", "toggle");
        model.addAttribute("opacity", true);
        model.addAttribute("animationConfig", "fadeIn");
        
        return "treeview/animation";
    }  
    
    @RequestMapping(value = "/animation", method = RequestMethod.POST)
    public String index(@RequestParam(value = "animation") String animation, 
            @RequestParam(value = "opacity") Boolean opacity, Model model) {

        String animationConfig = "";
        if( animation.equals("expand")){
            animationConfig = "expand:vertical ";     
        }        
        
        animationConfig += opacity ? "fadeIn" : "";
        
        model.addAttribute("animation", animation);
        model.addAttribute("animationConfig", animationConfig);
        model.addAttribute("opacity", opacity);
        
        return "treeview/animation";
    } 
}
