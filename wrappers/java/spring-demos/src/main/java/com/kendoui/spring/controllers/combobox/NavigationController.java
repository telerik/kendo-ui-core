package com.kendoui.spring.controllers.combobox;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.DropDownListItem;

@Controller("combobox-navigation-controller")
@RequestMapping(value="/web/combobox/")
public class NavigationController {
    
    @RequestMapping(value = {"/navigation"}, method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("fabrics", new DropDownListItem[] {
                new DropDownListItem("Cotton", "1"),
                new DropDownListItem("Polyester", "2"),
                new DropDownListItem("Cotton/Polyester", "3"),
                new DropDownListItem("Rib Knit", "4")
        });
        return "web/combobox/navigation";
    }    
}