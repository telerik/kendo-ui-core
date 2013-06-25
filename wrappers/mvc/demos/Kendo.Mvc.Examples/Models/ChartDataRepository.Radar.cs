using System.Collections.Generic;
using System;

namespace Kendo.Mvc.Examples.Models
{
    public partial class ChartDataRepository
    {
        public static IList<BudgetReportItem> BudgetReport() 
        {
            List<BudgetReportItem> result = new List<BudgetReportItem>();
            result.Add(new BudgetReportItem("Sales", 40000, 52800));
            result.Add(new BudgetReportItem("Marketing", 20000, 42000));
            result.Add(new BudgetReportItem("Development", 60000, 21400));
            result.Add(new BudgetReportItem("Customer Support", 30000, 28500));
            result.Add(new BudgetReportItem("IT", 25000, 18900));
            result.Add(new BudgetReportItem("Administration", 10000, 11100));

            return result;
        }

        public static List<ProteinScoreItem> ProteinQualityData()
        {
            List<ProteinScoreItem> result = new List<ProteinScoreItem>();
            result.Add(new ProteinScoreItem("Tryptophan", "Trp", 3));
            result.Add(new ProteinScoreItem("Threonine", "Thr", 4));
            result.Add(new ProteinScoreItem("Isoleucine", "Iso", 5));
            result.Add(new ProteinScoreItem("Leucine", "Leu", 5));
            result.Add(new ProteinScoreItem("Lysine", "Lys", 5));
            result.Add(new ProteinScoreItem("Methionine + Cystine", "M+C", 2));
            result.Add(new ProteinScoreItem("Phenylalanine + Tyrosine", "p+T", 3));
            result.Add(new ProteinScoreItem("Valine", "Val", 5));
            result.Add(new ProteinScoreItem("Histidine", "Hys", 4));

            return result;
        }
    }
}