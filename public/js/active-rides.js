function displayDriverInfo(event){
  if (document.getElementById("ReservationPopUp") != null){
    document.getElementById("ReservationPopUp").remove();
  }
  var id = event.parentNode.parentNode.id;
  var node = document.getElementById(id);
  var children = document.getElementById(id).getElementsByTagName("td");
  var template = 
  `
  <div id="ReservationPopUp" class="card m-5 p-3">
    <div class="d-flex justify-content-between mb-4">
      <h3> Reservation Client: <strong>${children[1].textContent}</strong> </h3>   
      <button class="btn btn-danger" onClick="removePopUp(this)"> Close
    </div>
    <div>
      <div>
        <p> <u>User Information</u> </p>
        <div> <strong>Organization:</strong> ${children[0].textContent} </div>
        <div> <strong>Telephone:</strong> ${children[2].textContent} </div>
        <div> <strong>Appointment Reason:</strong> ${children[3].textContent} </div>
      </div>
      <div>
        <p><u>Driver Information</u></p>
        <div> <strong>Driver Name: </strong> ${node.dataset.dname} </div>
        <div> <strong>Driver Rating:</strong> ${node.dataset.drating} </div>
        <div> <strong>Driver Model:</strong> ${node.dataset.dmodel} </div>
        <div> <strong>Driver Location: </strong> <br/> Latitude: ${node.dataset.dlocationlat} Longitude: ${node.dataset.dlocationlong}</div>

      </div>
    </div>
  </div>
  `
  document.getElementById("mainContainer").insertAdjacentHTML("beforeend", template); 
}

function removePopUp(){
  document.getElementById("ReservationPopUp").remove();
}