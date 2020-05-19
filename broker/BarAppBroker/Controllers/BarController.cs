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
    public class BarController : ControllerBase
    {
        const string fileName = "bars.json";
        readonly static object _lockObj = new object();

        // GET: Bar
        [HttpGet()]
        public IEnumerable<Bar> Get()
        {
            lock (_lockObj)
            {
                var bars = GetBars().Result;
                Debug.WriteLine($"HTTP Get. Total: {bars.Count}");

                return bars;
            }
        }

        // GET: Bar/5
        [HttpGet("{id}")]
        public Bar Get(int id)
        {
            lock (_lockObj)
            {
                var bars = GetBars().Result;
                Debug.WriteLine($"HTTP Get: {id}. Total: {bars.Count}");

                var byId = bars.Where(bar => bar.Id == id);
                if (byId.Any())
                {
                    return byId.First();
                }
                else
                {
                    return new Bar()
                    {
                        Id = -1
                    };
                }
            }
        }

        // POST: Bar
        [HttpPost]
        public void Post([FromBody] Bar value)
        {
            lock (_lockObj)
            {
                var bars = GetBars().Result;

                Debug.WriteLine($"HTTP Post: {value}. Total: {bars.Count}");

                if (value.Id <= 1000)
                {
                    int maxId = bars.DefaultIfEmpty(new Bar() { Id = 1000 }).Max(bar => bar.Id) + 1;
                    value.Id = maxId;
                }

                if (!bars.Any(bar => bar.Id == value.Id))
                {
                    bars.Add(value);

                    UpdateBars(bars);
                }
            }
        }

        // PUT: Bar/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Bar value)
        {
            lock (_lockObj)
            {
                var bars = GetBars().Result;
                Debug.WriteLine($"HTTP Put: {id} {value}. Total: {bars.Count}");

                if (bars.Remove(bars.Single(bar => bar.Id == id)))
                {
                    bars.Add(value);
                }

                UpdateBars(bars);
            }
        }

        // DELETE: Bar/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            lock (_lockObj)
            {
                var bars = GetBars().Result;
                Debug.WriteLine($"HTTP Delete: {id}. Total: {bars.Count}");

                if (bars.Remove(bars.Single(bar => bar.Id == id)))
                {
                    UpdateBars(bars);
                }
            }
        }

        public static async Task<List<Bar>> GetBars()
        {
            List<Bar> bars;

            using (FileStream fs = System.IO.File.Open(fileName, FileMode.OpenOrCreate))
            {
                try
                {
                    bars = await JsonSerializer.DeserializeAsync<List<Bar>>(fs);
                }
                catch (Exception e)
                {
                    // The file was missing JSON tokens
                    bars = new List<Bar>();
                }
            }
            return bars;
        }

        public static void UpdateBars(List<Bar> bars)
        {
            string json = JsonSerializer.Serialize(bars);
            System.IO.File.WriteAllText(fileName, json);
        }
    }
}
