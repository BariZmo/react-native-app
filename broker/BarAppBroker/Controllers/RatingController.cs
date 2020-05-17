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
    public class RatingController : ControllerBase
    {
        const string fileName = "ratings.json";
        readonly object _lockObj = new object();

        // GET: Rating
        [HttpGet]
        public IEnumerable<Rating> Get()
        {
            lock (_lockObj)
            {
                var ratings = GetRatings().Result;
                Debug.WriteLine($"HTTP Get. Total: {ratings.Count}");

                return ratings;
            }
        }

        // GET: Rating/5
        [HttpGet("{id}")]
        public Rating Get(int id)
        {
            lock (_lockObj)
            {
                var ratings = GetRatings().Result;
                Debug.WriteLine($"HTTP Get: {id}. Total: {ratings.Count}");

                var byId = ratings.Where(rating => rating.Id == id);
                if (byId.Any())
                {
                    return byId.First();
                }
                else
                {
                    return new Rating()
                    {
                        Id = -1
                    };
                }
            }
        }

        // POST: Rating
        [HttpPost]
        public void Post([FromBody] Rating value)
        {
            lock (_lockObj)
            {
                var ratings = GetRatings().Result;

                Debug.WriteLine($"HTTP Post: {value}. Total: {ratings.Count}");

                if (value.Id <= 1000)
                {
                    int maxId = ratings.DefaultIfEmpty(new Rating() { Id = 1000 }).Max(rating => rating.Id) + 1;
                    value.Id = maxId;
                }

                if (!ratings.Any(rating => rating.Id == value.Id))
                {
                    ratings.Add(value);

                    UpdateRatings(ratings);
                }
            }
        }

        // PUT: Rating/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Rating value)
        {
            lock (_lockObj)
            {
                var ratings = GetRatings().Result;
                Debug.WriteLine($"HTTP Put: {id} {value}. Total: {ratings.Count}");

                if (ratings.Remove(ratings.Single(rating => rating.Id == id)))
                {
                    ratings.Add(value);
                }

                UpdateRatings(ratings);
            }
        }

        // DELETE: Rating/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            lock (_lockObj)
            {
                var ratings = GetRatings().Result;
                Debug.WriteLine($"HTTP Delete: {id}. Total: {ratings.Count}");

                if (ratings.Remove(ratings.Single(rating => rating.Id == id)))
                {
                    UpdateRatings(ratings);
                }
            }
        }

        public static async Task<List<Rating>> GetRatings()
        {
            List<Rating> ratings;

            using (FileStream fs = System.IO.File.Open(fileName, FileMode.OpenOrCreate))
            {
                try
                {
                    ratings = await JsonSerializer.DeserializeAsync<List<Rating>>(fs);
                }
                catch (Exception e)
                {
                    // The file was missing JSON tokens
                    ratings = new List<Rating>();
                }
            }
            return ratings;
        }

        public static void UpdateRatings(List<Rating> ratings)
        {
            string json = JsonSerializer.Serialize(ratings);
            System.IO.File.WriteAllText(fileName, json);
        }
    }
}
