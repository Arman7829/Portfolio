//-----------toggle navbar------------//

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
}

//-----------scroll section------------//

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            let currentLink = document.querySelector('header nav a[href*=' + id + ']');
            if (currentLink) currentLink.classList.add('active');
        }
    });

    //-----------sticky navbar------------//
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    //-----------remove toggle icon and navbar on scroll------------//
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

//-----------scroll reveal------------//

ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.tagline, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-contact h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-contact p, .about-content', { origin: 'right' });

//-----------typed js------------//

const typed = new Typed('.multiple-text', {
    strings: ['Web Developer', 'Web Designer'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true,
});

//-----------GitHub API Project Fetch------------//

fetch("https://api.github.com/users/Arman7829/repos")
    .then((res) => res.json())
    .then((repos) => {
        const container = document.getElementById("github-projects");
        repos.forEach((repo) => {
            if (!repo.fork) {
                const box = document.createElement("div");
                box.className = "portfolio-box";
                box.innerHTML = `
                    <img src="https://source.unsplash.com/300x200/?project" alt="">
                    <div class="portfolio-layer">
                        <p>${repo.name.replace(/-/g, ' ')}</p>
                        <a href="${repo.html_url}" target="_blank">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>`;
                container.appendChild(box);
            }
        });
    })
    .catch(error => console.error("GitHub fetch error:", error));
