// Variables to be used in multiple functions.
var results;
var phoneticsAudio;

// Uses Waves.min.js library to add a wave effect to button clicking.
Waves.attach("button, html, body");
Waves.init();

// A fucntion used to get the dictionary output given user input word.
async function fetchData()
{
  // Base URL to add to when fetching.
  let baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  // Stores word to append to URL from user input.
  let input1 = $("#input").val();

  // Appends word to the end of the URL.
  let userURL = baseURL + input1;

  console.log(userURL);

  // Fetches as the new URL
  const response = await fetch(userURL);
  // If response is received, edit the html.
  if (response.ok)
  {
    // Made a JSON for accessing.
    results = await response.json();

    html = "";

    // Stores the word from the JSON in "word"
    let word = results[0].word;
    // Stores the words part of speech.
    let partOfSpeech = results[0].meanings[0].partOfSpeech;
    // Stores audio pronunciation of word.
    phoneticsAudio = results[0].phonetics[0].audio;
    // Stores the words definiton.
    let definition = results[0].meanings[0].definitions[0].definition;

    // Assigns stored values from JSON and puts them in HTML.
    document.getElementById("Word").innerHTML = word;
    document.getElementById("POS").innerHTML = partOfSpeech;
    document.getElementById("def").innerHTML = definition;
    document.getElementById("audioTag").href = phoneticsAudio;

    // Makes the output visible to the user.
    $("#output").css("visibility", "visible");

    // Shows original defniiton and hides alternative definiton.
    $("#original").show("slow");
    $("#alt").hide("slow");

    // Clears input box from where the user typed their word.
    document.getElementById("input").value = "";
    
  }

  // If there is an issue fetching, alert the user the word is not found.
  else
  {
    alert("Word not found!");
  }
}

// Function that checks if there is an alternative defintion and then displays it if so.
function checkAlt()
{

  // Uninitialzied variables.
  let alternativeDef = "";
  let altPartOfSpeech = "";
  let altWord = ""

  // Stores the current defintion the dictionary is presenting.
  let currentDef = 1

  // If their is an alternative definiton, display it.
  //if (results[0].meanings[currentDef].definitions[0].definition != null)
  try
  {
      // Stores values from JSON in empty variables
      altWord = results[0].word;
      alternativeDef = results[0].meanings[currentDef].definitions[0].definition;
      altPartOfSpeech = results[0].meanings[currentDef].partOfSpeech;

      // Increments the current defintion in JSON.
      currentDef += 1;

      // Hides original defintion and displays alternative definiton.
      $("#original").hide("slow");
      $("#alt").show("slow");
  }

  // If there is no alternative defintion, display there is no alternative defintion.
  catch
  {
    alternativeDef = "There is no Alternative Definition.";

    document.getElementById("altDef").style.color = "red";

    // Hides original defintion and displays alternative definiton.
    $("#original").hide("slow");
      $("#alt").show("slow");
  }

  // Makes alternative outpus visible.
  $("#alt").css("visibility", "visible");

  // Outputs JSON values into HTML.
  document.getElementById("altWord").innerHTML = altWord;
  document.getElementById("altDef").innerHTML = alternativeDef;
  document.getElementById("altPOS").innerHTML = altPartOfSpeech;


}

// Fucntion that gets the user back to the original defintion.
function back()
{
  $("#alt").hide("slow");
  $("#original").show("slow");
}

// Button calls fetchData().
$("#convertBtn").click(fetchData);
// Button calls checkAlt().
$("#altBtn").click(checkAlt);
// Button calls back().
$("#back").click(back);

// If the user hits enter, call fetchData().
function keyboardInput()
{
  if (event.key === 'Enter')
  {
    fetchData();
  }
}

// If the user hits the keyboard, check its input for enter.
document.addEventListener('keypress', keyboardInput);

function playAudio()
{
  let audio = new Audio(phoneticsAudio);
  audio.play();
}