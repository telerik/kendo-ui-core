using System.Collections.Generic;
using System;

namespace Kendo.Mvc.Examples.Models
{
    public partial class ChartDataRepository
    {
        public static IList<OzoneConcentration> OzoneConcentration()
        {
            return new OzoneConcentration[] {
                new OzoneConcentration { Year = 1990, Lower = 1.3, Q1 = 2.15, Median = 2.95, Q3 = 3.725, Upper = 4.7, Mean = 2.9, Outliers = new List<double>() {1, 9}},
                new OzoneConcentration { Year = 1991, Lower = 2, Q1 = 3.825, Median = 5.45, Q3 = 6.425, Upper = 8.2, Mean = 5.2, Outliers = new List<double>() {1.5, 2, 8.9}},
                new OzoneConcentration { Year = 1992, Lower = 3.8, Q1 = 4.725, Median = 5.55, Q3 = 5.75, Upper = 8.7, Mean = 5.5 },
                new OzoneConcentration { Year = 1993, Lower = 3, Q1 = 4.375, Median = 4.95, Q3 = 5.85, Upper = 8, Mean = 5.2, Outliers = new List<double>() {3, 9.5}},
                new OzoneConcentration { Year = 1994, Lower = 2.5, Q1 = 3.925, Median = 4.15, Q3 = 4.45, Upper = 5.1, Mean = 4.1 },
                new OzoneConcentration { Year = 1995, Lower = 2.4, Q1 = 3.725, Median = 4.95, Q3 = 5.85, Upper = 7.7, Mean = 4.9, Outliers = new List<double>() {2.1, 8.3, 9.8}},
                new OzoneConcentration { Year = 1996, Lower = 1.7, Q1 = 2.3, Median = 3.9, Q3 = 5, Upper = 5.5, Mean = 3.7, Outliers = new List<double>() {1.1, 9.1}},
                new OzoneConcentration { Year = 1997, Lower = 2.2, Q1 = 2.5, Median = 3.1, Q3 = 3.975, Upper = 4.3, Mean = 3.2, Outliers = new List<double>() {1.6, 1.8, 9.8}},
                new OzoneConcentration { Year = 1998, Lower = 1.9, Q1 = 2.7, Median = 3.35, Q3 = 4.575, Upper = 5.7, Mean = 3.6, Outliers = new List<double>() {1.1, 8.3}},
                new OzoneConcentration { Year = 1999, Lower = 1.7, Q1 = 2.65, Median = 3.3, Q3 = 4.05, Upper = 5, Mean = 3.4 },
                new OzoneConcentration { Year = 2000, Lower = 1.4, Q1 = 2.25, Median = 3.3, Q3 = 4.65, Upper = 5.7, Mean = 3.4 },
                new OzoneConcentration { Year = 2001, Lower = 1.9, Q1 = 2.85, Median = 4, Q3 = 4.45, Upper = 6.1, Mean = 3.9, Outliers = new List<double>() {1, 1.2}},
                new OzoneConcentration { Year = 2002, Lower = 1.5, Q1 = 2.35, Median = 4.1, Q3 = 5.225, Upper = 5.7, Mean = 3.9, Outliers = new List<double>() {9, 9.5}},
                new OzoneConcentration { Year = 2003, Lower = 1.8, Q1 = 2.325, Median = 3.35, Q3 = 4, Upper = 5.4, Mean = 3.3, Outliers = new List<double>() {1, 6}},
                new OzoneConcentration { Year = 2004, Lower = 1.8, Q1 = 2.75, Median = 3.35, Q3 = 3.825, Upper = 4.9, Mean = 3.4 },
                new OzoneConcentration { Year = 2005, Lower = 1.7, Q1 = 2.275, Median = 3.2, Q3 = 3.825, Upper = 5.5, Mean = 3.2, Outliers = new List<double>() {0.5, 6.7}},
                new OzoneConcentration { Year = 2006, Lower = 1.2, Q1 = 1.95, Median = 2.45, Q3 = 3.075, Upper = 3.5, Mean = 2.5 },
                new OzoneConcentration { Year = 2007, Lower = 1.3, Q1 = 1.9, Median = 3.05, Q3 = 3.425, Upper = 4, Mean = 2.7, Outliers = new List<double>() {7, 8.5}}
            };
        }

