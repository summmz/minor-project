let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let userPlaylists = JSON.parse(localStorage.getItem('userPlaylists')) || [];
let currentSong = null;
let isPlaying = false;
let currentPlaylist = [];
let currentIndex = 0;
let isShuffled = false;
let navigationHistory = ['home'];
let currentHistoryIndex = 0;
let isMuted = false;
let previousVolume = 0.7;
let isRepeated = false;

const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const progress = document.getElementById('progress');
const currentTimeSpan = document.getElementById('currentTime');
const durationSpan = document.getElementById('duration');

const defaultPlaylists = {
    popular: [
        {
            title: "2-2 Asle",
            artist: "Arjan Dhillon",
            url: "songs/2-2 Asle - Arjan Dhillon.mp3",
            image: "img/patander-arjan-dhillon.webp",
            duration: 228
        },
        {
            title: "8 Asle",
            artist: "Sukha",
            url: "songs/8 ASLE.mp3",
            image: "img/undisputed sukha.jpeg",
            duration: 391
        },
        {
            title: "Blinding Lights",
            artist: "The Weeknd",
            url: "songs/Blinding Lights (PenduJatt.Com.Se).mp3",
            image: "img/TW.jpeg",
            duration: 200
        }
        ,
        {
            title: "I Really Do",
            artist: "Karan Aujla",
            url: "songs/I Really Do.mp3",
            image: "img/p-pop-culture-karan-aujla.webp",
            duration: 391
        }
        ,
        {
            title: "Good 4 U",
            artist: "Olivia Rodrigo",
            url: "songs/Good 4 U (PenduJatt.Com.Se).mp3",
            image: "img/olivia rodrigo.jpeg",
            duration: 178
        },
        {
            title: "Levitating",
            artist: "Dua Lipa",
            url: "songs/Levitating (PenduJatt.Com.Se).mp3",
            image: "img/Future Nostalgia Dua Lipa.jpeg",
            duration: 203
        },
        {
            title: "Lost",
            artist: "Tegi Pannu",
            url: "songs/Lost.mp3",
            image: "img/Lost-1.jpg",
            duration: 391
        },
        {
            title: "Paro",
            artist: "Aditya Rikhari",
            url: "songs/Aditya Rikhari - Paro Song (Lyrics).mp3",
            image: "img/55555.jpeg",
            duration: 178
        }
    ],
    chill: [
        {
            title: "Sunset Lover",
            artist: "Petit Biscuit",
            url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
            image: "img/d4dff2dd-2499-4d47-902e-a64167d3d211.jpeg",
            duration: 245
        },
        {
            title: "Ocean Eyes",
            artist: "Billie Eilish",
            url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
            image: "img/dfee06b2-6930-4ff3-84ce-6ccae57dc0ba.jpeg",
            duration: 200
        }
    ],
    rock: [
        {
            title: "Bohemian Rhapsody",
            artist: "Queen",
            url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
            image: "img/d093430b-85af-447e-869d-dec87b1f1964.jpeg",
            duration: 355
        },
        {
            title: "Hotel California",
            artist: "Eagles",
            url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
            image: "img/download (1).jpeg",
            duration: 391
        }
    ],
    jazz: [
        {
            title: "Take Five",
            artist: "Dave Brubeck",
            url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
            image: "img/Undercurrent-768x768 (1).jpg",
            duration: 324
        }
    ],
    workout: [
        {
            title: "Good For You x One Of The Girls",
            artist: "Selena Gomez, The Weeknd",
            url: "songs/Good For You x One Of The Girls - Selena Gomez, The Weeknd (Lyrics  Vietsub).mp3",
            image: "img/ab67616d0000b273952d04c1fb47635158f28fb2.jpeg",
            duration: 228
        },
        {
            title: "Love Potions X Tipsy",
            artist: " bjlips & miss luxury",
            url: "songs/Love Potions X Tipsy - bjlips & miss luxury (mashup).mp3",
            image: "img/ab67616d0000b273c24be873e625679f2ac1062a.jpeg",
            duration: 391
        },
        {
            title: "Motive X Promiscuous",
            artist: "Ariana Grande, Nelly Furtado",
            url: "songs/Ariana Grande, Nelly Furtado - Motive X Promiscuous (TikTok Mashup) [Lyrics].mp3",
            image: "img/1111.jpeg",
            duration: 246
        },


        {
            title: "Mind Games",
            artist: "Sickick",
            url: "songs/Sickick - Mind Games (Official Video).mp3",
            image: "img/22222.jpeg",
            duration: 391
        },
        {
            title: "Supernova Love",
            artist: "IVE, David Guetta",
            url: "songs/IVE, David Guetta - Supernova Love (Official Lyric Video).mp3",
            image: "img/3333.jpeg",
            duration: 391
        }
    ],
    indie: [
        {
            title: "Electric Feel",
            artist: "MGMT",
            url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
            image: "img/Slow Magic - Your Heart Beatsâ€¦.jpeg",
            duration: 228
        }
    ],
    Punjabi: [
        {
            title: "2-2 Asle",
            artist: "Arjan Dhillon",
            url: "songs/2-2 Asle - Arjan Dhillon.mp3",
            image: "img/patander-arjan-dhillon.webp",
            duration: 228
        },
        {
            title: "8 Asle",
            artist: "Sukha",
            url: "songs/8 ASLE.mp3",
            image: "img/undisputed sukha.jpeg",
            duration: 391
        },
        {
            title: "Brats",
            artist: "Arjan Dhillon",
            url: "songs/Brats - Arjan Dhillon.mp3",
            image: "img/patander-arjan-dhillon.webp",
            duration: 391
        },
        {
            title: "Daytona",
            artist: "Karan Aujla",
            url: "songs/Karan Aujla - Daytona (Official Audio).mp3",
            image: "img/p-pop-culture-karan-aujla.webp",
            duration: 391
        },
        {
            title: "For a Reason",
            artist: "Karan Aujla",
            url: "songs/For A Reason - Karan Aujla.mp3",
            image: "img/p-pop-culture-karan-aujla.webp",
            duration: 391
        },
        {
            title: "Foreigns",
            artist: "Gurinder Gill",
            url: "songs/Foreigns - AP Dhillon.mp3",
            image: "img/592x592bb.webp",
            duration: 391
        },
        {
            title: "Greatest",
            artist: "Arjan Dhillon",
            url: "songs/Greatest - Arjan Dhillon.mp3",
            image: "img/patander-arjan-dhillon.webp",
            duration: 391
        },
        {
            title: "I Really Do",
            artist: "Karan Aujla",
            url: "songs/I Really Do.mp3",
            image: "img/p-pop-culture-karan-aujla.webp",
            duration: 391
        },
        {
            title: "Lost",
            artist: "Tegi Pannu",
            url: "songs/Lost.mp3",
            image: "img/Lost-1.jpg",
            duration: 391
        },


        {
            title: "Miami Flow",
            artist: "Jerry",
            url: "songs/Miami Flow - DjPunjab.Com.Se.mp3",
            image: "img/thumb_663c9918e9247.webp",
            duration: 391
        },
        {
            title: "Old Skool",
            artist: "Sidhu Moose Wala",
            url: "songs/Old Skool.mp3",
            image: "img/Old-Skool-1.jpg",
            duration: 391
        },
        {
            title: "Take it Easy",
            artist: "Karan Aujla",
            url: "songs/Take It Easy.mp3",
            image: "img/592x592bb (1).webp",
            duration: 391
        },
    ],
    SabrinaSessions: [
        {
            title: "Alien M-22 Remix",
            artist: "Sabrina Carpenter",
            url: "songs/Sabrina Carpenter, Jonas Blue - Alien (M-22 Remix_Audio Only) [7IdnVykSZqk].mp3",
            image: "img/sabrina.jpeg",
            duration: 200
        },
        {
            title: "Bed Chem",
            artist: "Sabrina Carpenter",
            url: "songs/Sabrina Carpenter - Bed Chem (Official Lyric Video).mp3",
            image: "img/Gonna miss this era.jpeg",
            duration: 178
        },
        {
            title: "Espresso",
            artist: "Sabrina Carpenter",
            url: "songs/Sabrina Carpenter - Espresso (Official Audio).mp3",
            image: "img/Instagram.jpeg",
            duration: 203
        },
        {
            title: "Nonsense",
            artist: "Sabrina Carpenter",
            url: "songs/Sabrina Carpenter - Nonsense (Official Audio).mp3",
            image: "img/425dae9c-3fef-415e-8857-e0604c1c4022.jpeg",
            duration: 203
        }
    ],
    SereneRoads: [
        

        {
            title: "Baby Come back",
            artist: "Player",
            url: "songs/Player - Baby Come Back.mp3",
            image: "img/77777.jpeg",
            duration: 203
        },

        {
            title: "Break from toronto",
            artist: "PARTYNEXTDOOR",
            url: "songs/PARTYNEXTDOOR - Break From Toronto.mp3",
            image: "img/0000.jpeg",
            duration: 203
        },
        {
            title: "By my Side",
            artist: "Zack Tabudlo",
            url: "songs/Zack Tabudlo - By My Side ft. Tiara Andini.mp3",
            image: "img/23232.jpeg",
            duration: 203
        },

        {
            title: "Intermission (Lost Tapes 2020)",
            artist: "Tory Lanez",
            url: "songs/Tory Lanez - Intermission (Lost Tapes 2020) (AUDIO).mp3",
            image: "img/12212.jpeg",
            duration: 203
        },
        {
            title: "Life is a Highway",
            artist: "Rascal Flatts",
            url: "songs/Cars (Soundtrack) - Life Is A Highway.mp3",
            image: "img/777.jpeg",
            duration: 200
        }


    ],
    MidnightHeat: [
        {
            title: "Blinding Lights",
            artist: "The Weeknd",
            url: "songs/Blinding Lights (PenduJatt.Com.Se).mp3",
            image: "img/TW.jpeg",
            duration: 200
        },
        {
            title: "Good 4 U",
            artist: "Olivia Rodrigo",
            url: "songs/Good 4 U (PenduJatt.Com.Se).mp3",
            image: "img/olivia rodrigo.jpeg",
            duration: 178
        },
        {
            title: "Levitating",
            artist: "Dua Lipa",
            url: "songs/Levitating (PenduJatt.Com.Se).mp3",
            image: "img/Future Nostalgia Dua Lipa.jpeg",
            duration: 203
        }
    ],
    SilkSheetsRedLights: [
        {
            title: "Blinding Lights",
            artist: "The Weeknd",
            url: "songs/Blinding Lights (PenduJatt.Com.Se).mp3",
            image: "img/TW.jpeg",
            duration: 200
        },
        {
            title: "Good 4 U",
            artist: "Olivia Rodrigo",
            url: "songs/Good 4 U (PenduJatt.Com.Se).mp3",
            image: "img/olivia rodrigo.jpeg",
            duration: 178
        },
        {
            title: "Levitating",
            artist: "Dua Lipa",
            url: "songs/Levitating (PenduJatt.Com.Se).mp3",
            image: "img/Future Nostalgia Dua Lipa.jpeg",
            duration: 203
        }
    ],
    BeachVibes: [
        {
            title: "Blinding Lights",
            artist: "The Weeknd",
            url: "songs/Blinding Lights (PenduJatt.Com.Se).mp3",
            image: "img/TW.jpeg",
            duration: 200
        },
        {
            title: "Good 4 U",
            artist: "Olivia Rodrigo",
            url: "songs/Good 4 U (PenduJatt.Com.Se).mp3",
            image: "img/olivia rodrigo.jpeg",
            duration: 178
        },
        {
            title: "Levitating",
            artist: "Dua Lipa",
            url: "songs/Levitating (PenduJatt.Com.Se).mp3",
            image: "img/Future Nostalgia Dua Lipa.jpeg",
            duration: 203
        }
    ],
    LeatherLace: [
        {
            title: "Blinding Lights",
            artist: "The Weeknd",
            url: "songs/Blinding Lights (PenduJatt.Com.Se).mp3",
            image: "img/TW.jpeg",
            duration: 200
        },
        {
            title: "Good 4 U",
            artist: "Olivia Rodrigo",
            url: "songs/Good 4 U (PenduJatt.Com.Se).mp3",
            image: "img/olivia rodrigo.jpeg",
            duration: 178
        },
        {
            title: "Levitating",
            artist: "Dua Lipa",
            url: "songs/Levitating (PenduJatt.Com.Se).mp3",
            image: "img/Future Nostalgia Dua Lipa.jpeg",
            duration: 203
        }
    ],
    SpellboundGrooves: [
        {
            title: "Blinding Lights",
            artist: "The Weeknd",
            url: "songs/Blinding Lights (PenduJatt.Com.Se).mp3",
            image: "img/TW.jpeg",
            duration: 200
        },
        {
            title: "Good 4 U",
            artist: "Olivia Rodrigo",
            url: "songs/Good 4 U (PenduJatt.Com.Se).mp3",
            image: "img/olivia rodrigo.jpeg",
            duration: 178
        },
        {
            title: "Levitating",
            artist: "Dua Lipa",
            url: "songs/Levitating (PenduJatt.Com.Se).mp3",
            image: "img/Future Nostalgia Dua Lipa.jpeg",
            duration: 203
        }
    ],
    Songsinshower: [
        {
            title: "Blinding Lights",
            artist: "The Weeknd",
            url: "songs/Blinding Lights (PenduJatt.Com.Se).mp3",
            image: "img/TW.jpeg",
            duration: 200
        },
        {
            title: "Good 4 U",
            artist: "Olivia Rodrigo",
            url: "songs/Good 4 U (PenduJatt.Com.Se).mp3",
            image: "img/olivia rodrigo.jpeg",
            duration: 178
        },
        {
            title: "Levitating",
            artist: "Dua Lipa",
            url: "songs/Levitating (PenduJatt.Com.Se).mp3",
            image: "img/Future Nostalgia Dua Lipa.jpeg",
            duration: 203
        }
    ],
    Cherrystainedlips: [
        {
            title: "Blinding Lights",
            artist: "The Weeknd",
            url: "songs/Blinding Lights (PenduJatt.Com.Se).mp3",
            image: "img/TW.jpeg",
            duration: 200
        },
        {
            title: "Good 4 U",
            artist: "Olivia Rodrigo",
            url: "songs/Good 4 U (PenduJatt.Com.Se).mp3",
            image: "img/olivia rodrigo.jpeg",
            duration: 178
        },
        {
            title: "Levitating",
            artist: "Dua Lipa",
            url: "songs/Levitating (PenduJatt.Com.Se).mp3",
            image: "img/Future Nostalgia Dua Lipa.jpeg",
            duration: 203
        }
    ],
    Rockclassics: [
        {
            title: "Blinding Lights",
            artist: "The Weeknd",
            url: "songs/Blinding Lights (PenduJatt.Com.Se).mp3",
            image: "img/TW.jpeg",
            duration: 200
        },
        {
            title: "Good 4 U",
            artist: "Olivia Rodrigo",
            url: "songs/Good 4 U (PenduJatt.Com.Se).mp3",
            image: "img/olivia rodrigo.jpeg",
            duration: 178
        },
        {
            title: "Levitating",
            artist: "Dua Lipa",
            url: "songs/Levitating (PenduJatt.Com.Se).mp3",
            image: "img/Future Nostalgia Dua Lipa.jpeg",
            duration: 203
        }
    ],
    Wetwindows: [
        {
            title: "Blinding Lights",
            artist: "The Weeknd",
            url: "songs/Blinding Lights (PenduJatt.Com.Se).mp3",
            image: "img/TW.jpeg",
            duration: 200
        },
        {
            title: "Good 4 U",
            artist: "Olivia Rodrigo",
            url: "songs/Good 4 U (PenduJatt.Com.Se).mp3",
            image: "img/olivia rodrigo.jpeg",
            duration: 178
        },
        {
            title: "Levitating",
            artist: "Dua Lipa",
            url: "songs/Levitating (PenduJatt.Com.Se).mp3",
            image: "img/Future Nostalgia Dua Lipa.jpeg",
            duration: 203
        }
    ],
    ignitethebeat: [
        {
            title: "Blinding Lights",
            artist: "The Weeknd",
            url: "songs/Blinding Lights (PenduJatt.Com.Se).mp3",
            image: "img/TW.jpeg",
            duration: 200
        },
        {
            title: "Good 4 U",
            artist: "Olivia Rodrigo",
            url: "songs/Good 4 U (PenduJatt.Com.Se).mp3",
            image: "img/olivia rodrigo.jpeg",
            duration: 178
        },
        {
            title: "Levitating",
            artist: "Dua Lipa",
            url: "songs/Levitating (PenduJatt.Com.Se).mp3",
            image: "img/Future Nostalgia Dua Lipa.jpeg",
            duration: 203
        }
    ],
    chillvibes: [
        {
            title: "Blinding Lights",
            artist: "The Weeknd",
            url: "songs/Blinding Lights (PenduJatt.Com.Se).mp3",
            image: "img/TW.jpeg",
            duration: 200
        },
        {
            title: "Good 4 U",
            artist: "Olivia Rodrigo",
            url: "songs/Good 4 U (PenduJatt.Com.Se).mp3",
            image: "img/olivia rodrigo.jpeg",
            duration: 178
        },
        {
            title: "Levitating",
            artist: "Dua Lipa",
            url: "songs/Levitating (PenduJatt.Com.Se).mp3",
            image: "img/Future Nostalgia Dua Lipa.jpeg",
            duration: 203
        }
    ],
    Jazzessentials: [
        {
            title: "Blinding Lights",
            artist: "The Weeknd",
            url: "songs/Blinding Lights (PenduJatt.Com.Se).mp3",
            image: "img/TW.jpeg",
            duration: 200
        },
        {
            title: "Good 4 U",
            artist: "Olivia Rodrigo",
            url: "songs/Good 4 U (PenduJatt.Com.Se).mp3",
            image: "img/olivia rodrigo.jpeg",
            duration: 178
        },
        {
            title: "Levitating",
            artist: "Dua Lipa",
            url: "songs/Levitating (PenduJatt.Com.Se).mp3",
            image: "img/Future Nostalgia Dua Lipa.jpeg",
            duration: 203
        }
    ],
    indiefavs: [
        {
            title: "Blinding Lights",
            artist: "The Weeknd",
            url: "songs/Blinding Lights (PenduJatt.Com.Se).mp3",
            image: "img/TW.jpeg",
            duration: 200
        },
        {
            title: "Good 4 U",
            artist: "Olivia Rodrigo",
            url: "songs/Good 4 U (PenduJatt.Com.Se).mp3",
            image: "img/olivia rodrigo.jpeg",
            duration: 178
        },
        {
            title: "Levitating",
            artist: "Dua Lipa",
            url: "songs/Levitating (PenduJatt.Com.Se).mp3",
            image: "img/Future Nostalgia Dua Lipa.jpeg",
            duration: 203
        }
    ]

};

