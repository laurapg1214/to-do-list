$(document).ready(function(){
  
  $.ajax({
    type: 'DELETE',
    url: 'https://fewd-todolist-api.onrender.com/tasks/3115?api_key=191',
    success: function (response, textStatus) {
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });

  $.ajax({
    type: 'GET',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=191',
    dataType: 'json', 
    success: function (response, textStatus) {
      console.log(response);
      response.tasks.forEach(function (task) {
        $('#to-do-list').append('<p>' + task.content + '</p>');
      })
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
});