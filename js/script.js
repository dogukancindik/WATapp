/********************
 * Giriş / Kayıt *
 ********************/

// Kullanıcı kaydı
function registerUser(e) {
  e.preventDefault();

  const name = document.getElementById('regName').value.trim();
  const surname = document.getElementById('regSurname').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const dob = document.getElementById('regDob').value.trim();
  const password = document.getElementById('regPassword').value.trim();

  let users = JSON.parse(localStorage.getItem('users')) || [];

  // E-posta kontrolü
  if (users.some(u => u.email === email)) {
    document.getElementById('registerError').textContent = "This email is already registered!";
    return false;
  }

  let newUser = {
    name: name,
    surname: surname,
    phone: phone,
    email: email,
    dob: dob,
    password: password
  };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  alert("Registration successful! Please login now.");
  window.location = "index.html";
  return false;
}

// Giriş yapma
function loginUser(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  let users = JSON.parse(localStorage.getItem('users')) || [];
  let foundUser = users.find(u => u.email === email && u.password === password);

  if (!foundUser) {
    document.getElementById('loginError').textContent = "Invalid email or password!";
    return false;
  }

  localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
  window.location = "home.html";
  return false;
}

// Google ile giriş (mock)
function loginWithGoogle() {
  let mockGoogleUser = {
    name: "Google",
    surname: "User",
    phone: "000",
    email: "googleuser@example.com",
    dob: "1990-01-01",
    password: "googleSignIn"
  };
  localStorage.setItem('loggedInUser', JSON.stringify(mockGoogleUser));
  window.location = "home.html";
}

/********************
* Giriş / Çıkış işlemleri *
********************/

// Çıkış yapma işlemi
function logoutUser() {
  localStorage.removeItem('loggedInUser');
  window.location = "index.html";  // Giriş sayfasına yönlendirme
}

// Kullanıcı giriş yapmış mı kontrol etme
function checkAuth() {
  let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!loggedInUser) {
      alert("Please log in first.");
      window.location = "index.html";  // Giriş yapmamışsa giriş sayfasına yönlendirme
  }
}

/***********************************
* WAT Puan Hesaplama (Adımlar) *
***********************************/

// Puan hesaplama
function calculateScore() {
  // Radio değerlerini al
  let yas = getRadioValue('yas');
  let banka = getRadioValue('banka');
  let notOrt = getRadioValue('notOrt');
  let sinif = getRadioValue('sinif');
  let ulke = getRadioValue('ulke');
  let ingSeviye = getRadioValue('ingSeviye');
  let vizeAldi = getRadioValue('vizeAldi');
  let vizeRed = getRadioValue('vizeRed');

  // Text inputlarını al
  let adSoyad = document.getElementById('q1AdSoyad').value;
  let mail = document.getElementById('q2Mail').value;
  let phone = document.getElementById('q3Phone').value;
  let uniName = document.getElementById('q8UniName').value;

  yas = parseInt(yas || 0);
  banka = parseInt(banka || 0);
  notOrt = parseInt(notOrt || 0);
  sinif = parseInt(sinif || 0);
  ulke = parseInt(ulke || 0);
  ingSeviye = parseInt(ingSeviye || 0);
  vizeAldi = parseInt(vizeAldi || 0);
  vizeRed = parseInt(vizeRed || 0);

  let totalScore = yas + banka + notOrt + sinif + ulke + ingSeviye + vizeAldi + vizeRed;

  let watData = {
      adSoyad: adSoyad,
      mail: mail,
      phone: phone,
      yas: yas,
      banka: banka,
      notOrt: notOrt,
      sinif: sinif,
      ulke: ulke,
      uniName: uniName,
      ingSeviye: ingSeviye,
      vizeAldi: vizeAldi,
      vizeRed: vizeRed,
      totalScore: totalScore
  };

  localStorage.setItem('watData', JSON.stringify(watData));
  window.location = "extra-step4.html";
}

