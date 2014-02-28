using System.Web.Http.ModelBinding;

namespace Kendo.Mvc.UI
{
    public class WebApiDataSourceRequestAttribute : CustomModelBinderAttribute
    {
        public override IModelBinder GetBinder()
        {
            return new WebApiDataSourceRequestModelBinder();
        }
    }
}
