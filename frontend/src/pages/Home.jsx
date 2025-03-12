import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [services, setServices] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [client, setClient] = useState("");
  const [selectedService, setSelectedService] = useState(""); 
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5164/api/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Error al cargar servicios:", err));

    axios.get("http://localhost:5164/api/reservations")
      .then((res) => setReservations(res.data))
      .catch((err) => console.error("Error al cargar reservas:", err));
  }, []);

  const handleReserve = () => {
    if (!client || !selectedService || !selectedDate) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const data = { client, service: selectedService, date: selectedDate };
    console.log("Enviando reserva:", data);

    axios.post("http://localhost:5164/api/reservations", data)
      .then(() => alert("Reserva exitosa"))
      .catch((error) => {
        console.error("Error en la reserva:", error.response);
        alert("Error en la reserva");
      });
  };

  return (
    <div>
      <h1>Reservas</h1>
      <input 
        type="text" 
        placeholder="Tu nombre" 
        value={client} 
        onChange={(e) => setClient(e.target.value)} 
      />

      <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
        <option value="" disabled>Selecciona un servicio</option>
        {services.map((s) => (
          <option key={s.id} value={s.name}>{s.name}</option>
        ))}
      </select>

      <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      <button onClick={handleReserve}>Reservar</button>
    </div>
  );
};

export default Home;
