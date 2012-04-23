// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;
    using Telerik.Web.Mvc.UI.Html;
    
    public class EditorCustomTool : IEditorTool
    {
        public EditorCustomTool()
        {
            HtmlAttributes = new Dictionary<string, object>();
            Template = new HtmlTemplate();
        }

        public HtmlTemplate Template
        {
            get;
            private set;
        }

        public IDictionary<string, object> HtmlAttributes
        {
            get;
            private set;
        }
        
        public IHtmlBuilder CreateHtmlBuilder()
        {
            return new EditorCustomToolHtmlBuilder(this);
        }
    }
}
