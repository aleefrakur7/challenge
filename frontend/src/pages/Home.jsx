import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const API_URL = "http://localhost:5164/api";

const Home = () => {
  const [services, setServices] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [form, setForm] = useState({ client: "", service: "", date: "", time: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, reservationsRes] = await Promise.all([
        axios.get(`${API_URL}/services`),
        axios.get(`${API_URL}/reservations`)
      ]);
      setServices(servicesRes.data);
      setReservations(reservationsRes.data);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      toast.error("Error al cargar los datos.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReserve = async () => {
    if (!form.client || !form.service || !form.date || !form.time) {
      toast.warning("Por favor, completa todos los campos.");
      return;
    }

    if (reservations.some(res => res.client === form.client && res.date === form.date)) {
      toast.warning("Ya tienes una reserva para este día.");
      return;
    }

    if (reservations.some(res => res.date === form.date && res.time === form.time && res.service === form.service)) {
      toast.warning("Ya existe una reserva para este servicio en este horario.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_URL}/reservations`, form);
      setReservations([...reservations, form]);
      toast.success("Reserva exitosa");
      setForm({ client: "", service: "", date: "", time: "" }); 
    } catch (error) {
      toast.error(error.response?.data || "Error en la reserva.");
      console.error("Error en la reserva:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Reservas</h1>

      <input type="text" name="client" placeholder="Tu nombre" value={form.client} onChange={handleChange} />

      <select name="service" value={form.service} onChange={handleChange}>
        <option value="" disabled>Selecciona un servicio</option>
        {services.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
      </select>

      <input type="date" name="date" value={form.date} onChange={handleChange} />
      <input type="time" name="time" value={form.time} onChange={handleChange} />
      
      <button onClick={handleReserve} disabled={loading}>
        {loading ? "Reservando..." : "Reservar"}
      </button>

      <ToastContainer /> 
    </div>
  );
};

export default Home;

