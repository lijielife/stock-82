$(function() {
    var mdata={};
    var url = '/javascripts/movie.json';
    $.getJSON(url, function(data) {
        mdata=data;
        render_editor_form(mdata);
        render_event_form(mdata);
    });
    var render_editor_form=function(data){
        $('#c_editor').val(JSON.stringify(data));
    };
    var render_event_form=function(){
        $('#c_save').on('click',function(event){


            $.post('/movie/add', {content:JSON.stringify(mdata)}, function (data) {
                alert(data);
            });

        });
    };
});