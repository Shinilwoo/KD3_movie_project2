(function() {
    const slides = document.querySelectorAll('.slide_item');
    const prevButton = document.querySelector('.slide_prev_button');
    const nextButton = document.querySelector('.slide_next_button');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    // 슬라이드 이미지 회전 관련 코드
    slides.forEach(slide => {
        const inner = slide.querySelector("#image-section");
        const img = inner.querySelector("img");

        const mouse = {
            _x: 0,
            _y: 0,
            x: 0,
            y: 0,
            updatePosition: function(event) {
                const e = event || window.event;
                this.x = e.clientX - this._x;
                this.y = (e.clientY - this._y);
            },
            setOrigin: function(e) {
                this._x = e.offsetLeft + Math.floor(e.offsetWidth);
                this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
            },
            show: function() {
                return "(" + this.x + "," + this.y + ")";
            }
        };

        mouse.setOrigin(inner);

        let counter = 0;
        const refreshRate = 10;
        const isTimeToUpdate = function() {
            return counter++ % refreshRate === 0;
        };

        const onMouseEnterHandler = function(event) {
            update(event);
        };

        const onMouseLeaveHandler = function() {
            img.style.transform = "rotateX(0deg) rotateY(0deg)";
            img.style.webkitTransform = "rotateX(0deg) rotateY(0deg)";
            img.style.mozTransform = "rotateX(0deg) rotateY(0deg)";
            img.style.msTransform = "rotateX(0deg) rotateY(0deg)";
            img.style.oTransform = "rotateX(0deg) rotateY(0deg)";
        };

        const onMouseMoveHandler = function(event) {
            if (isTimeToUpdate()) {
                update(event);
            }
        };

        const update = function(event) {
            mouse.updatePosition(event);
            updateTransformStyle(
                (mouse.y / inner.offsetHeight).toFixed(2),
                (mouse.x / inner.offsetWidth).toFixed(2)
            );
        };

        const updateTransformStyle = function(x, y) {
            const style = "rotateX(" + -x + "deg) rotateY(" + y + "deg)";
            img.style.transform = style;
            img.style.webkitTransform = style;
            img.style.mozTransform = style;
            img.style.msTransform = style;
            img.style.oTransform = style;
        };

        inner.onmousemove = onMouseMoveHandler;
        inner.onmouseleave = onMouseLeaveHandler;
        inner.onmouseenter = onMouseEnterHandler;
    });

    // 슬라이드 전환 관련 코드
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
        updateDots(index);
    } 

    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
        showSlide(currentSlide);
        adjustElements(currentSlide);
    });

    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
        showSlide(currentSlide);
        adjustElements(currentSlide);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (currentSlide !== index) {
                currentSlide = index;
                showSlide(currentSlide);
                adjustElements(currentSlide);
            }
        });
    });

    function updateDots(index) {
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function adjustElements(slideIndex) {
        const titleElement = document.getElementById(`movieTitle${slideIndex + 1}`);
        const yearElement = document.getElementById(`movieYear${slideIndex + 1}`);
        const buttonContainer = document.getElementById(`buttonContainer${slideIndex + 1}`);
        const titleHeight = titleElement.offsetHeight;
        const padding = 20; // 기본 패딩 값

        if (titleHeight > 100) {
            const extraPadding = titleHeight - 100;
            yearElement.style.paddingTop = `${extraPadding}px`;
            buttonContainer.style.paddingTop = `${extraPadding}px`;
        } else {
            yearElement.style.paddingTop = '0';
            buttonContainer.style.paddingTop = '0';
        }
    }

    showSlide(currentSlide);
    adjustElements(currentSlide);
    updateDots(currentSlide);
})();
