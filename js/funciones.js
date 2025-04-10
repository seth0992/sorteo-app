   // Elementos del DOM
   const startButton = document.getElementById('start-button');
   const displayImage = document.getElementById('display-image');
   const winnerAnnouncement = document.getElementById('winner-announcement');
   const winnerImage = document.getElementById('winner-image');
   
   // Array de rutas de imágenes (reemplazar con tus propias imágenes)
   const imagesList = [
       "/image/Boletos01000.jpg",
       "/image/Boletos02000.jpg",
       "/image/Boletos03000.jpg",
       "/image/Boletos04000.jpg",
       "/image/Boletos05000.jpg",
       "/image/Boletos06000.jpg",
       "/image/Boletos07000.jpg",
       "/image/Boletos08000.jpg",
       "/image/Boletos09000.jpg",
       "/image/Boletos10000.jpg",
       "/image/Boletos11000.jpg",
       "/image/Boletos12000.jpg",
       "/image/Boletos13000.jpg",
       "/image/Boletos14000.jpg",
       "/image/Boletos15000.jpg",

   ];

   
   // Variables de control
   let currentIndex = 0;
   let interval;
   let speed = 100;
   
   // Mostrar la primera imagen al cargar
   displayImage.src = imagesList[0];
   
   // Función para cambiar la imagen mostrada
   function updateImage(index) {
       displayImage.src = imagesList[index];
   }
   
   // Función para iniciar el sorteo
   function startTombola() {
       // Reiniciar estado
       winnerAnnouncement.style.display = 'none';
       startButton.disabled = true;
       startButton.textContent = 'Sorteando...';
       speed = 100;
       
       // Añadir efecto de parpadeo
       displayImage.classList.add('blinking');
       
       // Iniciar cambio aleatorio
       interval = setInterval(() => {
           currentIndex = Math.floor(Math.random() * imagesList.length);
           updateImage(currentIndex);
       }, speed);
       
       // Duración total del sorteo (entre 3 y 5 segundos)
       const duration = 3000 + Math.random() * 2000;
       
       // Iniciar desaceleración después de la duración establecida
       setTimeout(slowDownAndStop, duration);
   }
   
   // Función para desacelerar y detener la tómbola
   function slowDownAndStop() {
       const slowDownInterval = setInterval(() => {
           // Aumentar el intervalo gradualmente
           speed += 50;
           
           // Actualizar intervalo con nueva velocidad
           clearInterval(interval);
           interval = setInterval(() => {
               currentIndex = Math.floor(Math.random() * imagesList.length);
               updateImage(currentIndex);
           }, speed);
           
           // Detener cuando sea muy lento
           if (speed > 500) {
               clearInterval(slowDownInterval);
               clearInterval(interval);
               
               // Quitar efecto de parpadeo
               displayImage.classList.remove('blinking');
               
               // Mostrar ganador
               winnerImage.src = imagesList[currentIndex];
               winnerAnnouncement.style.display = 'block';
               
               // Restablecer botón
               startButton.disabled = false;
               startButton.textContent = 'Iniciar Nuevo Sorteo';
           }
       }, 300);
   }
   
   // Evento click del botón
   startButton.addEventListener('click', startTombola);
   
   // Función para cargar imágenes propias (ejemplo de cómo se implementaría)
   function loadCustomImages(imageUrls) {
       if (Array.isArray(imageUrls) && imageUrls.length > 0) {
           imagesList.length = 0; // Limpiar array existente
           imageUrls.forEach(url => {
               imagesList.push(url);
           });
           // Actualizar la imagen mostrada
           displayImage.src = imagesList[0];
       }
   }
   
   // Ejemplo de cómo se podría llamar a la función desde fuera:
   // loadCustomImages(['ruta/imagen1.jpg', 'ruta/imagen2.jpg', 'ruta/imagen3.jpg']);
