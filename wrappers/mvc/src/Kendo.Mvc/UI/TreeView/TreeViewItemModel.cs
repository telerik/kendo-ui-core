namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    /// <summary>
    /// Used for serializing <see cref="TreeViewItem"/> objects.
    /// </summary>
    public class TreeViewItemModel : IHierarchicalItem
    {
        public TreeViewItemModel()
        {
            this.Enabled = true;
            this.Encoded = true;
            this.Items = new List<TreeViewItemModel>();
            this.HtmlAttributes = new Dictionary<string, string>();
            this.ImageHtmlAttributes = new Dictionary<string, string>();
        }

        public bool Enabled { get; set; }

        public bool Expanded { get; set; }

        public bool Encoded { get; set; }

        public string Text { get; set; }

        public string Id { get; set; }

        public string Url { get; set; }

        public string ImageUrl { get; set; }

        public bool HasChildren { get; set; }

        public bool Checked { get; set; }

        public List<TreeViewItemModel> Items { get; set; }

        public IDictionary<string, string> HtmlAttributes { get; set; }

        public IDictionary<string, string> ImageHtmlAttributes { get; set; }
    }
}