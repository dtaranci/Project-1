/* <script> */


//var loginu = document.getElementById("username");
//var loginp = document.getElementById("password");

var iscurriculumshown = false;

function show3dash() { // Hamburger menu button logic
    // $(".navbutton").css("display","block");
    if ($(".navbutton").css("display") != "flex") { //DISPLAY FLEX FIXED
        
        // $(".navbutton").slideDown(); //not smooth
        $("#nav").css("padding-bottom","1em");
        $(".navbutton").css("display","flex");
        $("#3dashbutton").attr("class", "ui-icon ui-icon-caret-1-n");
        $(".threedash").css("background-image","linear-gradient(to right, #8f8f8f, #5d5d5d)");
        if(iscurriculumshown == true) { //quick fix
            $("#curriculum").css("display","flex"); //show authorized page
        }
        else {
            $("#curriculum").css("display","none");
        }

    }
    else {
        // $(".navbutton").slideUp();
        $(".navbutton").css("display","none");
        $("#nav").css("padding-bottom","none");
        $("#3dashbutton").attr("class", "ui-icon ui-icon-caret-1-s");
        $(".threedash").css("background-image","linear-gradient(to right, #DF631A, #BF1065)");
    }
}



$(document).ready(function () 
{
        //$("button").click(function() {console.log("WORKS")});
    if (document.cookie != "") { //easy cookie values (only using one so, shortcut)
        let cookievar = decodeURIComponent(document.cookie);
        let cookievarsplit = cookievar.split('=');
        console.log(cookievarsplit);
        let value = cookievar[1];
        let key = cookievar[0];
        
        iscurriculumshown = true;
        if($(".threedash").css("display") != "block") { // if threedash button is shown (mobile view) don't show curriculum button and break the menu.
            $("#curriculum").css("display","block"); //show authorized page
        }

        $("#loginnav").html("Logout"); //change login button
        $("#loginnav").attr("href","javascript:showlogout()"); //show logout modal instead of redirecting to login page
        console.log("LOGIN DETECTED");
    }
    else {
        // $("#curriculum").hide(); //no cookie? hide unauthorized page
        $("#curriculum").css("display","none");
    }

    $("#button1").click(function() //LOGIN LOGIC
    {
        //const teststring = {"username": "test","password": "test"};
        const teststring = {"username": $("#username").val(), "password": $("#password").val()};
        console.log(teststring);
        //console.log($('input[name="username"]').val());
        console.log($("#username").val());
        console.log($("#password").val());


        //$.post("www.fulek.com/data/api/user/login",{"username": "test","password": "test"},function(result){$("title2").val(result);});
        jQuery.ajax({
        type: "POST",
        url: "https://www.fulek.com/data/api/user/login",
        data: JSON.stringify(teststring),
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(data){ 
            //var responseobj = $.parseJSON(data);


            if (data.isSuccess == true) {
                const expiredate = new Date();
                const currentdate = new Date();
                expiredate.setTime(expiredate.getTime() + (3*60*60*1000)); //zasto 3 a ne 2?
                let expires = "expires="+ expiredate.toUTCString();

                console.log(data);
                document.cookie = "token" + "=" + data.data.token + ";" + expires + ";path=/"; //can be written as a function and variables but, since it's only used once...
                console.log(document.cookie);
                $("#failurep").hide();
                $("#successp").slideDown(200);
                $("#successp").text("Status code: " + data.statusCode + " | " + "Login Success!");

                console.log("Successful login, username: " + data.data.username + " | Time: " + currentdate.toTimeString());
                
                // "Success!, redirecting to home in 3, 2, 1..."
                window.setTimeout(function() {$("#successp").slideUp(200);}, 2000);
                window.setTimeout(function() {$("#redirectp").slideDown(200)}, 1800);
                window.setTimeout(function() {$("#redirectp").text("Success! redirecting to home in 3")},2000); //yes, I could use a loop but its only 4 values
                window.setTimeout(function() {$("#redirectp").text("Success! redirecting to home in 2")},3000);
                window.setTimeout(function() {$("#redirectp").text("Success! redirecting to home in 1")},4000);
                window.setTimeout(function() {$("#redirectp").text("Success! redirecting to home...")},5000);
                window.setTimeout(function(){ window.location.href = "index.html"; }, 6000);


                console.log(document.cookie);
            }
            else {
                $("#successp").hide();
                // $("#failurep").show();
                $("#failurep").text("Status code: " + data.statusCode + " | " + data.errorMessages[0]);
                $("#failurep").slideDown(200);
                window.setTimeout(function() {$("#failurep").slideUp(200);}, 3500);
            }



        },
        error: function(data){
            $("#failurep").text("Login Failure");

        },
        dataType: "JSON"
        });

    

    
    });

    // if (document.cookie != "") { //easy cookie values
    //     let cookievar = decodeURIComponent(document.cookie);
    //     let cookievarsplit = cookievar.split('=');
    //     console.log(cookievarsplit);
    //     let value = cookievar[1];
    //     let key = cookievar[0];
    //     console.log(document.cookie);
        


    //     $("#curriculum").show(); //show authorized page
    //     $("#login").text("Logout");
    // }
    // else {
    //     $("#curriculum").hide(); //no cookie? hide unauthorized page
    // }




    // $(".text").dialog({
    //     title:"Login",
    //     modal: true,
    //     resizable: false,
    //     width: 500,
    //     close: redirectme
    // });



    

    $("#button2").click(function(data) { //REGISTER LOGIC

        const teststring = {"username": $("#username2").val(), "password": $("#password2").val()};
        jQuery.ajax({
        type: "POST",
        url: "https://www.fulek.com/data/api/user/register",
        data: JSON.stringify(teststring),
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(data){

            if (data.isSuccess == true) {
            
                $("#failurep2").hide();
                // // $("#successp2").show();
                // $("#successp2").slideDown(200);
                $("#successp2").text("Status code: " + data.statusCode + " | " + "Registration Success!");
                $("#successp2").slideDown(200);
                // $("#redirectp2").text("Success!, Window closing in 3, 2, 1...");
                $("#redirectp2").text("Success! Registration complete");
                window.setTimeout(function() {$("#successp2").slideUp(200);}, 2000);
                window.setTimeout(function() {$("#redirectp2").slideDown(200)}, 1800);
                window.setTimeout(function() {$("#redirectp2").slideUp(200);}, 3000);
                window.setTimeout(function(){ $(".register").dialog("close"); }, 3000);
            
            }
            else {
                $("#successp2").hide();
                // $("#failurep2").show();
                $("#failurep2").text("Status code: " + data.statusCode + " | " + data.errorMessages[0]);
                $("#failurep2").slideDown(200);
                window.setTimeout(function() {$("#failurep2").slideUp(200);}, 3500);
            }
    }})});





    
});

