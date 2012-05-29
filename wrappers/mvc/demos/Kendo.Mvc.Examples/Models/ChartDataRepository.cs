using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Models
{
    public class ChartDataRepository
    {
        public static IList<PricePerformance> PricePerformanceData()
        {
            return new List<PricePerformance>
            {
                new PricePerformance {
                    Family = "Pentium",
                    Model = "D 820",
                    Price = 105,
                    Performance = 100
                },
                
                new PricePerformance {
                    Family = "Pentium",
                    Model = "D 915",
                    Price = 120,
                    Performance = 102
                }, 
                
                new PricePerformance {
                    Family = "Pentium",
                    Model = "D 945",
                    Price = 160,
                    Performance = 118
                }, 
                
                new PricePerformance {
                    Family = "Pentium",
                    Model = "XE 965",
                    Price = 1000,
                    Performance = 137
                }, 
                
                new PricePerformance {
                    Family = "Core 2 Duo",
                    Model = "E6300",
                    Price = 185,
                    Performance = 134
                }, 
                
                new PricePerformance {
                    Family = "Core 2 Duo",
                    Model = "E6400",
                    Price = 210,
                    Performance = 143
                }, 
                
                new PricePerformance {
                    Family = "Core 2 Duo",
                    Model = "E6600",
                    Price = 305,
                    Performance = 163
                }, 
                
                new PricePerformance {
                    Family = "Core 2 Duo",
                    Model = "E6700",
                    Price = 530,
                    Performance = 177
                }, 
                
                new PricePerformance {
                    Family = "Core 2 Extreme",
                    Model = "X6800",
                    Price = 1000,
                    Performance = 190
                }, 
                
                new PricePerformance {
                    Family = "Athlon 64",
                    Model = "X2 3800+",
                    Price = 148,
                    Performance = 115
                }, 
            
                new PricePerformance {
                    Family = "Athlon 64",
                    Model = "X2 4200+",
                    Price = 170,
                    Performance = 125
                }, 
                
                new PricePerformance {
                    Family = "Athlon 64",
                    Model = "X2 4600+",
                    Price = 205,
                    Performance = 138
                }, 
                
                new PricePerformance {
                    Family = "Athlon 64",
                    Model = "X2 5000+",
                    Price = 290,
                    Performance = 143
                }, 
                
                new PricePerformance {
                    Family = "Athlon 64",
                    Model = "FX-62",
                    Price = 800,
                    Performance = 147
                }
            };
        }

        public static IList<EngineDataPoint> EngineData()
        {
            return new EngineDataPoint[]
            {
                new EngineDataPoint(1000, 50,  10),
                new EngineDataPoint(1500, 65,  19),
                new EngineDataPoint(2000, 80,  30),
                new EngineDataPoint(2500, 92,  44),
                new EngineDataPoint(3000, 104, 59),
                new EngineDataPoint(3500, 114, 76),
                new EngineDataPoint(4000, 120, 91),
                new EngineDataPoint(4500, 125, 107),
                new EngineDataPoint(5000, 130, 124),
                new EngineDataPoint(5500, 133, 139),
                new EngineDataPoint(6000, 130, 149),
                new EngineDataPoint(6500, 122, 151),
                new EngineDataPoint(7000, 110, 147)
            };
        }

        public static IList<InternetUsers> InternetUsers()
        {
            return new InternetUsers[] {
                new InternetUsers(2005, "United States", 67.96),
                new InternetUsers(2006, "United States", 68.93),
                new InternetUsers(2007, "United States", 75),
                new InternetUsers(2008, "United States", 74),
                new InternetUsers(2009, "United States", 78)
            };
        }

        public static IEnumerable<ElectricityProduction> SpainElectricityProduction()
        {
            return new ElectricityProduction[] {
                new ElectricityProduction("2000", 18, 31807, 4727, 62206),
                new ElectricityProduction("2001", 24, 43864, 6759, 63708),
                new ElectricityProduction("2002", 30, 26270, 9342, 63016),
                new ElectricityProduction("2003", 41, 43897, 12075, 61875),
                new ElectricityProduction("2004", 56, 34439, 15700, 63606),
                new ElectricityProduction("2005", 41, 23025, 21176, 57539),
                new ElectricityProduction("2006", 119, 29831, 23297, 60126),
                new ElectricityProduction("2007", 508, 30522, 27568, 55103),
                new ElectricityProduction("2008", 2578, 26112, 32203, 58973)
            };
        }

        public static IEnumerable<ElectricitySource> SpainElectricityBreakdown()
        {
            return new ElectricitySource[] {
                new ElectricitySource("Hydro", 22) { Explode = true },
                new ElectricitySource("Solar", 2),
                new ElectricitySource("Nuclear", 49),
                new ElectricitySource("Wind", 27)
            };
        }
    }
}