// ---------- MAIN PROCESS ----------
function processInput(userText) {


  if (!userText)
    throw new Error("Empty command received.");


  var parts = userText.split(",");


  if (parts.length < 3) {
    throw new Error(
      "Use:\nAdd 5 USB Drives, New, Location: Lab 2"
    );
  }


  var quantity =
    parts[0].match(/\d+/);


  if (!quantity)
    throw new Error(
      "Quantity not found."
    );


  quantity =
    parseInt(quantity[0]);


  var itemName =
    parts[0]
    .replace(/\d+/g, "")
    .replace(/add/i, "")
    .trim();


  var condition =
    parts[1].trim();


  var location =
    parts[2]
    .replace(/location:/i, "")
    .trim();




  itemName =
    standardizeCategory(
      itemName
    );


  condition =
    toTitleCase(
      condition
    );


  location =
    toTitleCase(
      location
    );


  var category =
    itemName;




  if (
    isDuplicate(
      itemName,
      location
    )
  ) {


    return (
      "Duplicate skipped\n\n" +
      itemName +
      " already exists in " +
      location
    );


  }




  addInventory(
    itemName,
    category,
    quantity,
    condition,
    location
  );




  return (
    "Inventory Added ✅\n\n" +
    "Item: " + itemName +
    "\nQty: " + quantity +
    "\nCondition: " + condition +
    "\nLocation: " + location
  );


}






// ---------- ADD ----------
function addInventory(
  itemName,
  category,
  quantity,
  condition,
  location
) {


  var SHEET_ID =
  "1hYFM5SFdnGey7_5Ow3DZrPiL1WlV16oHtH7p5lGdSso";


  var sheet =
    SpreadsheetApp
      .openById(SHEET_ID)
      .getSheetByName("Sheet1");


  if (!sheet) {
    throw new Error(
      "Sheet1 not found."
    );
  }


  sheet.appendRow([
    itemName,
    category,
    quantity,
    condition,
    location,
    new Date()
  ]);


}






// ---------- FORMAT ----------
function toTitleCase(text) {


  return String(text)
    .toLowerCase()
    .replace(
      /\b\w/g,
      function(c) {
        return c.toUpperCase();
      }
    );


}






// ---------- CATEGORY ----------
function standardizeCategory(
  itemName
) {


  const map = {


    Laptop: [
      "laptop",
      "laptops"
    ],


    CPU: [
      "cpu",
      "processor"
    ],


    "USB Drive": [
      "usb",
      "usb drive",
      "usbdrive",
      "pen drive",
      "flash drive"
    ],


    HDD: [
      "hdd",
      "harddrive",
      "hard drive",
      "hard disk",
      "harddisk"
    ]


  };


  itemName =
    itemName
    .toLowerCase()
    .replace(
      /\s+/g,
      ""
    );


  for (
    var standard in map
  ) {


    if (


      map[
        standard
      ].some(


        function(v) {


          return (
            v
            .replace(
              /\s+/g,
              ""
            )


            ===


            itemName


          );


        }


      )


    ) {


      return standard;


    }


  }


  return toTitleCase(
    itemName
  );


}






// ---------- DUPLICATE ----------
function isDuplicate(
  itemName,
  location
) {


  var sheet =
    SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(
      "Sheet1"
    );


  if (
    !sheet ||
    sheet.getLastRow() < 2
  )
    return false;


  var rows =
    sheet
    .getRange(
      2,
      1,
      sheet.getLastRow() - 1,
      5
    )
    .getValues();


  for (
    var i = 0;
    i < rows.length;
    i++
  ) {


    if (


      String(
        rows[i][0]
      ).toLowerCase()


      ===


      itemName.toLowerCase()


      &&


      String(
        rows[i][4]
      ).toLowerCase()


      ===


      location.toLowerCase()


    ) {


      return true;


    }


  }


  return false;


}






// ===================================================
// GOOGLE CHAT
// ===================================================


// function onAppCommand(e) {


//   return {
//     text:
//       "InventoryAgentBot active"
//   };


// }






function onAddedToSpace(e) {


  return {


    text:
      "Hello 👋\n\n" +
      "Example:\n" +
      "Add 5 HDD, New, Location: Lab 2"


  };


}






function onMessage(event) {


  try {


    Logger.log("FULL EVENT:");
    Logger.log(JSON.stringify(event));


    var text =
      event.chat
      .messagePayload
      .message
      .argumentText
      ||
      event.chat
      .messagePayload
      .message
      .text;


    Logger.log("TEXT = " + text);


    var result =
      processInput(text);


    Logger.log("RESULT = " + result);


    return {
      text: result
    };


  }


  catch (err) {


    Logger.log(
      "ERROR = " +
      err.toString()
    );


    return {
      text:
        "ERROR:\n" +
        err.toString()
    };


  }


}




function onRemovedFromSpace(e) {


  return {
    text:
      "Bot removed"
  };


}






// ---------- LOCAL TEST ----------
function testChat() {


  Logger.log(


    processInput(


      "Add 3 harddrive, Used, Location: Lab 6"


    )


  );


}

