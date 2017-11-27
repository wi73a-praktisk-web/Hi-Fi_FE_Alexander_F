document.addEventListener('DOMContentLoaded', function () {
    
        if (localStorage.getItem('token') != null) {
            document.getElementById('state_div').style.visibility = "visible";
            document.getElementById('state_div').style.color = "black";
            console.log(document.getElementById('profile_page_a').href += "?user=" + localStorage.getItem('userid'));
        }
        else if(localStorage.getItem('token') === null) {
            document.getElementById('state_div').style.display = "none";
        }
    });
 
    function log_out() {
        localStorage.removeItem('token');
        window.location.assign(window.location.href);
    }

 /*
     * @package: Bootstrap Multilevel Navbar fix
     * @version: 1.0.0
     * @author: Edi Amin (aka CloudDesigner)
     * @email: to.ediamin@gmail.com
     * @date: Dec 19,2012
     * @desc: Tested with Bootstrap v2.2.2 and 2.2.2
     * @license Licensed under the Apache License v2.0
     */

    (function ($) {
        $('body').on('click', function (e) {
            $('.dropdown-submenu').removeClass('open').addClass('closed');

        });

        $('.dropdown-submenu').on('click', function (e) {
            e.stopPropagation();

            $this = $(this);
            parent = $this.parent().parent();

            if ($(e.target).parent().hasClass('dropdown-submenu')) {
                e.preventDefault();
            }


            if ($this.hasClass('open')) {
                $this.removeClass('open').addClass('closed')
            } else if (parent.hasClass('open')) {
                if ($this.hasClass('closed')) {
                    $this.removeClass('closed').addClass('open');
                }
            }
        });
    })(jQuery)