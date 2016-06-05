
$(function () {


  var blabber_check=0;
 var a=0,b=0,c=0;

  var db = [ ["what","your","name"],
             ["hello"],
             ["hey"],
             ["there"],
             ["hi"]


           ];

  var answers = [ ["Baymax","Personal Assistant , .. , on health care "],
                  ["yes","hi","hello","ask me ","I am always here"],
                  ["yes","hi","hello","ask me ","I am always here"],
                  ["yes","hi","hello","ask me ","I am always here"],
                  ["yes","hi","hello","ask me ","I am always here"]

               ];
  var close=3;

  var machineName = "Baymax";
  $(".status-text").hide();
  function addMessage(message, author, machine) {
    $("#messages").append('<li class="listStyle" style="display: none;"><span style="color:lightblue">' + author + ': </span><span style="color:green">' + message +  '</span></li>');
    if (typeof machine == "boolean")
      $(".status-text").fadeOut();
    else
      $("textarea").val("");
    $("#messages li:last").fadeIn();
    if (typeof machine != "boolean")
      setTimeout(function () {

        var i=0;
        var j=0;
        var randomNumber;
        for(i=0;i<db.length;i++)
        {
            j=0;
            for(j=0;j<db[i].length;j++)
            {
                if(!message.includes(db[i][j]))
                {
                    //addMessage("not found",machineName,true);
                    break;
                }
                if(j==db[i].length-1)
                {
                    randomNumber = Math.floor(Math.random()*answers[i].length);
                    addMessage(answers[i][randomNumber],machineName,true);
                }
            }
        }
        if(message.includes('book'))
        {
            addMessage("Making an Appointment under the name: " + author + " Right? Reply with yes.", machineName, true);
            a=1;            
        }
        if(message.includes('yes')) {
          if(a==1){
           addMessage("Reply with the doctor's number for which an appointment should be made.", machineName, true);
           addMessage("<br/>Doctor #1 <br/>Doctor #2 <br/> Doctor #3 <br/>", machineName, true);
           b=1;

           $(".but_1").show();
        }
        }
        if(message.includes('1'||'2'||'3'))
        {
           if(b==1){
                c=1; var number=message;          
            } 
        }
        if(c==1){
           addMessage("Appointment under the name: " + author + "<br/> for the Doctor "+number+". Correct? Reply with confirm to proceed.", machineName, true);
        }
        if(message.includes('confirm'))
        {
            //POST REQUEST HERE            
        }

    
      }, 500);
  }
  if (typeof localStorage != "undefined")
    if (typeof localStorage.username == "undefined")
      localStorage.username = prompt("What is your good name?");
  $("#chatInput").submit(function (e) {
    e.preventDefault();
    addMessage($("textarea").val(), localStorage.username);
  });
  $("textarea").keydown(function (e) {
    if (e.which == 13) {
      addMessage($(this).val(), localStorage.username);
      return false;
    }
  });
});
