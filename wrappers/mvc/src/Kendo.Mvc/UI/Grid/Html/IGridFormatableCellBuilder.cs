namespace Kendo.Mvc.UI.Html
{
    public interface IGridFormatableCellBuilder
    {
        string Format
        {
            get;
            set;
        }

        bool Encoded
        {
            get;
            set;
        }
    }
}