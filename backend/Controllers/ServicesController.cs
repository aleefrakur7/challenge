using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/services")]
[ApiController]
public class ServicesController : ControllerBase
{
    private static readonly List<Service> services = new()
    {
        new Service { Id = 1, Name = "Corte de Cabello" },
        new Service { Id = 2, Name = "Manicure" },
        new Service { Id = 3, Name = "Masaje Relajante" }
    };

    [HttpGet]
    public async Task<IActionResult> GetServices()
    {
        return await Task.FromResult(Ok(services)); 
    }
}

public class Service
{
    public int Id { get; set; }
    public string? Name { get; set; }
}