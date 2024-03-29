const RUNNING_TIMER = document.querySelector(".running-timer");
const SECONDS_DISPLAY = document.querySelector(".seconds");
const QSN_NUM_DISP = document.querySelector(".qsn-num-disp");
const QSN_DISP = document.querySelector(".qsn-disp");

//each option's paragraph
const OPT_1 = document.querySelector(".opt-1 p");
const OPT_2 = document.querySelector(".opt-2 p");
const OPT_3 = document.querySelector(".opt-3 p");
const OPT_4 = document.querySelector(".opt-4 p");

//each check circle
const CHECK_CIRCLE_1 = document.querySelector(".check-1");
const CHECK_CIRCLE_2 = document.querySelector(".check-2");
const CHECK_CIRCLE_3 = document.querySelector(".check-3");
const CHECK_CIRCLE_4 = document.querySelector(".check-4");

const NEXT_BTN = document.querySelector(".next-btn");
const OPTS_NEXT = document.querySelector(".opts-next");
const ALL_CIRCLES = document.querySelectorAll(".fa-circle-check");
const ALL_OPTIONS = document.querySelectorAll(".opt p");
const ALL_OPT_DIV = document.querySelectorAll(".opt");
const SCORE = document.querySelector(".score p");
const LANDING_PAGE = document.querySelector(".landing-page");
const TOPICS = document.querySelector(".topics");
const TAKE_QUIZ = document.querySelector(".take-quiz");
const SHOW_RESULT = document.querySelector(".show-result");
const QUIZ = document.querySelector(".quiz");
const MAX_QSNS = 15;
const CATEGORYOBJ = {
    gk      : GK_QUIZ,
    geo     : GEOGRAPHY_QUIZ,
    history : HISTORY_QUIZ,
    tech    : TECHNOLOGY_QUIZ,
    science : SCIENCE_QUIZ

}


let counter = 1;
let initial_time;
let end_time;
let start_timer;
let correct_ans = 0;
let topic;
let quiz_num;


function setQsn(topic){   
    if(topic==null){
        console.log("topic is null");
    } 
    else{
        let opt_tag;
        let opt_num;
        resetValues();
        //add max variable and call the funciton
        if(isLastQuestion()){

            QSN_NUM_DISP.textContent = `Question ${counter}/15`;
            quiz_num = `quiz${counter}`;
            QSN_DISP.textContent = topic[quiz_num].qsn;

            for(let i = 1;i<5;i++){
                opt_tag = `.opt-${i} p`;
                opt_num = `opt${i}`;
                    
                document.querySelector(opt_tag).textContent = topic[quiz_num].options[opt_num];
            }
            addAnswerClass();
            counter++;
            
            if(counter == MAX_QSNS+1){
                NEXT_BTN.textContent ="Finish";
            }
        }
    }
}

function resetValues(){
    ALL_CIRCLES.forEach((circle) =>{
        circle.classList.remove("fa-circle-check-clk");
        })
    ALL_OPT_DIV.forEach(function(opt){
        opt.classList.remove("correct-ans");
        opt.classList.remove("wrong-ans");
    })
}

function isLastQuestion(){
    return counter <= MAX_QSNS;
}
  
function addAnswerClass(){
    ALL_OPTIONS.forEach(function(opt){
        let closest = opt.closest(".opt");
        closest.classList.remove("answered");

        if(opt.textContent==topic[quiz_num].ans){
            closest.classList.add("answer");

        }
        else{
            closest.classList.remove("answer");
           
        }
    })
}


function checkCircle(eve){

        eve.classList.add("fa-circle-check-clk");
        eve.closest(".opt").classList.add("answered");
        ALL_CIRCLES.forEach((opt) =>{
            if(opt != eve){
                opt.classList.remove("fa-circle-check-clk");
                opt.closest(".opt").classList.remove("answered");
            }
        })
    
    
    
}

function timer(){
    initial_time = 15;
    end_time = 1;
    SECONDS_DISPLAY.textContent = initial_time;
    setTimeout(function(){
        RUNNING_TIMER.classList.add("running-timer-clk");
    },30);
    

    start_timer = setInterval(run_timer,1000);

    function run_timer(){
    if(initial_time>end_time){
        initial_time--;
        SECONDS_DISPLAY.textContent = initial_time;

    }
    else if(initial_time == end_time && counter==16 ){
        countScore();
        setTimeout(resetIfLastQsn,500);
    }
    else if(initial_time = end_time){
        countScore();
        setTimeout(resetIfNotLastQsn,500);
        

    }
    
}
}

function countScore(){
    
    
    ALL_OPT_DIV.forEach(function(check){
        if(check.classList.contains("answer") && check.classList.contains("answered")){
            let check_circle_parent = check.closest(".opt");
            check_circle_parent.classList.add("correct-ans");
            correct_ans++;
            
        }
        if(check.classList.contains("answer")){
            let check_circle_parent = check.closest(".opt");
            check_circle_parent.classList.add("correct-ans");
        }
        if(check.classList.contains("answered") && !check.classList.contains("answer")){
            let check_circle_parent = check.closest(".opt");
            check_circle_parent.classList.add("wrong-ans");
        }
    })
    
}
function resetIfLastQsn(){
    
    clearInterval(start_timer);
    RUNNING_TIMER.classList.remove("running-timer-clk");
    TAKE_QUIZ.classList.remove("index");
    SHOW_RESULT.classList.add("index");
    SCORE.textContent = `${correct_ans}/15`;
    counter = 1;
    correct_ans = 0;
    NEXT_BTN.textContent ="Next";
    
}
function resetIfNotLastQsn(){
    setQsn(topic);
    clearInterval(start_timer);
    RUNNING_TIMER.classList.remove("running-timer-clk");
    timer();
}


QUIZ.addEventListener("click",function(eve){
    let circle_child ;
    let closestOptionParent = eve.target.closest(".topic");
    console.log (eve.target.classList);
    console.log(closestOptionParent);

    if(eve.target.classList.contains("fa-circle-check")){
        circle_child = eve.target;
        checkCircle(circle_child);
    }
    else if(eve.target.classList.contains("opt")){
       
        circle_child = eve.target.querySelector(".fa-circle-check")
        checkCircle(circle_child);
        }
        
    else if(eve.target.classList.contains("next-btn")){
        console.log(counter);
        if(counter==16){
            countScore();
            setTimeout(resetIfLastQsn,500);
        }
        else{
           
            countScore();
            setTimeout(resetIfNotLastQsn,500);
            
        }

    }
    else if(eve.target.classList.contains("start-button")){
        TOPICS.classList.add("index");
        LANDING_PAGE.classList.remove("index");
        
    }    
    else if(closestOptionParent != null && closestOptionParent.classList.contains("topic")){
        TAKE_QUIZ.classList.add("index");
        TOPICS.classList.remove("index");
        topic = CATEGORYOBJ[closestOptionParent.dataset.topic];
        setQsn(topic);
        clearInterval(start_timer);
        RUNNING_TIMER.classList.remove("running-timer-clk");
        timer();
    }
    else if(eve.target.classList.contains("left-arrow")){
        TOPICS.classList.add("index");
        SHOW_RESULT.classList.remove("index");
        
    }
    else if(eve.target.classList.contains("retry-btn")){
        TAKE_QUIZ.classList.add("index");
        SHOW_RESULT.classList.remove("index");
        clearInterval(start_timer);
        RUNNING_TIMER.classList.remove("running-timer-clk");
        timer();
        setQsn(topic);
    }
 

})
