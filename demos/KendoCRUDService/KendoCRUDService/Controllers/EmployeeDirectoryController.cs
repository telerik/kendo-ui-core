using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KendoCRUDService.Models;
using KendoCRUDService.Common;

namespace KendoCRUDService.Controllers
{
    public class EmployeeDirectoryController : Controller
    {
        public JsonResult All()
        {
            return this.Jsonp(EmployeeDirectoryRepository.All());
        }

        public JsonResult Index(int? id)
        {
            var employees = EmployeeDirectoryRepository.All();

            return this.Jsonp(
                employees
                    .Where(e => e.ReportsTo == id)
                    .Select(e => new {
                        EmployeeId = e.EmployeeId,
                        FirstName = e.FirstName,
                        LastName = e.LastName,
                        Position = e.Position,
                        Extension = e.Extension,
                        ReportsTo = e.ReportsTo,
                        hasChildren = employees.Where(s => s.ReportsTo == e.EmployeeId).Count() > 0
                    })
            );
        }

        public JsonResult Update()
        {
            var employees = this.DeserializeObject<IEnumerable<EmployeeDirectoryModel>>("models");

            if (employees != null)
            {
                foreach (var employee in employees)
                {
                    EmployeeDirectoryRepository.Update(employee);
                }
            }

            return this.Jsonp(employees);
        }

        public JsonResult Destroy()
        {
            var employees = this.DeserializeObject<IEnumerable<EmployeeDirectoryModel>>("models");

            if (employees != null)
            {
                foreach (var employee in employees)
                {
                    EmployeeDirectoryRepository.Delete(employee);
                }
            }

            return this.Jsonp(employees);
        }

        public JsonResult Create()
        {
            var employees = this.DeserializeObject<IEnumerable<EmployeeDirectoryModel>>("models");

            if (employees != null)
            {
                foreach (var employee in employees)
                {
                    EmployeeDirectoryRepository.Insert(employee);
                }
            }

            return this.Jsonp(employees);
        }
    }
}
