$(document).ready(function(){

  // function to list all current to-do list items
  var refreshTasks = function () {
    $.ajax({
      type: 'GET',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=191',
      dataType: 'json', 
      success: function (response, textStatus) {
        // clear existing tasks from html
        $("#to-do-list").empty();
        // add task list to html with delete buttons
        response.tasks.forEach(function (task) {
          $('#to-do-list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button>');
        })
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }
  
  // function to add a new to-do list item 
  var createTask = function () {
    $.ajax({
      type: 'POST',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=191',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#new-task').val()
        }
      }),
      success: function (response, textStatus) {
        // clear new task box
        $('#new-task').val('');
        // refresh tasks
        refreshTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  // click event for add button
  $('#new-to-dos').on('submit', function (e) {
    e.preventDefault();
    createTask();
  });

  // function to delete a to-do list item
  var deleteTask = function(id) {
    $.ajax({
      type: 'DELETE',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=191',
      success: function (response, textStatus) {
        refreshTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  // click event for delete buttons
  $(document).on('click', '.delete', function () {
    deleteTask($(this).data('id'));
  });

  refreshTasks();
});