// Radio buton değerini alma yardımcı fonksiyon
function getRadioValue(name) {
  let radios = document.getElementsByName(name);
  for (let r of radios) {
      if (r.checked) {
          return r.value;
      }
  }
  return 0;
}

// Step4'te puanı gösterme
window.addEventListener('load', function() {
  if (window.location.pathname.includes('extra-step4.html')) {
      let watData = JSON.parse(localStorage.getItem('watData'));
      if (watData) {
          let totalScore = watData.totalScore;
          let percentage = (totalScore / 80) * 100;
          percentage = Math.round(percentage);

          const disp = document.getElementById('watScoreDisplay');
          const exp = document.getElementById('scoreExplanation');
          if (disp) disp.textContent = percentage + "%";
          if (exp) exp.textContent = "Your Work and Travel eligibility score: " + percentage + "%";
      }
  }
});

/*********************************
* Portföy / CV Sayfası *
*********************************/

// Portföyü doldurma

function fillPortfolio() {
  if (!window.location.pathname.includes('portfolio.html')) return;
  let watData = JSON.parse(localStorage.getItem('watData'));
  if (!watData) return;  // Verilerin olmadığı durumda işlem yapma

  // Metni doldur
  document.getElementById('pAdSoyad').textContent = watData.adSoyad || "Not Provided";
  document.getElementById('pMail').textContent = watData.mail || "Not Provided";
  document.getElementById('pPhone').textContent = watData.phone || "Not Provided";
  document.getElementById('pYas').textContent = watData.yas || "Not Provided";
  document.getElementById('pBanka').textContent = watData.banka || "Not Provided";
  document.getElementById('pNotOrt').textContent = watData.notOrt || "Not Provided";
  document.getElementById('pSinif').textContent = watData.sinif || "Not Provided";
  document.getElementById('pUlke').textContent = watData.ulke || "Not Provided";
  document.getElementById('pUniName').textContent = watData.uniName || "Not Provided";
  document.getElementById('pIngSeviye').textContent = watData.ingSeviye || "Not Provided";
  document.getElementById('pVizeAldi').textContent = watData.vizeAldi ? "Yes" : "No";
  document.getElementById('pVizeRed').textContent = watData.vizeRed ? "Yes" : "No";
}

document.addEventListener("DOMContentLoaded", function() {
  const watData = JSON.parse(localStorage.getItem('watData'));
  
  if (watData) {
    // Sayfa verilerini ekleyin
    document.getElementById('pAdSoyad').textContent = watData.adSoyad;
    document.getElementById('pMail').textContent = watData.mail;
    document.getElementById('pPhone').textContent = watData.phone;
    document.getElementById('pYas').textContent = watData.yas;
    document.getElementById('pBanka').textContent = watData.banka;
    document.getElementById('pNotOrt').textContent = watData.notOrt;
    document.getElementById('pSinif').textContent = watData.sinif;
    document.getElementById('pUlke').textContent = watData.ulke;
    document.getElementById('pUniName').textContent = watData.uniName;
    document.getElementById('pIngSeviye').textContent = watData.ingSeviye;
    document.getElementById('pVizeAldi').textContent = watData.vizeAldi ? 'Yes' : 'No';
    document.getElementById('pVizeRed').textContent = watData.vizeRed ? 'Yes' : 'No';
  } else {
    console.log('No data in localStorage.');
  }
});


