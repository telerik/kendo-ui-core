namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring template columns
    /// </summary>
    public class GridTemplateColumnBuilder<T> : GridColumnBuilderBase<IGridTemplateColumn<T>, GridTemplateColumnBuilder<T>>
        where T : class
    {
        public GridTemplateColumnBuilder(IGridTemplateColumn<T> column) : base(column)
        {
        }

        public virtual GridTemplateColumnBuilder<T> ClientTemplate(string value)
        {
            Column.ClientTemplate = value;

            return this;
        }
    }
}