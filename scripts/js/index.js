{/* <script> */}


            var iscurriculumshown = false;

            function changegallerypicture(id) {
                var temp = document.getElementById("mainpicture");
                var temp2 = document.getElementById(id);

                var temp_src = temp.getAttribute("src");
                var temp2_src = temp2.getAttribute("src");


                


                temp.setAttribute("src",temp2_src);
                temp2.setAttribute("src",temp_src);


            }


            function jsPicture() {
                img = document.getElementById('mainpicture');
                img.setAttribute("src", "https://media.istockphoto.com/id/1470130937/photo/young-plants-growing-in-a-crack-on-a-concrete-footpath-conquering-adversity-concept.webp?b=1&s=170667a&w=0&k=20&c=IRaA17rmaWOJkmjU_KD29jZo4E6ZtG0niRpIXQN17fc=");
                }

            
            function setvideoblur(changeval) {
                video = document.getElementById('myVideo');
                if (changeval == true) {
                    video.setAttribute("class", "videoblur");
                }
                else {
                    video.setAttribute("class", "videonoblur");
                }
            }



            function showtable(changeval) {
                if (changeval == true) {
                    // document.getElementById('CitiesTable').style.display = "block";
                    // document.getElementById('CitiesTable').style.opacity = "1";
                    $("#algebracitiestablediv").slideDown("slow");
                    // $("#CitiesTable").css("text-shadow","2px 2px 14px rgba(0,0,0,1)");
                    
                }
                else {
                    // $("#CitiesTable").css("text-shadow","none");
                    $("#algebracitiestablediv").slideUp("slow");
                    // document.getElementById('CitiesTable').style.display = "none";
                    // document.getElementById('CitiesTable').style.opacity = "0";

                }
            }

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
                
                $("#nav").slideDown(1000);
                $(".nav").hide();
                $(".nav").fadeIn("1000");


                Fancybox.bind("[data-fancybox]", {
                    // Your custom options
                    autoPlay: true,
                    playOnStart: true,
                    slideShow : {
                        autoStart : false,
                        speed     : 4000
                    }
                  });
                //   setInterval($.fancybox.next, 1000);
                // $("[data-fancybox]").fancybox({
                //         // Your custom options
                //         autoPlay: true,
                //         playOnStart: true,
                //         slideShow : {
                //             autoStart : false,
                //             speed     : 4000
                //         }
                // });



            });



        // </script>