// Initialize the app
function init() {
    if (currentUser) {
        showUserProfile();
    }
    loadUserPlaylists();
    updateProgressBar();
    updateTimeGreeting();
    initializeVolume();

    // Update greeting every minute
    setInterval(updateTimeGreeting, 60000);
}

// Time-based greeting function
function updateTimeGreeting() {
    const now = new Date();
    const hour = now.getHours();
    const greetingElement = document.getElementById('timeGreeting');

    let greeting;
    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon";
    } else if (hour >= 17 && hour < 22) {
        greeting = "Good Evening";
    } else {
        greeting = "Good Night";
    }

    if (currentUser) {
        greeting += `, ${currentUser.name}`;
    }

    document.getElementById("greeting").innerHTML = greeting;
}

// Volume control functions
function initializeVolume() {
    audioPlayer.volume = 0.7;
    document.getElementById('volumeProgress').style.width = '70%';
}

function changeVolume(event) {
    const volumeBar = event.currentTarget;
    const clickX = event.offsetX;
    const width = volumeBar.offsetWidth;
    const volume = Math.max(0, Math.min(1, clickX / width));

    audioPlayer.volume = volume;
    document.getElementById('volumeProgress').style.width = (volume * 100) + '%';

    // Update mute state
    if (volume === 0) {
        isMuted = true;
        document.querySelector('.volume-control').classList.add('muted');
    } else {
        isMuted = false;
        document.querySelector('.volume-control').classList.remove('muted');
        previousVolume = volume;
    }
}

