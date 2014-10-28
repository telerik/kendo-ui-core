using KendoCRUDService.Models.EF;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace KendoCRUDService.Models
{
    public static class DiagramConnectionsRepository
    {
        private static bool UpdateDatabase = false;

        public static IList<OrgChartConnections> All()
        {
            var result = HttpContext.Current.Session["OrgChartConnections"] as IList<OrgChartConnections>;

            if (result == null || UpdateDatabase)
            {
                using (SampleEntities context = new SampleEntities())
                {
                    result = context.OrgChartConnections.ToList();
                }

                HttpContext.Current.Session["OrgChartConnections"] = result;
            }

            return result;
        }

        public static OrgChartConnections One(Func<OrgChartConnections, bool> predicate)
        {
            return All().FirstOrDefault(predicate);
        }

        public static void Insert(IEnumerable<OrgChartConnections> shapes)
        {
            foreach (var shape in shapes)
            {
                Insert(shape);
            }
        }

        public static void Insert(OrgChartConnections shape)
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
                    db.OrgChartConnections.AddObject(shape);
                    db.SaveChanges();
                }
            }
        }

        public static void Update(IEnumerable<OrgChartConnections> shapes)
        {
            foreach (var shape in shapes)
            {
                Update(shape);
            }
        }

        public static void Update(OrgChartConnections shape)
        {
            if (!UpdateDatabase)
            {
                var target = One(e => e.Id == shape.Id);

                if (target != null)
                {
                    target.From = shape.From;
                    target.To = shape.To;
                    target.Text = shape.Text;
                }
            }
            else
            {
                using (var db = new SampleEntities())
                {
                    db.OrgChartConnections.Attach(shape);
                    db.ObjectStateManager.ChangeObjectState(shape, EntityState.Modified);
                    db.SaveChanges();
                }
            }
        }

        public static void Delete(IEnumerable<OrgChartConnections> shapes)
        {
            foreach (var shape in shapes)
            {
                Delete(shape);
            }
        }

        public static void Delete(OrgChartConnections shape)
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
                    db.OrgChartConnections.Attach(shape);
                    db.OrgChartConnections.DeleteObject(shape);
                    db.SaveChanges();
                }
            }
        }
    }
}