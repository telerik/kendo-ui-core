using System.Collections.Generic;
using System;
using System.Linq;

namespace Kendo.Mvc.Examples.Models
{
    public partial class TreeMapDataRepository
    {
        public static List<PopulationUSA> PopulationUSAData()
        {
            List<PopulationUSA> result = new List<PopulationUSA>();

            PopulationUSA usa = new PopulationUSA("Population in USA", 316128839);
            result.Add(usa);

            PopulationUSA alabama = new PopulationUSA("Alabama", 4833722);
            usa.Items.Add(alabama);
            alabama.Items.Add(new PopulationUSA("Birmingham", 212113));
            alabama.Items.Add(new PopulationUSA("Montgomery", 201332));
            alabama.Items.Add(new PopulationUSA("Mobile", 194899));
            alabama.Items.Add(new PopulationUSA("Huntsville", 186254));
            alabama.Items.Add(new PopulationUSA("Tuscaloosa", 95334));
            alabama.Items.Add(new PopulationUSA("Hoover", 84126));
            alabama.Items.Add(new PopulationUSA("Dothan", 68001));
            alabama.Items.Add(new PopulationUSA("Auburn", 58582));
            alabama.Items.Add(new PopulationUSA("Decatur", 55816));

            PopulationUSA alaska = new PopulationUSA("Alaska" , 735132); 
            usa.Items.Add(alaska); 
            alaska.Items.Add(new PopulationUSA("Anchorage", 300950)); 
            alaska.Items.Add(new PopulationUSA("Badger", 20200)); 
            alaska.Items.Add(new PopulationUSA("College", 13400)); 
            alaska.Items.Add(new PopulationUSA("Fairbanks", 32324)); 
            alaska.Items.Add(new PopulationUSA("Juneau", 32660)); 
            alaska.Items.Add(new PopulationUSA("Ketchikan", 8214)); 
            alaska.Items.Add(new PopulationUSA("Sitka", 9020));

            PopulationUSA arizona = new PopulationUSA("Arizona" , 6626624);
            usa.Items.Add(arizona);
            arizona.Items.Add(new PopulationUSA("Phoenix", 1513367));
            arizona.Items.Add(new PopulationUSA("Tucson", 526116));
            arizona.Items.Add(new PopulationUSA("Mesa", 457587));
            arizona.Items.Add(new PopulationUSA("Chandler", 249146));
            arizona.Items.Add(new PopulationUSA("Glendale", 234632));
            arizona.Items.Add(new PopulationUSA("Gilbert", 229972));
            arizona.Items.Add(new PopulationUSA("Scottsdale", 226918));
            arizona.Items.Add(new PopulationUSA("Tempe", 168228));
            arizona.Items.Add(new PopulationUSA("Peoria", 162592));
            arizona.Items.Add(new PopulationUSA("Surprise", 123546));

            PopulationUSA arkansas = new PopulationUSA("Arkansas" , 2959373);
            usa.Items.Add(arkansas);
            arkansas.Items.Add(new PopulationUSA("Little Rock", 197357));
            arkansas.Items.Add(new PopulationUSA("Fort Smith", 87650));
            arkansas.Items.Add(new PopulationUSA("Fayetteville", 78960));
            arkansas.Items.Add(new PopulationUSA("Springdale", 75229));
            arkansas.Items.Add(new PopulationUSA("Jonesboro", 71551));
            arkansas.Items.Add(new PopulationUSA("North Little Rock", 66075));
            arkansas.Items.Add(new PopulationUSA("Conway", 63816));
            arkansas.Items.Add(new PopulationUSA("Rogers", 60112));
            arkansas.Items.Add(new PopulationUSA("Pine Bluff", 46094));
            arkansas.Items.Add(new PopulationUSA("Bentonville", 40167));

            PopulationUSA california = new PopulationUSA("California" , 38332521);
            usa.Items.Add(california);
            california.Items.Add(new PopulationUSA("Los Angeles", 3884307));
            california.Items.Add(new PopulationUSA("San Diego", 1355896));
            california.Items.Add(new PopulationUSA("San Jose", 998537));
            california.Items.Add(new PopulationUSA("San Francisco", 837442));
            california.Items.Add(new PopulationUSA("Fresno", 509924));
            california.Items.Add(new PopulationUSA("Sacramento", 479686));
            california.Items.Add(new PopulationUSA("Long Beach", 469428));
            california.Items.Add(new PopulationUSA("Oakland", 406253));
            california.Items.Add(new PopulationUSA("Bakersfield", 363630));
            california.Items.Add(new PopulationUSA("Anaheim", 345012));
            california.Items.Add(new PopulationUSA("Santa Ana", 334227));

            PopulationUSA colorado = new PopulationUSA("Colorado" , 5268367);
            usa.Items.Add(colorado);
            colorado.Items.Add(new PopulationUSA("Denver", 649495));
            colorado.Items.Add(new PopulationUSA("Colorado Springs", 439886));
            colorado.Items.Add(new PopulationUSA("Aurora", 345803));
            colorado.Items.Add(new PopulationUSA("Fort Collins", 152061));
            colorado.Items.Add(new PopulationUSA("Lakewood", 147214));
            colorado.Items.Add(new PopulationUSA("Thornton", 127359));
            colorado.Items.Add(new PopulationUSA("Arvada", 111707));
            colorado.Items.Add(new PopulationUSA("Westminster", 110945));
            colorado.Items.Add(new PopulationUSA("Pueblo", 108249));
            colorado.Items.Add(new PopulationUSA("Centennial", 106114));
            colorado.Items.Add(new PopulationUSA("Boulder", 103166));
            colorado.Items.Add(new PopulationUSA("Highlands Ranch", 102000));

            PopulationUSA connecticut = new PopulationUSA("Connecticut" , 3596080);
            usa.Items.Add(connecticut);
            connecticut.Items.Add(new PopulationUSA("Bridgeport", 147216));
            connecticut.Items.Add(new PopulationUSA("New Haven", 130660));
            connecticut.Items.Add(new PopulationUSA("Stamford", 126456));
            connecticut.Items.Add(new PopulationUSA("Hartford", 125017));
            connecticut.Items.Add(new PopulationUSA("Waterbury", 109676));
            connecticut.Items.Add(new PopulationUSA("Norwalk", 87776));
            connecticut.Items.Add(new PopulationUSA("Danbury", 83684));
            connecticut.Items.Add(new PopulationUSA("New Britain", 72939));
            connecticut.Items.Add(new PopulationUSA("West Hartford", 63371));
            connecticut.Items.Add(new PopulationUSA("Bristol", 60568));
            connecticut.Items.Add(new PopulationUSA("Meriden", 60456));

            return result;
        }
    }
}