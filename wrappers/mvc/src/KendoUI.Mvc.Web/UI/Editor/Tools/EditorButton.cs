// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI
{
    using Telerik.Web.Mvc.Extensions;
    using Telerik.Web.Mvc.Infrastructure;
    using Telerik.Web.Mvc.UI.Html;
    
    public class EditorButton : IEditorTool
    {
        public EditorButton(string text)
        {
            Guard.IsNotNullOrEmpty(text, "text");

            Text = text.ToCamelCase();
            CssClass = "t-" + Text;
        }

        public string Text
        {
            get;
            set;
        }
        
        public string CssClass
        {
            get;
            set;
        }

        public IHtmlBuilder CreateHtmlBuilder()
        {
            return new EditorButtonHtmlBuilder(this);
        }
    }
}
