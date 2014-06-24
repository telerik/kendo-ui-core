package com.kendoui.spring.models;

import java.util.ArrayList;
import java.util.List;

public class TreeMapDataRepository {
    public static List<PopulationUSA> PopulationUSAData() 
    {        
        List<PopulationUSA> result = new ArrayList<PopulationUSA>();

        PopulationUSA usa = new PopulationUSA("Population in USA", 316128839);
        result.add(usa);

        PopulationUSA alabama = new PopulationUSA("Alabama", 4833722);
        usa.getItems().add(alabama);
        alabama.getItems().add(new PopulationUSA("Birmingham", 212113));
        alabama.getItems().add(new PopulationUSA("Montgomery", 201332));
        alabama.getItems().add(new PopulationUSA("Mobile", 194899));
        alabama.getItems().add(new PopulationUSA("Huntsville", 186254));
        alabama.getItems().add(new PopulationUSA("Tuscaloosa", 95334));
        alabama.getItems().add(new PopulationUSA("Hoover", 84126));
        alabama.getItems().add(new PopulationUSA("Dothan", 68001));
        alabama.getItems().add(new PopulationUSA("Auburn", 58582));
        alabama.getItems().add(new PopulationUSA("Decatur", 55816));

        PopulationUSA alaska = new PopulationUSA("Alaska" , 735132); 
        usa.getItems().add(alaska); 
        alaska.getItems().add(new PopulationUSA("Anchorage", 300950)); 
        alaska.getItems().add(new PopulationUSA("Badger", 20200)); 
        alaska.getItems().add(new PopulationUSA("College", 13400)); 
        alaska.getItems().add(new PopulationUSA("Fairbanks", 32324)); 
        alaska.getItems().add(new PopulationUSA("Juneau", 32660)); 
        alaska.getItems().add(new PopulationUSA("Ketchikan", 8214)); 
        alaska.getItems().add(new PopulationUSA("Sitka", 9020));

        PopulationUSA arizona = new PopulationUSA("Arizona" , 6626624);
        usa.getItems().add(arizona);
        arizona.getItems().add(new PopulationUSA("Phoenix", 1513367));
        arizona.getItems().add(new PopulationUSA("Tucson", 526116));
        arizona.getItems().add(new PopulationUSA("Mesa", 457587));
        arizona.getItems().add(new PopulationUSA("Chandler", 249146));
        arizona.getItems().add(new PopulationUSA("Glendale", 234632));
        arizona.getItems().add(new PopulationUSA("Gilbert", 229972));
        arizona.getItems().add(new PopulationUSA("Scottsdale", 226918));
        arizona.getItems().add(new PopulationUSA("Tempe", 168228));
        arizona.getItems().add(new PopulationUSA("Peoria", 162592));
        arizona.getItems().add(new PopulationUSA("Surprise", 123546));

        PopulationUSA arkansas = new PopulationUSA("Arkansas" , 2959373);
        usa.getItems().add(arkansas);
        arkansas.getItems().add(new PopulationUSA("Little Rock", 197357));
        arkansas.getItems().add(new PopulationUSA("Fort Smith", 87650));
        arkansas.getItems().add(new PopulationUSA("Fayetteville", 78960));
        arkansas.getItems().add(new PopulationUSA("Springdale", 75229));
        arkansas.getItems().add(new PopulationUSA("Jonesboro", 71551));
        arkansas.getItems().add(new PopulationUSA("North Little Rock", 66075));
        arkansas.getItems().add(new PopulationUSA("Conway", 63816));
        arkansas.getItems().add(new PopulationUSA("Rogers", 60112));
        arkansas.getItems().add(new PopulationUSA("Pine Bluff", 46094));
        arkansas.getItems().add(new PopulationUSA("Bentonville", 40167));

        PopulationUSA california = new PopulationUSA("California" , 38332521);
        usa.getItems().add(california);
        california.getItems().add(new PopulationUSA("Los Angeles", 3884307));
        california.getItems().add(new PopulationUSA("San Diego", 1355896));
        california.getItems().add(new PopulationUSA("San Jose", 998537));
        california.getItems().add(new PopulationUSA("San Francisco", 837442));
        california.getItems().add(new PopulationUSA("Fresno", 509924));
        california.getItems().add(new PopulationUSA("Sacramento", 479686));
        california.getItems().add(new PopulationUSA("Long Beach", 469428));
        california.getItems().add(new PopulationUSA("Oakland", 406253));
        california.getItems().add(new PopulationUSA("Bakersfield", 363630));
        california.getItems().add(new PopulationUSA("Anaheim", 345012));
        california.getItems().add(new PopulationUSA("Santa Ana", 334227));

        PopulationUSA colorado = new PopulationUSA("Colorado" , 5268367);
        usa.getItems().add(colorado);
        colorado.getItems().add(new PopulationUSA("Denver", 649495));
        colorado.getItems().add(new PopulationUSA("Colorado Springs", 439886));
        colorado.getItems().add(new PopulationUSA("Aurora", 345803));
        colorado.getItems().add(new PopulationUSA("Fort Collins", 152061));
        colorado.getItems().add(new PopulationUSA("Lakewood", 147214));
        colorado.getItems().add(new PopulationUSA("Thornton", 127359));
        colorado.getItems().add(new PopulationUSA("Arvada", 111707));
        colorado.getItems().add(new PopulationUSA("Westminster", 110945));
        colorado.getItems().add(new PopulationUSA("Pueblo", 108249));
        colorado.getItems().add(new PopulationUSA("Centennial", 106114));
        colorado.getItems().add(new PopulationUSA("Boulder", 103166));
        colorado.getItems().add(new PopulationUSA("Highlands Ranch", 102000));

        PopulationUSA connecticut = new PopulationUSA("Connecticut" , 3596080);
        usa.getItems().add(connecticut);
        connecticut.getItems().add(new PopulationUSA("Bridgeport", 147216));
        connecticut.getItems().add(new PopulationUSA("New Haven", 130660));
        connecticut.getItems().add(new PopulationUSA("Stamford", 126456));
        connecticut.getItems().add(new PopulationUSA("Hartford", 125017));
        connecticut.getItems().add(new PopulationUSA("Waterbury", 109676));
        connecticut.getItems().add(new PopulationUSA("Norwalk", 87776));
        connecticut.getItems().add(new PopulationUSA("Danbury", 83684));
        connecticut.getItems().add(new PopulationUSA("New Britain", 72939));
        connecticut.getItems().add(new PopulationUSA("West Hartford", 63371));
        connecticut.getItems().add(new PopulationUSA("Bristol", 60568));
        connecticut.getItems().add(new PopulationUSA("Meriden", 60456));
        
        return result;
    }
}
