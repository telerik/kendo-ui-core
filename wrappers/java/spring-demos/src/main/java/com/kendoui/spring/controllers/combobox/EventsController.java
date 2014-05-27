package com.kendoui.spring.controllers.combobox;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.DropDownListItem;

@Controller("combobox-events-controller")
@RequestMapping(value="/combobox/")
public class EventsController {
    
    @RequestMapping(value = {"/events"}, method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("items", new DropDownListItem[] {
                new DropDownListItem("Item 1", "1"),
                new DropDownListItem("Item 2", "2"),
                new DropDownListItem("Item 3", "3")
        });
        
        return "combobox/events";
    }
}