        public static IList<OzoneConcentration> OzoneConcentrationRemote()
        {
            return new OzoneConcentration[] {
                new OzoneConcentration { Year = 1996, Lower = 1.3, Q1 = 2.15, Median = 2.95, Q3 = 3.725, Upper = 4.7, Mean = 2.9, Outliers = new List<double>() {1, 9}},
                new OzoneConcentration { Year = 1997, Lower = 2, Q1 = 3.825, Median = 5.45, Q3 = 6.425, Upper = 8.2, Mean = 5.2, Outliers = new List<double>() {1.5, 2, 8.9}},
                new OzoneConcentration { Year = 1998, Lower = 3.8, Q1 = 4.725, Median = 5.55, Q3 = 5.75, Upper = 8.7, Mean = 5.5 },
                new OzoneConcentration { Year = 1999, Lower = 3, Q1 = 4.375, Median = 4.95, Q3 = 5.85, Upper = 8, Mean = 5.2, Outliers = new List<double>() {3, 9.5}},
                new OzoneConcentration { Year = 2000, Lower = 2.5, Q1 = 3.925, Median = 4.15, Q3 = 4.45, Upper = 5.1, Mean = 4.1 },
                new OzoneConcentration { Year = 2001, Lower = 2.4, Q1 = 3.725, Median = 4.95, Q3 = 5.85, Upper = 7.7, Mean = 4.9, Outliers = new List<double>() {2.1, 8.3, 9.8}},
                new OzoneConcentration { Year = 2002, Lower = 1.7, Q1 = 2.3, Median = 3.9, Q3 = 5, Upper = 5.5, Mean = 3.7, Outliers = new List<double>() {1.1, 9.1}},
                new OzoneConcentration { Year = 2003, Lower = 2.2, Q1 = 2.5, Median = 3.1, Q3 = 3.975, Upper = 4.3, Mean = 3.2, Outliers = new List<double>() {1.6, 1.8, 9.8}},
                new OzoneConcentration { Year = 2004, Lower = 1.9, Q1 = 2.7, Median = 3.35, Q3 = 4.575, Upper = 5.7, Mean = 3.6, Outliers = new List<double>() {1.1, 8.3}},
                new OzoneConcentration { Year = 2005, Lower = 1.7, Q1 = 2.65, Median = 3.3, Q3 = 4.05, Upper = 5, Mean = 3.4 },
                new OzoneConcentration { Year = 2006, Lower = 1.4, Q1 = 2.25, Median = 3.3, Q3 = 4.65, Upper = 5.7, Mean = 3.4 },
                new OzoneConcentration { Year = 2007, Lower = 1.9, Q1 = 2.85, Median = 4, Q3 = 4.45, Upper = 6.1, Mean = 3.9, Outliers = new List<double>() {1, 1.2}},
                new OzoneConcentration { Year = 2008, Lower = 1.5, Q1 = 2.35, Median = 4.1, Q3 = 5.225, Upper = 5.7, Mean = 3.9, Outliers = new List<double>() {9, 9.5}},
                new OzoneConcentration { Year = 2009, Lower = 1.8, Q1 = 2.325, Median = 3.35, Q3 = 4, Upper = 5.4, Mean = 3.3, Outliers = new List<double>() {1, 6}},
                new OzoneConcentration { Year = 2010, Lower = 1.8, Q1 = 2.75, Median = 3.35, Q3 = 3.825, Upper = 4.9, Mean = 3.4 },
                new OzoneConcentration { Year = 2011, Lower = 1.7, Q1 = 2.275, Median = 3.2, Q3 = 3.825, Upper = 5.5, Mean = 3.2, Outliers = new List<double>() {0.5, 6.7}},
                new OzoneConcentration { Year = 2012, Lower = 1.2, Q1 = 1.95, Median = 2.45, Q3 = 3.075, Upper = 3.5, Mean = 2.5 },
                new OzoneConcentration { Year = 2013, Lower = 1.3, Q1 = 1.9, Median = 3.05, Q3 = 3.425, Upper = 4, Mean = 2.7, Outliers = new List<double>() {7, 8.5}}
            };
        }
    }
}
