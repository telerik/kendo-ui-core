using System;
using System.Linq;

namespace KendoCRUDService.Models
{
    public class EmployeeModel
    {
        public int? EmployeeId { get; set; }
        public string FullName { get; set; }
        public bool HasEmployees { get; set; }
        public int? ReportsTo { get; set; }
    }
}