// === Güncellenmiş downloadPDF fonksiyonu ===
function downloadPDF() {
  console.log("downloadPDF function triggered.");
console.log("downloadPDF fonksiyonu tetiklendi."); // Debug amaçlı ekledik

// PDF'e çevirmek istediğiniz kapsayıcıyı seçin
const element = document.getElementById('portfolioData');

if (!element) {
  console.error("portfolioData elementi bulunamadı.");
  return;
}

// Resmin boyutunu küçültmek için CSS düzenlemesi yapalım
const img = element.querySelector('.cv-header img');
if (img) {
  img.style.width = '50px';  // Resmin boyutunu küçült
  img.style.height = '50px'; // Yüksekliği de küçült
}


// html2pdf ayarları
const options = {
  margin:       0.5,                                // inç cinsinden margin
  filename:     'MyPortfolio.pdf',                 // indirilecek dosya adı
  image:        { type: 'jpeg', quality: 0.98 },   // resim formatı ve kalitesi
  html2canvas:  { scale: 2 },                      // yüksek çözünürlük için scale
  jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
};

try {
  // PDF oluştur ve indir
  html2pdf().from(element).set(options).save();
  console.log("PDF indiriliyor...");
} catch (error) {
  console.error("PDF oluşturulurken bir hata oluştu:", error);
}
}


// Send to Agency (simple simulation)
function sendToAgency(agencyName) {
  let watData = JSON.parse(localStorage.getItem('watData'));
  if(!watData) return;
  
  document.getElementById('agencyMsg').textContent =
    "Your information has been sent to " + agencyName + "!";
  }


