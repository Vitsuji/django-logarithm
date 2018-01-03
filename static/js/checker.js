function on_enter(e, opt) {
    if (e.which == 13) {
        if(opt == "in"){
            check_signin();
        }else{
          check_signup();
        }
    return false;    //<---- Add this line
  }
}

function check_signup(){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    var user = $(".maininput[name=username]").val();
    var em = $(".maininput[name=email]").val();
    var pass = $(".maininput[name=password]").val();

    var error_log = 0;

    if (!(/\S/.test(user))) {
    $(".maininput[name=username]").css("border-color","red");
        error_log +=1;
    }else{
        $(".maininput[name=username]").css("border-color","#d7d7d7")
    }

    if (!(/\S/.test(em))) {
        $(".maininput[name=email]").css("border-color","red");
        error_log +=1;
    }else{
        $(".maininput[name=email]").css("border-color","#d7d7d7");
    }

    if (!(/\S/.test(pass))) {
        $(".maininput[name=password]").css("border-color","red");
        error_log +=1;
    }else{
        if(!em.match(re)) {
            $(".maininput[name=email]").val("");
            $(".maininput[name=email]").attr("placeholder", "Invalid Email*");
            $('.maininput[name=email]').addClass('taken');
            error_log +=1;
        }else{
            $(".maininput[name=password]").css("border-color","#d7d7d7");
        }
    }

if(!error_log >0 ){
    $.post("checker.php",
        {
            username: user,
            email: em
        },
        function(data){
            if(data == 0){
                $("#holderm form").submit();
            }else if (data == 1) {
                //username taken
                $(".maininput[name=username]").val("");
                $(".maininput[name=username]").attr("placeholder", "Username currently taken*");
                $('.maininput[name=username]').addClass('taken');
            }else if(data == 2){
                $(".maininput[name=email]").val("");
                $(".maininput[name=email]").attr("placeholder", "Email currently in use*");
                $('.maininput[name=email]').addClass('taken');

            }else{
                $(".maininput[name=username]").val("");
                $(".maininput[name=username]").attr("placeholder", "Username currently taken*");
                $('.maininput[name=username]').addClass('taken');

                $(".maininput[name=email]").val("");
                $(".maininput[name=email]").attr("placeholder", "Email currently in use*");
                $('.maininput[name=email]').addClass('taken');
            }


        });
    }

}

function check_signin() {
    var formData = new FormData();

    var email = $(".maininput[type=email]").val();
    var pass = $(".maininput[type=password]").val();


    formData.append("email", email);
    formData.append("password", pass) ;

    $.ajax({
    url: 'backend/signin_conf.php',
    data: formData,
    type: 'POST',
    contentType: false,
    processData: false,
    success: function(data) {
        var data = $.trim(data);
        if(data == "1"){
            window.location="/Logarithm/home";
        }else{
            $("#snackbar").html("Wrong email or password");
            open_snackbar();
        }
    }
    });
}

function open_snackbar() {
    var x = document.getElementById("snackbar")
        $(x).css("visibility", "visible");
        setTimeout(function(){
        x.style.visibility = "hidden";
        //x.style.display = "none";
     }, 4500);
}
