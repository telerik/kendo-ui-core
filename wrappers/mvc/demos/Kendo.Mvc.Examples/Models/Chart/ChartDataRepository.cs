using System.Collections.Generic;
using System;

namespace Kendo.Mvc.Examples.Models
{
    public partial class ChartDataRepository
    {
        public static IList<AprilSales> AprilSalesData() 
        {
            return new AprilSales[]
            {
                new AprilSales(2373, 5000, "1"),
                new AprilSales(3283, 5250, "2"),
                new AprilSales(4532, 5500, "3"),
                new AprilSales(4620, 5750, "4"),
                new AprilSales(6504, 6000, "5"),
                new AprilSales(6715, 6250, "6"),
                new AprilSales(6234, 6500, "7"),
                new AprilSales(6750, 6750, "8"),
                new AprilSales(6300, 7000, "9"),
                new AprilSales(6459, 7250, "10"),
                new AprilSales(8305, 7500, "11"),
                new AprilSales(7222, 7750, "12"),
                new AprilSales(6734, 8000, "13"),
                new AprilSales(7863, 8250, "14"),
                new AprilSales(8743, 8500, "15"),
                new AprilSales(8846, 8750, "16"),
                new AprilSales(8567, 9000, "17"),
                new AprilSales(8193, 9250, "18"),
                new AprilSales(9458, 9500, "19"),
                new AprilSales(9254, 9750, "20"),
                new AprilSales(10234, 10000, "21"),
                new AprilSales(9608, 10250, "22"),
                new AprilSales(9350, 10500, "23"),
                new AprilSales(8842, 10500, "24"),
                new AprilSales(8349, 10500, "25"),
                new AprilSales(8846, 10500, "26"),
                new AprilSales(9567, 10500, "27"),
                new AprilSales(10734, 10500, "28"),
                new AprilSales(10124, 10500, "29"),
                new AprilSales(9680, 10500, "30"),
            };
        }

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
                new InternetUsers(1994,4.9,"United States"),
                new InternetUsers(1995,9.2,"United States"),
                new InternetUsers(1996,16.4,"United States"),
                new InternetUsers(1997,21.6,"United States"),
                new InternetUsers(1998,30.1,"United States"),
                new InternetUsers(1999,35.9,"United States"),
                new InternetUsers(2000,43.1,"United States"),
                new InternetUsers(2001,49.2,"United States"),
                new InternetUsers(2002,59.0,"United States"),
                new InternetUsers(2003,61.9,"United States"),
                new InternetUsers(2004,65,"United States"),
                new InternetUsers(2005,68.3,"United States"),
                new InternetUsers(2006,69.2,"United States"),
                new InternetUsers(2007,75.3,"United States"),
                new InternetUsers(2008,74.2,"United States"),
                new InternetUsers(2009,71.2,"United States"),
                new InternetUsers(2010,74.2,"United States"),
                new InternetUsers(2011,78.2,"United States")
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

