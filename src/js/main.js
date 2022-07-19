class App {
    init() {
        this.scroll();
        this.mouseMove();
        this.changeCover();
    }

    scroll() {
        const scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true
        });

        let navigationItems = document.querySelectorAll('.nav-list__item a');

        navigationItems.forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                let target = document.querySelectorAll(element.hash)[0];
                scroll.scrollTo(target);
            })
        })
    }

    mouseMove() {
        let projectSample = document.getElementById('project-sample');
        let projectsWrapper = document.getElementById('projects-wrapper');

        const onMouseMove = (e) => {
            let rect = projectsWrapper.getBoundingClientRect();
            projectSample.style.top = e.clientY - rect.top + 'px';
        }

        function isTouchDevice() {
            try {
                document.createEvent("TouchEvent");
                return true;
            } catch (e) {
                return false;
            }
        }

        if (!isTouchDevice()) {
            projectsWrapper.addEventListener('mousemove', onMouseMove);
        }
    }

    changeCover() {
        let projectList = document.querySelectorAll('.projects__item');
        let projectSample = document.getElementById("project-sample");
        let projectSampleInner = document.getElementById("project-sample").getElementsByClassName("projects__sample-images")[0];
        let projectNumber = 0;
        let currentImage = projectSampleInner.getElementsByTagName("img")[projectNumber];

        projectList.forEach(projectItem => {
            projectItem.addEventListener('mouseover', (element) => {
                if (projectItem.dataset.projectCover != projectNumber) {
                    projectNumber = projectItem.dataset.projectCover;
                    currentImage.classList.remove('is-active');
                    currentImage = projectSampleInner.getElementsByTagName("img")[projectNumber];
                    currentImage.classList.add('is-active');
                }
            })

        });
    }
}

document.addEventListener("DOMContentLoaded", function (event) {

    let app = new App();
    app.init();



});