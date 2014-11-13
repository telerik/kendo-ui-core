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

        public static IList<OrgChartConnection> All()
        {
            var result = HttpContext.Current.Session["OrgChartConnections"] as IList<OrgChartConnection>;

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

        public static OrgChartConnection One(Func<OrgChartConnection, bool> predicate)
        {
            return All().FirstOrDefault(predicate);
        }

        public static void Insert(IEnumerable<OrgChartConnection> connections)
        {
            foreach (var connection in connections)
            {
                Insert(connection);
            }
        }

        public static void Insert(OrgChartConnection connection)
        {
            if (!UpdateDatabase)
            {
                var first = All().OrderByDescending(e => e.Id).FirstOrDefault();

                var id = 0;

                if (first != null)
                {
                    id = first.Id;
                }

                connection.Id = id + 1;

                All().Insert(0, connection);
            }
            else
            {
                using (var db = new SampleEntities())
                {
                    db.OrgChartConnections.AddObject(connection);
                    db.SaveChanges();
                }
            }
        }

        public static void Update(IEnumerable<OrgChartConnection> connections)
        {
            foreach (var connection in connections)
            {
                Update(connection);
            }
        }

        public static void Update(OrgChartConnection connection)
        {
            if (!UpdateDatabase)
            {
                var target = One(e => e.Id == connection.Id);

                if (target != null)
                {
                    target.FromShapeId = connection.FromShapeId;
                    target.ToShapeId = connection.ToShapeId;
                    target.Text = connection.Text;
                    target.FromPointX = connection.FromPointX;
                    target.FromPointY = connection.FromPointY;
                    target.ToPointX = connection.ToPointX;
                    target.ToPointY = connection.ToPointY;
                }
            }
            else
            {
                using (var db = new SampleEntities())
                {
                    db.OrgChartConnections.Attach(connection);
                    db.ObjectStateManager.ChangeObjectState(connection, EntityState.Modified);
                    db.SaveChanges();
                }
            }
        }

        public static void Delete(IEnumerable<OrgChartConnection> connections)
        {
            foreach (var connection in connections)
            {
                Delete(connection);
            }
        }

        public static void Delete(OrgChartConnection connection)
        {
            if (!UpdateDatabase)
            {
                var target = One(p => p.Id == connection.Id);
                if (target != null)
                {
                    All().Remove(target);
                }
            }
            else
            {
                using (var db = new SampleEntities())
                {
                    db.OrgChartConnections.Attach(connection);
                    db.OrgChartConnections.DeleteObject(connection);
                    db.SaveChanges();
                }
            }
        }
    }
}