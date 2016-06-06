$(function () {

  var a=0;

  var db = [ [["what","your","name"],["who","are","you"],["may","I","know","you"],["who"]],
             [["hello"],["hey"],["there"],["hi"]],
             [["die"],["shutdown"],["go away"],["close"],["quit"]]


           ];

  var answers = [ ["Baymax","It's Baymax","I am Baymax -- your personal Health care assistant","I am baymax","BAYMAX"],
                  ["yes","hi","hello","ask me ","I am always here"],
                  ["R.I.P","Good Joke","use ctrl plus w","alt plus f4 helps","lol"]

               ];

  var not_answered=["can not get what you are trying to say","I don't get you","I am still learning","Maybe you misspelled ","I could not find what you are looking"];

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
        var k=0;
        var randomNumber;
        var baymax_has_answered=0;
        message=message.toLowerCase();
        for(i=0;i<db.length;i++)
        {
            for(j=0;j<db[i].length;j++)
            {
                for(k=0;k<db[i][j].length;k++)
                {
                if(!message.includes(db[i][j][k]))
                {
                    //addMessage("not found",machineName,true);
                    break;
                }
                if(k==db[i][j].length-1)
                {
                    randomNumber = Math.floor(Math.random()*answers[i].length);
                    addMessage(answers[i][randomNumber],machineName,true);
                    baymax_has_answered=1;
                }
                }
                if(baymax_has_answered)
                {
                    break;
                }
            }
        }
        if(message.includes('book'))
        {
            addMessage("Making an Appointment under the name: " + author + " Right? Reply with yes.", machineName, true);
            a++;
            baymax_has_answered=1;
        }
        if(message.includes('yes')) {
          if(a==1){
           addMessage("Reply with the doctor's number for which an appointment should be made.", machineName, true);
           addMessage("<br/>Doctor #1 <br/>Doctor #2 <br/> Doctor #3 <br/>", machineName, true);
           a++;
           baymax_has_answered=1;

           $(".but_1").show();
        }
        }
        if(message.includes('1'||'2'||'3'))
        {
           if(a==2){
                a++; var number=message;
                baymax_has_answered=1;
            }
        }
        if(a==3){
           addMessage("Appointment under the name: " + author + "<br/> for the Doctor "+number+". Correct? Reply with confirm to proceed.", machineName, true);
          a++;
        }
        if(message.includes('confirm'))
        {
            if(a==4)
            {
            //POST REQUEST HERE
            addMessage("Appointment confirmed",machineName,true);
            baymax_has_answered=1;
            a=0;
            }
        }
        if(!baymax_has_answered)
        {
            randomNumber = Math.floor(Math.random()*not_answered.length);
            addMessage(not_answered[randomNumber],machineName,true);
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
