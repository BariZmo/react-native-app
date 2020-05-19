using BarAppBroker.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace BarAppBroker
{
    [Route("[controller]")]
    [ApiController]
    public class VisitController : ControllerBase
    {
        const string fileName = "visits.json";
        readonly static object _lockObj = new object();

        // GET: Visit
        [HttpGet]
        public IEnumerable<Visit> Get()
        {
            lock (_lockObj)
            {
                var visits = GetVisits().Result;
                Debug.WriteLine($"HTTP Get. Total: {visits.Count}");

                return visits;
            }
        }

        // GET: Visit/5
        [HttpGet("{id}")]
        public Visit Get(int id)
        {
            lock (_lockObj)
            {
                var visits = GetVisits().Result;
                Debug.WriteLine($"HTTP Get: {id}. Total: {visits.Count}");

                var byId = visits.Where(visit => visit.Id == id);
                if (byId.Any())
                {
                    return byId.First();
                }
                else
                {
                    return new Visit()
                    {
                        Id = -1
                    };
                }
            }
        }

        // POST: Visit
        [HttpPost]
        public void Post([FromBody] Visit value)
        {
            lock (_lockObj)
            {
                var visits = GetVisits().Result;

                Debug.WriteLine($"HTTP Post: {value}. Total: {visits.Count}");

                if (value.Id <= 1000)
                {
                    int maxId = visits.DefaultIfEmpty(new Visit() { Id = 1000 }).Max(visit => visit.Id) + 1;
                    value.Id = maxId;
                }

                if (!visits.Any(visit => visit.Id == value.Id))
                {
                    visits.Add(value);

                    UpdateVisits(visits);
                }
            }
        }

        // PUT: Visit/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Visit value)
        {
            lock (_lockObj)
            {
                var visits = GetVisits().Result;
                Debug.WriteLine($"HTTP Put: {id} {value}. Total: {visits.Count}");

                if (visits.Remove(visits.Single(visit => visit.Id == id)))
                {
                    visits.Add(value);
                }

                UpdateVisits(visits);
            }
        }

        // DELETE: Visit/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            lock (_lockObj)
            {
                var visits = GetVisits().Result;
                Debug.WriteLine($"HTTP Delete: {id}. Total: {visits.Count}");

                if (visits.Remove(visits.Single(visit => visit.Id == id)))
                {
                    UpdateVisits(visits);
                }
            }
        }

        public static async Task<List<Visit>> GetVisits()
        {
            List<Visit> visits;

            using (FileStream fs = System.IO.File.Open(fileName, FileMode.OpenOrCreate))
            {
                try
                {
                    visits = await JsonSerializer.DeserializeAsync<List<Visit>>(fs);
                }
                catch (Exception e)
                {
                    // The file was missing JSON tokens
                    visits = new List<Visit>();
                }
            }
            return visits;
        }

        public static void UpdateVisits(List<Visit> visits)
        {
            string json = JsonSerializer.Serialize(visits);
            System.IO.File.WriteAllText(fileName, json);
        }
    }
}
