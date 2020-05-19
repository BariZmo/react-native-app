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
    public class ReservationController : ControllerBase
    {
        const string fileName = "reservations.json";
        readonly static object _lockObj = new object();

        // GET: Reservation
        [HttpGet]
        public IEnumerable<Reservation> Get()
        {
            lock (_lockObj)
            {
                var reservations = GetReservations().Result;
                Debug.WriteLine($"HTTP Get. Total: {reservations.Count}");

                return reservations;
            }
        }

        // GET: Reservation/5
        [HttpGet("{id}")]
        public Reservation Get(int id)
        {
            lock (_lockObj)
            {
                var reservations = GetReservations().Result;
                Debug.WriteLine($"HTTP Get: {id}. Total: {reservations.Count}");

                var byId = reservations.Where(reservation => reservation.Id == id);
                if (byId.Any())
                {
                    return byId.First();
                }
                else
                {
                    return new Reservation()
                    {
                        Id = -1
                    };
                }
            }
        }

        // POST: Reservation
        [HttpPost]
        public void Post([FromBody] Reservation value)
        {
            lock (_lockObj)
            {
                var reservations = GetReservations().Result;

                Debug.WriteLine($"HTTP Post: {value}. Total: {reservations.Count}");

                if (value.Id <= 1000)
                {
                    int maxId = reservations.DefaultIfEmpty(new Reservation() { Id = 1000 }).Max(reservation => reservation.Id) + 1;
                    value.Id = maxId;
                }

                if (!reservations.Any(reservation => reservation.Id == value.Id))
                {
                    reservations.Add(value);

                    UpdateReservations(reservations);
                }
            }
        }

        // PUT: Reservation/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Reservation value)
        {
            lock (_lockObj)
            {
                var reservations = GetReservations().Result;
                Debug.WriteLine($"HTTP Put: {id} {value}. Total: {reservations.Count}");

                if (reservations.Remove(reservations.Single(reservation => reservation.Id == id)))
                {
                    reservations.Add(value);
                }

                UpdateReservations(reservations);
            }
        }

        // DELETE: Reservation/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            lock (_lockObj)
            {
                var reservations = GetReservations().Result;
                Debug.WriteLine($"HTTP Delete: {id}. Total: {reservations.Count}");

                if (reservations.Remove(reservations.Single(reservation => reservation.Id == id)))
                {
                    UpdateReservations(reservations);
                }
            }
        }

        public static async Task<List<Reservation>> GetReservations()
        {
            List<Reservation> reservations;

            using (FileStream fs = System.IO.File.Open(fileName, FileMode.OpenOrCreate))
            {
                try
                {
                    reservations = await JsonSerializer.DeserializeAsync<List<Reservation>>(fs);
                }
                catch (Exception e)
                {
                    // The file was missing JSON tokens
                    reservations = new List<Reservation>();
                }
            }
            return reservations;
        }

        public static void UpdateReservations(List<Reservation> reservations)
        {
            string json = JsonSerializer.Serialize(reservations);
            System.IO.File.WriteAllText(fileName, json);
        }
    }
}
