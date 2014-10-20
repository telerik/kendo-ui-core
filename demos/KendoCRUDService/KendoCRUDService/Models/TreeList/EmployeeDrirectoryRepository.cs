using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using KendoCRUDService.Models.EF;

namespace KendoCRUDService.Models
{
    public static class EmployeeDirectoryRepository
    {
        private static bool UpdateDatabase = false;

        public static IList<EmployeeDirectoryModel> All()
        {
            var result = HttpContext.Current.Session["EmployeeDirectory"] as IList<EmployeeDirectoryModel>;

            if (result == null || UpdateDatabase)
            {
                using (var db = new SampleEntities())
                {
                    result = db.EmployeeDirectory.ToList().Select(employee => new EmployeeDirectoryModel
                    {
                        EmployeeId = employee.EmployeeID,
                        ReportsTo = employee.ReportsTo,
                        FirstName = employee.FirstName,
                        LastName = employee.LastName,
                        HireDate = employee.HireDate,
                        BirthDate = employee.BirthDate,
                        Phone = employee.Phone,
                        Extension = employee.Extension,
                        Address = employee.Address,
                        City = employee.City,
                        Country = employee.Country,
                        Position = employee.Position
                    }).ToList();
                }

                HttpContext.Current.Session["EmployeeDirectory"] = result;
            }

            return result;
        }
        
        public static EmployeeDirectoryModel One(Func<EmployeeDirectoryModel, bool> predicate)
        {
            return All().FirstOrDefault(predicate);
        }

        public static void Insert(EmployeeDirectoryModel employee)
        {
            if (!UpdateDatabase)
            {
                var first = All().OrderByDescending(e => e.EmployeeId).FirstOrDefault();

                var id = 0;

                if (first != null)
                {
                    id = first.EmployeeId;
                }

                employee.EmployeeId = id + 1;

                All().Insert(0, employee);
            }
            else
            {
                using (var db = new SampleEntities())
                {                    
                    var entity = employee.ToEntity();

                    db.EmployeeDirectory.AddObject(entity);
                    db.SaveChanges();

                    employee.EmployeeId = entity.EmployeeID;
                }
            }
        }

        public static void Update(EmployeeDirectoryModel employee)
        {
            if (!UpdateDatabase)
            {
                var target = One(e => e.EmployeeId == employee.EmployeeId);

                if (target != null)
                {
                    target.FirstName = employee.FirstName;
                    target.LastName = employee.LastName;
                    target.Address = employee.Address;
                    target.City = employee.City;
                    target.Country = employee.Country;
                    target.Phone = employee.Phone;
                    target.Extension = employee.Extension;
                    target.BirthDate = employee.BirthDate;
                    target.HireDate = employee.HireDate;
                    target.Position = employee.Position;
                    target.ReportsTo = employee.ReportsTo;
                }
            }
            else
            {
                using (var db = new SampleEntities())
                {
                    var entity = employee.ToEntity();
                    db.EmployeeDirectory.Attach(entity);
                    db.ObjectStateManager.ChangeObjectState(entity, EntityState.Modified);
                    db.SaveChanges();
                }
            }
        }

        public static void Delete(EmployeeDirectoryModel employee)
        {
            if (!UpdateDatabase)
            {
                var target = One(p => p.EmployeeId == employee.EmployeeId);
                if (target != null)
                {
                    All().Remove(target);

                    var employees = All().Where(m => m.ReportsTo == employee.EmployeeId).ToList();

                    foreach (var subordinate in employees)
                    {
                        Delete(subordinate);
                    }
                }
            }
            else
            {
                using (var db = new SampleEntities())
                {
                    var entity = employee.ToEntity();
                    db.EmployeeDirectory.Attach(entity);

                    var employees = db.EmployeeDirectory.Where(t => t.ReportsTo == employee.EmployeeId);

                    foreach (var subordinate in employees)
                    {
                        Delete(new EmployeeDirectoryModel { EmployeeId = subordinate.EmployeeID });
                    }

                    db.EmployeeDirectory.DeleteObject(entity);
                    db.SaveChanges();
                }
            }
        }
    }
}