// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Telerik.Web.Mvc.Extensions;
    using Telerik.Web.Mvc.UI.Html;

    public class EditorDropDown : IEditorListTool, IDropDownRenderable
    {
        public EditorDropDown(string identifier, IList<DropDownItem> items)
        {
            Items = items;
            Identifier = identifier.ToCamelCase();
            HtmlAttributes = new Dictionary<string, object>() { { "class", "t-" + Identifier } };
            Enabled = true;
            Encoded = true;
        }

        public string Identifier { get; set; }

        public ViewContext ViewContext { get; private set; }

        string IViewComponent.Id { get { return ""; } }
        string IViewComponent.Name { get { return ""; } }
        public IDictionary<string, object> HtmlAttributes { get; private set; }
        public IDictionary<string, object> HiddenInputHtmlAttributes { get; private set; }

        public IList<DropDownItem> Items
        {
            get;
            set;
        }

        public int SelectedIndex { get; set; }
        public string Value { get; set; }
        public bool Enabled { get; set; }
        public bool Encoded { get; set; }

        public IHtmlBuilder CreateHtmlBuilder()
        {
            return new EditorDropDownHtmlBuilder(this);
        }
    }
}