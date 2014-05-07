package com.kendoui.spring.controllers.combobox;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.DropDownListItem;

@Controller("combobox-home-controller")
@RequestMapping(value="/combobox/")
public class IndexController {
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("fabrics", new DropDownListItem[] {
                new DropDownListItem("Cotton", "1"),
                new DropDownListItem("Polyester", "2"),
                new DropDownListItem("Cotton/Polyester", "3"),
                new DropDownListItem("Rib Knit", "4")
        });
        
        model.addAttribute("sizes", new String[] {
            "X-Small",
            "Small",
            "Medium",
            "Large",
            "X-Large",
            "2X-Large"
        });
        
        return "combobox/index";
    }    
}