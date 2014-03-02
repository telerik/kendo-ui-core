using System;
using System.Collections.Generic;
namespace Kendo.Mvc.Examples.Models
{
    public class DiagramNode
    {
        public DiagramNode()
        {
        }

        public DiagramNode(string name)
        {
            Name = name;
            Items = new List<DiagramNode>();
        }

        public string Name { get; set; }

        public List<DiagramNode> Items { get; set; }
    }
}