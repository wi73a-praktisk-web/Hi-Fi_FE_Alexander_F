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