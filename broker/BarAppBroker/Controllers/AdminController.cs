using BarAppBroker.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace AdminAppBroker
{
    [Route("[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        const string fileName = "admins.json";
        readonly object _lockObj = new object();

        // GET: Admin
        [HttpGet()]
        public IEnumerable<Admin> Get()
        {
            lock (_lockObj)
            {
                var admins = GetAdmins().Result;
                Debug.WriteLine($"HTTP Get. Total: {admins.Count}");

                return admins;
            }
        }

        // GET: Admin/5
        [HttpGet("{id}")]
        public Admin Get(int id)
        {
            lock (_lockObj)
            {
                var admins = GetAdmins().Result;
                Debug.WriteLine($"HTTP Get: {id}. Total: {admins.Count}");

                var byId = admins.Where(admin => admin.Id == id);
                if (byId.Any())
                {
                    return byId.First();
                }
                else
                {
                    return new Admin()
                    {
                        Id = -1
                    };
                }
            }
        }

        // POST: Admin
        [HttpPost]
        public void Post([FromBody] Admin value)
        {
            lock (_lockObj)
            {
                var admins = GetAdmins().Result;

                Debug.WriteLine($"HTTP Post: {value}. Total: {admins.Count}");

                if (value.Id <= 1000)
                {
                    int maxId = admins.DefaultIfEmpty(new Admin() { Id = 1000 }).Max(admin => admin.Id) + 1;
                    value.Id = maxId;
                }

                if (!admins.Any(admin => admin.Id == value.Id))
                {
                    admins.Add(value);

                    UpdateAdmins(admins);
                }
            }
        }

        // PUT: Admin/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Admin value)
        {
            lock (_lockObj)
            {
                var admins = GetAdmins().Result;
                Debug.WriteLine($"HTTP Put: {id} {value}. Total: {admins.Count}");

                if (admins.Remove(admins.Single(admin => admin.Id == id)))
                {
                    admins.Add(value);
                }

                UpdateAdmins(admins);
            }
        }

        // DELETE: Admin/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            lock (_lockObj)
            {
                var admins = GetAdmins().Result;
                Debug.WriteLine($"HTTP Delete: {id}. Total: {admins.Count}");

                if (admins.Remove(admins.Single(admin => admin.Id == id)))
                {
                    UpdateAdmins(admins);
                }
            }
        }

        public static async Task<List<Admin>> GetAdmins()
        {
            List<Admin> admins;

            using (FileStream fs = System.IO.File.Open(fileName, FileMode.OpenOrCreate))
            {
                try
                {
                    admins = await JsonSerializer.DeserializeAsync<List<Admin>>(fs);
                }
                catch (Exception e)
                {
                    // The file was missing JSON tokens
                    admins = new List<Admin>();
                }
            }
            return admins;
        }

        public static void UpdateAdmins(List<Admin> admins)
        {
            string json = JsonSerializer.Serialize(admins);
            System.IO.File.WriteAllText(fileName, json);
        }
    }
}
