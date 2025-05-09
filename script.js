// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
    // -------------------------------------------------------------------------
    // Event Handling Section
    // -------------------------------------------------------------------------
    
    // Click Events
    const clickButton = document.getElementById('click-button');
    const clickResult = document.getElementById('click-result');
    const doubleClickButton = document.getElementById('double-click-button');
    const doubleClickResult = document.getElementById('double-click-result');
    
    // Click counter
    let clickCount = 0;
    
    // Click event handler
    clickButton.addEventListener('click', function() {
        clickCount++;
        let message;
        
        // Different messages based on click count
        if (clickCount === 1) {
            message = "Great! You clicked the button once.";
        } else if (clickCount <= 5) {
            message = `You've clicked ${clickCount} times. Keep going!`;
        } else if (clickCount <= 10) {
            message = `Wow! ${clickCount} clicks already. You're getting good at this!`;
        } else {
            message = `${clickCount} clicks! You're a clicking machine! 🤖`;
        }
        
        // Update display with animation
        clickResult.textContent = message;
        clickResult.style.animation = 'none';
        // Trigger reflow to restart animation
        void clickResult.offsetWidth;
        clickResult.style.animation = 'fadeIn 0.5s';
    });
    
    // Double-click event handler
    doubleClickButton.addEventListener('dblclick', function() {
        doubleClickResult.classList.remove('hidden');
        // Add a confetti effect (simple CSS animation)
        let confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.position = 'absolute';
        confetti.style.top = '50%';
        confetti.style.left = '50%';
        confetti.style.width = '200px';
        confetti.style.height = '200px';
        confetti.style.transform = 'translate(-50%, -50%)';
        confetti.style.pointerEvents = 'none';
        
        // Create confetti particles
        for (let i = 0; i < 50; i++) {
            let particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '10px';
            particle.style.height = '10px';
            particle.style.backgroundColor = getRandomColor();
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 200 + 'px';
            particle.style.top = Math.random() * 200 + 'px';
            particle.style.animation = `confetti-fall ${Math.random() * 2 + 1}s ease-out forwards`;
            
            confetti.appendChild(particle);
        }
        
        document.getElementById('event-handling').appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    });
    
    // Hover Effects
    const hoverBox = document.getElementById('hover-box');
    const hoverResult = document.getElementById('hover-result');
    let hoverCount = 0;
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverCount++;
        hoverResult.textContent = `Hover count: ${hoverCount}`;
        
        // Change the box color randomly on hover
        const randomColor = getRandomColor();
        this.style.backgroundColor = randomColor;
        
        // Make text contrast properly with background
        const brightness = getBrightness(randomColor);
        this.style.color = brightness > 128 ? 'black' : 'white';
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#3498db'; // Reset to default color
        this.style.color = 'white'; // Reset to default text color
    });
    
    // Keypress Detection
    const keyInput = document.getElementById('key-input');
    const keyName = document.getElementById('key-name');
    const keyCode = document.getElementById('key-code');
    
    keyInput.addEventListener('keydown', function(event) {
        keyName.textContent = event.key;
        keyCode.textContent = event.code;
        
        // Add visual feedback
        keyName.style.color = getRandomColor();
        keyCode.style.color = getRandomColor();
    });
    
    // Long Press (Bonus)
    const longPressButton = document.getElementById('long-press-button');
    const longPressProgress = document.getElementById('long-press-progress');
    const longPressResult = document.getElementById('long-press-result');
    let longPressTimer;
    let isLongPressing = false;
    
    longPressButton.addEventListener('mousedown', function() {
        isLongPressing = true;
        longPressProgress.style.width = '0%';
        
        // Start long press timer
        longPressTimer = setTimeout(function() {
            if (isLongPressing) {
                longPressResult.textContent = '🎉 Long press successful! 🎉';
                longPressResult.style.color = '#2ecc71';
                longPressResult.style.fontWeight = 'bold';
                
                // Reset after 2 seconds
                setTimeout(function() {
                    longPressResult.textContent = 'Hold the button for 2 seconds';
                    longPressResult.style.color = '';
                    longPressResult.style.fontWeight = '';
                    longPressProgress.style.width = '0%';
                }, 2000);
            }
        }, 2000);
        
        // Animate progress bar
        longPressProgress.style.width = '100%';
    });
    
    // Cancel long press if mouse up or leave
    const cancelLongPress = function() {
        isLongPressing = false;
        clearTimeout(longPressTimer);
        longPressProgress.style.width = '0%';
    };
    
    longPressButton.addEventListener('mouseup', cancelLongPress);
    longPressButton.addEventListener('mouseleave', cancelLongPress);
    
    // -------------------------------------------------------------------------
    // Interactive Elements Section
    // -------------------------------------------------------------------------
    
    // Color Changing Button
    const colorButton = document.getElementById('color-button');
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
    let currentColorIndex = 0;
    
    colorButton.addEventListener('click', function() {
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[currentColorIndex];
        
        // Add a ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.top = (event.offsetY - 50) + 'px';
        ripple.style.left = (event.offsetX - 50) + 'px';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.8s linear';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        // Remove the ripple element after animation
        setTimeout(() => {
            ripple.remove();
        }, 800);
    });
    
    // Image Gallery
    const galleryImg = document.getElementById('gallery-img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const galleryCaption = document.getElementById('gallery-caption');
    const indicators = document.querySelectorAll('.indicator');
    
    // Gallery images (using placeholder images)
    const images = [
        { src: '/api/placeholder/600/300', caption: 'Image 1 of 4' },
        { src: '/api/placeholder/600/300', caption: 'Image 2 of 4' },
        { src: '/api/placeholder/600/300', caption: 'Image 3 of 4' },
        { src: '/api/placeholder/600/300', caption: 'Image 4 of 4' }
    ];
    
    let currentImage = 0;
    
    // Update gallery image and caption
    function updateGallery() {
        // Slide out current image
        galleryImg.style.opacity = '0';
        galleryImg.style.transform = 'translateX(50px)';
        
        // After a short delay, update and slide in the new image
        setTimeout(() => {
            galleryImg.src = images[currentImage].src;
            galleryCaption.textContent = images[currentImage].caption;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                if (index === currentImage) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });