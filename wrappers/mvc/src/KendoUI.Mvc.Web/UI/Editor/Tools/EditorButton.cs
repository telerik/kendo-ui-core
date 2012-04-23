// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace KendoUI.Mvc.UI
{
    using KendoUI.Mvc.Extensions;
    using KendoUI.Mvc.Infrastructure;
    using KendoUI.Mvc.UI.Html;
    
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