// İş ilanları verisi
const jobOffers = [
  // New York Eyaleti İşleri
  {
    id: 1,
    title: "Part-time Bartender",
    location: "New York, USA",
    address: "123 NY St.",
    contact: "contact@nybar.com",
    hourlyRate: 15,
    description: "Work in a trendy bar serving drinks and interacting with customers.",
    requirements: "Must be over 18 and have a friendly personality.",
    reviews: [
      { name: "John Doe", rating: 3, comment: "Good atmosphere, but the hours are long." },
      { name: "Jane Smith", rating: 4, comment: "Nice place to work, met great people!" },
      { name: "Mike Lee", rating: 2, comment: "Too much work for the pay." }
    ]
  },
  {
    id: 2,
    title: "Full-time Chef",
    location: "New York, USA",
    address: "456 NY Ave.",
    contact: "chef@nyrestaurant.com",
    hourlyRate: 20,
    description: "Prepare meals, manage kitchen staff, and ensure high food quality.",
    requirements: "Culinary experience and food safety knowledge required.",
    reviews: [
      { name: "Emma Brown", rating: 5, comment: "Amazing place! Loved every moment of working here." },
      { name: "Chris Johnson", rating: 4, comment: "Great kitchen, but intense hours." }
    ]
  },
  {
    id: 3,
    title: "Sales Associate",
    location: "New York, USA",
    address: "789 NY Blvd.",
    contact: "sales@nycshop.com",
    hourlyRate: 18,
    description: "Assist customers, manage inventory, and provide excellent customer service.",
    requirements: "Retail experience preferred.",
    reviews: [
      { name: "Alice Cooper", rating: 4, comment: "Good team and nice atmosphere." },
      { name: "Tom Harris", rating: 3, comment: "It’s a decent job, but could use more benefits." }
    ]
  },
  {
    id: 4,
    title: "Personal Assistant",
    location: "New York, USA",
    address: "321 NY Road",
    contact: "assistant@nycservice.com",
    hourlyRate: 22,
    description: "Manage schedules, appointments, and perform various administrative tasks.",
    requirements: "Strong organizational skills and attention to detail.",
    reviews: [
      { name: "Sophia Carter", rating: 5, comment: "Fantastic job! Very rewarding." },
      { name: "Ethan Miller", rating: 4, comment: "Great role, but needs better work-life balance." }
    ]
  },

  // Miami Eyaleti İşleri
  {
    id: 5,
    title: "Tour Guide",
    location: "Miami, USA",
    address: "789 Miami Rd.",
    contact: "guide@miamitours.com",
    hourlyRate: 18,
    description: "Lead tourists on city tours, explain landmarks and history.",
    requirements: "Excellent communication skills and local knowledge.",
    reviews: [
      { name: "Olivia Green", rating: 5, comment: "Incredible experience. The tourists were lovely." },
      { name: "Jake White", rating: 4, comment: "Great job, though some days are more hectic than others." }
    ]
  },
  {
    id: 6,
    title: "Taxi Driver",
    location: "Miami Beach, USA",
    address: "321 Miami Beach St.",
    contact: "driver@miamitaxi.com",
    hourlyRate: 12,
    description: "Transport tourists and locals around the city safely and efficiently.",
    requirements: "Valid driver’s license and knowledge of the city routes.",
    reviews: [
      { name: "Lily Harris", rating: 3, comment: "Good tips but the traffic is overwhelming." },
      { name: "David Walker", rating: 4, comment: "Fun job if you enjoy driving and meeting new people." }
    ]
  },
  {
    id: 7,
    title: "Lifeguard",
    location: "Miami Beach, USA",
    address: "123 Beach Blvd.",
    contact: "lifeguard@miamibeach.com",
    hourlyRate: 14,
    description: "Responsible for ensuring safety at the beach, monitoring swimmers.",
    requirements: "Lifeguard certification and strong swimming skills required.",
    reviews: [
      { name: "Emma Davis", rating: 5, comment: "I love this job! Great environment and very fulfilling." },
      { name: "Jackson Lee", rating: 4, comment: "Challenging, but the team is supportive." }
    ]
  },
  {
    id: 8,
    title: "Beach Vendor",
    location: "Miami Beach, USA",
    address: "456 Beach Rd.",
    contact: "vendor@miamibeach.com",
    hourlyRate: 10,
    description: "Sell snacks, drinks, and beach accessories to tourists and locals.",
    requirements: "Customer service skills and willingness to work outdoors.",
    reviews: [
      { name: "Zoe King", rating: 4, comment: "It’s a fun job, but can get really hot on the beach." },
      { name: "James Young", rating: 3, comment: "Good for extra income but not much opportunity to grow." }
    ]
  },

  // Los Angeles Eyaleti İşleri
  {
    id: 9,
    title: "Movie Set Assistant",
    location: "Los Angeles, USA",
    address: "123 Hollywood Blvd.",
    contact: "setassistant@lafilms.com",
    hourlyRate: 25,
    description: "Assist with various tasks on a film set including equipment handling and coordination.",
    requirements: "Interest in film production and ability to handle physical tasks.",
    reviews: [
      { name: "Daniel Roberts", rating: 5, comment: "Exciting work environment and great team." },
      { name: "Sophia Carter", rating: 4, comment: "Fast-paced job, but I learned a lot." }
    ]
  },
  {
    id: 10,
    title: "Event Coordinator",
    location: "Los Angeles, USA",
    address: "456 LA St.",
    contact: "events@laevents.com",
    hourlyRate: 30,
    description: "Coordinate and manage events, from planning to execution.",
    requirements: "Event planning experience and strong communication skills.",
    reviews: [
      { name: "George Black", rating: 5, comment: "Best job I’ve ever had, very fulfilling." },
      { name: "Nina Wilson", rating: 4, comment: "Challenging but great learning experience." }
    ]
  },
  {
    id: 11,
    title: "Dog Walker",
    location: "Los Angeles, USA",
    address: "789 LA Ave.",
    contact: "walker@ladogs.com",
    hourlyRate: 15,
    description: "Walk dogs in the local area, ensuring their exercise and safety.",
    requirements: "Love for dogs and reliability.",
    reviews: [
      { name: "Amelia Allen", rating: 5, comment: "So rewarding to spend time with dogs every day!" },
      { name: "Evan Scott", rating: 4, comment: "A fun job, but weather can be challenging." }
    ]
  },
  {
    id: 12,
    title: "Bartender",
    location: "Los Angeles, USA",
    address: "321 Sunset Blvd.",
    contact: "bartender@lasunsetbar.com",
    hourlyRate: 20,
    description: "Serve drinks, interact with customers, and maintain the bar area.",
    requirements: "Previous bartending experience preferred.",
    reviews: [
      { name: "Lucas White", rating: 4, comment: "Great tips but long hours." },
      { name: "Olivia Green", rating: 3, comment: "Fun but demanding, not for everyone." }
    ]
  },

  // San Francisco Eyaleti İşleri
  {
    id: 13,
    title: "Software Developer",
    location: "San Francisco, USA",
    address: "123 Tech Rd.",
    contact: "developer@sftechexample.com",
    hourlyRate: 40,
    description: "Develop and maintain software applications and services.",
    requirements: "Experience with JavaScript and Python.",
    reviews: [
      { name: "Jack Turner", rating: 5, comment: "Awesome job with lots of growth opportunities." },
      { name: "Lucy Green", rating: 4, comment: "Great team and projects, though work-life balance can be hard." }
    ]
  },
  {
    id: 14,
    title: "Graphic Designer",
    location: "San Francisco, USA",
    address: "456 Design St.",
    contact: "design@sfgraphics.com",
    hourlyRate: 35,
    description: "Create visual concepts for websites, logos, and branding.",
    requirements: "Proficiency in Adobe Suite and strong portfolio.",
    reviews: [
      { name: "Mary Evans", rating: 5, comment: "Creative and fulfilling job with great clients." },
      { name: "Chris Miller", rating: 4, comment: "Great place to work, but the workload can be high." }
    ]
  },
  {
    id: 15,
    title: "Barista",
    location: "San Francisco, USA",
    address: "789 Coffee Blvd.",
    contact: "coffee@sfcoffeebar.com",
    hourlyRate: 14,
    description: "Prepare coffee and other beverages, ensure customer satisfaction.",
    requirements: "Previous barista experience preferred.",
    reviews: [
      { name: "Ethan Black", rating: 4, comment: "Nice environment and good tips." },
      { name: "Grace White", rating: 3, comment: "Fun job but the hours are tough." }
    ]
  },
  {
    id: 16,
    title: "Tourist Receptionist",
    location: "San Francisco, USA",
    address: "321 Tourist St.",
    contact: "receptionist@sftours.com",
    hourlyRate: 18,
    description: "Welcome tourists, assist with bookings, and provide information.",
    requirements: "Fluent in English and Spanish, customer service experience.",
    reviews: [
      { name: "Henry Lee", rating: 5, comment: "Great job with plenty of social interactions." },
      { name: "Sarah Brown", rating: 4, comment: "A little repetitive but enjoyable overall." }
    ]
  },
];



