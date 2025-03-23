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




var listofcoursesforautocomplete;
var tableiterator = 0;
var selectionindex = 0;
$(document).ready(function () { //on load function
    var var1 = "";
    var var2 = [0,0,0,0,0,0];
    var altrowvar = true;
    if (document.cookie != "") { //easy cookie values (only using one so, shortcut)
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
        var1 = tokenstring;
        console.log(tokenstring);
        console.log(JSON.stringify(tokenstring));
        $.ajax({
        url: "https://www.fulek.com/data/api/supit/curriculum-list/en",
        type: "GET",
        headers: tokenstring,
        dataType: "json",
        success: function(data){

            var tempvar44 = []; 
            const tdclass = "tdclass";
            for (let i = 0; i < data.data.length; i++) { //parse entire array of courses
                console.log(data.data[i].course); //data is the recieved response object passed into function, .data is the JSON part containing courses and their attributes
                // $("#courses").append //dynamic table
                // (
                //         "<option value=" + data.data[i].id + ">" + data.data[i].course + "</option>"
                // );


                tempvar44[i]=(data.data[i].course);

            };
            listofcoursesforautocomplete = tempvar44;
            $("#courses").autocomplete({
                source: listofcoursesforautocomplete
            });
            $('#courses option[value="3"]').attr("selected",true);
            console.log("$$$$$$$$$ " + $("#courses").children("option").filter(":selected").text())
            console.log(listofcoursesforautocomplete);

        }});

    }
    else {
        $("#curriculum").css("display","none"); //no cookie? hide unauthorized page (yes, not that secure but no cookie so no problem)
        notloggedin();
    }
    
    $("#nav").slideDown(1000);
    $(".nav").hide();
    $(".nav").fadeIn("1000");
    
    $("#courses").change(function() {
        // console.log("$$$$$$$$$ " + $("#courses").children("option").filter(":selected").text());
        selectionindex = listofcoursesforautocomplete.indexOf(this.value) + 1; //+1 index 0 id 1
    });


    $("#button").on("click",function() {
        console.log($("#courses").val());
        if ($("#courses").val() != "") { //dont run if box is empty
            $.ajax({
                url: "https://www.fulek.com/data/api/supit/get-curriculum/" + selectionindex,
                type: "GET",
                headers: var1,
                dataType: "json",
                success: function(data) {
                    
                    
                    "###@@@" + console.log(data.data.kolegij)
                    if ($("#table").css("display") != "table") {
                        $("#table").css("display","table");
                        $(".list2").css("box-shadow","rgba(0, 0, 0, 0.24) 0px 3px 8px;");
                    }


                    for (let i = 0; i < 1; i++) { //parse entire array of courses
                        console.log(data.data.kolegij); //data is the recieved response object passed into function, .data is the JSON part containing courses and their attributes
                        if (altrowvar == true) { //simple 1 0 logic for alternating row colors via class
                            $("#table").find("tbody").append //dynamic table
                            (
        
                                '<tr id="row' + tableiterator + '" class="altrowcolor"'+ '>' + //new row
                                    
                                    "<td class=tdclass>" + data.data.id + "</td>" + //column 1
                                    "<td class=tdclass-course>" + data.data.kolegij + "</td>" + //column 2 etc...
                                    "<td class=tdclass>" + data.data.ects + "</td>" +
                                    "<td class=tdclass>" + data.data.sati + "</td>" +
                                    "<td class=tdclass>" + data.data.predavanja + "</td>" +
                                    "<td class=tdclass>" + data.data.vjezbe + "</td>" +
                                    "<td class=tdclass>" + data.data.tip + "</td>" +
                                    "<td class=tdclass>" + data.data.semestar + "</td>" +     // this line had a " , " at the end that cost me 2h of removerow troubleshooting
                                    // "<td class=tdclass>" + '<input type="button" class="buttonfordelete" onclick="removerow('+ tableiterator +')" '+ 'id="'+ (tableiterator++) +'"'+ ' value="Delete Row"></input>' + "</td>"
                                    "<td class=tdclass>" + '<button type="button"' + 'class="'+ 'button'+ (tableiterator++) +'"'+ ' value="Delete Row">Remove</input>' + "</td>"
                                    
                            
                            
                                    +"</tr>" //end row
        
        
                            );
                            altrowvar = !altrowvar;
                        }
                        else {

                            $("#table").find("tbody").append //dynamic table
                            (
        
                                '<tr id="row' + tableiterator + '">' + //new row
                                    
                                    "<td class=tdclass>" + data.data.id + "</td>" + //column 1
                                    "<td class=tdclass-course>" + data.data.kolegij + "</td>" + //column 2 etc...
                                    "<td class=tdclass>" + data.data.ects + "</td>" +
                                    "<td class=tdclass>" + data.data.sati + "</td>" +
                                    "<td class=tdclass>" + data.data.predavanja + "</td>" +
                                    "<td class=tdclass>" + data.data.vjezbe + "</td>" +
                                    "<td class=tdclass>" + data.data.tip + "</td>" +
                                    "<td class=tdclass>" + data.data.semestar + "</td>" +     // this line had a " , " at the end that cost me 2h of removerow troubleshooting
                                    // "<td class=tdclass>" + '<input type="button" class="buttonfordelete" onclick="removerow('+ tableiterator +')" '+ 'id="'+ (tableiterator++) +'"'+ ' value="Delete Row"></input>' + "</td>"
                                    "<td class=tdclass>" + '<button type="button"' + 'class="'+ 'button'+ (tableiterator++) +'"'+ ' value="Delete Row">Remove</input>' + "</td>"
                                    
                            
                            
                                    +"</tr>" //end row
                            );
                            altrowvar = !altrowvar;
                        }    

                        //here
                        tabletotal(data);
                    };
                    
                
                }
            })
        };
    }
);
    
    function tabletotal(data) { //fix later
        // var temp =  SIMD.Int16x8(var2[0],var2[1],var2[2],var2[3],var2[4],var2[5]);  ////sad, no SIMD
        // var temp2 = SIMD.Int16x8(data.data.ects,data.data.sati,data.data.predavanja,data.data.vjezbe,data.data.tip,data.data.semestar); //not all int but doesnt matter anyway
        // var temp3 = SIMD.INT16x8.add(temp + temp2);
        
        console.log("%%!!" + var2);
        var temp =  [var2[0],var2[1],var2[2],var2[3],var2[4],var2[5]];
        var temp2 = [data.data.ects,data.data.sati,data.data.predavanja,data.data.vjezbe,data.data.tip,data.data.semestar];
        
        for (let i = 0; i < temp2.length; i++) {
            if(!(i == 4) && !(i == 5)) { //skip unimportant attributes
                temp[i] += temp2[i];
            }
        }

        var2 = temp; //didnt really have to use temp
        console.log("%%!!" + var2);
        console.log("%%" + temp);
        console.log("%%" + temp2);

        $("#total-ects").html(var2[0]); //HTML HTML HTML NOT VAL BUT HTML!!
        $("#total-hours").html(var2[1]); //HTML HTML HTML NOT VAL BUT HTML!!
        $("#total-lectures").html(var2[2]); //HTML HTML HTML NOT VAL BUT HTML!!
        $("#total-exercises").html(var2[3]); //HTML HTML HTML NOT VAL BUT HTML!!
        // $("#total-type").html(""); //HTML HTML HTML NOT VAL BUT HTML!! ////ignore
        //$("#total-semester").html(var2[5]); //HTML HTML HTML NOT VAL BUT HTML!! ////also ignore
        console.log($("#total-ects").val());
    }

    // $('#table').on('click', 'input[type="button"]', function(e){
    //     $(this).closest('tr').remove();
    //  })

    $("#table").find("tbody").on('click','button[type="button"]',function(){ //REMOVE ROW LOGIC , this one, perfect

        // var temp2 =  [$(this).closest('tr').find("td").html(),var2[1],var2[2],var2[3],var2[4],var2[5]];
        // for (let i = 0; i < var2.length; i++) {
        //     if(!(i == 4) || !(i == 5)) { //skip unimportant attributes
        //         var2[i] -= temp2[i];
        //     }
        // }


        // console.log($(this).closest("tr").each(function() {console.log($(this).children().html());}));
        // $("#total-ects").html(var2[0]);
        // $("#total-hours").html(var2[1]); 
        // $("#total-lectures").html(var2[2]); 
        // $("#total-exercises").html(var2[3]); 
        // console.log($(this).closest("tr").each(function() {console.log($(this).children().next().html());})); //horrible, I'm tired
        // console.log($(this).closest("tr").each(function() {console.log($(this).children().next().next().html());}));
        // console.log($(this).closest("tr").each(function() {console.log($(this).children().next().next().next().html());}));
        // console.log($(this).closest("tr").each(function() {console.log($(this).children().next().next().next().next().html());}));
        // console.log($(this).closest("tr").each(function() {console.log($(this).children().next().next().next().next().next().html());}));
        var simpleiterator = 0; //for for loop
        $(this).closest("tr").children().each(function() { // fixed it, works
            // console.log(index);
            if(simpleiterator > 1 && simpleiterator < 6) { //skip unimportant attributes
                var tempvalue = $(this).html();
                console.log(tempvalue);
                switch(simpleiterator) {
                    case 2:
                        var2[0] -= tempvalue;
                        $("#total-ects").html(var2[0]);
                      break;
                    case 3:
                        var2[1] -= tempvalue;
                        $("#total-hours").html(var2[1]);
                      break;
                    case 4:
                        var2[2] -= tempvalue;
                        $("#total-lectures").html(var2[2]);
                      break;
                    case 5:
                        var2[3] -= tempvalue;
                        $("#total-exercises").html(var2[3]);
                      break;
                      
                    default:
                      
                  }
            }
            simpleiterator++;
            // console.log("Simpleiterator: "+simpleiterator);
            

        });
        $(this).closest('tr').remove();
     });


}); //onready

// function removerow() {
//     // var td = event.target.parentNode; 
//     // var tr = td.parentNode; // the row to be removed
//     // tr.parentNode.removeChild(tr);
//     console.log("removerowclick");
//     // $(button).closest("tr").remove();
//     // $("#"+button).closest("tbody").find("row").closest("tr").remove();
//     // $("#table").find("tbody").find("tr").remove();
//     // $("#row"+button).remove();
//     // var rowvar = document.getElementsByName("tbody");
//     // $("#"+button).closest('tr',rowvar).remove();

//     $(this).closest('tr').first().remove();
// }

// function test() { //works
//     $(this).closest('tr').first().remove();
// }

// $(document).on('click', "input[type='button'][id$='delete']",function(){
//     $(this).closest('tr').remove();
//  });

{/* </script> */}