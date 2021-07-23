function slider ({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    //slider

    //1.Легкий способ
    /* const sliderPrev = document.querySelector('.offer__slider-prev'),
          sliderNext = document.querySelector('.offer__slider-next'),
          offerSlide = document.querySelectorAll('.offer__slide'),
          current = document.querySelector('#current'),
          total = document.querySelector('#total');
    let counter = 1;
    
    function showTotal () {
        if (offerSlide.length < 10) {
            total.innerHTML = `0${offerSlide.length}`;
        } else {
            total.innerHTML = offerSlide.length;
        } 
    }
    showTotal();

    function showCurent(n) {
        if (n > offerSlide.length) {
            counter = 1;
        }

        if (n < 1) {
            counter = offerSlide.length;
        }
        offerSlide.forEach(img => hideSlide(img));
        showSlide(offerSlide[counter-1]);
        if (offerSlide.length < 10) {
            current.innerHTML = `0${counter}`;
        } else {
            current.innerHTML = counter;
        } 
    }
    showCurent(counter);
    function showSlide(item) {
        item.classList.add('show');
        item.classList.remove('hide');
    }
    function hideSlide(item) {
        item.classList.add('hide');
        item.classList.remove('show');
    }
    sliderNext.addEventListener('click', () => {
        counter++;
        showCurent(counter);
    });
    sliderPrev.addEventListener('click', () => {
        counter--;
        showCurent(counter);
    }); */

    //2.Способ сложнее
    const sliderPrev = document.querySelector(prevArrow),
          sliderNext = document.querySelector(nextArrow),
          slides = document.querySelectorAll(slide),
          current = document.querySelector(currentCounter),
          total = document.querySelector(totalCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width,
          slider = document.querySelector(container);
    let counter = 1,
        offset = 0;

    if (slides.length < 10) {
        total.innerHTML = `0${slides.length}`;
        current.innerHTML = `0${counter}`;
    } else {
        total.innerHTML = slides.length;
        current.innerHTML = counter;
    } 

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide =>{
        slide.style.width = width;
    });

    slider.style.position = 'relative';
    
    const indicators = document.createElement('ol'),
          dots = [];

    function movieDots() {
        slidesField.style.transform = `translateX(-${offset}px)`;
        
        if (slides.length < 10) {
            current.innerHTML = `0${counter}`;
        } else {
            current.innerHTML = counter;
        } 

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[counter - 1].style.opacity = 1;
    }

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i== 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function sliceNumber (item) {
        return +item.replace(/\D/g, '');
    }

    sliderNext.addEventListener('click', () => {
        if (offset == sliceNumber(width) * (slides.length - 1)){
            offset = 0;
        } else {
            offset += sliceNumber(width);
        }

        /* slidesField.style.transform = `translateX(-${offset}px)`;
 */
        if (counter == slides.length) {
            counter = 1;
        } else {
            counter++;
        }

        /* if (slides.length < 10) {
            current.innerHTML = `0${counter}`;
        } else {
            current.innerHTML = counter;
        } 

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[counter - 1].style.opacity = 1; */

        movieDots();
    });

    sliderPrev.addEventListener('click', () => {
        if (offset == 0){
            offset = sliceNumber(width) * (slides.length - 1);
        } else {
            offset -= sliceNumber(width);
        }

        /* slidesField.style.transform = `translateX(-${offset}px)`; */

        if (counter == 1) {
            counter = slides.length;
        } else {
            counter--;
        }

        /* if (slides.length < 10) {
            current.innerHTML = `0${counter}`;
        } else {
            current.innerHTML = counter;
        } 

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[counter - 1].style.opacity = 1; */
        movieDots();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target. getAttribute('data-slide-to');

            counter = slideTo;
            offset = sliceNumber(width) * (slideTo - 1);

            /* slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.innerHTML = `0${counter}`;
            } else {
                current.innerHTML = counter;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[counter - 1].style.opacity = 1; */
            movieDots();
        });
    });
}

export default slider;