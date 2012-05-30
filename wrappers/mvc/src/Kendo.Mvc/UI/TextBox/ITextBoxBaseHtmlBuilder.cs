namespace KendoUI.Mvc.UI
{

    public interface ITextBoxBaseHtmlBuilder
    {
        IHtmlNode Build(string objectName);

        IHtmlNode InputTag();

        IHtmlNode UpButtonTag();

        IHtmlNode DownButtonTag();
    }
}
