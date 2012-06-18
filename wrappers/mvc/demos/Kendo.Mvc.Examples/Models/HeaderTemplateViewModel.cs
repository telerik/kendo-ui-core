using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Models
{
    public class HeaderTemplateViewModel
    {
        public IEnumerable<ProductViewModel> Products { get; set; }
        public IEnumerable<ProductViewModel> SelectedProducts { get; set; }
    }
}