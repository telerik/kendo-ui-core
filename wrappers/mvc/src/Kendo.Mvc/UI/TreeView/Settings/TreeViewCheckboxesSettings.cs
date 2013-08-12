namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;

    public class TreeViewCheckboxesSettings : JsonObject
    {
        public const string DefaultTemplate = "<input type='checkbox' name='#= treeview.checkboxes.name #' #= item.checked ? 'checked' : '' # value='#= item.id #' />";

        public TreeViewCheckboxesSettings()
        {
            Name = "checkedNodes";
            Template = DefaultTemplate;
        }

        public bool Enabled { get; set; }

        public bool CheckChildren { get; set; }

        public object Template { get; set; }

        public string Name { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Enabled)
            {
                var options = new Dictionary<string, object>();

                options["name"] = Name;
                options["template"] = Template;

                if (CheckChildren)
                {
                    options["checkChildren"] = true;
                }

                json["checkboxes"] = options;
            }
        }
    }
}
