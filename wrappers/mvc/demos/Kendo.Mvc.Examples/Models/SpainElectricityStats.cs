using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kendo.Mvc.Examples.Models
{
    public static class SpainElectricityStats
    {
        public static IEnumerable<ElectricityProduction> GetStats() {
            return new ElectricityProduction[] {
                new ElectricityProduction(2000, 18, 31807, 4727, 62206),
                new ElectricityProduction(2001, 24, 43864, 6759, 63708),
                new ElectricityProduction(2002, 30, 26270, 9342, 63016),
                new ElectricityProduction(2003, 41, 43897, 12075, 61875),
                new ElectricityProduction(2004, 56, 34439, 15700, 63606),
                new ElectricityProduction(2005, 41, 23025, 21176, 57539),
                new ElectricityProduction(2006, 119, 29831, 23297, 60126),
                new ElectricityProduction(2007, 508, 30522, 27568, 55103),
                new ElectricityProduction(2008, 2578, 26112, 32203, 58973)
            };
        }
    }
}