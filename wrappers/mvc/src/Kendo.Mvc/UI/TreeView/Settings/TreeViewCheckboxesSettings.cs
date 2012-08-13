namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;

    public class TreeViewCheckboxesSettings : JsonObject
    {
        public TreeViewCheckboxesSettings()
        {
            Template = "<input type='checkbox' name='checkedNodes' #= item.checked ? 'checked' : '' # value='#= item.id #' />";
        }

        public bool Enabled { get; set; }

        public bool CheckChildren { get; set; }

        public object Template { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Enabled)
            {
                var options = new Dictionary<string, object>();

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
