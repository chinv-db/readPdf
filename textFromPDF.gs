function extractTextFromPDF() {
  
  //Sheet name, which data will be written
  var sheetName = SpreadsheetApp.getActive().getSheetByName("Sheet1");
  //Folder ID, which have all pdf file
  var folder = DriveApp.getFolderById('ID Folder Here');
  var contentsFolder = folder.getFiles();
  var file,fileName,fileType, fileID, count;
  
  //when break, change 1 to break position, and continue
  var breakposition = 1;
  
  count = 0;
  while (contentsFolder.hasNext()) {
    count++;   
    
    if (count < breakposition) {
       file = contentsFolder.next();      
    } else {
      
/// ------------------------------------------------------- Begin Break           
    file = contentsFolder.next();
    fileName = file.getName();
    fileType = fileName.replace(/.*\.{1}/g, "");
    Logger.log(fileName);
    
    //If file is pdf, then work
    if (fileType == 'pdf') {
		fileID = file.getId();    


		//Start find infomation in file

		var url = DriveApp.getFileById(fileID);

		var blob = url.getBlob();
		var resource = {
		title: blob.getName(),
		mimeType: blob.getContentType()
		};

		// Enable the Advanced Drive API Service
		var filePDF = Drive.Files.insert(resource, blob, {ocr: true, ocrLanguage: "en"});

		// Extract Text from PDF file
		var doc = DocumentApp.openById(filePDF.id);
		var text = doc.getBody().getText();
		//var textNums = text.match(/\d{1,3}.{1}\s.*.{1}/g).length;


		//1. Get file name
		var fileName = url;
		//2. Get Ad Account Name
		var adAccNameString = text.match(/Receipt\sfor\s.*\sAccount\sID/g).toString();
		var adAccountName = adAccNameString.replace(/Receipt\sfor\s/g, "").replace(/\sAccount\sID/gi, "");
		//3. Get Ad Account ID
		var adAccIdString = text.match(/Account\sID:\s\d{15,20}\s/g).toString();
		var adAccountID = adAccIdString.replace(/Account\sID:\s/g, "").replace(/\s/gi, "");      
		//4. Get Reference Number
		var refNumberString = text.match(/Reference Number:\s\w{10}\s/g).toString();
		var referenceNumber = refNumberString.replace(/Reference Number:\s/g, "").replace(/\s/gi, "");      
		//5. Get Transaction ID
		var traIdString = text.match(/Transaction\sID\s\d{15,20}-\d{5,10}/g).toString();
		var transactionID = traIdString.replace(/Transaction\sID\s/g, "");
		//6. Get Paid
		var paidString = text.match(/(Paid|Failed|Refunded)\s.*\sVND/g).toString(); 
		var paidStatus = paidString.replace(/\s₫.*\sVND/g, "");
		var paid = paidString.replace(/(Paid|Failed|Refunded)\s₫/g, "").replace(/\sVND/gi, "");      
		//7. Get payment date
		var paymentDateString = text.match(/Payment\sDate\s.*\s/g).toString();
		var paymentDate = paymentDateString.replace(/Payment\sDate\s/g, "").replace(/\s$/gi, "");  
		//8. Get payment method
		var paymentMethodString = text.match(/Payment\sMethod\s.*\d{4}\s/g).toString();
		var paymentMethod = paymentMethodString.replace(/Payment\sMethod\s/g, "").replace(/\s$/gi, "");

		//Write to file


		if (paidStatus == 'Paid') {
		 sheetName.appendRow([url,adAccountName,adAccountID,referenceNumber,transactionID,paid,paymentDate,paymentMethod,paidStatus,count]);
		 } else {
		  continue
		};
          
    //End find infomation in file       
    } 
    //If file is not pdf, then move on
    else {
       continue
    };     
      
/// ------------------------------------------------------- End Break      
    };    
  };
}
