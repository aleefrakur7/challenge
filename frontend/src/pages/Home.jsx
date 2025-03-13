import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [services, setServices] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [client, setClient] = useState("");
  const [selectedService, setSelectedService] = useState(""); 
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5164/api/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Error al cargar servicios:", err));

    axios.get("http://localhost:5164/api/reservations")
      .then((res) => setReservations(res.data))
      .catch((err) => console.error("Error al cargar reservas:", err));
  }, []);

  const handleReserve = () => {
    if (!client || !selectedService || !selectedDate || !selectedTime) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (reservations.some(res => res.client === client && res.date === selectedDate)) {
      alert("Ya tienes una reserva para este día.");
      return;
    }

    if (reservations.some(res => res.date === selectedDate && res.time === selectedTime && res.service === selectedService)) {
      alert("Ya existe una reserva para este servicio en este horario.");
      return;
    }

    const data = { client, service: selectedService, date: selectedDate, time: selectedTime };
    console.log("Enviando reserva:", data);

    axios.post("http://localhost:5164/api/reservations", data)
    .then(() => {
      alert("Reserva exitosa");
      setReservations([...reservations, data]); 
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        alert(error.response.data); 
      } else {
        console.error("Error en la reserva:", error);
        alert("Error en la reserva");
      }
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
      <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
      <button onClick={handleReserve}>Reservar</button>
    </div>
  );
};

export default Home;

