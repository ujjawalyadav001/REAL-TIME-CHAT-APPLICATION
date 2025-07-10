document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const sidebar = document.getElementById('sidebar');
    const chatArea = document.getElementById('chatArea');
    const backButton = document.getElementById('backButton');
    const contactList = document.getElementById('contactList');
    const messagesContainer = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const currentContactName = document.getElementById('currentContactName');
    const currentContactAvatar = document.getElementById('currentContactAvatar');
    const currentContactStatus = document.getElementById('currentContactStatus');
    const contactInfoBtn = document.getElementById('contactInfoBtn');
    const profileModal = document.getElementById('profileModal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const newChatBtn = document.getElementById('newChatBtn');
    const newChatModal = document.getElementById('newChatModal');
    const filterBtn = document.getElementById('filterBtn');
    const filterOptions = document.getElementById('filterOptions');
    const themeBtn = document.getElementById('themeBtn');
    const wallpaperBtn = document.getElementById('wallpaperBtn');
    const wallpaperModal = document.getElementById('wallpaperModal');
    const fontBtn = document.getElementById('fontBtn');
    const fontSizeBtn = document.getElementById('fontSizeBtn');
    const searchInput = document.getElementById('searchInput');
    const newChatSearch = document.getElementById('newChatSearch');
    const newContactList = document.getElementById('newContactList');

    // Sample Data
    const contacts = [
        { 
            id: 1,
            name: "Justin O'Moore", 
            preview: "Hey there! What's up? Is everything...", 
            avatar: "J",
            time: "10:30 AM",
            unread: 2,
            isFavorite: false,
            isUnread: true,
            isGroup: false,
            lastSeen: "Online",
            phone: "+1 (555) 123-4567",
            email: "justin@example.com",
            about: "Available for calls"
        },
        { 
            id: 2,
            name: "Alaya Cordova", 
            preview: "Can I call you back later? I'm in a...", 
            avatar: "A",
            time: "Yesterday",
            unread: 0,
            isFavorite: true,
            isUnread: false,
            isGroup: false,
            lastSeen: "Last seen today at 9:15 AM",
            phone: "+1 (555) 234-5678",
            email: "alaya@example.com",
            about: "In a meeting"
        },
        { 
            id: 3,
            name: "Eathan Sheridan", 
            preview: "Yeah. Do you have any good song...", 
            avatar: "E",
            time: "Yesterday",
            unread: 0,
            isFavorite: false,
            isUnread: false,
            isGroup: false,
            lastSeen: "Last seen yesterday at 11:45 PM",
            phone: "+1 (555) 345-6789",
            email: "eathan@example.com",
            about: "Music lover"
        },
        { 
            id: 4,
            name: "Cecily Trujillo", 
            preview: "Hi! I went shopping today and fou...", 
            avatar: "C",
            time: "Monday",
            unread: 5,
            isFavorite: false,
            isUnread: true,
            isGroup: false,
            lastSeen: "Online",
            phone: "+1 (555) 456-7890",
            email: "cecily@example.com",
            about: "Shopping enthusiast"
        },
        { 
            id: 5,
            name: "Komal Orr", 
            preview: "I passed you on the ride into work...", 
            avatar: "K",
            time: "Sunday",
            unread: 0,
            isFavorite: true,
            isUnread: false,
            isGroup: false,
            lastSeen: "Last seen Sunday at 2:30 PM",
            phone: "+1 (555) 567-8901",
            email: "komal@example.com",
            about: "Commuter buddy"
        },
        { 
            id: 6,
            name: "Tannaz Sadeghi", 
            preview: "Yeah I know. I'm in the same position 😊", 
            avatar: "T",
            time: "Saturday",
            unread: 0,
            isFavorite: true,
            isUnread: false,
            isGroup: false,
            lastSeen: "Online",
            phone: "+1 (555) 678-9012",
            email: "tannaz@example.com",
            about: "Hey there! I'm using this chat app."
        },
        { 
            id: 7,
            name: "Design Team", 
            preview: "Alice: I've finished the mockups...", 
            avatar: "D",
            time: "Friday",
            unread: 3,
            isFavorite: false,
            isUnread: true,
            isGroup: true,
            lastSeen: "",
            phone: "",
            email: "",
            about: "Group for design team collaboration"
        }
    ];

    const availableContacts = [
        { id: 8, name: "Michael Chen", avatar: "M" },
        { id: 9, name: "Sarah Johnson", avatar: "S" },
        { id: 10, name: "David Kim", avatar: "D" },
        { id: 11, name: "Emily Wilson", avatar: "E" },
        { id: 12, name: "Marketing Team", avatar: "M", isGroup: true }
    ];

    let conversations = {
        1: [
            { text: "Hey there! What's up? Is everything okay?", received: true, time: "10:30 AM" }
        ],
        2: [
            { text: "Can I call you back later? I'm in a meeting right now", received: true, time: "Yesterday" }
        ],
        3: [
            { text: "Yeah. Do you have any good song recommendations?", received: true, time: "Yesterday" }
        ],
        4: [
            { text: "Hi! I went shopping today and found this amazing dress!", received: true, time: "Monday" }
        ],
        5: [
            { text: "I passed you on the ride into work this morning but you didn't see me", received: true, time: "Sunday" }
        ],
        6: [
            { text: "Hey there! What's up?", received: true, time: "11:30 AM" },
            { text: "Nothing. Just chilling and watching YouTube. What about you?", received: false, time: "11:32 AM" },
            { text: "Same here! Been watching YouTube for the past 5 hours despite having so much to do! 😊", received: true, time: "11:33 AM" },
            { text: "It's hard to be productive, man 😊", received: false, time: "11:35 AM" },
            { text: "Yeah I know. I'm in the same position 😊", received: true, time: "11:36 AM" }
        ],
        7: [
            { text: "Alice: I've finished the mockups for the new dashboard", received: true, time: "Friday" },
            { text: "Bob: Great! Can you share them with the team?", received: true, time: "Friday" },
            { text: "Charlie: I'll review them and provide feedback", received: true, time: "Friday" }
        ]
    };

    let currentChatId = 6; // Default to Tannaz Sadeghi
    let currentFilter = 'all';

    // Initialize the app
    function init() {
        renderContacts();
        renderMessages(currentChatId);
        setupEventListeners();
        updateCurrentContactInfo();
    }

    // Render contacts list
    function renderContacts() {
        contactList.innerHTML = '';
        
        // Filter contacts based on current filter
        let filteredContacts = [...contacts];
        
        switch(currentFilter) {
            case 'unread':
                filteredContacts = filteredContacts.filter(contact => contact.isUnread);
                break;
            case 'favorite':
                filteredContacts = filteredContacts.filter(contact => contact.isFavorite);
                break;
            case 'groups':
                filteredContacts = filteredContacts.filter(contact => contact.isGroup);
                break;
            case 'alphabet':
                filteredContacts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'date':
                // This is a simplified sort - in a real app you'd use actual timestamps
                filteredContacts.sort((a, b) => {
                    const timeOrder = ['Today', 'Yesterday', 'Monday', 'Sunday', 'Saturday', 'Friday'];
                    return timeOrder.indexOf(a.time) - timeOrder.indexOf(b.time);
                });
                break;
        }
        
        // Apply search filter if any
        if (searchInput.value) {
            const searchTerm = searchInput.value.toLowerCase();
            filteredContacts = filteredContacts.filter(contact => 
                contact.name.toLowerCase().includes(searchTerm) || 
                contact.preview.toLowerCase().includes(searchTerm)
            );
        }
        
        if (filteredContacts.length === 0) {
            const noContacts = document.createElement('div');
            noContacts.className = 'no-contacts';
            noContacts.textContent = 'No contacts found';
            contactList.appendChild(noContacts);
            return;
        }
        
        filteredContacts.forEach(contact => {
            const contactElement = document.createElement('div');
            contactElement.className = `contact ${contact.id === currentChatId ? 'active' : ''} ${contact.isFavorite ? 'favorite' : ''}`;
            contactElement.dataset.contactId = contact.id;
            
            const unreadBadge = contact.unread > 0 ? 
                `<span class="unread-badge">${contact.unread}</span>` : '';
            
            const favoriteIcon = contact.isFavorite ? 
                `<i class="fas fa-star favorite-icon"></i>` : '';
            
            contactElement.innerHTML = `
                <div class="contact-avatar">${contact.avatar}</div>
                <div class="contact-info">
                    <div class="contact-name">
                        ${contact.name}
                        <span>${contact.time}</span>
                    </div>
                    <div class="contact-preview">
                        ${contact.preview}
                        ${unreadBadge}
                    </div>
                </div>
                <div class="contact-actions">
                    <button class="favorite-btn" data-contact-id="${contact.id}" title="${contact.isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                        ${favoriteIcon}
                    </button>
                </div>
            `;
            
            // Add click event to open chat
            contactElement.addEventListener('click', () => openChat(contact.id));
            
            // Add favorite button event
            const favoriteBtn = contactElement.querySelector('.favorite-btn');
            if (favoriteBtn) {
                favoriteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleFavorite(contact.id);
                });
            }
            
            contactList.appendChild(contactElement);
        });
    }

    // Render available contacts for new chat
    function renderAvailableContacts() {
        newContactList.innerHTML = '';
        
        let filteredContacts = [...availableContacts];
        
        if (newChatSearch.value) {
            const searchTerm = newChatSearch.value.toLowerCase();
            filteredContacts = filteredContacts.filter(contact => 
                contact.name.toLowerCase().includes(searchTerm)
            );
        }
        
        if (filteredContacts.length === 0) {
            const noContacts = document.createElement('div');
            noContacts.className = 'no-contacts';
            noContacts.textContent = 'No contacts found';
            newContactList.appendChild(noContacts);
            return;
        }
        
        filteredContacts.forEach(contact => {
            const contactElement = document.createElement('div');
            contactElement.className = 'contact';
            contactElement.innerHTML = `
                <div class="contact-avatar">${contact.avatar}</div>
                <div class="contact-info">
                    <div class="contact-name">
                        ${contact.name}
                        ${contact.isGroup ? '<span class="group-badge">Group</span>' : ''}
                    </div>
                </div>
            `;
            
            contactElement.addEventListener('click', () => {
                createNewChat(contact);
                closeModal(newChatModal);
            });
            
            newContactList.appendChild(contactElement);
        });
    }

    // Open chat with a contact
    function openChat(contactId) {
        // Mark as read when opening chat
        const contact = contacts.find(c => c.id === contactId);
        if (contact) {
            contact.isUnread = false;
            contact.unread = 0;
        }
        
        currentChatId = contactId;
        renderMessages(contactId);
        updateCurrentContactInfo();
        
        // Update active state in contact list
        document.querySelectorAll('.contact').forEach(el => {
            el.classList.toggle('active', parseInt(el.dataset.contactId) === contactId);
        });
        
        // For mobile view
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
            chatArea.classList.add('active');
        }
    }

    // Create new chat
    function createNewChat(contact) {
        // In a real app, this would add the contact to your contacts list
        // For this demo, we'll just show an alert
        alert(`New chat created with ${contact.name}`);
    }

    // Toggle favorite status
    function toggleFavorite(contactId) {
        const contact = contacts.find(c => c.id === contactId);
        if (contact) {
            contact.isFavorite = !contact.isFavorite;
            renderContacts();
        }
    }

    // Render messages for a conversation
    function renderMessages(contactId) {
        messagesContainer.innerHTML = '';
        const messages = conversations[contactId] || [];
        
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = `message ${message.received ? 'received' : 'sent'}`;
            messageElement.innerHTML = `
                ${message.text}
                <div class="message-time">${message.time}</div>
            `;
            messagesContainer.appendChild(messageElement);
        });
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Update current contact info in chat header
    function updateCurrentContactInfo() {
        const contact = contacts.find(c => c.id === currentChatId);
        if (contact) {
            currentContactName.textContent = contact.name;
            currentContactAvatar.textContent = contact.avatar;
            currentContactStatus.textContent = contact.lastSeen;
            currentContactStatus.className = `contact-status ${contact.lastSeen === 'Online' ? 'online' : ''}`;
            
            // Update profile modal info
            document.getElementById('profileName').textContent = contact.name;
            document.getElementById('profileAvatar').textContent = contact.avatar;
            document.getElementById('profileStatus').textContent = contact.lastSeen;
            document.getElementById('profilePhone').textContent = contact.phone;
            document.getElementById('profileEmail').textContent = contact.email;
            document.getElementById('profileAbout').textContent = contact.about;
        }
    }

    // Send a new message
    function sendMessage() {
        const text = messageInput.value.trim();
        if (text === '') return;
        
        if (!conversations[currentChatId]) {
            conversations[currentChatId] = [];
        }
        
        // Add new message to conversation
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        conversations[currentChatId].push({
            text: text,
            received: false,
            time: timeString
        });
        
        // Update UI
        renderMessages(currentChatId);
        messageInput.value = '';
        
        // Simulate reply after 1 second
        setTimeout(() => {
            if (conversations[currentChatId]) {
                conversations[currentChatId].push({
                    text: getRandomReply(),
                    received: true,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                });
                renderMessages(currentChatId);
            }
        }, 1000);
    }

    // Generate random replies
    function getRandomReply() {
        const replies = [
            "That's interesting!",
            "I see what you mean.",
            "Tell me more about that.",
            "I agree with you.",
            "Let's talk about this later.",
            "Thanks for letting me know!",
            "I'm not sure about that.",
            "What do you think we should do?",
            "That sounds great!",
            "I'll get back to you on that."
        ];
        return replies[Math.floor(Math.random() * replies.length)];
    }

    // Toggle theme
    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    }

    // Change wallpaper
    function changeWallpaper(wallpaper) {
        let wallpaperImage = '';
        
        switch(wallpaper) {
            case 'nature':
                wallpaperImage = 'url("https://source.unsplash.com/random/1920x1080/?nature")';
                break;
            case 'abstract':
                wallpaperImage = 'url("https://source.unsplash.com/random/1920x1080/?abstract")';
                break;
            case 'gradient':
                wallpaperImage = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                break;
            case 'solid-light':
                wallpaperImage = 'none';
                document.documentElement.style.setProperty('--chat-bg', '#f0f2f5');
                break;
            case 'solid-dark':
                wallpaperImage = 'none';
                document.documentElement.style.setProperty('--chat-bg', '#18191a');
                break;
            default:
                wallpaperImage = 'none';
                document.documentElement.style.setProperty('--chat-bg', 'var(--chat-bg)');
        }
        
        document.documentElement.style.setProperty('--wallpaper-image', wallpaperImage);
        localStorage.setItem('wallpaper', wallpaper);
    }

    // Change font
    function changeFont(font) {
        document.body.className = document.body.className.replace(/\bfont-\S+/g, '');
        document.body.classList.add(`font-${font}`);
        localStorage.setItem('font', font);
    }

    // Change font size
    function changeFontSize(size) {
        document.body.className = document.body.className.replace(/\bfont-\S+/g, '');
        document.body.classList.add(`font-${size}`);
        localStorage.setItem('fontSize', size);
    }

    // Open modal
    function openModal(modal) {
        modal.style.display = 'block';
    }

    // Close modal
    function closeModal(modal) {
        modal.style.display = 'none';
    }

    // Set up event listeners
    function setupEventListeners() {
        // Send message on button click
        sendButton.addEventListener('click', sendMessage);
        
        // Send message on Enter key
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Back button for mobile view
        backButton.addEventListener('click', function() {
            sidebar.classList.add('active');
            chatArea.classList.remove('active');
        });
        
        // Contact info button
        contactInfoBtn.addEventListener('click', () => openModal(profileModal));
        
        // New chat button
        newChatBtn.addEventListener('click', () => {
            renderAvailableContacts();
            openModal(newChatModal);
        });
        
        // Filter button
        filterBtn.addEventListener('click', () => {
            filterOptions.classList.toggle('hidden');
        });
        
        // Filter options
        document.querySelectorAll('[data-filter]').forEach(btn => {
            btn.addEventListener('click', () => {
                currentFilter = btn.dataset.filter;
                filterOptions.classList.add('hidden');
                renderContacts();
            });
        });
        
        // Theme button
        themeBtn.addEventListener('click', toggleTheme);
        
        // Wallpaper button
        wallpaperBtn.addEventListener('click', () => openModal(wallpaperModal));
        
        // Font button
        fontBtn.addEventListener('click', () => {
            const font = prompt("Choose font (arial, roboto, open-sans, comic):", "arial");
            if (font) changeFont(font);
        });
        
        // Font size button
        fontSizeBtn.addEventListener('click', () => {
            const size = prompt("Choose font size (small, medium, large):", "medium");
            if (size) changeFontSize(size);
        });
        
        // Close modals
        closeModalButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                closeModal(this.closest('.modal'));
            });
        });
        
        // Click outside modal to close
        window.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) {
                closeModal(e.target);
            }
        });
        
        // Wallpaper selection
        document.querySelectorAll('.wallpaper-option').forEach(option => {
            option.addEventListener('click', () => {
                changeWallpaper(option.dataset.wallpaper);
                closeModal(wallpaperModal);
            });
        });
        
        // Search contacts
        searchInput.addEventListener('input', renderContacts);
        
        // Search new contacts
        newChatSearch.addEventListener('input', renderAvailableContacts);
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                sidebar.classList.add('active');
                chatArea.classList.add('active');
            }
        });
        
        // Load saved preferences
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
        }
        
        if (localStorage.getItem('wallpaper')) {
            changeWallpaper(localStorage.getItem('wallpaper'));
        }
        
        if (localStorage.getItem('font')) {
            document.body.classList.add(`font-${localStorage.getItem('font')}`);
        }
        
        if (localStorage.getItem('fontSize')) {
            document.body.classList.add(`font-${localStorage.getItem('fontSize')}`);
        }
    }

    // Initialize the app
    init();
});