// Eyalet seçildiğinde iş ilanlarını filtreleyen fonksiyon
function filterJobsByState() {
  const selectedState = document.getElementById("stateSelect").value;

  // Eğer 'all' seçildiyse, tüm iş ilanlarını göster
  if (selectedState === 'all') {
    showJobOffers(jobOffers);
  } else {
    // Filtreleme işlemi: Seçilen eyalete göre iş ilanlarını filtrele
    const filteredJobs = jobOffers.filter(job => job.location.includes(selectedState));
    showJobOffers(filteredJobs);
  }
}

// İş ilanlarını dinamik olarak eklemek
function showJobOffers(jobs) {
  const jobOffersContainer = document.getElementById("jobOffers");
  jobOffersContainer.innerHTML = ''; // Önceden var olan iş ilanlarını temizle

  if (jobs.length === 0) {
    jobOffersContainer.innerHTML = '<p>No job offers available for the selected state.</p>';
    return;
  }

  // İş ilanlarını dinamik olarak göster
  jobs.forEach(job => {
    const jobElement = document.createElement("div");
    jobElement.classList.add("job-card");
    const selectedState = document.getElementById("stateSelect").value; // Seçilen eyalet
    jobElement.innerHTML = `
      <h3><a href="extra-step5.html?jobId=${job.id}&state=${selectedState}">${job.title}</a></h3>
      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Hourly Rate:</strong> $${job.hourlyRate}</p>
    `;
    jobOffersContainer.appendChild(jobElement);
  });
}

