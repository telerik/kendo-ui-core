

namespace KendoUI.Mvc.UI.Html
{
    using KendoUI.Mvc.Infrastructure;
    
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
