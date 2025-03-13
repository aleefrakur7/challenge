using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

[Route("api/reservations")]
[ApiController]
public class ReservationsController : ControllerBase
{
    private static List<Reservation> reservations = new();

    [HttpGet]
    public async Task<IActionResult> GetReservations()
    {
        return await Task.FromResult(Ok(reservations)); 
    }

    [HttpPost]
    public async Task<IActionResult> CreateReservation([FromBody] Reservation reservation)
    {
        if (string.IsNullOrEmpty(reservation.Client) || 
            string.IsNullOrEmpty(reservation.Service) || 
            string.IsNullOrEmpty(reservation.Date) || 
            string.IsNullOrEmpty(reservation.Time))
        {
            return BadRequest("Todos los campos son obligatorios.");
        }

        if (reservations.Any(r => r.Date == reservation.Date && r.Time == reservation.Time && r.Service == reservation.Service))
        {
            return BadRequest("Ya existe una reserva para ese servicio en ese día y horario.");
        }

        if (reservations.Any(r => r.Date == reservation.Date && r.Client == reservation.Client))
        {
            return BadRequest("El cliente ya tiene una reserva en este día.");
        }

        reservations.Add(reservation);
        return await Task.FromResult(Ok());
    }
}

public class Reservation
{
    public string? Client { get; set; }
    public string? Service { get; set; }
    public string? Date { get; set; }
    public string? Time { get; set; } 
}