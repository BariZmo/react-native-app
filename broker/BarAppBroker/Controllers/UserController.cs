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
    public class UserController : ControllerBase
    {
        const string fileName = "users.json";
        readonly static object _lockObj = new object();

        // GET: User
        [HttpGet]
        public IEnumerable<User> Get()
        {
            lock (_lockObj)
            {
                var users = GetUsers().Result;
                Debug.WriteLine($"HTTP Get. Total: {users.Count}");

                return users;
            }
        }

        // GET: User/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            lock (_lockObj)
            {
                var users = GetUsers().Result;
                Debug.WriteLine($"HTTP Get: {id}. Total: {users.Count}");

                var byId = users.Where(user => user.Id == id);
                if (byId.Any())
                {
                    return byId.First();
                }
                else
                {
                    return new User()
                    {
                        Id = -1
                    };
                }
            }
        }

        // POST: User
        [HttpPost]
        public void Post([FromBody] User value)
        {
            lock (_lockObj)
            {
                var users = GetUsers().Result;

                Debug.WriteLine($"HTTP Post: {value}. Total: {users.Count}");

                if (value.Id <= 1000)
                {
                    int maxId = users.DefaultIfEmpty(new User() { Id = 1000 }).Max(user => user.Id) + 1;
                    value.Id = maxId;
                }

                if (!users.Any(user => user.Id == value.Id))
                {
                    users.Add(value);

                    UpdateUsers(users);
                }
            }
        }

        // PUT: User/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] User value)
        {
            lock (_lockObj)
            {
                var users = GetUsers().Result;
                Debug.WriteLine($"HTTP Put: {id} {value}. Total: {users.Count}");

                if (users.Remove(users.Single(user => user.Id == id)))
                {
                    users.Add(value);
                }

                UpdateUsers(users);
            }
        }

        // DELETE: User/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            lock (_lockObj)
            {
                var users = GetUsers().Result;
                Debug.WriteLine($"HTTP Delete: {id}. Total: {users.Count}");

                if (users.Remove(users.Single(user => user.Id == id)))
                {
                    UpdateUsers(users);
                }
            }
        }

        public static async Task<List<User>> GetUsers()
        {
            List<User> users;

            using (FileStream fs = System.IO.File.Open(fileName, FileMode.OpenOrCreate))
            {
                try
                {
                    users = await JsonSerializer.DeserializeAsync<List<User>>(fs);
                }
                catch (Exception e)
                {
                    // The file was missing JSON tokens
                    users = new List<User>();
                }
            }
            return users;
        }

        public static void UpdateUsers(List<User> users)
        {
            string json = JsonSerializer.Serialize(users);
            System.IO.File.WriteAllText(fileName, json);
        }
    }
}
