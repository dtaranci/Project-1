




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


















$(window).ready(function () { //on load function

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


    $("#date2").hide();
    $("#date3").hide();

    $("#nav").slideDown(1000);
    $(".nav").hide();
    $(".nav").fadeIn("1000");
    $("#datepicker").datepicker({
        onSelect: function (datetext,instance) {
            console.log(datetext);
            console.log(Date());
            var tempdate = new Date()
            var removetime = (24*60*60*1000);
            tempdate.setTime(tempdate.getTime() - removetime);
            console.log("tempdate: " + tempdate);
            console.log("tempdate todatestring: " + tempdate.toDateString());
            var datepickerdatevar = new Date(datetext);
            console.log("datepickerdatevar: " + datepickerdatevar);

            removetime = (24*60*60*1000)*2;
            var tempdate2 = new Date();
            tempdate2.setTime(tempdate2.getTime() - removetime);
            console.log("tempdate2 todatestring: " + tempdate2.toDateString());
            var today = new Date();
            if (datepickerdatevar.toDateString() == today.toDateString()) {
                console.log("if block 1 success!");
                $("#date1").show();
                $("#date2").hide();
                $("#date3").hide();
            }
            else if (datepickerdatevar.toDateString() == tempdate.toDateString()) {
                console.log("if block 2 success!");
                $("#date1").hide();
                $("#date2").show();
                $("#date3").hide();
            }
            else {
                console.log("if block 3 success!");
                $("#date1").hide();
                $("#date2").hide();
                $("#date3").show();
                const Cave = "Hello" - 42;
                console.log(Cave);
            }
        }
    });





});
