namespace Kendo.Mvc.Examples.Controllers
{
    using Kendo.Mvc.Examples.Models;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;

    public partial class ComboBoxController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetListItems()
        {
            var products = new NorthwindDataContext().Products.AsQueryable();
            var value = this.ValueProvider.GetValue("filter");

            if (value != null)
            {
                IList<IFilterDescriptor> filters = FilterDescriptorFactory.Create((string)value.ConvertTo(typeof(string)));
                if (filters.Any())
                {
                    products = products.Where(filters).Cast<Product>();
                }
            }

            return Json(products);
        }
    }
}