document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

document.getElementById('userForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    if (name) {
        localStorage.setItem('userName', name);
        displayWelcomeMessage(name);
        document.getElementById('userForm').reset();
        collapseInputBar();
    }
});

const storedName = localStorage.getItem('userName');
if (storedName) {
    displayWelcomeMessage(storedName);
    collapseInputBar();
}

function displayWelcomeMessage(name) {
    document.getElementById('welcomeMessage').textContent = `Welcome, ${name}!`;
}


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("image", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("image");
    var droppedElement = document.getElementById(data);
    ev.target.appendChild(droppedElement);
    ev.target.style.backgroundColor = "#f9f9f9";
    ev.target.style.border = "none";
    droppedElement.style.position = "absolute";
    droppedElement.style.top = "50%";
    droppedElement.style.left = "50%";
    droppedElement.style.transform = "translate(-50%, -50%)";
}

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
  
        map.setCenter(pos);
      },
      () => {
        console.log("Error: The Geolocation service failed.");
      }
    );
  
    map.addListener("click", (event) => {
      const marker = new google.maps.Marker({
        position: event.latLng,
        map: map,
      });
    });
  }