function toggleMute() {
    if (isMuted) {
        // Unmute
        audioPlayer.volume = previousVolume;
        document.getElementById('volumeProgress').style.width = (previousVolume * 100) + '%';
        isMuted = false;
        document.querySelector('.volume-control').classList.remove('muted');
    } else {
        // Mute
        previousVolume = audioPlayer.volume;
        audioPlayer.volume = 0;
        document.getElementById('volumeProgress').style.width = '0%';
        isMuted = true;
        document.querySelector('.volume-control').classList.add('muted');
    }
}

function showVolumePreview(event) {
    const volumeBar = event.currentTarget;
    const hoverX = event.offsetX;
    const width = volumeBar.offsetWidth;
    const volume = Math.max(0, Math.min(1, hoverX / width));

    const volumeHover = document.getElementById('volumeHover');
    const volumeTooltip = document.getElementById('volumeTooltip');

    volumeHover.style.width = (volume * 100) + '%';
    volumeTooltip.textContent = Math.round(volume * 100);
    volumeTooltip.style.left = Math.min(Math.max(hoverX, 20), width - 20) + 'px';
}

function hideVolumePreview() {
    const volumeHover = document.getElementById('volumeHover');
    volumeHover.style.width = '0%';
}

// Authentication functions
function openLogin() {
    document.getElementById('loginModal').classList.add('active');
}

