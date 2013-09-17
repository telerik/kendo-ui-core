using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kendo.Mvc.Examples.Models
{
    public class TreeViewItemViewModel

    {
        public string id { get; set; }
        public string text { get; set; }
        public string spriteCssClass { get; set; }
        public string imageUrl { get; set; }
        public bool expanded { get; set; }
        public bool hasChildren { get; set; }
        public IEnumerable<TreeViewItemViewModel> items { get; set; }

        public TreeViewItemViewModel Clone()
        {
            TreeViewItemViewModel clone = new TreeViewItemViewModel
                {
                    id = this.id,
                    imageUrl = this.imageUrl,
                    spriteCssClass = this.spriteCssClass,
                    text = this.text,
                    expanded = this.expanded,
                    hasChildren = this.hasChildren
                };
            return clone;            
        }
    }
}