function showregister() { // Register div modal logic
    $(".register").dialog({
    title:"Register",
    modal: true,
    resizable: false,
    width: 500,
    height: 400,
    show: { effect: "drop",direction: "up", duration: 700 },
    // hide: { effect: "explode", duration: 1000 },
    hide: { effect: "drop",direction: "up", duration: 700 },
    resizable: false,
    draggable: false,
    position: { my: "center", at: "center", of: window }
    });
};

function redirectme() {
    window.location.href = "index.html";
};





function showcontact() {
    $(".contact").dialog({
    title:"Contact",
    modal: true,
    resizable: false,
    width: 500
    });
};


function contactserver(data) { //CONTACT LOGIC    //I tested this function and it works, but my browser required an extension because the server did not return the Access-Control-Allow-Origin header , the extension alters http requests and allows CORS everywhere (CORS Everywhere extension for firefox) or maybe I'm doing something wrong :)
    const teststring = $("#contactform").serialize();
    //const teststring = "krivoalijosuvijekCORSpolicyNoAccessControlAllowOriginheaderispresentontherequestedheader";
    console.log(teststring);
    jQuery.ajax({
    type: "POST",
    url: "https://www.fulek.com/mvc/supit/project-contact-form",
    data: teststring,
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    processData: false,
    dataType: "html",
    success: function(data){

        $(".contact").dialog("close");
        console.log("success!");
        // var newwindow2 = window.open("", "", "width=600,height=600,scrollbars=yes");
        // newwindow2.document.write(data);


        // document.write(data);

        var newDoc = document.open("text/html", "replace");
        newDoc.write(data);
        newDoc.close();


}})};


// });
// // function wow() {

//     alert("bla bla");
// }


// $(document).ajaxSuccess(function(){alert("AJAX request successfully completed")});
// </script>