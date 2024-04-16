document.addEventListener('DOMContentLoaded', function () {
    const scrollContainer = document.getElementById('scrollContainer');
    const scrollItems = document.querySelectorAll('.scroll-item');

    let isMouseDown = false;
    let startX;
    let scrollLeft;

    scrollContainer.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
    });

    scrollContainer.addEventListener('mouseleave', () => {
        isMouseDown = false;
    });

    scrollContainer.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2; // Adjust scroll speed here
        scrollContainer.scrollLeft = scrollLeft - walk;
    });

    scrollItems.forEach(function (item) {
        item.addEventListener('click', function (e) {
            // Scroll to the clicked image and center it
            const containerWidth = scrollContainer.clientWidth;
            const itemWidth = item.clientWidth;
            const itemOffsetLeft = item.offsetLeft;
            const scrollTo = itemOffsetLeft - (containerWidth / 2) + (itemWidth / 2);

            // Prevent left and right most images from being cutoff
            if (scrollTo < 0) {
                scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
            } else if (scrollTo > scrollContainer.scrollWidth - containerWidth) {
                scrollContainer.scrollTo({ left: scrollContainer.scrollWidth - containerWidth, behavior: 'smooth' });
            } else {
                scrollContainer.scrollTo({ left: scrollTo, behavior: 'smooth' });
            }

            // Toggle enlarge class for clicked image
            item.classList.toggle('enlarged');

            // Remove enlarged class from other images
            scrollItems.forEach(function (otherItem) {
                if (otherItem !== item) {
                    otherItem.classList.remove('enlarged');
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-button');
    const photos = document.querySelectorAll('.photo');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = button.getAttribute('data-filter');
            photos.forEach(photo => {
                if (filter === 'all' || photo.classList.contains(filter)) {
                    photo.style.display = 'block';
                } else {
                    photo.style.display = 'none';
                }
            });
        });
    });
});

