// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using Telerik.Web.Mvc.Infrastructure;
    
    public class EditorComboBoxHtmlBuilder : HtmlBuilderBase
    {
        private readonly EditorComboBox comboBox;

        public EditorComboBoxHtmlBuilder(EditorComboBox comboBox)
        {
            this.comboBox = comboBox;
        }

        protected override IHtmlNode BuildCore()
        {
            var li = new HtmlElement("li")
                    .AddClass("t-editor-combobox");

            var builder = new ComboBoxHtmlBuilder(comboBox);

            IHtmlNode rootTag = builder.Build();

            rootTag.AppendTo(li);
            
            return li;
        }
    }
}
