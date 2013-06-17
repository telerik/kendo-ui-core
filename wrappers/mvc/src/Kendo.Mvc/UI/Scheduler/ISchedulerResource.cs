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

        string Field
        {
            get;
        }

        string Title
        {
            get;
        }

        bool Multiple
        {
            get;
        }
    }
}
