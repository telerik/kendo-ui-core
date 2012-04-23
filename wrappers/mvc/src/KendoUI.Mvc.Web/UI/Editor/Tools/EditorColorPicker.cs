// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;
    using Telerik.Web.Mvc.Extensions;
    using Telerik.Web.Mvc.UI.Html;

    public class EditorColorPicker : IEditorTool
    {
        public EditorColorPicker(string identifier)
        {
            Identifier = identifier.ToCamelCase();
            HtmlAttributes = new Dictionary<string, object>() { { "class", "t-" + Identifier } };
        }

        public string Identifier { get; private set; }

        public IDictionary<string, object> HtmlAttributes { get; private set; }

        public IHtmlBuilder CreateHtmlBuilder()
        {
            return new EditorColorPickerHtmlBuilder(this);
        }
    }
}
