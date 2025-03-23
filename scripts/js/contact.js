














// function showcontact() {
//     $(".contact").dialog({
//     title:"Contact",
//     modal: true,
//     resizable: false,
//     width: 500
//     });
// };
function showcontact() {
    $(".contact").dialog({
        title:"Contact",
        modal: true,
        resizable: false,
        width: 500,
        show: { effect: "drop",direction: "up", duration: 700 },
        // hide: { effect: "explode", duration: 1000 },
        hide: { effect: "drop",direction: "up", duration: 700 },
        resizable: false,
        draggable: false,
        position: { my: "center", at: "center", of: window }
        });
};

function showlogout() {
    $(".logout").dialog({
        title:"Log out",
        modal: true,
        resizable: false,
        width: 500,
        show: { effect: "drop",direction: "up", duration: 700 },
        // hide: { effect: "explode", duration: 1000 },
        hide: { effect: "drop",direction: "up", duration: 700 },
        resizable: false,
        draggable: false,
        position: { my: "center", at: "center", of: window }
        });
};

function logout(boolvar) {
    if(boolvar == true) {
        if (document.cookie != "") { //easy cookie values (only using one so, shortcut)
            let cookievar = decodeURIComponent(document.cookie);
            let cookievarsplit = cookievar.split('=');
            console.log(cookievarsplit);
            let value = cookievar[1];
            let key = cookievar[0];
            

            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; //delete cookie by expire, only one cookie so it's simpler (instead of read all, update one, write all)
            $(".logout").dialog("close");
            // window.setTimeout(function() {window.location.href = "index.html";}, 1000); //redirect in order to update page via onload logic (detect not logged in status) (would not work for all pages, they would all redirect to index)
            window.setTimeout(function() {window.location.reload();}, 1000); //reload page in order to update page via onload logic (detect not logged in status)
        }
        else {
            
            //cannot happen anyway
        }
    }
    else {
        $(".logout").dialog("close");
    }
}

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



function notloggedin() {
    $(".notloggedin").dialog({
        dialogClass: "no-close",
        title:"Login status fail",
        modal: true,
        resizable: false,
        width: 500,
        show: { effect: "drop",direction: "up", duration: 700 },
        // hide: { effect: "explode", duration: 1000 },
        hide: { effect: "drop",direction: "up", duration: 700 },
        resizable: false,
        draggable: false,
        position: { my: "center", at: "center", of: window }
        });
    $(".ui-dialog-titlebar-close").hide();
    $("#failurep4").hide();
    $("#failurep4").text("You are not logged in!");
    $("#failurep4").slideDown(200)
    window.setTimeout(function() {$("#failurep4").slideUp(200);},2750); 
    window.setTimeout(function() {$("#failurep4").slideDown(200);$("#failurep4").text("Redirecting to homepage in 3")},3000); //yes, I could use a loop but its only 4 values
    window.setTimeout(function() {$("#failurep4").text("Redirecting to homepage in 2")},4000); //failurep4 so i dont have to add css to make redirectp4 red
    window.setTimeout(function() {$("#failurep4").text("Redirecting to homepage in 1")},5000);
    window.setTimeout(function() {$("#failurep4").text("Redirecting...")},6000);
    window.setTimeout(function(){ window.location.href = "index.html"; }, 7000);
}