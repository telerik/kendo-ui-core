
namespace KendoUI.Mvc.UI
{
    using System.Collections;
    using System.Web.Mvc;

    public interface IGridActionResultAdapter
    {
        IEnumerable GetDataSource();

        int GetTotal();

        ModelStateDictionary GetModelState();

        object GetAggregates();
    }
}
