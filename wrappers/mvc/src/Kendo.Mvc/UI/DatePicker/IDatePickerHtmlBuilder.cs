namespace Kendo.Mvc.UI
{

    public interface IDatePickerHtmlBuilder
    {
        IHtmlNode Build();

        IHtmlNode InputTag();

        IHtmlNode ButtonTag();
    }
}
