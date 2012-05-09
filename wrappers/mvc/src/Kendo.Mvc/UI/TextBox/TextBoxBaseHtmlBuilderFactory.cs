namespace KendoUI.Mvc.UI
{
    public class TextBoxBaseHtmlBuilderFactory<T> : ITextBoxBaseHtmlBuilderFactory<T> where T : struct
    {
        public ITextBoxBaseHtmlBuilder Create(TextBoxBase<T> input)
        {
            return new TextBoxBaseHtmlBuilder<T>(input);
        }
    }
}