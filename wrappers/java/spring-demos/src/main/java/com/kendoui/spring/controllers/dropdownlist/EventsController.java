package com.kendoui.spring.controllers.dropdownlist;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.DropDownListItem;

@Controller("dropdownlist-events-controller")
@RequestMapping(value="/dropdownlist/")
public class EventsController {
    
    @RequestMapping(value = {"/events"}, method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("items", new DropDownListItem[] {
                new DropDownListItem("Item1", "1"),
                new DropDownListItem("Item2", "2"),
                new DropDownListItem("Item3", "3")
        });
        
        return "dropdownlist/events";
    }
}