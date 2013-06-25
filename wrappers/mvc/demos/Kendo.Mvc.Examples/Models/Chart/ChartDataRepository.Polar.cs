using System.Collections.Generic;
using System;
using Kendo.Mvc.Examples.Models.Chart;

namespace Kendo.Mvc.Examples.Models
{
    public partial class ChartDataRepository
    {
        public static IList<AntennaGainItem> AntennaGain() 
        {
            return new AntennaGainItem[] {
                new AntennaGainItem(0, 0),
                new AntennaGainItem(10, 0),
                new AntennaGainItem(20, 0),
                new AntennaGainItem(30, -1),
                new AntennaGainItem(40, -2),
                new AntennaGainItem(50, -3),
                new AntennaGainItem(60, -5),
                new AntennaGainItem(70, -7),
                new AntennaGainItem(80, -10),
                new AntennaGainItem(90, -13),
                new AntennaGainItem(100, -16),
                new AntennaGainItem(110, -20),
                new AntennaGainItem(120, -19),
                new AntennaGainItem(130, -18),
                new AntennaGainItem(140, -17),
                new AntennaGainItem(150, -16),
                new AntennaGainItem(160, -15),
                new AntennaGainItem(170, -14),
                new AntennaGainItem(180, -13),
                new AntennaGainItem(190, -14),
                new AntennaGainItem(200, -15),
                new AntennaGainItem(210, -16),
                new AntennaGainItem(220, -17),
                new AntennaGainItem(230, -18),
                new AntennaGainItem(240, -19),
                new AntennaGainItem(250, -20),
                new AntennaGainItem(260, -16),
                new AntennaGainItem(270, -13),
                new AntennaGainItem(280, -10),
                new AntennaGainItem(290, -7),
                new AntennaGainItem(300, -5),
                new AntennaGainItem(310, -3),
                new AntennaGainItem(320, -2),
                new AntennaGainItem(330, -1),
                new AntennaGainItem(340, 0),
                new AntennaGainItem(350, 0),
                new AntennaGainItem(0, 0)
            };
        }

        public static IList<SunPositionItem> SunPosition()
        {
            return new SunPositionItem[] {
                new SunPositionItem("08:00", 4.9, 92.7),
                new SunPositionItem("09:00", 17.6, 100.6),
                new SunPositionItem("10:00", 30.1, 109.7),
                new SunPositionItem("11:00", 41.8, 121.3),
                new SunPositionItem("12:00", 51.8, 137.7),
                new SunPositionItem("13:00", 58.5, 161.5),
                new SunPositionItem("14:00", 59.4, 190.7),
                new SunPositionItem("15:00", 54.1, 216.6),
                new SunPositionItem("16:00", 44.8, 234.8),
                new SunPositionItem("17:00", 33.5, 247.6),
                new SunPositionItem("18:00", 21.2, 257.2),
                new SunPositionItem("19:00", 8.4, 265.3)
            };
        }
    }
}