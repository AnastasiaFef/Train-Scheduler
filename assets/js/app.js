$(document).ready(function(){
	var away=0;
	var frequency;
	var first;
	var index=0;


	//create config and initialize firebase
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyCEB4quaq0Fr9TgdN0LYmyHTH7tKz8DFmg",
		authDomain: "train-scheduler-be5f9.firebaseapp.com",
		databaseURL: "https://train-scheduler-be5f9.firebaseio.com",
		projectId: "train-scheduler-be5f9",
		storageBucket: "",
		messagingSenderId: "111239225204"
	};
	firebase.initializeApp(config);

	// var trains = firebase.database().ref("train/");


	//Create a var to reference firebase
	var database=firebase.database();

	// (make sure can submit with Enter key) to .welcome
	$(document).keyup(".start",function() {
		  if (event.keyCode == 13) {
		  	new_train();
		  }
		  else{return;}
	});

	// on click #add_train_button
	$(document).on("click","#add_train_button", new_train);

	//store the data
	function new_train(){
		var name=$("#train-name").val().trim();
		var destination=$("#destination").val().trim();
		var first_val=$("#first").val().trim();
		first=moment(first_val, "HHmm").format("hh:mm A");
		var frequency_val=$("#frequency").val().trim();
		frequency= moment(frequency_val, "mm").format("mm");

		console.log("firts "+first)

		//if not all data entered - alert
		if(!(name && destination && first && frequency)){
			alert('please fill all fields');
			return;
		}

		if((first== "Invalid date")||(frequency== "Invalid date")){
			alert("Please enter valid time: First Train Time: 0001 to 2400 and Frequency: 1 to 59");
			return;
		}

		database.ref().push({
			name: name,
			destination: destination,
			first_train: first,
			frequency:frequency
		});

		index++;



		console.log("New train");
		$("#train-name").val('');
		$("#destination").val('');
		$("#first").val('');
		$("#frequency").val('');
	}
	

	// <tr>
	// 	<td></td>
	// 	<td></td>
	// 	<td></td>
	// 	<td></td>
	// 	<td></td>
	// </tr>

	database.ref().on("child_added", function(data) {

      // Print the initial data to the console.
      console.log(data.val());

      // Log the value of the various properties
      console.log(data.val().name);
      console.log(data.val().destination);
      console.log(data.val().first_train);
      console.log(data.val().frequency);

      when_next_train();

      // Change the HTML
      var tr=$("<tr>");
      var td_name=$("<td>").append(data.val().name);
      var td_destination=$("<td>").append(data.val().destination);
      var td_first=$("<td>").append(data.val().first_train);
      var td_frequency=$("<td>").append(data.val().frequency);
      var td_away=$("<td>").append("5");

      tr.append(td_name).append(td_destination).append(td_first).append(td_frequency).append(td_away)
      $("#table").append(tr);
      // If any errors are experienced, log them to console.
    }, function(errorObject) {
      console.log("Error: " + errorObject.code);
    });

    function when_next_train(){
    	var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm A"));

		//WORK ON THIS SHIT:

		// first=moment(first, "hh:mm A").format("HH:mm");
		// var diffTime = moment().diff(first);
		// console.log("diffTime"+diffTime);

		// away = diffTime % frequency;
		// console.log("away "+away); 
		// console.log("In when_next_train")


    }


})
