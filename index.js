const startRecognitionBtn = document.querySelector("#start_recognition_btn");
const recognition = new webkitSpeechRecognition();
const synth = window.speechSynthesis;

recognition.continuos = true;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

$(document).ready(function(){
    $(".chat_on").click(function(){
        conversation_flow()
        $(".Layout").toggle();
        $(".chat_on").hide(300);
    });
    
       $(".chat_close_icon").click(function(){
        $(".Layout").hide();
           $(".chat_on").show(300);
    });
});

let utter = new SpeechSynthesisUtterance("Hello, how may I help you today?");
utter.onend = () => {
};

/////////////////////////////////////////////////////////////////////////////////

function addbot(botreply) {
    utter.text = botreply;
    synth.speak(utter);

    var p = document.getElementById("msg");
    var newelem = document.createElement("div");
    newelem.setAttribute('class', "bot");
    newelem.innerHTML = botreply;
    p.appendChild(newelem);
    scroll("msg");
}

function addnobot(botreply) {
    var p = document.getElementById("msg");
    var newelem = document.createElement("div");
    newelem.setAttribute('class', "bot");
    newelem.innerHTML = botreply;
    p.appendChild(newelem);
    scroll("msg");
}

function adduser(userinput) {
    var p = document.getElementById("msg");
    var newelem = document.createElement("div");
    newelem.setAttribute('class', "user");
    newelem.innerHTML = userinput;
    p.appendChild(newelem);
    scroll("msg");
}

