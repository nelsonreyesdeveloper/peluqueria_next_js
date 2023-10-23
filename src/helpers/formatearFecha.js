export const formatearFecha = (fechaOriginal) => {
    const fechaPartes = fechaOriginal.split('-');
    const anio = parseInt(fechaPartes[0]);
    const mes = parseInt(fechaPartes[1]) - 1;
    const dia = parseInt(fechaPartes[2]);
    
    const now = new Date(anio, mes, dia); // Sin la conversión a UTC
    const opcionesDeFormato = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString("es-ES", opcionesDeFormato);
    return formattedDate; // Esto mostrará "23 de octubre de 2023"
 }
 
 
