using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kendo.Mvc.Examples.Models
{
    public class ClientTreeViewItemModel

    {
        public string id { get; set; }
        public string text { get; set; }
        public string spriteCssClass { get; set; }
        public string imageUrl { get; set; }
        public bool expanded { get; set; }
        public bool hasChildren { get; set; }
        public IEnumerable<ClientTreeViewItemModel> items { get; set; }

        public ClientTreeViewItemModel Clone()
        {
            ClientTreeViewItemModel clone = new ClientTreeViewItemModel
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