function remSuggest(){
    var elements = document.getElementsByClassName("suggest");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function addsuggest(userinput) {
    var p = document.getElementById("msg");
    var newelem = document.createElement("div");
    newelem.setAttribute('class', "suggest");
    newelem.innerHTML = userinput;
    p.appendChild(newelem);
    scroll("msg");
}

function scroll(id) {
    var div = document.getElementById(id);
    div.scrollTop = div.scrollHeight - div.clientHeight;
}

function userSpokenMessage(){
    
    recognition.addEventListener('end', recognition.start);
    return new Promise((resolve) => {
            recognition.onresult = (e) => {
                const transcript = e.results[0][0].transcript.trim();

                if (transcript != null || transcript != "") {
                    adduser(transcript);
                    resolve(transcript);
                }
            }
    });
}

/////// complete calendar onesf6
/////// cancel old utters
/////// make sure to upload code on onedrive and mention on word report
/////// host on github pages

async function conversation_flow(){
    var user_input;

    labelflow: do{
        addbot("Hello, how may I help you today?");
        labelmain: do{
            remSuggest();
            addsuggest("Service");
            addsuggest("Take me to page");
            addsuggest("Information");
            setTimeout(() => recognition.start(), 1000)
            user_input = await userSpokenMessage();600
            recognition.abort();
            recognition.stop();    
            
            if (user_input.includes("service")){
                addbot("Sure thing!, Which type of services are you interested in?");
                labelservice: do{
                remSuggest();
                addsuggest("IT services");
                addsuggest("Book a Room");
                addsuggest("Library services");
                setTimeout(() => recognition.start(), 1000)
                user_input = await userSpokenMessage();
                recognition.abort();
                recognition.stop();

                if (user_input.includes("it")){
                    addbot("Do you want to rent hardware or install software?");
                    labelit: do{
                    remSuggest();
                    addsuggest("Rent hardware");
                    addsuggest("Install software");
                    setTimeout(() => recognition.start(), 1000)
                    user_input = await userSpokenMessage();
                    recognition.abort();
                    recognition.stop();

                    if (user_input.includes("rent") || user_input.includes("hardware")){
                        addbot("No problem, do you need computer hardware or robotics parts? ");
                        labelhardware: do{
                        remSuggest();
                        addsuggest("Computer hardware");
                        addsuggest("Robotic parts");
                        setTimeout(() => recognition.start(), 1000)
                        user_input = await userSpokenMessage();
                        recognition.abort();
                        recognition.stop();

                        if (user_input.includes("computer") || user_input.includes("hardware")){
                            addnobot("The following list contains the available inventory");
                            addnobot("1. Computerpart1");
                            addnobot("2. Computerpart2");
                            adduser("Which part will you be renting? (part number)");
                            labelcomputer: do{
                            remSuggest();
                            addsuggest("1");
                            addsuggest("2");
                            setTimeout(() => recognition.start(), 1000)
                            user_input = await userSpokenMessage();
                            recognition.abort();
                            recognition.stop();

                            if (user_input.includes("1") || user_input.includes("one")){
                                addbot("Please give me your name and I will book the part for you");
                                remSuggest();
                                addsuggest("Say your name");
                                setTimeout(() => recognition.start(), 1000)
                                user_input = await userSpokenMessage();
                                recognition.abort();
                                recognition.stop();

                                addbot("Perfect! I have booked the part: Computerpart1 under the name: " + user_input + ", you may collect them from the technicians office");
                            } else if (user_input.includes("2") || user_input.includes("two")){
                                addbot("Please give me your name and I will book the part for you");
                                remSuggest();
                                addsuggest("Say your name");
                                setTimeout(() => recognition.start(), 1000)
                                user_input = await userSpokenMessage();
                                recognition.abort();
                                recognition.stop();

                                addbot("Perfect! I have booked the part: Computerpart2 under the name: " + user_input + ", you may collect them from the technicians office");
                            }else {
                                addbot("I'm sorry, that isn't something I can do right now, please try again");
                                continue labelcomputer;
                            }
                            break labelcomputer;
                            } while (1);
                        } else if (user_input.includes("robot") || user_input.includes("part")){
                            addnobot("The following list contains the available inventory");
                            addnobot("1. Robotpart1");
                            addnobot("2. Robotpart2");
                            adduser("Which part will you be renting? (part number)");
                            labelrobot: do{
                            remSuggest();
                            addsuggest("1");
                            addsuggest("2");
                            setTimeout(() => recognition.start(), 1000)
                            user_input = await userSpokenMessage();
                            recognition.abort();
                            recognition.stop();

                            if (user_input.includes("1") || user_input.includes("one")){
                                addbot("Please give me your name and I will book the part for you");
                                remSuggest();
                                addsuggest("Say your name");
                                setTimeout(() => recognition.start(), 1000)
                                user_input = await userSpokenMessage();
                                recognition.abort();
                                recognition.stop();

                                addbot("Perfect! I have booked the part: Robotpart1 under the name: " + user_input + ", you may collect them from the technicians office");
                            } else if (user_input.includes("2") || user_input.includes("two")){
                                addbot("Please give me your name and I will book the part for you");
                                remSuggest();
                                addsuggest("Say your name");
                                setTimeout(() => recognition.start(), 1000)
                                user_input = await userSpokenMessage();
                                recognition.abort();
                                recognition.stop();

                                addbot("Perfect! I have booked the part: Robotpart2 under the name: " + user_input + ", you may collect them from the technicians office");
                            }else {
                                addbot("I'm sorry, that isn't something I can do right now, please try again");
                                continue labelrobot;
                            }
                            break labelrobot;
                            } while (1);
                        }else {
                            addbot("I'm sorry, that isn't something I can do right now, please try again");
                            continue labelhardware;
                        }
                        break labelhardware;
                        } while (1);
                    } else if (user_input.includes("install") || user_input.includes("software")){
                        addbot("No problem, please pick the software number you want to install from the list :) ");
                        addnobot("1. Software 1");
                        addnobot("2. Software 2");
                        addnobot("3. Software 3");
                        labelsoftware: do{
                        remSuggest();
                        addsuggest("1");
                        addsuggest("2");
                        addsuggest("3");
                        setTimeout(() => recognition.start(), 1000)
                        user_input = await userSpokenMessage();
                        recognition.abort();
                        recognition.stop();

                        if (user_input.includes("1") || user_input.includes("one")){
                            addbot("Very good, this is the download link");
                            addnobot("downloadSoftware1.fakeLink.com");
                        } else if (user_input.includes("2") || user_input.includes("two")){
                            addbot("Very good, this is the download link");
                            addnobot("downloadSoftware2.fakeLink.com");
                        } else if (user_input.includes("3")){
                            addbot("Very good, this is the download link");
                            addnobot("downloadSoftware3.fakeLink.com");
                        }else {
                            addbot("I'm sorry, that isn't something I can do right now, please try again");
                            continue labelsoftware;
                        }
                        break labelsoftware;
                        } while (1);
                    }else {
                        addbot("I'm sorry, that isn't something I can do right now, please try again");
                        continue labelit;
                    }
                    break labelit;
                    } while (1);
                } else if (user_input.includes("book") || user_input.includes("room")){
                    ROOMlabel: do {
                        addnobot("No problem,  this is the list of available rooms to book");
                        addnobot("1. Room1");
                        addnobot("2. Room2");
                        addnobot("3. Room3");
                        addbot("Which room would you like to book? (Room number)")
                        labelroom: do{
                        remSuggest();
                        addsuggest("1");
                        addsuggest("2");
                        addsuggest("3");
                        setTimeout(() => recognition.start(), 1000)
                        user_input = await userSpokenMessage();
                        recognition.abort();
                        recognition.stop();

                        if (user_input.includes("1") || user_input.includes("2") || user_input.includes("two") || user_input.includes("3") || user_input.includes("one") || user_input.includes("two") || user_input.includes("three")){
                            
                            var roomChoice = user_input;

                            DATElabel: 
                            do{
                                addbot("Very good, when would you like to book the room?");
                                addnobot("side note for assignment purposes: Tomorrow is fully booked");
                                remSuggest();
                                addsuggest("Tomorrow");
                                addsuggest("2 days from now");
                                addsuggest("Custom date  //not available");
                                setTimeout(() => recognition.start(), 1000)
                                user_input = await userSpokenMessage();
                                recognition.abort();
                                recognition.stop();
                                
                                if (!user_input.includes("tomorrow")){
                                    
                                    addbot("The room is available at the requested date. Please give me your student name and I will book the room for you");
                                    remSuggest();
                                    addsuggest("Say your name");
                                    setTimeout(() => recognition.start(), 1000)
                                    user_input = await userSpokenMessage();
                                    recognition.abort();
                                    recognition.stop();

                                    addbot("Perfect! I have booked room "+ roomChoice +" under the name: " + user_input);

                                    break DATElabel;
                                    
                                } else {
                                    
                                    addbot("The room is not available on the requested date. Would you like to change the room or the date?");
                                    remSuggest();
                                    addsuggest("Room");
                                    addsuggest("Date");

                                    setTimeout(() => recognition.start(), 1000)
                                    user_input = await userSpokenMessage();
                                    recognition.abort();
                                    recognition.stop();

                                    if (user_input.includes("room")){
                                        continue ROOMlabel;
                                    } else if (user_input.includes("date")){
                                        continue DATElabel;
                                    }
                                }
                                break DATElabel;
                            }while(1);
                        }else {
                            addbot("I'm sorry, that isn't something I can do right now, please try again");
                            continue labelroom;
                        }
                        break labelroom;
                        } while (1);
                        break ROOMlabel;
                    }while(1);
                } else if (user_input.includes("library")){
                    addbot("The school library offers the following information and services");
                    labellibrary: do{
                    remSuggest();
                    addsuggest("Opening hours");
                    addsuggest("Reserve a book");
                    addsuggest("Renew a book");
                    setTimeout(() => recognition.start(), 1000)
                    user_input = await userSpokenMessage();
                    recognition.abort();
                    recognition.stop();

                    if (user_input.includes("open") || user_input.includes("hour")){
                        addbot("Here you go :)");
                        addnobot("Library opening hours are from 9am till 5pm");
                    } else if (user_input.includes("reserve")){
                        addnobot("No problem, the following list contains the available books");
                        addnobot("1. Book 1");
                        addnobot("2. Book 2");
                        addbot("Which one would would you like to reserve? (book number)")
                        labelbook: do{
                        remSuggest();
                        addsuggest("1");
                        addsuggest("2");
                        setTimeout(() => recognition.start(), 1000)
                        user_input = await userSpokenMessage();
                        recognition.abort();
                        recognition.stop();

                        if (user_input.includes("1") || user_input.includes("one")){
                            addbot("Great!, Can you provide me your student name please?");

                            setTimeout(() => recognition.start(), 1000)
                            user_input = await userSpokenMessage();
                            recognition.abort();
                            recognition.stop();

                            addbot("Thank you, book 1 has successfully been reserved in the name: " + user_input);
                        } else if (user_input.includes("2") || user_input.includes("two")){
                            addbot("Great!, Can you provide me your student name please?");

                            setTimeout(() => recognition.start(), 1000)
                            user_input = await userSpokenMessage();
                            recognition.abort();
                            recognition.stop();

                            addbot("Thank you, book 2 has successfully been reserved in the name: " + user_input);
                        }else {
                            addbot("I'm sorry, that isn't something I can do right now, please try again");
                            continue labelbook;
                        }
                        break labelbook;
                        } while (1);

                    } else if (user_input.includes("renew")){
                        addbot("No problem, Can you provide me your student number please?");

                        setTimeout(() => recognition.start(), 1000)
                        user_input = await userSpokenMessage();
                        recognition.abort();
                        recognition.stop();

                        addnobot("Thank you, these are the books you currently have");
                        addnobot("1. Book 1");
                        addnobot("2. Book 2");
                        addbot("Which one would would you like to renew? (book number)");
                        labelbook: do{
                        remSuggest();
                        addsuggest("1");
                        addsuggest("2");
                        setTimeout(() => recognition.start(), 1000)
                        user_input = await userSpokenMessage();
                        recognition.abort();
                        recognition.stop();

                        if (user_input.includes("1") || user_input.includes("2") || user_input.includes("two") || user_input.includes("one") || user_input.includes("two")){
                            addbot("Very good, that book has been renewed for another week :)");
                        } else {
                            addbot("I'm sorry, that isn't something I can do right now, please try again");
                            continue labelbook;
                        }
                        break labelbook;
                        } while (1);
                    }else {
                        addbot("I'm sorry, that isn't something I can do right now, please try again");
                        continue labellibrary;
                    }
                    break labellibrary;
                    } while (1);
                }else {
                    addbot("I'm sorry, that isn't something I can do right now, please try again");
                    continue labelservice;
                }
                break labelservice;
                } while (1);
            } else if (user_input.includes("take me") || user_input.includes("redirect")){
                addbot("Sure thing!, Where do you want to go?");
                labelredirect: do{
                remSuggest();
                addsuggest("Main pages");
                addsuggest("Contact page");
                addsuggest("Information page");
                setTimeout(() => recognition.start(), 1000)
                user_input = await userSpokenMessage();
                recognition.abort();
                recognition.stop();
                if (user_input.includes("main")){
                    document.getElementById("bg").style.backgroundImage="url(background.png)";
                } else if (user_input.includes("contact")){
                    document.getElementById("bg").style.backgroundImage="url(backgroundContact.png)";
                } else if (user_input.includes("info")){
                    document.getElementById("bg").style.backgroundImage="url(backgroundInfomation.png)";
                } else { 
                    addbot("I'm sorry, that isn't something I can do right now, please try again");
                    continue labelredirect;
                }
                break labelredirect;
                }while(1);
            } else if (user_input.includes("info")){
                addbot("Sure thing!, What would you like information on?");
                labelinfo: do{
                    remSuggest();
                    addsuggest("Learning info");
                    addsuggest("Contact info");
                    addsuggest("Campus info");
                    setTimeout(() => recognition.start(), 1000)
                    user_input = await userSpokenMessage();
                    recognition.abort();
                    recognition.stop();

                    if (user_input.includes("learning")){
                        addnobot("No problem, I'll need some details to get the appropriate information for you");
                        addbot("First off, are you an undergraduate or a postgraduate student?");
                        labellearn: do{
                        remSuggest();
                        addsuggest("Undergraduate");
                        addsuggest("Postgraduate");
                        setTimeout(() => recognition.start(), 1000)
                        user_input = await userSpokenMessage();
                        recognition.abort();
                        recognition.stop();

                        if (user_input.includes("undergraduate") || user_input.includes("postgraduate")){
                            var graduate = user_input;
                            addbot("Secondly, Which course number are you in?");
                            labelgraduate: do{
                            remSuggest();
                            addsuggest("1");
                            addsuggest("2");
                            setTimeout(() => recognition.start(), 1000)
                            user_input = await userSpokenMessage();
                            recognition.abort();
                            recognition.stop();

                            if (user_input.includes("1") || user_input.includes("2") || user_input.includes("two") || user_input.includes("one") || user_input.includes("two")){
                                var course = user_input;
                                addbot("Are you a full-time or part-time student?");
                                labelcourse: do{
                                remSuggest();
                                addsuggest("Full-time");
                                addsuggest("Part-time");
                                setTimeout(() => recognition.start(), 1000)
                                user_input = await userSpokenMessage();
                                recognition.abort();
                                recognition.stop();

                                if (user_input.includes("full") || user_input.includes("part")){
                                    var time_scale = user_input;
                                    addbot("Perfect! What would you like to know?");
                                    labeltime: do{
                                    remSuggest();
                                    addsuggest("Assignment deadline");
                                    addsuggest("Timetable");
                                    setTimeout(() => recognition.start(), 1000)
                                    user_input = await userSpokenMessage();
                                    recognition.abort();
                                    recognition.stop();

                                    if (user_input.includes("deadline")){
                                        addbot("Sure thing! Here you go");

                                        if (graduate.includes("undergraduate") && (course.includes("1") || course.includes("one")) && time_scale.includes("full")){
                                            addbot("Your next deadline for Undergraduate, Course 1, Full-time is next Friday");
                                        } else
                                        if (graduate.includes("undergraduate") && (course.includes("2") || course.includes("two")) && time_scale.includes("full")){
                                            addbot("Your next deadline for Undergraduate, Course 2, Full-time is next Friday");
                                        } else
                                        if (graduate.includes("undergraduate") && (course.includes("1") || course.includes("one")) && time_scale.includes("part")){
                                            addbot("Your next deadline for Undergraduate, Course 1, Part-time is next Friday");
                                        } else
                                        if (graduate.includes("undergraduate") && (course.includes("2") || course.includes("two")) && time_scale.includes("part")){
                                            addbot("Your next deadline for Undergraduate, Course 2, Part-time is next Friday");
                                        } else
                                        if (graduate.includes("postgraduate") && (course.includes("1") || course.includes("one")) && time_scale.includes("full")){
                                            addbot("Your next deadline for Postgraduate, Course 1, Full-time is next Friday");
                                        } else
                                        if (graduate.includes("postgraduate") && (course.includes("2") || course.includes("two")) && time_scale.includes("full")){
                                            addbot("Your next deadline for Postgraduate, Course 2, Full-time is next Friday");
                                        } else
                                        if (graduate.includes("postgraduate") && (course.includes("1") || course.includes("one")) && time_scale.includes("part")){
                                            addbot("Your next deadline for Postgraduate, Course 1, Part-time is next Friday");
                                        } else
                                        if (graduate.includes("postgraduate") && (course.includes("2") || course.includes("two")) && time_scale.includes("part")){
                                            addbot("Your next deadline for Postgraduate, Course 2, Part-time is next Friday");
                                        }
                                    } else if (user_input.includes("timetable")){
                                        addbot("Sure thing! Here you go");

                                        if (graduate.includes("undergraduate") && (course.includes("1") || course.includes("one")) && time_scale.includes("full")){
                                            addbot("<img src='Tunder1f.png' width=\'250px\' height=\'230px\'>");
                                        } else
                                        if (graduate.includes("undergraduate") && (course.includes("2") || course.includes("two")) && time_scale.includes("full")){
                                            addbot("<img src='Tunder2f.png' width=\'250px\' height=\'230px\'>");
                                        } else
                                        if (graduate.includes("undergraduate") && (course.includes("1") || course.includes("one")) && time_scale.includes("part")){
                                            addbot("<img src='Tunder1p.png' width=\'250px\' height=\'230px\'>");
                                        } else
                                        if (graduate.includes("undergraduate") && (course.includes("2") || course.includes("two")) && time_scale.includes("part")){
                                            addbot("<img src='Tunder2p.png' width=\'250px\' height=\'230px\'>");
                                        } else
                                        if (graduate.includes("postgraduate") && (course.includes("1") || course.includes("one")) && time_scale.includes("full")){
                                            addbot("<img src='Tpost1f.png' width=\'250px\' height=\'230px\'>");
                                        } else
                                        if (graduate.includes("postgraduate") && (course.includes("2") || course.includes("two")) && time_scale.includes("full")){
                                            addbot("<img src='Tpost2f.png' width=\'250px\' height=\'230px\'>");
                                        } else
                                        if (graduate.includes("postgraduate") && (course.includes("1") || course.includes("one")) && time_scale.includes("part")){
                                            addbot("<img src='Tpost1p.png' width=\'250px\' height=\'230px\'>");
                                        } else
                                        if (graduate.includes("postgraduate") && (course.includes("2") || course.includes("two")) && time_scale.includes("part")){
                                            addbot("<img src='Tpost2p.png' width=\'250px\' height=\'230px\'>");
                                        }
                                    }else {
                                        addbot("I'm sorry, that isn't something I can do right now, please try again");
                                        continue labeltime;
                                    }
                                    break labeltime;
                                    } while (1);
                                }else {
                                    addbot("I'm sorry, that isn't something I can do right now, please try again");
                                    continue labelcourse;
                                }
                                break labelcourse;
                                } while (1);
                            }else {
                                addbot("I'm sorry, that isn't something I can do right now, please try again");
                                continue labelgraduate;
                            }
                            break labelgraduate;
                            } while (1);
                        }else {
                            addbot("I'm sorry, that isn't something I can do right now, please try again");
                            continue labellearn;
                        }
                        break labellearn;
                        } while (1);
                    } else if (user_input.includes("contact")){
                        labelanothercontact: do {
                        addbot("No problem, whose contact information do you need?");
                            labelcontact: do{
                            remSuggest();
                            addsuggest("Lecturing staff");
                            addsuggest("Administrative staff");
                            addsuggest("Students");
                            setTimeout(() => recognition.start(), 1000)
                            user_input = await userSpokenMessage();
                            recognition.abort();
                            recognition.stop();

                            if (user_input.includes("lecturing")){
                                addnobot("Sure thing! Here's a list of all relevant contacts we have");
                                addnobot("1. Lecturer 1");
                                addnobot("2. Lecturer 2");
                                addbot("Which contact from the list would you like to get? (Contact ID)");
                                labellecture: do{
                                remSuggest();
                                addsuggest("1");
                                addsuggest("2");
                                setTimeout(() => recognition.start(), 1000)
                                user_input = await userSpokenMessage();
                                recognition.abort();
                                recognition.stop();

                                if (user_input.includes("1") || user_input.includes("one")){
                                    addbot("Here you go!");
                                    addbot("email:'lecturer1@gmail.com' Contact number:'21212121'");

                                } else if (user_input.includes("2") || user_input.includes("two")){
                                    addbot("Here you go!");
                                    addbot("email:'lecturer2@gmail.com' Contact number:'21212121'");

                                } else {
                                    addbot("I'm sorry, that isn't something I can do right now, please try again");
                                    continue labellecture;
                                }
                                break labellecture;
                                } while (1);
                            } else if (user_input.includes("admin")){
                                addnobot("Sure thing! Here's a list of all relevant contacts we have");
                                addnobot("1. Administrator 1");
                                addnobot("2. Administrator 2");
                                addbot("Which contact from the list would you like to get? (Contact ID)");
                                labeladmin: do{
                                remSuggest();
                                addsuggest("1");
                                addsuggest("2");
                                setTimeout(() => recognition.start(), 1000)
                                user_input = await userSpokenMessage();
                                recognition.abort();
                                recognition.stop();

                                if (user_input.includes("1") || user_input.includes("one")){
                                    addbot("Here you go!");
                                    addnobot("email:'administrator1@gmail.com' Contact number:'21212121'");

                                } else if (user_input.includes("2") || user_input.includes("two")){
                                    addbot("Here you go!");
                                    addnobot("email:'administrator2@gmail.com' Contact number:'21212121'");

                                } else {
                                    addbot("I'm sorry, that isn't something I can do right now, please try again");
                                    continue labeladmin;
                                }
                                break labeladmin;
                                } while (1);
                            } else if (user_input.includes("student")){
                                addnobot("Sure thing! Here's a list of all relevant contacts we have");
                                addnobot("1. Student 1");
                                addnobot("2. Student 2");
                                addbot("Which contact from the list would you like to get? (Contact ID)");
                                labelstudent: do{
                                remSuggest();
                                addsuggest("1");
                                addsuggest("2");
                                setTimeout(() => recognition.start(), 1000)
                                user_input = await userSpokenMessage();
                                recognition.abort();
                                recognition.stop();

                                if (user_input.includes("1") || user_input.includes("one")){
                                    addbot("Here you go!");
                                    addnobot("email:'student1@gmail.com' Contact number:'21212121'");

                                } else if (user_input.includes("2") || user_input.includes("two")){
                                    addbot("Here you go!");
                                    addnobot("email:'student2@gmail.com' Contact number:'21212121'");

                                } else {
                                    addbot("I'm sorry, that isn't something I can do right now, please try again");
                                    continue labelstudent;
                                }
                                break labelstudent;
                                } while (1);
                            } else {
                                addbot("I'm sorry, that isn't something I can do right now, please try again");
                                continue labelcontact;
                            }
                            break labelcontact;
                            } while (1);

                            addbot("Would you like another contact?");
                            remSuggest();
                            addsuggest("Yes");
                            addsuggest("No");
                            setTimeout(() => recognition.start(), 1000)
                            user_input = await userSpokenMessage();
                            recognition.abort();
                            recognition.stop();

                            if (user_input.includes("yes")){
                                continue labelanothercontact;
                            }else if (user_input.includes("no")){
                                break labelanothercontact;
                            }
                        } while (1);
                    } else if (user_input.includes("campus")){
                        addbot("No problem, what do you want to know?");
                        labelcampus: do{
                        remSuggest();
                        addsuggest("Campus map");
                        addsuggest("List shops");
                        addsuggest("List office");
                        setTimeout(() => recognition.start(), 1000)
                        user_input = await userSpokenMessage();
                        recognition.abort();
                        recognition.stop();

                        if (user_input.includes("map")){
                            addbot("Sure thing! Here you go");
                            addnobot("<img src='Campusmap.png' width=\'250px\' height=\'230px\'>");
                        } else if (user_input.includes("shop")){
                            addnobot("Sure thing! Here you go");
                            addnobot("1. Shop1");
                            addnobot("2. Shop2");
                            addbot("Would you like further details on one of the shops/offices?");
                            labelshop: do{
                            remSuggest();
                            addsuggest("Yes");
                            addsuggest("No");
                            setTimeout(() => recognition.start(), 1000)
                            user_input = await userSpokenMessage();
                            recognition.abort();
                            recognition.stop();

                            if (user_input.includes("yes")){
                                addbot("Sure thing! Which one? (Shop/office number)");
                                labelyes: do{
                                remSuggest();
                                addsuggest("1");
                                addsuggest("2");
                                setTimeout(() => recognition.start(), 1000)
                                user_input = await userSpokenMessage();
                                recognition.abort();
                                recognition.stop();

                                if (user_input.includes("1") || user_input.includes("one")){
                                    addbot("What would you like to know about it?");
                                    labelone: do{
                                    remSuggest();
                                    addsuggest("Opening hours");
                                    addsuggest("Location");
                                    setTimeout(() => recognition.start(), 1000)
                                    user_input = await userSpokenMessage();
                                    recognition.abort();
                                    recognition.stop();
                                    if (user_input.includes("open")){
                                        addbot("Sure thing! Here you go");
                                        addnobot("Shop 1 opening hours: 9am - 5pm (closed on weekends)");
                                    } else if (user_input.includes("location")){
                                        addbot("Sure thing! Here you go");
                                        addnobot("<img src='CampusMapshop1.png' width=\'250px\' height=\'230px\'>");
                                    } else {
                                        addbot("I'm sorry, that isn't something I can do right now, please try again");
                                        continue labelone;
                                    }
                                    break labelone;
                                    } while (1);
                                } else if (user_input.includes("2") || user_input.includes("two")){
                                    addbot("What would you like to know about it?");
                                    labeltwo: do{
                                    remSuggest();
                                    addsuggest("Opening hours");
                                    addsuggest("Location");
                                    setTimeout(() => recognition.start(), 1000)
                                    user_input = await userSpokenMessage();
                                    recognition.abort();
                                    recognition.stop();
                                    if (user_input.includes("open")){
                                        addbot("Sure thing! Here you go");
                                        addbot("Shop 2 opening hours: 9am - 5pm (closed on weekends)");
                                    } else if (user_input.includes("location")){
                                        addbot("Sure thing! Here you go");
                                        addbot("<img src='CampusMapshop2.png' width=\'250px\' height=\'230px\'>");
                                    } else {
                                        addbot("I'm sorry, that isn't something I can do right now, please try again");
                                        continue labeltwo;
                                    }
                                    break labeltwo;
                                    } while (1);
                                } else {
                                    addbot("I'm sorry, that isn't something I can do right now, please try again");
                                    continue labelyes;
                                }
                                break labelyes;
                                } while (1);

                            } else if (user_input.includes("no")){
                                addbot("");
                            } else {
                                addbot("I'm sorry, that isn't something I can do right now, please try again");
                                continue labelshop;
                            }
                            break labelshop;
                            } while (1);
                        } else if (user_input.includes("office")){
                            addnobot("Sure thing! Here you go");
                            addnobot("1. Office1");
                            addnobot("2. Office2");
                            addbot("Would you like further details on one of the shops/offices?");
                            labeloffice: do{
                            remSuggest();
                            addsuggest("Yes");
                            addsuggest("No");
                            setTimeout(() => recognition.start(), 1000)
                            user_input = await userSpokenMessage();
                            recognition.abort();
                            recognition.stop();

                            if (user_input.includes("yes")){
                                addbot("Sure thing! Which one? (Shop/office number)");
                                labelyes: do{
                                remSuggest();
                                addsuggest("1");
                                addsuggest("2");
                                setTimeout(() => recognition.start(), 1000)
                                user_input = await userSpokenMessage();
                                recognition.abort();
                                recognition.stop();

                                if (user_input.includes("1") || user_input.includes("one")){
                                    addbot("What would you like to know about it?");
                                    labelone: do{
                                    remSuggest();
                                    addsuggest("Opening hours");
                                    addsuggest("Location");
                                    setTimeout(() => recognition.start(), 1000)
                                    user_input = await userSpokenMessage();
                                    recognition.abort();
                                    recognition.stop();
                                    if (user_input.includes("open")){
                                        addbot("Sure thing! Here you go");
                                        addnobot("Office 1 opening hours: 9am - 5pm (closed on weekends)");
                                    } else if (user_input.includes("location")){
                                        addbot("Sure thing! Here you go");
                                        addnobot("<img src='CampusMapoff1.png' width=\'250px\' height=\'230px\'>");
                                    } else {
                                        addbot("I'm sorry, that isn't something I can do right now, please try again");
                                        continue labelone;
                                    }
                                    break labelone;
                                    } while (1);
                                } else if (user_input.includes("2") || user_input.includes("two")){
                                    addbot("What would you like to know about it?");
                                    labeltwo: do{
                                    remSuggest();
                                    addsuggest("Opening hours");
                                    addsuggest("Location");
                                    setTimeout(() => recognition.start(), 1000)
                                    user_input = await userSpokenMessage();
                                    recognition.abort();
                                    recognition.stop();
                                    if (user_input.includes("open")){
                                        addbot("Sure thing! Here you go");
                                        addnobot("Office 2 opening hours: 9am - 5pm (closed on weekends)");
                                    } else if (user_input.includes("location")){
                                        addbot("Sure thing! Here you go");
                                        addnobot("<img src='CampusMapoff2.png ' width=\'250px\' height=\'230px\'>");
                                    } else {
                                        addbot("I'm sorry, that isn't something I can do right now, please try again");
                                        continue labeltwo;
                                    }
                                    break labeltwo;
                                    } while (1);
                                } else {
                                    addbot("I'm sorry, that isn't something I can do right now, please try again");
                                    continue labelyes;
                                }
                                } while (1);
                            } else if (user_input.includes("no")){
                                addbot("");
                            }else {
                                addbot("I'm sorry, that isn't something I can do right now, please try again");
                                continue labeloffice;
                            }
                            break labeloffice;
                            } while (1);
                        }else {
                            addbot("I'm sorry, that isn't something I can do right now, please try again");
                            continue labelcampus;
                        }
                        break labelcampus;
                        } while (1);
                    } else {
                        addbot("I'm sorry, that isn't something I can do right now, please try again");
                        continue labelinfo;
                    }
                    break labelinfo;
                } while (1);
            } else {
                addbot("I'm sorry, that isn't something I can do right now, please try again");
                continue labelmain;
            }
            break labelmain;
        } while (1);

        addbot("Can I assist you with anything else today?");
        remSuggest();
        addsuggest("Yes");
        addsuggest("No");
        setTimeout(() => recognition.start(), 1000)
        user_input = await userSpokenMessage();
        recognition.abort();
        recognition.stop();

        if (user_input.includes("yes")){
            continue labelflow;
        }else if (user_input.includes("no")){
            addbot("Very well, Goodbye and don't hesitate to contact me again");
            remSuggest();
            break labelflow;
        }
    } while (1);
}