// Sayfa yüklendiğinde iş ilanlarını boş göster
window.addEventListener('load', function() {
  showJobOffers([]); // Başlangıçta iş ilanları boş
  const stateSelect = document.getElementById("stateSelect");
  stateSelect.addEventListener('change', filterJobsByState); // Eyalet değiştiğinde iş ilanlarını filtrele
});

// İş detaylarını yükleyen fonksiyon
function loadJobDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const jobId = urlParams.get('jobId');
  const state = urlParams.get('state'); // Eyalet bilgisi alınır
  const job = jobOffers.find(j => j.id == jobId);

  if (job) {
    const jobDetailContainer = document.getElementById("jobDetail");
    jobDetailContainer.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Address:</strong> ${job.address}</p>
      <p><strong>Contact:</strong> ${job.contact}</p>
      <p><strong>Hourly Rate:</strong> $${job.hourlyRate}</p>
      <p><strong>Description:</strong> ${job.description}</p>
      <p><strong>Requirements:</strong> ${job.requirements}</p>
      
      <div class="job-rating">
        <h4>Rate this job:</h4>
        <div class="stars">
          <span class="star" data-rating="1">&#9733;</span>
          <span class="star" data-rating="2">&#9733;</span>
          <span class="star" data-rating="3">&#9733;</span>
          <span class="star" data-rating="4">&#9733;</span>
          <span class="star" data-rating="5">&#9733;</span>
        </div>
      </div>

      <div class="job-reviews">
        <h4>User Reviews:</h4>
        ${job.reviews.map(review => `
          <div class="review">
            <p><strong>${review.name}:</strong> "${review.comment}"</p>
          </div>
        `).join('')}
      </div>
    `;
  }
}

// Extra Step 5 sayfasına özel iş detayları yükle
if (window.location.pathname.includes('extra-step5.html')) {
  loadJobDetails();
}


// Eyaletlerin kültürel rehber bilgilerini tutan nesne
const culturalGuides = {
  "New York": {
    attractions: "Statue of Liberty, Times Square, Central Park",
    food: "New York-style pizza, bagels, cheesecake",
    tips: "Public transportation is your best friend. Avoid driving if possible."
  },
  "Miami": {
    attractions: "Miami Beach, Art Deco Historic District, Vizcaya Museum",
    food: "Cuban sandwiches, stone crab, key lime pie",
    tips: "Be prepared for humid weather. Enjoy the vibrant nightlife!"
  },
  "San Francisco": {
    attractions: "Golden Gate Bridge, Alcatraz Island, Fisherman’s Wharf",
    food: "Clam chowder in a bread bowl, Ghirardelli chocolate, seafood",
    tips: "Bring layers! The weather can change quickly even in summer."
  },
  "California": {
    attractions: "Disneyland, Yosemite National Park, Hollywood",
    food: "Fish tacos, avocado toast, wine from Napa Valley",
    tips: "Always check the weather as it varies across the state. Visit the beaches!"
  }
};

// Kültürel rehber sayfasını yükleyen fonksiyon
function loadCulturalPreparation() {
  const urlParams = new URLSearchParams(window.location.search); // URL'den eyalet bilgisini al
  const selectedState = urlParams.get('state'); // "state" parametresini al
  const guide = culturalGuides[selectedState]; // culturalGuides nesnesinden bilgiyi al

  const cultureContent = document.getElementById("cultureContent"); // HTML öğesini seç
  if (guide) {
    cultureContent.innerHTML = `
      <h3>Welcome to ${selectedState}!</h3>
      <p><strong>Top Attractions:</strong> ${guide.attractions}</p>
      <p><strong>Must-Try Food:</strong> ${guide.food}</p>
      <p><strong>Tips for Visitors:</strong> ${guide.tips}</p>
    `;
  } else {
    cultureContent.innerHTML = "<p>No cultural guide available for this state.</p>";
  }
}

// Sayfa yüklendiğinde kültürel rehberi yükle
window.onload = loadCulturalPreparation;




















  