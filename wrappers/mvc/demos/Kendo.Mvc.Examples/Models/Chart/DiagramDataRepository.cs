using System.Collections.Generic;
using System;
using Kendo.Mvc.Examples.Models.Chart;

namespace Kendo.Mvc.Examples.Models
{
    public partial class DiagramDataRepository
    {
        public static List<CorporateData> OrgChart()
        {
            List<CorporateData> result = new List<CorporateData>();
            CorporateData antonio = new CorporateData("Antonio", "Moreno", "antonio.jpg", "Team Lead", "#1696d3");
            result.Add(antonio);

            CorporateData elizabeth = new CorporateData("Elizabeth", "Brown", "elizabeth.jpg", "Design Lead", "#ef6944");
            antonio.Items.Add(elizabeth);

            CorporateData ann = new CorporateData("Ann", "Devon", "ann.jpg", "UI Designer", "#ef6944");
            elizabeth.Items.Add(ann);

            CorporateData fran = new CorporateData("Fran", "Wilson", "fran.jpg", "Design Intern", "#ef6944");
            elizabeth.Items.Add(fran);

            CorporateData diego = new CorporateData("Diego", "Roel", "diego.jpg", "QA Engineer", "#ee587b");
            antonio.Items.Add(diego);

            CorporateData felipe = new CorporateData("Felipe", "Izquiedro", "felipe.jpg", "Senior Developer", "#75be16");
            antonio.Items.Add(felipe);

            CorporateData daniel = new CorporateData("Daniel", "Tonini", "daniel.jpg", "Developer", "#75be16");
            felipe.Items.Add(daniel);

            return result;
        }
    }
}