$(document).ready(function() {




    // 1. Check for saved preference on page load
    const savedTheme = localStorage.getItem('theme');
    
    // Set default theme to dark if no preference is saved
    if (savedTheme === 'light') {
        $('body').addClass('light-mode');
        $('#darkModeToggle i').removeClass('bi-moon-fill').addClass('bi-sun-fill');
    } else {
        // If savedTheme is 'dark' or null, keep default dark mode
        $('body').removeClass('light-mode');
        $('#darkModeToggle i').removeClass('bi-sun-fill').addClass('bi-moon-fill');
    }

    // 2. Handle the Toggle Button Click
    $('#darkModeToggle').on('click', function() {
        $('body').toggleClass('light-mode');
        
        // Update local storage and icon
        if ($('body').hasClass('light-mode')) {
            localStorage.setItem('theme', 'light');
            $(this).find('i').removeClass('bi-moon-fill').addClass('bi-sun-fill');
        } else {
            localStorage.setItem('theme', 'dark');
            $(this).find('i').removeClass('bi-sun-fill').addClass('bi-moon-fill');
        }
    });

    // ... rest of your existing scroll/smooth-scroll JS code ...







    // 1. Smooth Scrolling for Sidebar Links
    $(".fixed-sidebar a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                // Add hash to URL after scroll is complete
                window.location.hash = hash;
            });
        }
    });

    // 2. Highlighting Active Sidebar Icon on Scroll
    $(window).on('scroll', function() {
        var scrollPos = $(document).scrollTop();

        // Loop through all sections (assuming they all have min-vh-100)
        $('section').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("id"));

            // Check if current section is in viewport
            if (refElement.offset().top <= scrollPos && refElement.offset().top + refElement.height() > scrollPos) {
                // Remove 'active' from all links
                $('.fixed-sidebar a').removeClass("active");
                // Add 'active' to the corresponding link
                $('.fixed-sidebar').find('[data-section="' + currLink.attr('id') + '"]').addClass("active");
            }
            else {
                // If section is not active, remove active class
                $('.fixed-sidebar').find('[data-section="' + currLink.attr('id') + '"]').removeClass("active");
            }
        });
    });
    
    
    if ($(window.location.hash).length > 0) {
         $('.fixed-sidebar a').removeClass("active");
         $('.fixed-sidebar').find('[data-section="' + window.location.hash.substring(1) + '"]').addClass("active");
    }
            let checkbox = $("flexCheckIndeterminate");
            (function () {
              "use strict";
              const forms = $(".needs-validation");
              Array.prototype.slice.call(forms).forEach(function (form) {
                form.addEventListener(
                  "submit",
                  function (event) {
                    if (!form.checkValidity()) {
                      event.preventDefault();
                      event.stopPropagation();
                    }

                    form.classList.add("was-validated");
                  },
                  false
                );
              });
            })();
            const toastTrigger = document.getElementById('send')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}

// skill
 function animateSkills() {
            $('.progress-bar').each(function () {
                var bar = $(this);
                var value = bar.data('value');

                if (bar.visible(true)) { 
                    bar.css('width', value + '%');
                }
            });
        }

        // jQuery plugin for element visibility
        $.fn.visible = function(partial) {
            var $t = $(this),
                $w = $(window),
                viewTop = $w.scrollTop(),
                viewBottom = viewTop + $w.height(),
                _top = $t.offset().top,
                _bottom = _top + $t.height(),
                compareTop = partial === true ? _bottom : _top,
                compareBottom = partial === true ? _top : _bottom;

            return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
        };

        // Run on scroll + load
        $(window).on('scroll', animateSkills);
        animateSkills();
    
});