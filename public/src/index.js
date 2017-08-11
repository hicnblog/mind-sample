(function($){
    $(document).ready(function(){
        var d = new Date();
        var n = d.getFullYear();
        var copyright = '© '+ n +' habibimroncn';
        $('.footer-copyright .container').get(0).firstChild.nodeValue = copyright
        $('.button-collapse').sideNav({
            menuWidth: 300, 
            edge: 'right', 
            closeOnClick: true,
            draggable: true,
            onOpen: function(el) { },
            onClose: function(el) {},
            }
        );
    });
})(jQuery);