        public static IList<ScreenResolution> WorldScreenResolution()
        {
            return new ScreenResolution[] {
                new ScreenResolution() {Year = "2000",Resolution = "1024x768",Share = 25,VisibleInLegend = false,OrderNumber = 1},
                new ScreenResolution() {Year = "2000",Resolution = "Other",Share = 75,VisibleInLegend = false,OrderNumber = 2},
                new ScreenResolution() {Year = "2001",Resolution = "1024x768",Share = 29,VisibleInLegend = false,OrderNumber = 1},
                new ScreenResolution() {Year = "2001",Resolution = "Other",Share = 71,VisibleInLegend = false,OrderNumber = 2},
                new ScreenResolution() {Year = "2002",Resolution = "1024x768",Share = 34,VisibleInLegend = false,OrderNumber = 1},
                new ScreenResolution() {Year = "2002",Resolution = "Other",Share = 66,VisibleInLegend = false,OrderNumber = 2},
                new ScreenResolution() {Year = "2003",Resolution = "1024x768",Share = 40,VisibleInLegend = false,OrderNumber = 1},
                new ScreenResolution() {Year = "2003",Resolution = "Other",Share = 60,VisibleInLegend = false,OrderNumber = 2},
                new ScreenResolution() {Year = "2004",Resolution = "1024x768",Share = 47,VisibleInLegend = false,OrderNumber = 1},
                new ScreenResolution() {Year = "2004",Resolution = "Other",Share = 53,VisibleInLegend = false,OrderNumber = 2},
                new ScreenResolution() {Year = "2005",Resolution = "1024x768",Share = 53,VisibleInLegend = false,OrderNumber = 1},
                new ScreenResolution() {Year = "2005",Resolution = "Other",Share = 47,VisibleInLegend = false,OrderNumber = 2},
                new ScreenResolution() {Year = "2006",Resolution = "1024x768",Share = 57,VisibleInLegend = false,OrderNumber = 1},
                new ScreenResolution() {Year = "2006",Resolution = "Other",Share = 43,VisibleInLegend = false,OrderNumber = 2},
                new ScreenResolution() {Year = "2007",Resolution = "1024x768",Share = 54,VisibleInLegend = false,OrderNumber = 1},
                new ScreenResolution() {Year = "2007",Resolution = "Other",Share = 46,VisibleInLegend = false,OrderNumber = 2},
                new ScreenResolution() {Year = "2008",Resolution = "1024x768",Share = 48,VisibleInLegend = false,OrderNumber = 1},
                new ScreenResolution() {Year = "2008",Resolution = "Other",Share = 52,VisibleInLegend = false,OrderNumber = 2},
                new ScreenResolution() {Year = "2009",Resolution = "1024x768",Share = 36,VisibleInLegend = false,OrderNumber = 1},
                new ScreenResolution() {Year = "2009",Resolution = "Other",Share = 64,VisibleInLegend = false,OrderNumber = 2}
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

        public static IList<Medals> Medals()
        {
            return new Medals[] {
                new Medals(1984,1,10,"Japan"),
                new Medals(1988,1,4,"Japan"),
                new Medals(1992,1,3,"Japan"),
                new Medals(1996,1,3,"Japan"),
                new Medals(2000,1,5,"Japan"),
                new Medals(2004,1,16,"Japan"),
                new Medals(2008,1,9,"Japan"),
                new Medals(2012,1,7,"Japan"),
                new Medals(1984,2,8,"Japan"),
                new Medals(1988,2,3,"Japan"),
                new Medals(1992,2,8,"Japan"),
                new Medals(1996,2,6,"Japan"),
                new Medals(2000,2,8,"Japan"),
                new Medals(2004,2,9,"Japan"),
                new Medals(2008,2,6,"Japan"),
                new Medals(2012,2,14,"Japan"),
                new Medals(1984,3,14,"Japan"),
                new Medals(1988,3,7,"Japan"),
                new Medals(1992,3,11,"Japan"),
                new Medals(1996,3,5,"Japan"),
                new Medals(2000,3,5,"Japan"),
                new Medals(2004,3,12,"Japan"),
                new Medals(2008,3,10,"Japan"),
                new Medals(2012,3,17,"Japan") 
            };
        }

        public static IList<BlogComments> BlogComments()
        {
            return new BlogComments[] {
                 new BlogComments("My blog", 1, 3),
                 new BlogComments("My blog", 2, 7),
                 new BlogComments("My blog", 3, 12),
                 new BlogComments("My blog", 4, 15),
                 new BlogComments("My blog", 5, 6),
                 new BlogComments("My blog", 6, 23),
                 new BlogComments("My blog", 7, 12),
                 new BlogComments("My blog", 8, 10),
                 new BlogComments("My blog", 9, 17),
                 new BlogComments("My blog", 10, 13),
                 new BlogComments("My blog", 11, 14),
                 new BlogComments("My blog", 12, 15),
                 new BlogComments("My blog", 13, 3),
                 new BlogComments("My blog", 14, 6),
                 new BlogComments("My blog", 15, 23),
                 new BlogComments("My blog", 16, 25),
                 new BlogComments("My blog", 17, 21),
                 new BlogComments("My blog", 18, 18),
                 new BlogComments("My blog", 19, 17),
                 new BlogComments("My blog", 20, 16),
                 new BlogComments("My blog", 21, 11),
                 new BlogComments("My blog", 22, 3),
                 new BlogComments("My blog", 23, 8),
                 new BlogComments("My blog", 24, 5),
                 new BlogComments("My blog", 25, 4),
                 new BlogComments("My blog", 26, 1),
                 new BlogComments("My blog", 27, 7),
                 new BlogComments("My blog", 28, 6),
                 new BlogComments("My blog", 29, 3),
                 new BlogComments("My blog", 30, 6) 
            };
        }

        public static IList<JobGrowth> JobGrowthData()
        {
            return new JobGrowth[] {
                new JobGrowth {
                    Growth = -2500,
                    Jobs = 50000,
                    Applications = 500000,
                    Company = "Microsoft"
                }, new JobGrowth {
                    Growth = 500,
                    Jobs = 110000,
                    Applications = 7600000,
                    Company = "Starbucks"
                }, new JobGrowth {
                    Growth = 7000,
                    Jobs = 19000,
                    Applications = 700000,
                    Company = "Google"
                }, new JobGrowth {
                    Growth = 1400,
                    Jobs = 150000,
                    Applications = 700000,
                    Company = "Publix Super Markets"
                }, new JobGrowth {
                    Growth = 2400,
                    Jobs = 30000,
                    Applications = 300000,
                    Company = "PricewaterhouseCoopers"
                }, new JobGrowth {
                    Growth = 2450,
                    Jobs = 34000,
                    Applications = 90000,
                    Company = "Cisco"
                }, new JobGrowth {
                    Growth = 2700,
                    Jobs = 34000,
                    Applications = 400000,
                    Company = "Accenture"
                }, new JobGrowth {
                    Growth = 2900,
                    Jobs = 40000,
                    Applications = 450000,
                    Company = "Deloitte"
                }, new JobGrowth {
                    Growth = 3000,
                    Jobs = 55000,
                    Applications = 900000,
                    Company = "Whole Foods Market"
                }
            };
        }

        public static IList<JobGrowth> JobGrowthDataComparative()
        {
            return new JobGrowth[] {
                new JobGrowth {
                    Growth = -2500,
                    Jobs = 50000,
                    Applications = 500000,
                    Company = "Microsoft",
                    Year = 2011
                }, new JobGrowth {
                    Growth = 500,
                    Jobs = 110000,
                    Applications = 7600000,
                    Company = "Starbucks",
                    Year = 2011
                }, new JobGrowth {
                    Growth = 7000,
                    Jobs = 19000,
                    Applications = 700000,
                    Company = "Google",
                    Year = 2011
                }, 
                new JobGrowth {
                    Growth = -2000,
                    Jobs = 60000,
                    Applications = 900000,
                    Company = "Microsoft",
                    Year = 2012
                }, new JobGrowth {
                    Growth = 4000,
                    Jobs = 130000,
                    Applications = 8600000,
                    Company = "Starbucks",
                    Year = 2012
                }, new JobGrowth {
                    Growth = 9000,
                    Jobs = 29000,
                    Applications = 2200000,
                    Company = "Google",
                    Year = 2012
                }
            };
        }

        public static IList<CrimeData> CrimeStats()
        {
            return new CrimeData[] {
                new CrimeData {
                    State = "Alabama",
                    Murder = 8.2,
                    Burglary = 953.8,
                    Population = 4627851
                },
                new CrimeData {
                    State = "Alaska",
                    Murder = 4.8,
                    Burglary = 622.5,
                    Population = 686293
                },
                new CrimeData {
                    State = "Arizona",
                    Murder = 7.5,
                    Burglary = 948.4,
                    Population = 6500180
                },
                new CrimeData {
                    State = "Arkansas",
                    Murder = 6.7,
                    Burglary = 1084.6,
                    Population = 2855390
                },
                new CrimeData {
                    State = "California",
                    Murder = 6.9,
                    Burglary = 693.3,
                    Population = 36756666
                },
                new CrimeData {
                    State = "Colorado",
                    Murder = 3.7,
                    Burglary = 744.8,
                    Population = 4861515
                },
                new CrimeData {
                    State = "Connecticut",
                    Murder = 2.9,
                    Burglary = 437.1,
                    Population = 3501252
                },
                new CrimeData {
                    State = "Delaware",
                    Murder = 4.4,
                    Burglary = 688.9,
                    Population = 873092
                },
                new CrimeData {
                    State = "Florida",
                    Murder = 5,
                    Burglary = 926.3,
                    Population = 18328340
                },
                new CrimeData {
                    State = "Georgia",
                    Murder = 6.2,
                    Burglary = 931,
                    Population = 9685744
                },
                new CrimeData {
                    State = "Hawaii",
                    Murder = 1.9,
                    Burglary = 767.9,
                    Population = 1288198
                },
                new CrimeData {
                    State = "Idaho",
                    Murder = 2.4,
                    Burglary = 564.4,
                    Population = 1523816
                },
                new CrimeData {
                    State = "Illinois",
                    Murder = 6,
                    Burglary = 606.9,
                    Population = 12901563
                },
                new CrimeData {
                    State = "Indiana",
                    Murder = 5.7,
                    Burglary = 697.6,
                    Population = 6376792
                },
                new CrimeData {
                    State = "Iowa",
                    Murder = 1.3,
                    Burglary = 606.4,
                    Population = 3002555
                },
                new CrimeData {
                    State = "Kansas",
                    Murder = 3.7,
                    Burglary = 689.2,
                    Population = 2802134
                },
                new CrimeData {
                    State = "Kentucky",
                    Murder = 4.6,
                    Burglary = 634,
                    Population = 4269245
                },
                new CrimeData {
                    State = "Louisiana",
                    Murder = 9.9,
                    Burglary = 870.6,
                    Population = 4410796
                },
                new CrimeData {
                    State = "Maine",
                    Murder = 1.4,
                    Burglary = 478.5,
                    Population = 1316456
                },
                new CrimeData {
                    State = "Maryland",
                    Murder = 9.9,
                    Burglary = 641.4,
                    Population = 5633597
                },
                new CrimeData {
                    State = "Massachusetts",
                    Murder = 2.7,
                    Burglary = 541.1,
                    Population = 6497967
                },
                new CrimeData {
                    State = "Michigan",
                    Murder = 6.1,
                    Burglary = 696.8,
                    Population = 10003422
                },
                new CrimeData {
                    State = "Minnesota",
                    Murder = 2.2,
                    Burglary = 578.9,
                    Population = 5220393
                },
                new CrimeData {
                    State = "Mississippi",
                    Murder = 7.3,
                    Burglary = 919.7,
                    Population = 2938618
                },
                new CrimeData {
                    State = "Missouri",
                    Murder = 6.9,
                    Burglary = 738.3,
                    Population = 5911605
                },
                new CrimeData {
                    State = "Montana",
                    Murder = 1.9,
                    Burglary = 389.2,
                    Population = 967440
                },
                new CrimeData {
                    State = "Nebraska",
                    Murder = 2.5,
                    Burglary = 532.4,
                    Population = 1783432
                },
                new CrimeData {
                    State = "Nevada",
                    Murder = 8.5,
                    Burglary = 972.4,
                    Population = 2600167
                },
                new CrimeData {
                    State = "New Hampshire",
                    Murder = 1.4,
                    Burglary = 317,
                    Population = 1315809
                },
                new CrimeData {
                    State = "New Jersey",
                    Murder = 4.8,
                    Burglary = 447.1,
                    Population = 8682661
                },
                new CrimeData {
                    State = "New Mexico",
                    Murder = 7.4,
                    Burglary = 1093.9,
                    Population = 1984356
                },
                new CrimeData {
                    State = "New York",
                    Murder = 4.5,
                    Burglary = 353.3,
                    Population = 19490297
                },
                new CrimeData {
                    State = "North Carolina",
                    Murder = 6.7,
                    Burglary = 1201.1,
                    Population = 9222414
                },
                new CrimeData {
                    State = "North Dakota",
                    Murder = 1.1,
                    Burglary = 311.9,
                    Population = 641481
                },
                new CrimeData {
                    State = "Ohio",
                    Murder = 5.1,
                    Burglary = 872.8,
                    Population = 11485910
                },
                new CrimeData {
                    State = "Oklahoma",
                    Murder = 5.3,
                    Burglary = 1006,
                    Population = 3642361
                },
                new CrimeData {
                    State = "Oregon",
                    Murder = 2.2,
                    Burglary = 758.6,
                    Population = 3790060
                },
                new CrimeData {
                    State = "Pennsylvania",
                    Murder = 6.1,
                    Burglary = 451.6,
                    Population = 12448279
                },
                new CrimeData {
                    State = "Rhode Island",
                    Murder = 3.2,
                    Burglary = 494.2,
                    Population = 1050788
                },
                new CrimeData {
                    State = "South Carolina",
                    Murder = 7.4,
                    Burglary = 1000.9,
                    Population = 4479800
                },
                new CrimeData {
                    State = "South Dakota",
                    Murder = 2.3,
                    Burglary = 324.4,
                    Population = 804194
                },
                new CrimeData {
                    State = "Tennessee",
                    Murder = 7.2,
                    Burglary = 1026.9,
                    Population = 6214888
                },
                new CrimeData {
                    State = "Texas",
                    Murder = 6.2,
                    Burglary = 961.6,
                    Population = 24326974
                },
                new CrimeData {
                    State = "Utah",
                    Murder = 2.3,
                    Burglary = 606.2,
                    Population = 2736424
                },
                new CrimeData {
                    State = "Vermont",
                    Murder = 1.3,
                    Burglary = 491.8,
                    Population = 621270
                },
                new CrimeData {
                    State = "Virginia",
                    Murder = 6.1,
                    Burglary = 392.1,
                    Population = 7769089
                },
                new CrimeData {
                    State = "Washington",
                    Murder = 3.3,
                    Burglary = 959.7,
                    Population = 6549224
                },
                new CrimeData {
                    State = "West Virginia",
                    Murder = 4.4,
                    Burglary = 621.2,
                    Population = 1814468
                },
                new CrimeData {
                    State = "Wisconsin",
                    Murder = 3.5,
                    Burglary = 440.8,
                    Population = 5627967
                },
                new CrimeData {
                    State = "Wyoming",
                    Murder = 2.7,
                    Burglary = 476.3,
                    Population = 532668
                }
            };
        }

        public static IList<DatePoint> DatePoints() 
        {
            return new DatePoint[]
            {
                new DatePoint(30, DateTime.Parse("2011/12/20")),
                new DatePoint(50, DateTime.Parse("2011/12/21")),
                new DatePoint(45, DateTime.Parse("2011/12/22")),
                new DatePoint(40, DateTime.Parse("2011/12/23")),
                new DatePoint(35, DateTime.Parse("2011/12/24")),
                new DatePoint(40, DateTime.Parse("2011/12/25")),
                new DatePoint(42, DateTime.Parse("2011/12/26")),
                new DatePoint(40, DateTime.Parse("2011/12/27")),
                new DatePoint(35, DateTime.Parse("2011/12/28")),
                new DatePoint(43, DateTime.Parse("2011/12/29")),
                new DatePoint(38, DateTime.Parse("2011/12/30")),
                new DatePoint(30, DateTime.Parse("2011/12/31")),
                new DatePoint(48, DateTime.Parse("2012/01/01")),
                new DatePoint(50, DateTime.Parse("2012/01/02")),
                new DatePoint(55, DateTime.Parse("2012/01/03")),
                new DatePoint(35, DateTime.Parse("2012/01/04")),
                new DatePoint(30, DateTime.Parse("2012/01/05"))  
            };
        }
    }
}