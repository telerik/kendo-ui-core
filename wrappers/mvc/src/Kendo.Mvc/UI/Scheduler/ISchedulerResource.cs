namespace Kendo.Mvc.UI
{
    public interface ISchedulerResource<TModel> 
        where TModel : class
    {
        //TODO: Update the interface
        DataSource DataSource
        {
            get;
        }

        string Title
        {
            get;
        }

        string Field
        {
            get;
        }

        bool Multiple
        {
            get;
        }

        string DataTextField
        {
            get;
        }

        string DataValueField
        {
            get;
        }

        string DataColorField
        {
            get;
        }
    }
}
