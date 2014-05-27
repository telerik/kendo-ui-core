package com.kendoui.spring.controllers.multiselect;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.DropDownListItem;

@Controller("multiselect-api-controller")
@RequestMapping(value="/multiselect/")
public class ApiController {
    
    @RequestMapping(value = {"api"}, method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("movies", new DropDownListItem[] {
                new DropDownListItem("The Shawshank Redemption", "1"),
                new DropDownListItem("The Godfather", "2"),
                new DropDownListItem("The Godfather: Part II", "3"),
                new DropDownListItem("Il buono, il brutto, il cattivo.", "4"),
                new DropDownListItem("Pulp Fiction", "5"),
                new DropDownListItem("12 Angry Men", "6"),
                new DropDownListItem("Schindler's List", "7"),
                new DropDownListItem("One Flew Over the Cuckoo's Nest", "8"),
                new DropDownListItem("Inception", "9"),
                new DropDownListItem("The Dark Knight", "10")
        });
       
        return "multiselect/api";
    }
}