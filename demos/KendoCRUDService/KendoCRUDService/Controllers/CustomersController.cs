using System.Web.Mvc;
using KendoCRUDService.Models;
using KendoCRUDService.Common;

namespace KendoCRUDService.Controllers
{
    public class CustomersController : Controller
    {
        public ActionResult Index()
        {
            return this.Jsonp(CustomerRepository.All());
        }
    }
}
