namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    /// <summary>
    /// Represents an item from Kendo TreeView for ASP.NET MVC
    /// </summary>
    public class TreeViewItem : NavigationItem<TreeViewItem>, INavigationItemContainer<TreeViewItem>, IHierarchicalItem
    {
        public TreeViewItem()
        {
            this.Items = new LinkedObjectCollection<TreeViewItem>(this);
        }

        public IList<TreeViewItem> Items
        {
            get;
            private set;
        }

        public string Id { get; set; }

        public bool Expanded { get; set; }

        public bool HasChildren { get; set; }

        public bool Checked { get; set; }

        private void Serialize<T>(IDictionary<string, object> json, string field, T value, T defaultValue)
             where T : IComparable<T>
        {
            if ((value == null && defaultValue != null) || (value != null && value.CompareTo(defaultValue) != 0))
            {
                json[field] = value;
            }
        }

        public IDictionary<string, object> Serialize()
        {
            var json = new Dictionary<string, object>();

            json["id"] = this.Id;
            json["text"] = this.Text;

            Serialize(json, "hasChildren", this.HasChildren, false);
            Serialize(json, "encoded", this.Encoded, true);
            Serialize(json, "expanded", this.Expanded, false);
            Serialize(json, "checked", this.Checked, false);
            Serialize(json, "selected", this.Selected, false);
            Serialize(json, "imageUrl", this.ImageUrl, null);
            Serialize(json, "url", this.Url, null);
            Serialize(json, "spriteCssClass", this.SpriteCssClasses, null);

            if (Items.Count > 0)
            {
                json["items"] = from item in Items select item.Serialize();
            }

            return json;
        }
    }
}