function openSignup() {
    document.getElementById('signupModal').classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function login(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simple demo login
    if (email && password) {
        currentUser = {
            email: email,
            name: email.split('@')[0],
            id: Date.now()
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showUserProfile();
        closeModal('loginModal');
        updateTimeGreeting();
    }
}

function signup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    if (name && email && password) {
        currentUser = {
            email: email,
            name: name,
            id: Date.now()
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showUserProfile();
        closeModal('signupModal');
        updateTimeGreeting();
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.getElementById('authButtons').style.display = 'flex';
    document.getElementById('userProfile').style.display = 'none';
    updateTimeGreeting();
}

function showUserProfile() {
    document.getElementById('authButtons').style.display = 'none';
    document.getElementById('userProfile').style.display = 'flex';
    document.getElementById('userName').textContent = `Hello, ${currentUser.name}!`;
}

// Navigation functions
function showHome() {
    setActivePage('homePage');
    setActiveNavItem('homeNav');
    addToHistory('home');
}

function showSearch() {
    setActivePage('searchPage');
    setActiveNavItem('searchNav');
    addToHistory('search');
}

function showPlaylistPage(playlistId) {
    setActivePage('playlistPage');
    loadPlaylistContent(playlistId);
    addToHistory(`playlist-${playlistId}`);
    setActiveNavItem(null);
}

function setActivePage(pageId) {
    document.querySelectorAll('.content-page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function setActiveNavItem(navId) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    if (navId) {
        document.getElementById(navId).classList.add('active');
    }
}

function addToHistory(page) {
    navigationHistory = navigationHistory.slice(0, currentHistoryIndex + 1);
    navigationHistory.push(page);
    currentHistoryIndex = navigationHistory.length - 1;
}

function goBack() {
    if (currentHistoryIndex > 0) {
        currentHistoryIndex--;
        navigateToHistoryPage(navigationHistory[currentHistoryIndex]);
    }
}

function goForward() {
    if (currentHistoryIndex < navigationHistory.length - 1) {
        currentHistoryIndex++;
        navigateToHistoryPage(navigationHistory[currentHistoryIndex]);
    }
}

function navigateToHistoryPage(page) {
    if (page === 'home') {
        setActivePage('homePage');
        setActiveNavItem('homeNav');
    } else if (page === 'search') {
        setActivePage('searchPage');
        setActiveNavItem('searchNav');
    } else if (page.startsWith('playlist-')) {
        const playlistId = page.replace('playlist-', '');
        setActivePage('playlistPage');
        loadPlaylistContent(playlistId);
        setActiveNavItem(null);
    }
}

// Playlist functions
function createPlaylist() {
    if (!currentUser) {
        alert('Please log in to create playlists');
        openLogin();
        return;
    }
    document.getElementById('createPlaylistModal').classList.add('active');
}

function addSong() {
    if (!currentUser) {
        alert('Please log in to add songs');
        openLogin();
        return;
    }

    // Populate playlist dropdown
    const select = document.getElementById('targetPlaylist');
    select.innerHTML = '<option value="">Select a playlist</option>';

    userPlaylists.forEach(playlist => {
        if (playlist.createdBy === currentUser.id) {
            const option = document.createElement('option');
            option.value = playlist.id;
            option.textContent = playlist.name;
            select.appendChild(option);
        }
    });

    document.getElementById('addSongModal').classList.add('active');
}

function addSongToPlaylist(event) {
    event.preventDefault();

    const title = document.getElementById('songTitle').value;
    const artist = document.getElementById('songArtist').value;
    const audioFile = document.getElementById('songFile').files[0];
    const imageFile = document.getElementById('songImage').files[0];
    const playlistId = document.getElementById('targetPlaylist').value;

    if (!audioFile) {
        alert('Please select an audio file');
        return;
    }

    if (!playlistId) {
        alert('Please select a playlist');
        return;
    }

    // Create URLs for uploaded files (temporary solution)
    const audioUrl = URL.createObjectURL(audioFile);
    let imageUrl = 'https://via.placeholder.com/300x300/1DB954/000000?text=â™ª';

    if (imageFile) {
        imageUrl = URL.createObjectURL(imageFile);
    }

    // Get audio duration
    const audio = new Audio(audioUrl);
    audio.addEventListener('loadedmetadata', () => {
        const newSong = {
            title: title,
            artist: artist,
            url: audioUrl,
            image: imageUrl,
            duration: Math.floor(audio.duration),
            id: Date.now(),
            isUploaded: true,
            fileName: audioFile.name,
            imageFileName: imageFile ? imageFile.name : null
        };

        // Find and update the playlist
        const playlistIndex = userPlaylists.findIndex(p => p.id == playlistId);
        if (playlistIndex !== -1) {
            userPlaylists[playlistIndex].songs.push(newSong);
            localStorage.setItem('userPlaylists', JSON.stringify(userPlaylists));
            loadUserPlaylists();

            // Clear form
            document.getElementById('songTitle').value = '';
            document.getElementById('songArtist').value = '';
            document.getElementById('songFile').value = '';
            document.getElementById('songImage').value = '';
            document.getElementById('targetPlaylist').value = '';

            closeModal('addSongModal');
            alert('Song added successfully!\n\nNote: Uploaded songs will work during this session. To keep songs permanently, place your audio files in the "audio/" folder and update the playlist URLs in the code.');
        }
    });

    audio.addEventListener('error', () => {
        alert('Error loading the audio file. Please make sure it\'s a valid audio format (MP3, WAV, OGG, M4A).');
    });
}

function saveNewPlaylist(event) {
    event.preventDefault();
    const name = document.getElementById('playlistName').value;
    const description = document.getElementById('playlistDescription').value;

    const newPlaylist = {
        id: Date.now(),
        name: name,
        description: description,
        songs: [],
        createdBy: currentUser.id,
        createdAt: new Date().toISOString()
    };

    userPlaylists.push(newPlaylist);
    localStorage.setItem('userPlaylists', JSON.stringify(userPlaylists));
    loadUserPlaylists();
    closeModal('createPlaylistModal');

    // Clear form
    document.getElementById('playlistName').value = '';
    document.getElementById('playlistDescription').value = '';
}

function loadUserPlaylists() {
    const playlistList = document.getElementById('playlistList');
    playlistList.innerHTML = '';

    userPlaylists.forEach(playlist => {
        if (!currentUser || playlist.createdBy === currentUser.id) {
            const playlistItem = document.createElement('div');
            playlistItem.className = 'playlist-item';
            playlistItem.innerHTML = `<h4>${playlist.name}</h4><p>${playlist.songs.length} songs</p>`;
            playlistItem.onclick = () => showPlaylistPage(playlist.id);
            playlistList.appendChild(playlistItem);
        }
    });
}

function loadPlaylistContent(playlistId) {
    const playlist = userPlaylists.find(p => p.id == playlistId) || defaultPlaylists[playlistId];
    const playlistTitle = document.getElementById('playlistTitle');
    const playlistContent = document.getElementById('playlistContent');

    if (playlist) {
        if (playlist.name) {
            // User playlist
            playlistTitle.textContent = playlist.name;

            let contentHTML = `
                <div class="playlist-header" style="margin-bottom: 30px;">
                    <p style="color: #a7a7a7; margin-bottom: 10px;">${playlist.description || 'Custom playlist'}</p>
                    <p style="color: #a7a7a7;">${playlist.songs.length} songs</p>
                    ${playlist.songs.length > 0 ? `<button onclick="playUserPlaylist(0, ${playlist.id})" style="background-color: #1db954; border: none; padding: 12px 24px; border-radius: 20px; color: black; font-weight: bold; margin-top: 20px; cursor: pointer;">Play All</button>` : ''}
                </div>
            `;

            if (playlist.songs.length > 0) {
                contentHTML += '<div class="cardContainer">';
                playlist.songs.forEach((song, index) => {
                    const songTitle = song.title || 'Unknown Title';
                    const songArtist = song.artist || 'Unknown Artist';
                    const songImage = song.image || 'https://via.placeholder.com/300x300/1DB954/000000?text=â™ª';

                    contentHTML += `
                        <div class="card" onclick="playUserPlaylist(${index}, ${playlist.id})">
                            <div class="play">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                                    <circle cx="24" cy="24" r="24" fill="#1DB954"/>
                                    <polygon points="18,14 34,24 18,34" fill="black"/>
                                </svg>
                            </div>
                            <img src="${songImage}" alt="${songTitle}" onerror="this.src='https://via.placeholder.com/300x300/1DB954/000000?text=â™ª'">
                            <h2>${songTitle}</h2>
                            <p>${songArtist}</p>
                            ${song.isUploaded ? '<small style="color: #1db954;">Uploaded File</small>' : ''}
                        </div>
                    `;
                });
                contentHTML += '</div>';
            } else {
                contentHTML += '<p style="color: #a7a7a7;">No songs in this playlist yet. Use the "Add Song" button to add music!</p>';
            }

            playlistContent.innerHTML = contentHTML;
        } else {
            // Default playlist
            const playlistNames = {
                popular: "Today's Top Hits",
                Punjabi: "Hot Hits Punjabi",
                rock: "Rock Classics",
                jazz: "Jazz Essentials",
                workout: "Workout Beats",
                indie: "Indie Favorites"
            };
            playlistTitle.textContent = playlistNames[playlistId] || "Playlist";

            let contentHTML = `
                <div class="playlist-header" style="margin-bottom: 30px;">
                    
                    <p style="color: #a7a7a7;">${playlist.length} songs</p>
                    <button onclick="playPlaylist('${playlistId}')" style="background-color: #1db954; border: none; padding: 6px 12px; border-radius: 10px; color: black; font-weight: bold; margin-top: 10px; cursor: pointer;">Play All</button>
                </div>
                <div class="cardContainer">
            `;

            playlist.forEach((song, index) => {
                contentHTML += `
                    <div class="card" onclick="playSong(${index}, '${playlistId}')">
                        <div class="play">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                                <circle cx="24" cy="24" r="24" fill="#1DB954"/>
                                <polygon points="18,14 34,24 18,34" fill="black"/>
                            </svg>
                        </div>
                        <img src="${song.image}" alt="${song.title}" onerror="this.src='https://via.placeholder.com/300x300/1DB954/000000?text=â™ª'">
                        <h2>${song.title}</h2>
                        <p>${song.artist}</p>
                    </div>
                `;
            });
            contentHTML += '</div>';
            playlistContent.innerHTML = contentHTML;
        }
    }
}

function playUserPlaylist(index, playlistId) {
    const playlist = userPlaylists.find(p => p.id == playlistId);
    if (playlist && playlist.songs.length > 0) {
        currentPlaylist = playlist.songs;
        currentIndex = index;
        playSong(index);
    }
}

// Music player functions
function playPlaylist(playlistId) {
    currentPlaylist = defaultPlaylists[playlistId] || [];
    currentIndex = 0;
    if (currentPlaylist.length > 0) {
        playSong(0, playlistId);
    }
}

function playSong(index, playlistId) {
    if (playlistId && defaultPlaylists[playlistId]) {
        currentPlaylist = defaultPlaylists[playlistId];
    }

    if (currentPlaylist.length === 0) return;

    currentIndex = index;
    currentSong = currentPlaylist[currentIndex];

    if (currentSong) {
        document.getElementById('currentSongTitle').textContent = currentSong.title;
        document.getElementById('currentSongArtist').textContent = currentSong.artist;
        document.getElementById('currentSongImage').src = currentSong.image;

        audioPlayer.src = currentSong.url;
        audioPlayer.play().catch(error => {
            console.error('Error playing song:', error);
            if (currentSong.isUploaded) {
                alert('Cannot play uploaded song. The file may no longer be available after page reload.\n\nFor permanent storage, place your audio files in the "audio/" folder and update the code.');
            } else {
                alert('Error playing song. Please check the audio file.');
            }
        });
        isPlaying = true;
        updatePlayButton();
    }
}

function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
    } else {
        audioPlayer.play();
        isPlaying = true;
    }
    updatePlayButton();
}

function updatePlayButton() {
    if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

const repeatBtn = document.getElementById('repeatBtn');
const repeatBtnoff = document.getElementById('repeatBtnoff');

if (repeatBtn && repeatBtnoff) {
    repeatBtn.addEventListener('click', toggleRepeat);
    repeatBtnoff.addEventListener('click', toggleRepeat);
}

function toggleRepeat() {
    isRepeated = !isRepeated;
    audioPlayer.loop = isRepeated;
    updateRepeatButton();
}

function updateRepeatButton() {
    if (isRepeated) {
        repeatBtn.style.display = 'block';
        repeatBtnoff.style.display = 'none';
    } else {
        repeatBtn.style.display = 'none';
        repeatBtnoff.style.display = 'block';
    }
}

function nextSong() {
    if (currentPlaylist.length === 0) return;

    if (isShuffled) {
        currentIndex = Math.floor(Math.random() * currentPlaylist.length);
    } else {
        currentIndex = (currentIndex + 1) % currentPlaylist.length;
    }

    playSong(currentIndex);
}

function previousSong() {
    if (currentPlaylist.length === 0) return;

    if (isShuffled) {
        currentIndex = Math.floor(Math.random() * currentPlaylist.length);
    } else {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : currentPlaylist.length - 1;
    }

    playSong(currentIndex);
}

function toggleShuffle() {
    isShuffled = !isShuffled;
    document.getElementById('shuffleBtn').classList.toggle('active', isShuffled);
}

function seekSong(event) {
    const progressBar = event.currentTarget;
    const clickX = event.offsetX;
    const width = progressBar.offsetWidth;
    const duration = audioPlayer.duration;

    if (duration) {
        const newTime = (clickX / width) * duration;
        audioPlayer.currentTime = newTime;
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateProgressBar() {
    if (audioPlayer.duration) {
        const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progress.style.width = progressPercent + '%';
        currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
        durationSpan.textContent = formatTime(audioPlayer.duration);
    }
}

// Search functions
function performSearch(query) {
    const searchResults = document.getElementById('searchResults');

    if (!query.trim()) {
        // Show browse categories when no search query
        searchResults.innerHTML = `
            <h2>Browse all</h2>
            <div class="search-categories">
                <div class="category-card" style="background-color: #e13300;" onclick="searchCategory('pop')">
                    <h3>Pop</h3>
                </div>
                <div class="category-card" style="background-color: #ba5d07;" onclick="searchCategory('rock')">
                    <h3>Rock</h3>
                </div>
                <div class="category-card" style="background-color: #8d67ab;" onclick="searchCategory('hip-hop')">
                    <h3>Punjabi</h3>
                </div>
                <div class="category-card" style="background-color: #1e3264;" onclick="searchCategory('jazz')">
                    <h3>Jazz</h3>
                </div>
                <div class="category-card" style="background-color: #148a08;" onclick="searchCategory('electronic')">
                    <h3>Electronic</h3>
                </div>
                <div class="category-card" style="background-color: #503750;" onclick="searchCategory('indie')">
                    <h3>Indie</h3>
                </div>
                
            </div>
        `;
        return;
    }

    // Simple search through all songs
    const allSongs = [];
    Object.values(defaultPlaylists).forEach(playlist => {
        allSongs.push(...playlist);
    });

    const filteredSongs = allSongs.filter(song =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredSongs.length > 0) {
        let resultsHTML = `<h2>Search results for "${query}"</h2><div class="cardContainer">`;
        filteredSongs.forEach((song, index) => {
            resultsHTML += `
                <div class="card" onclick="playSearchResult(${index}, '${JSON.stringify(filteredSongs).replace(/"/g, '&quot;')}')">
                    <div class="play">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                            <circle cx="24" cy="24" r="24" fill="#1DB954"/>
                            <polygon points="18,14 34,24 18,34" fill="black"/>
                        </svg>
                    </div>
                    <img src="${song.image}" alt="${song.title}">
                    <h2>${song.title}</h2>
                    <p>${song.artist}</p>
                </div>
            `;
        });
        resultsHTML += '</div>';
        searchResults.innerHTML = resultsHTML;
    } else {
        searchResults.innerHTML = `<h2>No results found for "${query}"</h2><p>Try searching for something else.</p>`;
    }
}

function searchCategory(category) {
    // Map categories to playlists
    const categoryMap = {
        'pop': 'popular',
        'rock': 'rock',
        'jazz': 'jazz',
        'indie': 'indie',
        'electronic': 'workout',
        'hip-hop': 'Punjabi',
    };

    const playlistId = categoryMap[category];
    if (playlistId && defaultPlaylists[playlistId]) {
        showPlaylistPage(playlistId);
    }
}

function playSearchResult(index, songsJson) {
    try {
        const songs = JSON.parse(songsJson.replace(/&quot;/g, '"'));
        currentPlaylist = songs;
        currentIndex = index;
        playSong(index);
    } catch (e) {
        console.error('Error playing search result:', e);
    }
}

// Audio event listeners
document.getElementById('shuffleBtn').addEventListener('click', toggleShuffle);
audioPlayer.addEventListener('timeupdate', updateProgressBar);
audioPlayer.addEventListener('ended', () => {
    if (isRepeated) {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    } else {
        nextSong();
    }
});

audioPlayer.addEventListener('loadedmetadata', () => {
    durationSpan.textContent = formatTime(audioPlayer.duration);
});

audioPlayer.addEventListener('play', () => {
    isPlaying = true;
    updatePlayButton();
});

audioPlayer.addEventListener('pause', () => {
    isPlaying = false;
    updatePlayButton();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        togglePlay();
    } else if (e.code === 'ArrowRight' && e.ctrlKey) {
        e.preventDefault();
        nextSong();
    } else if (e.code === 'ArrowLeft' && e.ctrlKey) {
        e.preventDefault();
        previousSong();
    } else if (e.code === 'KeyM' && e.ctrlKey) {
        e.preventDefault();
        toggleMute();
    }
});

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Initialize the app when page loads
init();


// SoundCloud Integration for your Spotify Clone
// Add this to your existing script.js

// SoundCloud Widget API
const SC_WIDGET_API = 'https://w.soundcloud.com/player/api.js';

// Load SoundCloud Widget API
function loadSoundCloudAPI() {
    return new Promise((resolve) => {
        if (window.SC) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = SC_WIDGET_API;
        script.onload = () => resolve();
        document.head.appendChild(script);
    });
}

// SoundCloud playlist data structure
const soundcloudPlaylists = {
    electronic: [
        {
            title: "Chill Electronic",
            artist: "Various Artists",
            soundcloudUrl: "https://soundcloud.com/example/chill-electronic",
            image: "img/electronic-cover.jpg",
            duration: 240,
            isSoundCloud: true
        }
    ],
    indie: [
        {
            title: "Indie Discoveries",
            artist: "Indie Artist",
            soundcloudUrl: "https://soundcloud.com/example/indie-track",
            image: "img/indie-cover.jpg",
            duration: 195,
            isSoundCloud: true
        }
    ]
};

// Enhanced playSong function with SoundCloud support
function playSongWithSoundCloud(index, playlistId) {
    if (playlistId && defaultPlaylists[playlistId]) {
        currentPlaylist = defaultPlaylists[playlistId];
    } else if (playlistId && soundcloudPlaylists[playlistId]) {
        currentPlaylist = soundcloudPlaylists[playlistId];
    }

    if (currentPlaylist.length === 0) return;

    currentIndex = index;
    currentSong = currentPlaylist[currentIndex];

    if (currentSong) {
        document.getElementById('currentSongTitle').textContent = currentSong.title;
        document.getElementById('currentSongArtist').textContent = currentSong.artist;
        document.getElementById('currentSongImage').src = currentSong.image;

        if (currentSong.isSoundCloud) {
            // Play SoundCloud track
            playSoundCloudTrack(currentSong.soundcloudUrl);
        } else {
            // Play regular audio file
            audioPlayer.src = currentSong.url;
            audioPlayer.play();
        }

        isPlaying = true;
        updatePlayButton();
    }
}

// SoundCloud player functions
async function playSoundCloudTrack(soundcloudUrl) {
    await loadSoundCloudAPI();

    // Hide regular audio player
    audioPlayer.pause();

    // Create SoundCloud widget if it doesn't exist
    if (!document.getElementById('soundcloud-player')) {
        createSoundCloudWidget();
    }

    const widget = SC.Widget('soundcloud-player');

    // Load and play the track
    widget.load(soundcloudUrl, {
        auto_play: true,
        hide_related: true,
        show_comments: false,
        show_user: true,
        show_reposts: false,
        visual: false
    });

    // Listen for widget events
    widget.bind(SC.Widget.Events.READY, function () {
        widget.play();
    });

    widget.bind(SC.Widget.Events.FINISH, function () {
        nextSong();
    });

    widget.bind(SC.Widget.Events.PLAY, function () {
        isPlaying = true;
        updatePlayButton();
    });

    widget.bind(SC.Widget.Events.PAUSE, function () {
        isPlaying = false;
        updatePlayButton();
    });
}

// Create hidden SoundCloud widget
function createSoundCloudWidget() {
    const widgetContainer = document.createElement('div');
    widgetContainer.innerHTML = `
        <iframe 
            id="soundcloud-player"
            width="100%" 
            height="166" 
            scrolling="no" 
            frameborder="no" 
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/34019569&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true&amp;visual=true"
            style="display: none;">
        </iframe>
    `;
    document.body.appendChild(widgetContainer);
}

// Enhanced toggle play for SoundCloud
function togglePlayWithSoundCloud() {
    if (currentSong && currentSong.isSoundCloud) {
        const widget = SC.Widget('soundcloud-player');
        if (isPlaying) {
            widget.pause();
        } else {
            widget.play();
        }
    } else {
        // Regular audio player toggle
        togglePlay();
    }
}

// SoundCloud search function
async function searchSoundCloud(query) {
    const CLIENT_ID = 'your_soundcloud_client_id'; // Get from SoundCloud
    const searchUrl = `https://api.soundcloud.com/tracks?q=${encodeURIComponent(query)}&client_id=${CLIENT_ID}&limit=20`;

    try {
        const response = await fetch(searchUrl);
        const tracks = await response.json();

        return tracks.map(track => ({
            title: track.title,
            artist: track.user.username,
            soundcloudUrl: track.permalink_url,
            image: track.artwork_url || track.user.avatar_url,
            duration: Math.floor(track.duration / 1000),
            isSoundCloud: true
        }));
    } catch (error) {
        console.error('SoundCloud search error:', error);
        return [];
    }
}

// Add SoundCloud results to search
async function performSearchWithSoundCloud(query) {
    const searchResults = document.getElementById('searchResults');

    if (!query.trim()) {
        // Show regular browse categories
        performSearch(query);
        return;
    }

    // Search both local and SoundCloud
    const localResults = searchLocalTracks(query);
    const soundcloudResults = await searchSoundCloud(query);

    const allResults = [...localResults, ...soundcloudResults];

    if (allResults.length > 0) {
        let resultsHTML = `<h2>Search results for "${query}"</h2><div class="cardContainer">`;

        allResults.forEach((song, index) => {
            const sourceLabel = song.isSoundCloud ? 'SoundCloud' : 'Local';
            resultsHTML += `
                <div class="card" onclick="playSearchResultMixed(${index}, '${JSON.stringify(allResults).replace(/"/g, '&quot;')}')">
                    <div class="play">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                            <circle cx="24" cy="24" r="24" fill="#1DB954"/>
                            <polygon points="18,14 34,24 18,34" fill="black"/>
                        </svg>
                    </div>
                    <img src="${song.image}" alt="${song.title}">
                    <h2>${song.title}</h2>
                    <p>${song.artist}</p>
                    <small style="color: #ff5500;">${sourceLabel}</small>
                </div>
            `;
        });
        resultsHTML += '</div>';
        searchResults.innerHTML = resultsHTML;
    } else {
        searchResults.innerHTML = `<h2>No results found for "${query}"</h2>`;
    }
}

function searchLocalTracks(query) {
    const allSongs = [];
    Object.values(defaultPlaylists).forEach(playlist => {
        allSongs.push(...playlist);
    });

    return allSongs.filter(song =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
    );
}

function playSearchResultMixed(index, songsJson) {
    try {
        const songs = JSON.parse(songsJson.replace(/&quot;/g, '"'));
        currentPlaylist = songs;
        currentIndex = index;

        const song = songs[index];
        if (song.isSoundCloud) {
            playSongWithSoundCloud(index);
        } else {
            playSong(index);
        }
    } catch (e) {
        console.error('Error playing mixed search result:', e);
    }
}

