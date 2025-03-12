using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

[Route("api/reservations")]
[ApiController]
public class ReservationsController : ControllerBase
{
    private static List<Reservation> reservations = new();

    [HttpGet]
    public IActionResult GetReservations() => Ok(reservations);

    [HttpPost]
    public IActionResult CreateReservation([FromBody] Reservation reservation)
    {
        if (reservations.Any(r => r.Date == reservation.Date && r.Service == reservation.Service))
            return BadRequest("Ya existe una reserva para ese horario");

        reservations.Add(reservation);
        return Ok();
    }
}

public class Reservation
{
    public string? Client { get; set; }
    public string? Service { get; set; }
    public string? Date { get; set; }
}