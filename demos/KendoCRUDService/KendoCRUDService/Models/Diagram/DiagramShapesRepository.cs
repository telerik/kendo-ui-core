using KendoCRUDService.Models.EF;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace KendoCRUDService.Models
{
    public static class DiagramShapesRepository
    {
        private static bool UpdateDatabase = false;
        
        public static IList<OrgChartShapes> All()
        {
            var result = HttpContext.Current.Session["OrgChartShapes"] as IList<OrgChartShapes>;

            if (result == null || UpdateDatabase)
            {
                using (SampleEntities context = new SampleEntities())
                {
                    result = context.OrgChartShapes.ToList();
                }

                HttpContext.Current.Session["OrgChartShapes"] = result;
            }

            return result;
        }

        public static OrgChartShapes One(Func<OrgChartShapes, bool> predicate)
        {
            return All().FirstOrDefault(predicate);
        }

        public static void Insert(IEnumerable<OrgChartShapes> shapes)
        {
            foreach (var shape in shapes)
            {
                Insert(shape);
            }
        }

        public static void Insert(OrgChartShapes shape)
        {
            if (!UpdateDatabase)
            {
                var first = All().OrderByDescending(e => e.Id).FirstOrDefault();

                var id = 0;

                if (first != null)
                {
                    id = first.Id;
                }

                shape.Id = id + 1;

                All().Insert(0, shape);
            }
            else
            {
                using (var db = new SampleEntities())
                {
                    db.OrgChartShapes.AddObject(shape);
                    db.SaveChanges();
                }
            }
        }

        public static void Update(IEnumerable<OrgChartShapes> shapes)
        {
            foreach (var shape in shapes)
            {
                Update(shape);
            }
        }

        public static void Update(OrgChartShapes shape)
        {
            if (!UpdateDatabase)
            {
                var target = One(e => e.Id == shape.Id);

                if (target != null)
                {
                    target.Title = shape.Title;
                    target.ColorScheme = shape.ColorScheme;
                    target.FirstName = shape.FirstName;
                    target.LastName = shape.LastName;
                    target.Image = shape.Image;
                }
            }
            else
            {
                using (var db = new SampleEntities())
                {
                    db.OrgChartShapes.Attach(shape);
                    db.ObjectStateManager.ChangeObjectState(shape, EntityState.Modified);
                    db.SaveChanges();
                }
            }
        }

        public static void Delete(IEnumerable<OrgChartShapes> shapes)
        {
            foreach (var shape in shapes)
            {
                Delete(shape);
            }
        }

        public static void Delete(OrgChartShapes shape)
        {
            if (!UpdateDatabase)
            {
                var target = One(p => p.Id == shape.Id);
                if (target != null)
                {
                    All().Remove(target);
                }
            }
            else
            {
                using (var db = new SampleEntities())
                {
                    db.OrgChartShapes.Attach(shape);
                    db.OrgChartShapes.DeleteObject(shape);
                    db.SaveChanges();
                }
            }
        }
    }
}