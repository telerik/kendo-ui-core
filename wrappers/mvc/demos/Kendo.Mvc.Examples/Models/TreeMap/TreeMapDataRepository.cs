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

            PopulationUSA delaware = new PopulationUSA("Delaware" , 925749);
            usa.Items.Add(delaware);
            delaware.Items.Add(new PopulationUSA("Bear", 19700));
            delaware.Items.Add(new PopulationUSA("Dover", 37366));
            delaware.Items.Add(new PopulationUSA("Middletown", 19600));
            delaware.Items.Add(new PopulationUSA("Newark", 19600));
            delaware.Items.Add(new PopulationUSA("Wilmington", 71525));

            PopulationUSA districtOfColumbia = new PopulationUSA("District of Columbia" , 646449);
            usa.Items.Add(districtOfColumbia);
            districtOfColumbia.Items.Add(new PopulationUSA("Washington", 646449));

            PopulationUSA florida = new PopulationUSA("Florida" , 19552860);
            usa.Items.Add(florida);
            florida.Items.Add(new PopulationUSA("Jacksonville", 842583));
            florida.Items.Add(new PopulationUSA("Miami", 417650));
            florida.Items.Add(new PopulationUSA("Tampa", 352957));
            florida.Items.Add(new PopulationUSA("Orlando", 255483));
            florida.Items.Add(new PopulationUSA("St. Petersburg", 249688));
            florida.Items.Add(new PopulationUSA("Hialeah", 233394));
            florida.Items.Add(new PopulationUSA("Tallahassee", 186411));
            florida.Items.Add(new PopulationUSA("Fort Lauderdale", 172389));
            florida.Items.Add(new PopulationUSA("Port St. Lucie", 171016));
            florida.Items.Add(new PopulationUSA("Cape Coral", 165831));
            florida.Items.Add(new PopulationUSA("Pembroke Pines", 162329));

            PopulationUSA georgia = new PopulationUSA("Georgia" , 9992167);
            usa.Items.Add(georgia);
            georgia.Items.Add(new PopulationUSA("Atlanta", 447841));
            georgia.Items.Add(new PopulationUSA("Columbus", 202824));
            georgia.Items.Add(new PopulationUSA("Augusta", 197350));
            georgia.Items.Add(new PopulationUSA("Savannah", 142772));
            georgia.Items.Add(new PopulationUSA("Athens", 119980));
            georgia.Items.Add(new PopulationUSA("Sandy Springs", 99770));
            georgia.Items.Add(new PopulationUSA("Roswell", 94034));
            georgia.Items.Add(new PopulationUSA("Macon", 89981));
            georgia.Items.Add(new PopulationUSA("Johns Creek", 82788));
            georgia.Items.Add(new PopulationUSA("Albany", 76185));

            PopulationUSA hawaii = new PopulationUSA("Hawaii" , 1404054);
            usa.Items.Add(hawaii);
            hawaii.Items.Add(new PopulationUSA("Honolulu (Urban Honolulu CDP)", 347884));
            
            PopulationUSA idaho = new PopulationUSA("Idaho" , 1612136);
            usa.Items.Add(idaho);
            idaho.Items.Add(new PopulationUSA("Boise City", 214237));
            idaho.Items.Add(new PopulationUSA("Nampa", 86518));
            idaho.Items.Add(new PopulationUSA("Meridian", 83596));
            idaho.Items.Add(new PopulationUSA("Idaho Falls", 58292));
            idaho.Items.Add(new PopulationUSA("Pocatello", 54350));
            idaho.Items.Add(new PopulationUSA("Caldwell", 48957));
            idaho.Items.Add(new PopulationUSA("Coeur d'Alene", 46402));
            idaho.Items.Add(new PopulationUSA("Twin Falls", 45981));
            idaho.Items.Add(new PopulationUSA("Lewiston", 32401));

            PopulationUSA illinois = new PopulationUSA("Illinois" , 12882135);
            usa.Items.Add(illinois);
            illinois.Items.Add(new PopulationUSA("Chicago", 2718782));
            illinois.Items.Add(new PopulationUSA("Aurora", 199963));
            illinois.Items.Add(new PopulationUSA("Rockford", 150251));
            illinois.Items.Add(new PopulationUSA("Joliet", 147806));
            illinois.Items.Add(new PopulationUSA("Naperville", 144864));
            illinois.Items.Add(new PopulationUSA("Springfield", 117006));
            illinois.Items.Add(new PopulationUSA("Peoria", 116513));
            illinois.Items.Add(new PopulationUSA("Elgin", 110145));
            illinois.Items.Add(new PopulationUSA("Waukegan", 88826));
            illinois.Items.Add(new PopulationUSA("Cicero", 84103));
            illinois.Items.Add(new PopulationUSA("Champaign", 83424));

            PopulationUSA indiana = new PopulationUSA("Indiana" , 6570902);
            usa.Items.Add(indiana);
            indiana.Items.Add(new PopulationUSA("Indianapolis", 843393));
            indiana.Items.Add(new PopulationUSA("Fort Wayne", 256496));
            indiana.Items.Add(new PopulationUSA("Evansville", 120310));
            indiana.Items.Add(new PopulationUSA("South Bend", 100886));
            indiana.Items.Add(new PopulationUSA("Carmel", 85927));
            indiana.Items.Add(new PopulationUSA("Fishers", 83891));
            indiana.Items.Add(new PopulationUSA("Bloomington", 82575));
            indiana.Items.Add(new PopulationUSA("Hammond", 78967));
            indiana.Items.Add(new PopulationUSA("Gary", 78450));
            indiana.Items.Add(new PopulationUSA("Lafayette", 70373));
            indiana.Items.Add(new PopulationUSA("Muncie", 70316));

            PopulationUSA iowa = new PopulationUSA("Iowa" , 3090416);
            usa.Items.Add(iowa);
            iowa.Items.Add(new PopulationUSA("Des Moines", 207510));
            iowa.Items.Add(new PopulationUSA("Cedar Rapids", 128429));
            iowa.Items.Add(new PopulationUSA("Davenport", 102157));
            iowa.Items.Add(new PopulationUSA("Sioux City", 82459));
            iowa.Items.Add(new PopulationUSA("Iowa City", 71591));
            iowa.Items.Add(new PopulationUSA("Waterloo", 68366));
            iowa.Items.Add(new PopulationUSA("Council Bluffs", 61969));
            iowa.Items.Add(new PopulationUSA("Ames", 61792));
            iowa.Items.Add(new PopulationUSA("West Des Moines", 61255));
            iowa.Items.Add(new PopulationUSA("Dubuque", 58253));
            iowa.Items.Add(new PopulationUSA("Ankeny", 51567));

            PopulationUSA kansas = new PopulationUSA("Kansas" , 2893957);
            usa.Items.Add(kansas);
            kansas.Items.Add(new PopulationUSA("Wichita", 386552));
            kansas.Items.Add(new PopulationUSA("Overland Park", 181260));
            kansas.Items.Add(new PopulationUSA("Kansas City", 148483));
            kansas.Items.Add(new PopulationUSA("Olathe", 131885));
            kansas.Items.Add(new PopulationUSA("Topeka", 127679));
            kansas.Items.Add(new PopulationUSA("Lawrence", 90811));
            kansas.Items.Add(new PopulationUSA("Shawnee", 64323));
            kansas.Items.Add(new PopulationUSA("Manhattan", 56143));
            kansas.Items.Add(new PopulationUSA("Lenexa", 50344));
            kansas.Items.Add(new PopulationUSA("Salina", 47846));

            PopulationUSA kentucky = new PopulationUSA("Kentucky" , 4395295);
            usa.Items.Add(kentucky);
            kentucky.Items.Add(new PopulationUSA("Louisville", 609893));
            kentucky.Items.Add(new PopulationUSA("Lexington", 308428));
            kentucky.Items.Add(new PopulationUSA("Bowling Green", 61488));
            kentucky.Items.Add(new PopulationUSA("Owensboro", 58416));
            kentucky.Items.Add(new PopulationUSA("Covington", 40956));
            kentucky.Items.Add(new PopulationUSA("Hopkinsville", 32582));
            kentucky.Items.Add(new PopulationUSA("Richmond", 32550));
            kentucky.Items.Add(new PopulationUSA("Florence", 31423));
            kentucky.Items.Add(new PopulationUSA("Georgetown", 30872));
            kentucky.Items.Add(new PopulationUSA("Elizabethtown", 29948));

            PopulationUSA louisiana = new PopulationUSA("Louisiana" , 4625470);
            usa.Items.Add(louisiana);
            louisiana.Items.Add(new PopulationUSA("New Orleans", 378715));
            louisiana.Items.Add(new PopulationUSA("Baton Rouge", 229426));
            louisiana.Items.Add(new PopulationUSA("Shreveport", 200327));
            louisiana.Items.Add(new PopulationUSA("Metairie", 139000));
            louisiana.Items.Add(new PopulationUSA("Lafayette", 124276));
            louisiana.Items.Add(new PopulationUSA("Lake Charles", 74024));
            louisiana.Items.Add(new PopulationUSA("Kenner", 66975));
            louisiana.Items.Add(new PopulationUSA("Bossier City", 66333));
            louisiana.Items.Add(new PopulationUSA("Monroe", 49761));
            louisiana.Items.Add(new PopulationUSA("Alexandria", 48426));
                        
            PopulationUSA maine = new PopulationUSA("Maine" , 1328302);
            usa.Items.Add(maine);
            maine.Items.Add(new PopulationUSA("Portland", 66318));
            maine.Items.Add(new PopulationUSA("Lewiston", 36437));
            maine.Items.Add(new PopulationUSA("Bangor", 32673));

            PopulationUSA maryland = new PopulationUSA("Maryland" , 5928814);
            usa.Items.Add(maryland);
            maryland.Items.Add(new PopulationUSA("Baltimore", 622104));
            maryland.Items.Add(new PopulationUSA("Columbia", 105000));

            PopulationUSA massachusetts = new PopulationUSA("Massachusetts" , 6692824);
            usa.Items.Add(massachusetts);
            massachusetts.Items.Add(new PopulationUSA("Boston", 645966));
            massachusetts.Items.Add(new PopulationUSA("Worcester", 182544));
            massachusetts.Items.Add(new PopulationUSA("Springfield", 153703));
            massachusetts.Items.Add(new PopulationUSA("Lowell", 108861));
            massachusetts.Items.Add(new PopulationUSA("Cambridge", 107289));
            massachusetts.Items.Add(new PopulationUSA("New Bedford", 95078));
            massachusetts.Items.Add(new PopulationUSA("Brockton", 94089));
            massachusetts.Items.Add(new PopulationUSA("Quincy", 93494));
            massachusetts.Items.Add(new PopulationUSA("Lynn", 91589));
            massachusetts.Items.Add(new PopulationUSA("Fall River", 88697));
            massachusetts.Items.Add(new PopulationUSA("Newton", 87971));

            PopulationUSA michigan = new PopulationUSA("Michigan" , 9895622);
            usa.Items.Add(michigan);
            michigan.Items.Add(new PopulationUSA("Detroit", 688701));
            michigan.Items.Add(new PopulationUSA("Grand Rapids", 192294));
            michigan.Items.Add(new PopulationUSA("Warren", 134873));
            michigan.Items.Add(new PopulationUSA("Sterling Heights", 131224));
            michigan.Items.Add(new PopulationUSA("Ann Arbor", 117025));
            michigan.Items.Add(new PopulationUSA("Lansing", 113972));
            michigan.Items.Add(new PopulationUSA("Flint", 99763));
            michigan.Items.Add(new PopulationUSA("Clinton", 98477));
            michigan.Items.Add(new PopulationUSA("Dearborn", 95884));
            michigan.Items.Add(new PopulationUSA("Livonia", 95208));

            PopulationUSA minnesota = new PopulationUSA("Minnesota" , 5420380);
            usa.Items.Add(minnesota);
            minnesota.Items.Add(new PopulationUSA("Minneapolis", 400070));
            minnesota.Items.Add(new PopulationUSA("St. Paul", 294873));
            minnesota.Items.Add(new PopulationUSA("Rochester", 110742));
            minnesota.Items.Add(new PopulationUSA("Bloomington", 86319));
            minnesota.Items.Add(new PopulationUSA("Duluth", 86128));
            minnesota.Items.Add(new PopulationUSA("Brooklyn Park", 78373));
            minnesota.Items.Add(new PopulationUSA("Plymouth", 73987));
            minnesota.Items.Add(new PopulationUSA("St. Cloud", 66297));
            minnesota.Items.Add(new PopulationUSA("Woodbury", 65656));
            minnesota.Items.Add(new PopulationUSA("Eagan", 65453));
            minnesota.Items.Add(new PopulationUSA("Maple Grove", 65415));

            PopulationUSA mississippi = new PopulationUSA("Mississippi" , 2991207);
            usa.Items.Add(mississippi);
            mississippi.Items.Add(new PopulationUSA("Jackson", 172638));
            mississippi.Items.Add(new PopulationUSA("Gulfport", 71012));
            mississippi.Items.Add(new PopulationUSA("Southaven", 50997));
            mississippi.Items.Add(new PopulationUSA("Hattiesburg", 47556));
            mississippi.Items.Add(new PopulationUSA("Biloxi", 44820));
            mississippi.Items.Add(new PopulationUSA("Meridian", 40921));
            mississippi.Items.Add(new PopulationUSA("Tupelo", 35827));
            mississippi.Items.Add(new PopulationUSA("Olive Branch", 34963));
            mississippi.Items.Add(new PopulationUSA("Greenville", 33203));

            PopulationUSA missouri = new PopulationUSA("Missouri" , 6044171);
            usa.Items.Add(missouri);
            missouri.Items.Add(new PopulationUSA("Kansas City", 467007));
            missouri.Items.Add(new PopulationUSA("St. Louis", 318416));
            missouri.Items.Add(new PopulationUSA("Springfield", 164122));
            missouri.Items.Add(new PopulationUSA("Independence", 117240));
            missouri.Items.Add(new PopulationUSA("Columbia", 115276));
            missouri.Items.Add(new PopulationUSA("Lee's Summit", 93184));
            missouri.Items.Add(new PopulationUSA("O'Fallon", 82809));
            missouri.Items.Add(new PopulationUSA("St. Joseph", 77147));
            missouri.Items.Add(new PopulationUSA("St. Charles", 67569));

            PopulationUSA montana = new PopulationUSA("Montana" , 1015165);
            usa.Items.Add(montana);
            montana.Items.Add(new PopulationUSA("Billings", 109059));
            montana.Items.Add(new PopulationUSA("Bozeman", 39860));
            montana.Items.Add(new PopulationUSA("Butte-Silver Bow", 33854));
            montana.Items.Add(new PopulationUSA("Great Falls", 59351));
            montana.Items.Add(new PopulationUSA("Helena", 29596));
            montana.Items.Add(new PopulationUSA("Kalispell", 20972));
            montana.Items.Add(new PopulationUSA("Missoula", 69122));

            PopulationUSA nebraska = new PopulationUSA("Nebraska" , 1868516);
            usa.Items.Add(nebraska);
            nebraska.Items.Add(new PopulationUSA("Bellevue", 53663));
            nebraska.Items.Add(new PopulationUSA("Columbus", 22533));
            nebraska.Items.Add(new PopulationUSA("Fremont", 26340));
            nebraska.Items.Add(new PopulationUSA("Grand Island", 50550));
            nebraska.Items.Add(new PopulationUSA("Hastings", 25093));
            nebraska.Items.Add(new PopulationUSA("Kearney", 32174));
            nebraska.Items.Add(new PopulationUSA("La Vista", 17562));
            nebraska.Items.Add(new PopulationUSA("Lincoln", 268738));
            nebraska.Items.Add(new PopulationUSA("Norfolk", 24523));
            nebraska.Items.Add(new PopulationUSA("North Platte", 24534));
            nebraska.Items.Add(new PopulationUSA("Omaha", 434353));
            nebraska.Items.Add(new PopulationUSA("Papillion", 21921));
            nebraska.Items.Add(new PopulationUSA("Scottsbluff", 15023));

            PopulationUSA nevada = new PopulationUSA("Nevada" , 2790136);
            usa.Items.Add(nevada);
            nevada.Items.Add(new PopulationUSA("Las Vegas", 603488));
            nevada.Items.Add(new PopulationUSA("Henderson", 270811));
            nevada.Items.Add(new PopulationUSA("Reno", 233294));
            nevada.Items.Add(new PopulationUSA("Paradise", 230000));
            nevada.Items.Add(new PopulationUSA("North Las Vegas", 226877));
            nevada.Items.Add(new PopulationUSA("Sunrise Manor", 197000));
            nevada.Items.Add(new PopulationUSA("Spring Valley", 188000));
            nevada.Items.Add(new PopulationUSA("Enterprise", 130000));
            nevada.Items.Add(new PopulationUSA("Sparks", 93282));

            PopulationUSA newHampshire = new PopulationUSA("New Hampshire" , 1323459);
            usa.Items.Add(newHampshire);
            newHampshire.Items.Add(new PopulationUSA("Concord", 42419));
            newHampshire.Items.Add(new PopulationUSA("Derry", 22000));
            newHampshire.Items.Add(new PopulationUSA("Dover", 30510));
            newHampshire.Items.Add(new PopulationUSA("Keene", 23419));
            newHampshire.Items.Add(new PopulationUSA("Laconia", 16010));
            newHampshire.Items.Add(new PopulationUSA("Manchester", 110378));
            newHampshire.Items.Add(new PopulationUSA("Nashua", 87137));
            newHampshire.Items.Add(new PopulationUSA("Portsmouth", 21440));
            newHampshire.Items.Add(new PopulationUSA("Rochester", 29745));

            PopulationUSA newJersey = new PopulationUSA("New Jersey" , 8899339);
            usa.Items.Add(newJersey);
            newJersey.Items.Add(new PopulationUSA("Newark", 278427));
            newJersey.Items.Add(new PopulationUSA("Jersey City", 257342));
            newJersey.Items.Add(new PopulationUSA("Paterson", 145948));
            newJersey.Items.Add(new PopulationUSA("Elizabeth", 127558));
            newJersey.Items.Add(new PopulationUSA("Edison", 101450));
            newJersey.Items.Add(new PopulationUSA("Toms River", 89100));
            newJersey.Items.Add(new PopulationUSA("Clifton", 85390));
            newJersey.Items.Add(new PopulationUSA("Trenton", 84349));
            newJersey.Items.Add(new PopulationUSA("Camden", 76903));
            newJersey.Items.Add(new PopulationUSA("Brick Township", 75832));

            PopulationUSA newMexico = new PopulationUSA("New Mexico" , 2085287);
            usa.Items.Add(newMexico);
            newMexico.Items.Add(new PopulationUSA("Albuquerque", 556495));
            newMexico.Items.Add(new PopulationUSA("Las Cruces", 101324));
            newMexico.Items.Add(new PopulationUSA("Rio Rancho", 91956));
            newMexico.Items.Add(new PopulationUSA("Santa Fe", 69976));
            newMexico.Items.Add(new PopulationUSA("Roswell", 48611));
            newMexico.Items.Add(new PopulationUSA("Farmington", 45426));
            newMexico.Items.Add(new PopulationUSA("South Valley", 41700));
            newMexico.Items.Add(new PopulationUSA("Clovis", 39508));
            newMexico.Items.Add(new PopulationUSA("Hobbs", 36041));
            newMexico.Items.Add(new PopulationUSA("Alamogordo", 31368));

            PopulationUSA newYork = new PopulationUSA("New York" , 19651127);
            usa.Items.Add(newYork);
            newYork.Items.Add(new PopulationUSA("New York", 8405837));
            newYork.Items.Add(new PopulationUSA("Buffalo", 258959));
            newYork.Items.Add(new PopulationUSA("Rochester", 210358));
            newYork.Items.Add(new PopulationUSA("Yonkers", 199766));
            newYork.Items.Add(new PopulationUSA("Syracuse", 144669));
            newYork.Items.Add(new PopulationUSA("Albany", 98424));
            newYork.Items.Add(new PopulationUSA("New Rochelle", 79446));
            newYork.Items.Add(new PopulationUSA("Cheektowaga", 74700));
            newYork.Items.Add(new PopulationUSA("Mount Vernon", 68224));
            newYork.Items.Add(new PopulationUSA("Schenectady", 65902));

            PopulationUSA northCarolina = new PopulationUSA("North Carolina" , 9848060);
            usa.Items.Add(northCarolina);
            northCarolina.Items.Add(new PopulationUSA("Charlotte", 792862));
            northCarolina.Items.Add(new PopulationUSA("Raleigh", 431746));
            northCarolina.Items.Add(new PopulationUSA("Greensboro", 279639));
            northCarolina.Items.Add(new PopulationUSA("Durham", 245475));
            northCarolina.Items.Add(new PopulationUSA("Winston-Salem", 236441));
            northCarolina.Items.Add(new PopulationUSA("Fayetteville", 204408));
            northCarolina.Items.Add(new PopulationUSA("Cary", 151088));
            northCarolina.Items.Add(new PopulationUSA("Wilmington", 112067));
            northCarolina.Items.Add(new PopulationUSA("High Point", 107741));
                        
            PopulationUSA northdakot = new PopulationUSA("North Dakota" , 723393);
            usa.Items.Add(northdakot);

            PopulationUSA ohio = new PopulationUSA("Ohio" , 11570808);
            usa.Items.Add(ohio);
            ohio.Items.Add(new PopulationUSA("Columbus", 822553));
            ohio.Items.Add(new PopulationUSA("Cleveland", 390113));
            ohio.Items.Add(new PopulationUSA("Cincinnati", 297517));
            ohio.Items.Add(new PopulationUSA("Toledo", 282313));
            ohio.Items.Add(new PopulationUSA("Akron", 198100));
            ohio.Items.Add(new PopulationUSA("Dayton", 143355));
            ohio.Items.Add(new PopulationUSA("Parma", 80429));
            ohio.Items.Add(new PopulationUSA("Canton", 72535));
            ohio.Items.Add(new PopulationUSA("Youngstown", 65184));
            ohio.Items.Add(new PopulationUSA("Lorain", 63710));

            PopulationUSA oklahoma = new PopulationUSA("Oklahoma" , 3850568);
            usa.Items.Add(oklahoma);
            oklahoma.Items.Add(new PopulationUSA("Oklahoma City", 610613));
            oklahoma.Items.Add(new PopulationUSA("Tulsa", 398121));
            oklahoma.Items.Add(new PopulationUSA("Norman", 118197));
            oklahoma.Items.Add(new PopulationUSA("Broken Arrow", 103500));
            oklahoma.Items.Add(new PopulationUSA("Lawton", 97151));
            oklahoma.Items.Add(new PopulationUSA("Edmond", 87004));
            oklahoma.Items.Add(new PopulationUSA("Moore", 58414));
            oklahoma.Items.Add(new PopulationUSA("Midwest City", 56756));
            oklahoma.Items.Add(new PopulationUSA("Enid", 50725));
            oklahoma.Items.Add(new PopulationUSA("Stillwater", 47186));

            PopulationUSA oregon = new PopulationUSA("Oregon" , 3930065);
            usa.Items.Add(oregon);
            oregon.Items.Add(new PopulationUSA("Portland", 609456));
            oregon.Items.Add(new PopulationUSA("Salem", 160614));
            oregon.Items.Add(new PopulationUSA("Eugene", 159190));
            oregon.Items.Add(new PopulationUSA("Gresham", 109397));
            oregon.Items.Add(new PopulationUSA("Hillsboro", 97368));
            oregon.Items.Add(new PopulationUSA("Beaverton", 93542));
            oregon.Items.Add(new PopulationUSA("Bend", 81236));
            oregon.Items.Add(new PopulationUSA("Medford", 77677));
            oregon.Items.Add(new PopulationUSA("Springfield", 60177));
            oregon.Items.Add(new PopulationUSA("Corvallis", 55298));
                        
            PopulationUSA pennsylvania = new PopulationUSA("Pennsylvania" , 12773801);
            usa.Items.Add(pennsylvania);
            pennsylvania.Items.Add(new PopulationUSA("Philadelphia", 1553165));
            pennsylvania.Items.Add(new PopulationUSA("Pittsburgh", 305841));
            pennsylvania.Items.Add(new PopulationUSA("Allentown", 118577));
            pennsylvania.Items.Add(new PopulationUSA("Erie", 100671));
            pennsylvania.Items.Add(new PopulationUSA("Reading", 87893));
            pennsylvania.Items.Add(new PopulationUSA("Scranton", 75806));
            pennsylvania.Items.Add(new PopulationUSA("Bethlehem", 75018));
            pennsylvania.Items.Add(new PopulationUSA("Lancaster", 59325));
            pennsylvania.Items.Add(new PopulationUSA("Levittown", 52700));
            pennsylvania.Items.Add(new PopulationUSA("Harrisburg", 49188));

            PopulationUSA rhodeIsland = new PopulationUSA("Rhode Island" , 1051511);
            usa.Items.Add(rhodeIsland);
            rhodeIsland.Items.Add(new PopulationUSA("Providence", 177994));
            rhodeIsland.Items.Add(new PopulationUSA("Warwick", 81971));
            rhodeIsland.Items.Add(new PopulationUSA("Cranston", 80566));
            rhodeIsland.Items.Add(new PopulationUSA("Pawtucket", 71172));

            PopulationUSA southCarolina = new PopulationUSA("South Carolina" , 4774839);
            usa.Items.Add(southCarolina);
            southCarolina.Items.Add(new PopulationUSA("Columbia", 133358));
            southCarolina.Items.Add(new PopulationUSA("Charleston", 127999));
            southCarolina.Items.Add(new PopulationUSA("North Charleston", 104054));
            southCarolina.Items.Add(new PopulationUSA("Mount Pleasant", 74885));
            southCarolina.Items.Add(new PopulationUSA("Rock Hill", 69103));
            southCarolina.Items.Add(new PopulationUSA("Greenville", 61397));
            southCarolina.Items.Add(new PopulationUSA("Summerville", 46074));
            southCarolina.Items.Add(new PopulationUSA("Sumter", 41190));
            southCarolina.Items.Add(new PopulationUSA("Goose Creek", 39823));
            southCarolina.Items.Add(new PopulationUSA("Hilton Head Island", 39412));

            PopulationUSA southDakota = new PopulationUSA("South Dakota" , 844877);
            usa.Items.Add(southDakota);

            PopulationUSA tennessee = new PopulationUSA("Tennessee" , 6495978);
            usa.Items.Add(tennessee);
            tennessee.Items.Add(new PopulationUSA("Memphis", 653450));
            tennessee.Items.Add(new PopulationUSA("Nashville", 634464));
            tennessee.Items.Add(new PopulationUSA("Knoxville", 183270));
            tennessee.Items.Add(new PopulationUSA("Chattanooga", 173366));
            tennessee.Items.Add(new PopulationUSA("Clarksville", 142357));
            tennessee.Items.Add(new PopulationUSA("Murfreesboro", 117044));
            tennessee.Items.Add(new PopulationUSA("Franklin", 68886));
            tennessee.Items.Add(new PopulationUSA("Jackson", 67685));
            tennessee.Items.Add(new PopulationUSA("Johnson City", 65123));
            tennessee.Items.Add(new PopulationUSA("Bartlett", 58226));

            PopulationUSA texas = new PopulationUSA("Texas" , 26448193);
            usa.Items.Add(texas);
            texas.Items.Add(new PopulationUSA("Houston", 2195914));
            texas.Items.Add(new PopulationUSA("San Antonio", 1409019));
            texas.Items.Add(new PopulationUSA("Dallas", 1257676));
            texas.Items.Add(new PopulationUSA("Austin", 885400));
            texas.Items.Add(new PopulationUSA("Fort Worth", 792727));
            texas.Items.Add(new PopulationUSA("El Paso", 674433));
            texas.Items.Add(new PopulationUSA("Arlington", 379577));
            texas.Items.Add(new PopulationUSA("Corpus Christi", 316381));
            texas.Items.Add(new PopulationUSA("Plano", 274409));

            PopulationUSA utah = new PopulationUSA("Utah" , 2900872);
            usa.Items.Add(utah);
            utah.Items.Add(new PopulationUSA("Salt Lake City", 191180));
            utah.Items.Add(new PopulationUSA("West Valley City", 133579));
            utah.Items.Add(new PopulationUSA("Provo", 116288));
            utah.Items.Add(new PopulationUSA("West Jordan", 110077));
            utah.Items.Add(new PopulationUSA("Orem", 91648));
            utah.Items.Add(new PopulationUSA("Sandy", 90231));
            utah.Items.Add(new PopulationUSA("Ogden", 84249));
            utah.Items.Add(new PopulationUSA("St. George", 76817));
            utah.Items.Add(new PopulationUSA("Layton", 70790));

            PopulationUSA vermont = new PopulationUSA("Vermont" , 626630);
            usa.Items.Add(vermont);
            vermont.Items.Add(new PopulationUSA("Burlington", 42284));
            vermont.Items.Add(new PopulationUSA("Montpelier", 7755));
            vermont.Items.Add(new PopulationUSA("Rutland", 16126));
            vermont.Items.Add(new PopulationUSA("South Burlington", 18612));

            PopulationUSA virginia = new PopulationUSA("Virginia" , 8260405);
            usa.Items.Add(virginia);
            virginia.Items.Add(new PopulationUSA("Virginia Beach", 448479));
            virginia.Items.Add(new PopulationUSA("Norfolk", 246139));
            virginia.Items.Add(new PopulationUSA("Chesapeake", 230571));
            virginia.Items.Add(new PopulationUSA("Arlington", 224906));
            virginia.Items.Add(new PopulationUSA("Richmond", 214114));
            virginia.Items.Add(new PopulationUSA("Newport News", 182020));
            virginia.Items.Add(new PopulationUSA("Alexandria", 148892));
            virginia.Items.Add(new PopulationUSA("Hampton", 136699));
            virginia.Items.Add(new PopulationUSA("Roanoke", 98465));
            virginia.Items.Add(new PopulationUSA("Portsmouth", 96205));

            PopulationUSA washington = new PopulationUSA("Washington" , 6971406);
            usa.Items.Add(washington);
            washington.Items.Add(new PopulationUSA("Seattle", 652405));
            washington.Items.Add(new PopulationUSA("Spokane", 210721));
            washington.Items.Add(new PopulationUSA("Tacoma", 203446));
            washington.Items.Add(new PopulationUSA("Vancouver", 167405));
            washington.Items.Add(new PopulationUSA("Bellevue", 133992));
            washington.Items.Add(new PopulationUSA("Kent", 124435));
            washington.Items.Add(new PopulationUSA("Everett", 105370));
            washington.Items.Add(new PopulationUSA("Renton", 97003));
            washington.Items.Add(new PopulationUSA("Yakima", 93257));
            washington.Items.Add(new PopulationUSA("Federal Way", 92734));
            washington.Items.Add(new PopulationUSA("Spokane Valley", 91113));

            PopulationUSA westVirginia = new PopulationUSA("West Virginia" , 1854304);
            usa.Items.Add(westVirginia);
            westVirginia.Items.Add(new PopulationUSA("Beckley", 17607));
            westVirginia.Items.Add(new PopulationUSA("Charleston", 50821));
            westVirginia.Items.Add(new PopulationUSA("Clarksburg", 16360));
            westVirginia.Items.Add(new PopulationUSA("Fairmont", 18815));
            westVirginia.Items.Add(new PopulationUSA("Huntington", 49177));
            westVirginia.Items.Add(new PopulationUSA("Martinsburg", 17668));
            westVirginia.Items.Add(new PopulationUSA("Morgantown", 30666));
            westVirginia.Items.Add(new PopulationUSA("Parkersburg", 31186));
            westVirginia.Items.Add(new PopulationUSA("Weirton", 19525));
            westVirginia.Items.Add(new PopulationUSA("Wheeling", 28009));

            PopulationUSA wisconsin = new PopulationUSA("Wisconsin" , 5742713);
            usa.Items.Add(wisconsin);
            wisconsin.Items.Add(new PopulationUSA("Milwaukee", 599164));
            wisconsin.Items.Add(new PopulationUSA("Madison", 243344));
            wisconsin.Items.Add(new PopulationUSA("Green Bay", 104779));
            wisconsin.Items.Add(new PopulationUSA("Kenosha", 99889));
            wisconsin.Items.Add(new PopulationUSA("Racine", 78199));
            wisconsin.Items.Add(new PopulationUSA("Appleton", 73596));
            wisconsin.Items.Add(new PopulationUSA("Waukesha", 71016));
            wisconsin.Items.Add(new PopulationUSA("Eau Claire", 67545));
            wisconsin.Items.Add(new PopulationUSA("Oshkosh", 66778));
            wisconsin.Items.Add(new PopulationUSA("Janesville", 63820));
            wisconsin.Items.Add(new PopulationUSA("West Allis", 60697));

            PopulationUSA wyoming = new PopulationUSA("Wyoming" , 582658);
            usa.Items.Add(wyoming);

            return result;
        }
    }
}