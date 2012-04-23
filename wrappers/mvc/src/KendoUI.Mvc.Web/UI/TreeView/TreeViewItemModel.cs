// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;

    public class TreeViewItemModel : ITreeViewItem
    {
        public TreeViewItemModel()
        {
            this.Enabled = true;
            this.Encoded = true;
            this.Checkable = true;
            this.Items = new List<TreeViewItemModel>();
            this.HtmlAttributes = new Dictionary<string, string>();
            this.ImageHtmlAttributes = new Dictionary<string, string>();
        }

        public bool Enabled { get; set; }

        public bool Expanded { get; set; }

        public bool LoadOnDemand { get; set; }

        public bool Checked { get; set; }

        public bool Checkable { get; set; }

        public bool Encoded { get; set; }

        public string Text { get; set; }

        public string Value { get; set; }

        public string NavigateUrl { get; set; }

        public string ImageUrl { get; set; }

        public List<TreeViewItemModel> Items { get; set; }

        public IDictionary<string, string> HtmlAttributes { get; set; }

        public IDictionary<string, string> ImageHtmlAttributes { get; set; }
    }
}