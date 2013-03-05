namespace Kendo.Mvc.Examples.Models
{
    using System.Collections.Generic;

    public class CompensationStats
    {
        public CompensationStats()
        {
        }

        public CompensationStats(string year, double hourly, double change, double direct, IList<SocialBenefits> benefits)
        {
            Year = year;
            Hourly = hourly;
            Change = change;
            Direct = direct;
            Benefits = benefits;
        }

        public string Year { get; set; }
        public double Hourly { get; set; }
        public double Change { get; set; }
        public double Direct { get; set; }
        public IList<SocialBenefits> Benefits { get; set; }
    }

    public partial class ChartDataRepository
    {
        public static IList<CompensationStats> CompensationData()
        {
            return new CompensationStats[]
            {
                new CompensationStats("2011", 46.29, 16.69, 32.09, new SocialBenefits[] {
                    new SocialBenefits(SocialBenefitType.Social, 9.25),
                    new SocialBenefits(SocialBenefitType.Direct, 4.41)
                }),
                new CompensationStats("2010", 39.67, 18.7, 29.73, new SocialBenefits[] {
                    new SocialBenefits(SocialBenefitType.Social, 7.93),
                    new SocialBenefits(SocialBenefitType.Direct, 3.78)
                }),
                new CompensationStats("2009", 33.42, -6.93, 31.69, new SocialBenefits[] {
                    new SocialBenefits(SocialBenefitType.Social, 6.78),
                    new SocialBenefits(SocialBenefitType.Direct, 3.17)
                }),
                new CompensationStats("2008", 35.91, 7.61, 31.87, new SocialBenefits[] {
                    new SocialBenefits(SocialBenefitType.Social, 7.39),
                    new SocialBenefits(SocialBenefitType.Direct, 3.39)
                }),
                new CompensationStats("2007", 33.37, 14.4, 28.41, new SocialBenefits[] {
                    new SocialBenefits(SocialBenefitType.Social, 6.86),
                    new SocialBenefits(SocialBenefitType.Direct, 3.15)
                }),
                new CompensationStats("2006", 29.17, 2.17, 25.1, new SocialBenefits[] {
                    new SocialBenefits(SocialBenefitType.Social, 6.07),
                    new SocialBenefits(SocialBenefitType.Direct, 2.75)
                }),
                new CompensationStats("2005", 28.55, 6.73, 24.2, new SocialBenefits[] {
                    new SocialBenefits(SocialBenefitType.Social, 6.08),
                    new SocialBenefits(SocialBenefitType.Direct, 2.67)
                }),
                new CompensationStats("2004", 26.75, 18.1, 23.34, new SocialBenefits[] {
                    new SocialBenefits(SocialBenefitType.Social, 5.74),
                    new SocialBenefits(SocialBenefitType.Direct, 2.5)
                }),
                new CompensationStats("2003", 22.65, 30.02, 21.16, new SocialBenefits[] {
                    new SocialBenefits(SocialBenefitType.Social, 4.79),
                    new SocialBenefits(SocialBenefitType.Direct, 2.12)
                }),
                new CompensationStats("2002", 17.42, 15.98, 17.37, new SocialBenefits[] {
                    new SocialBenefits(SocialBenefitType.Social, 3.61),
                    new SocialBenefits(SocialBenefitType.Direct, 1.64)
                }),
                new CompensationStats("2001", 15.02, -8.69, 16.06, new SocialBenefits[] {
                    new SocialBenefits(SocialBenefitType.Social, 2.92),
                    new SocialBenefits(SocialBenefitType.Direct, 1.44)
                }),
                new CompensationStats("2000", 16.45, -9.32, 16.06, new SocialBenefits[] {
                    new SocialBenefits(SocialBenefitType.Social, 3.08),
                    new SocialBenefits(SocialBenefitType.Direct, 1.59)
                }),
                new CompensationStats("1999", 18.14, 5.77, 18.13, new SocialBenefits[] {
                    new SocialBenefits(SocialBenefitType.Social, 3.42),
                    new SocialBenefits(SocialBenefitType.Direct, 1.75)
                }),
                new CompensationStats("1998", 17.15, -9.4, 18.37, new SocialBenefits[] {
                    new SocialBenefits(SocialBenefitType.Social, 3.17),
                    new SocialBenefits(SocialBenefitType.Direct, 1.66)
                }),
                new CompensationStats("1997", 18.93, -1.25, 18.17, new SocialBenefits[] {
                    new SocialBenefits(SocialBenefitType.Social, 3.46),
                    new SocialBenefits(SocialBenefitType.Direct, 1.84)
                })
            };
        }

    }
}