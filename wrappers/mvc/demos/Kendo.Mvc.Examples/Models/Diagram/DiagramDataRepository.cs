using System.Collections.Generic;
using System;
using System.Linq;
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

            CorporateData diego = new CorporateData("Diego", "Roel", "diego.jpg", "QA Engineer", "#ee587b");
            antonio.Items.Add(diego);

            CorporateData fran = new CorporateData("Fran", "Wilson", "fran.jpg", "QA Intern", "#ee587b");
            diego.Items.Add(fran);

            CorporateData felipe = new CorporateData("Felipe", "Izquiedro", "felipe.jpg", "Senior Developer", "#75be16");
            antonio.Items.Add(felipe);

            CorporateData daniel = new CorporateData("Daniel", "Tonini", "daniel.jpg", "Developer", "#75be16");
            felipe.Items.Add(daniel);

            return result;
        }

        public static List<DiagramNode> DiagramNodes()
        {
            var result = new List<DiagramNode>();
            var root = new DiagramNode("0");
            result.Add(root);

            AddNodes(root, new int[] { 3, 2, 2 });

            return result;
        }

        private static void AddNodes(DiagramNode root, IEnumerable<int> levels)
        {
            if (levels.Any())
            {
                for (int i = 0; i < levels.First(); i++)
                {
                    var node = new DiagramNode(root.Name + "." + i);
                    root.Items.Add(node);

                    if (levels.Count() > 1)
                    {
                        AddNodes(node, levels.Skip(1));
                    }
                }
            }
        }
    }
}