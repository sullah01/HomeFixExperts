// location-number.js
// Location-based contact number display for 247homefixexperts.com

const locationNumbers = {
    'nottingham': '0115 123 4567',
    'derby': '01332 123 456',
    'mansfield': '01623 123 456',
    'leicester': '0116 123 4567'
};

const locationCities = {
    'nottingham': 'Nottingham',
    'derby': 'Derby',
    'mansfield': 'Mansfield',
    'leicester': 'Leicester'
};

// Default number (fallback)
const defaultNumber = '0800 123 4567';
const defaultCity = 'National';

// Function to detect location
async function detectLocation() {
    try {
        // Using IP-based location detection (free service)
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        const city = data.city.toLowerCase();
        const region = data.region.toLowerCase();
        
        console.log('Detected location:', city, region);
        
        // Check for exact city match
        if (locationNumbers[city]) {
            return {
                number: locationNumbers[city],
                city: locationCities[city],
                detected: true
            };
        }
        
        // Check for region/county match
        const eastMidlands = ['nottinghamshire', 'derbyshire', 'leicestershire'];
        if (eastMidlands.some(county => region.includes(county))) {
            // Return Nottingham as default for East Midlands
            return {
                number: locationNumbers['nottingham'],
                city: locationCities['nottingham'],
                detected: true
            };
        }
        
    } catch (error) {
        console.log('Location detection failed, using default:', error);
    }
    
    return {
        number: defaultNumber,
        city: defaultCity,
        detected: false
    };
}

// Function to update contact numbers on the page
function updateContactNumbers(locationInfo) {
    // Update all elements with class 'dynamic-phone'
    const phoneElements = document.querySelectorAll('.dynamic-phone');
    phoneElements.forEach(element => {
        element.textContent = locationInfo.number;
        element.href = `tel:${locationInfo.number.replace(/\s/g, '')}`;
    });
    
    // Update location display if element exists
    const locationElements = document.querySelectorAll('.dynamic-location');
    locationElements.forEach(element => {
        element.textContent = locationInfo.city;
    });
    
    // Add location badge if detected
    if (locationInfo.detected) {
        const locationBadge = document.querySelector('.location-badge');
        if (locationBadge) {
            locationBadge.textContent = `Serving ${locationInfo.city}`;
            locationBadge.style.display = 'block';
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', async function() {
    const locationInfo = await detectLocation();
    updateContactNumbers(locationInfo);
    
    // Optional: Add a location selector for manual override
    addLocationSelector();
});

// Optional: Add manual location selector
function addLocationSelector() {
    // Check if selector already exists
    if (document.getElementById('location-selector')) return;
    
    const selectorHtml = `
        <div class="location-selector" style="position: fixed; bottom: 20px; right: 20px; background: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000;">
            <label for="city-select">Change Location:</label>
            <select id="city-select" style="margin-left: 10px; padding: 5px;">
                <option value="auto">Auto-detect</option>
                <option value="nottingham">Nottingham</option>
                <option value="derby">Derby</option>
                <option value="mansfield">Mansfield</option>
                <option value="leicester">Leicester</option>
            </select>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', selectorHtml);
    
    document.getElementById('city-select').addEventListener('change', function(e) {
        const selectedCity = e.target.value;
        if (selectedCity === 'auto') {
            // Re-detect location
            detectLocation().then(updateContactNumbers);
        } else {
            updateContactNumbers({
                number: locationNumbers[selectedCity],
                city: locationCities[selectedCity],
                detected: true
            });
        }
    });
}
