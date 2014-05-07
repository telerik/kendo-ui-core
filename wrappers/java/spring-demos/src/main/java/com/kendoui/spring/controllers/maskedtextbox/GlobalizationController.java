package com.kendoui.spring.controllers.maskedtextbox;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.DropDownListItem;

@Controller("maskedtextbox-globalization-controller")
@RequestMapping(value="/maskedtextbox/")
public class GlobalizationController {

    @RequestMapping(value = {"/globalization"}, method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("cultures", new DropDownListItem[] {
                new DropDownListItem("en-US", "en-US"),
                new DropDownListItem("en-GB", "en-GB"),
                new DropDownListItem("de-DE", "de-DE"),
                new DropDownListItem("fr-FR", "fr-FR"),
                new DropDownListItem("bg-BG", "bg-BG")
        });
        
        return "maskedtextbox/globalization";
    }
}
