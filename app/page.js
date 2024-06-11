// app/page.js
'use client'; // Indica que este archivo se ejecuta en el lado del cliente
import React, { useEffect } from 'react'; // Importa React y el hook useEffect
import Script from 'next/script'; // Importa el componente Script de Next.js para cargar scripts externos

const Home = () => {
  useEffect(() => { // useEffect se ejecuta cuando el componente se monta
    const initMap = async () => { // Función asincrónica para inicializar el mapa
      const { Map, InfoWindow } = await google.maps.importLibrary('maps'); // Importa las librerías de mapas e InfoWindow de Google Maps
      const { PlacesService, PlacesServiceStatus } = await google.maps.importLibrary('places'); // Importa las librerías de PlacesService y PlacesServiceStatus de Google Places

      const center = new google.maps.LatLng(-34.6037, -58.3816); // Coordenadas de Buenos Aires
      const map = new Map(document.getElementById('map'), { // Crea un nuevo mapa en el div con id 'map'
        center: center, // Centra el mapa en Buenos Aires
        zoom: 14, // Nivel de zoom del mapa
        mapId: 'YOUR_MAP_ID', // Reemplaza 'YOUR_MAP_ID' con tu Map ID válido
      });

      const service = new PlacesService(map); // Crea un nuevo servicio de Places asociado al mapa
      let markers = []; // Arreglo para almacenar los marcadores
      let currentInfoWindow = null; // Variable para almacenar el InfoWindow actualmente abierto

      const clearMarkers = () => { // Función para limpiar los marcadores del mapa
        markers.forEach(marker => marker.setMap(null)); // Elimina cada marcador del mapa
        markers = []; // Vacía el arreglo de marcadores
      };

      const performSearch = () => { // Función para realizar la búsqueda de lugares
        const bounds = map.getBounds(); // Obtiene los límites actuales del mapa
        const request = { // Crea una solicitud de búsqueda
          bounds: bounds, // Utiliza los límites del mapa como área de búsqueda
          type: 'cafe', // Tipo de lugar a buscar (cafeterías)
        };

        service.nearbySearch(request, (results, status) => { // Realiza la búsqueda de lugares cercanos
          if (status === PlacesServiceStatus.OK && results) { // Verifica si la búsqueda fue exitosa y hay resultados
            clearMarkers(); // Limpia los marcadores actuales
            results.forEach((place) => { // Itera sobre los resultados de la búsqueda
              const marker = new google.maps.Marker({ // Crea un nuevo marcador con google.maps.Marker
                map: map, // Asocia el marcador al mapa
                position: place.geometry.location, // Establece la posición del marcador
                title: place.name, // Título del marcador
                icon: { // Define un ícono personalizado para el marcador
                  url: 'https://cdn-icons-png.flaticon.com/512/924/924514.png', // URL del ícono (puedes cambiar el color aquí)
                  scaledSize: new google.maps.Size(32, 32),
                  className: "icons-food-drink" // Tamaño del ícono
                },
              });

              // Contenido del InfoWindow (popup)
              const infoWindowContent = ` 
                <div class="custom-info-window">
                  <h3>${place.name || "hola"}</h3>
                  <p>${place.vicinity}</p>
                </div>
              `;

              const infoWindow = new InfoWindow({ // Crea un nuevo InfoWindow
                content: infoWindowContent, // Establece el contenido del InfoWindow
              });

              marker.addListener('click', () => { // Añade un evento de clic al marcador
                if (currentInfoWindow) { // Si hay un InfoWindow abierto, ciérralo
                  currentInfoWindow.close();
                }
                infoWindow.open({ // Abre el nuevo InfoWindow cuando se hace clic en el marcador
                  anchor: marker, // Asocia el InfoWindow al marcador
                  map, // Asocia el InfoWindow al mapa
                  shouldFocus: false, // No enfocar el InfoWindow
                });
                currentInfoWindow = infoWindow; // Actualiza la referencia al InfoWindow abierto
              });

              markers.push(marker); // Añade el marcador al arreglo de marcadores
            });
          } else { // Si no hay resultados o la búsqueda falla
            console.log('No results'); // Muestra un mensaje en la consola
          }
        });
      };

      // Añade un botón de búsqueda al mapa
      const searchButton = document.createElement('button'); // Crea un nuevo botón
      searchButton.textContent = 'Buscar en esta Área'; // Establece el texto del botón
      searchButton.classList.add('search-button'); // Añade una clase al botón para estilos
      searchButton.addEventListener('click', performSearch); // Añade un evento de clic al botón que llama a performSearch

      map.controls[google.maps.ControlPosition.TOP_CENTER].push(searchButton); // Añade el botón a los controles del mapa en la posición superior central

      // Realiza una búsqueda inicial al cargar el mapa
      performSearch(); // Llama a performSearch para realizar una búsqueda inicial
    };

    if (typeof window !== 'undefined') { // Verifica si el código se está ejecutando en el cliente
      initMap(); // Inicializa el mapa
    }
  }, []); // El array vacío [] asegura que el efecto solo se ejecute una vez al montar el componente

  return (
    <>
      <Script
        strategy="beforeInteractive" // Carga el script antes de que el resto del contenido interactivo de la página se cargue
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`} // URL del script de Google Maps con la clave de API y las bibliotecas necesarias
      />
      <div id="map" style={{ height: '100vh', width: '100%' }} /> {/* Div para contener el mapa */}
      
    </>
  );
};

export default Home; // Exporta el componente Home como el componente por defecto
