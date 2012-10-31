package com.kendoui.spring.controllers.dropdownlist;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.DropDownListItem;

@Controller("dropdownlist-api-controller")
@RequestMapping(value="/web/dropdownlist/")
public class ApiController {
    
    @RequestMapping(value = {"api"}, method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("movies", new DropDownListItem[] {
                new DropDownListItem("12 Angry Men", "1"),
                new DropDownListItem("Il buono, il brutto, il cattivo.", "2"),
                new DropDownListItem("Inception", "3"),
                new DropDownListItem("One Flew Over the Cuckoo's Nest", "4"),
                new DropDownListItem("Pulp Fiction", "5"),
                new DropDownListItem("Schindler's List", "6"),
                new DropDownListItem("The Dark Knight", "7"),
                new DropDownListItem("The Godfather", "8"),
                new DropDownListItem("The Godfather: Part II", "9"),
                new DropDownListItem("The Shawshank Redemption", "10")
        });
       
        return "web/dropdownlist/api";
    }
}