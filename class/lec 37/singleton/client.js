const Principal = require("../principal");
function suspendStudent(name){
    let principal = new Principal("NItesh")
    principal.suspend(name);
}
function removeStudentSuspension(name){
    let principal = new Principal("NItesh")
    principal.removeSuspension(name);
}