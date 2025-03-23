/* <script> */


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


$(document).ready(function () { //on load function

    if (document.cookie != "") { //easy cookie values
        let cookievar = decodeURIComponent(document.cookie);
        let cookievarsplit = cookievar.split('=');
        console.log(cookievarsplit);
        let key = cookievarsplit[0];
        let value = cookievarsplit[1];



        iscurriculumshown = true;
        if($(".threedash").css("display") != "block") { // if threedash button is shown (mobile view) don't show curriculum button and break the menu.
            $("#curriculum").css("display","block"); //show authorized page
        }

        $("#loginnav").html("Logout"); //change login button
        $("#loginnav").attr("href","javascript:showlogout()"); //show logout modal instead of redirecting to login page
        console.log("LOGIN DETECTED");


        //const tokenstring = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsIm5iZiI6MTcwNTc3MzI0OSwiZXhwIjoxNzA1Nzc2ODQ5LCJpYXQiOjE3MDU3NzMyNDl9.3bDZnc_cRVcDvuyWcHS9q_lJ58CLfQ6fPbWLu_35B-8"}
        const tokenstring = {"Authorization": "Bearer "+ value};
        console.log(tokenstring);
        console.log(JSON.stringify(tokenstring));
        $.ajax({
        url: "https://www.fulek.com/data/api/supit/curriculum-list/en",
        type: "GET",
        headers: tokenstring,
        dataType: "json",
        success: function(data){


            const tdclass = "tdclass";
            for (let i = 0; i < data.data.length; i++) { //parse entire array of courses
                console.log(data.data[i].course); //data is the recieved response object passed into function, .data is the JSON part containing courses and their attributes
                $("#table").find("tbody").append //dynamic table
                (
                    "<tr>" + //new row
                        
                        "<td class=tdclass>" + data.data[i].id + "</td>" + //column 1
                        "<td class=tdclass-course>" + data.data[i].course + "</td>" + //column 2 etc...
                        "<td class=tdclass>" + data.data[i].ects + "</td>" +
                        "<td class=tdclass>" + data.data[i].hours + "</td>" +
                        "<td class=tdclass>" + data.data[i].lectures + "</td>" +
                        "<td class=tdclass>" + data.data[i].exercises + "</td>" +
                        "<td class=tdclass>" + data.data[i].type + "</td>" +
                        "<td class=tdclass>" + data.data[i].semester + "</td>"
                
                
                
                        +"</tr>" //end row
                );
            };




        }});

    }
    else {
        $("#curriculum").css("display","none"); //no cookie? hide unauthorized page (yes, not that secure but no cookie so no problem)
        notloggedin();
    }
            
    $("#nav").slideDown(1000);
    $(".nav").hide();
    $(".nav").fadeIn("1000");

});

{/* </script> */}