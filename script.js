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
        // add task list to html
        response.tasks.forEach(function (task) {
          $('#to-do-list').prepend('<div class="row newTask"><p class="col-1"><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '></p><p class="col-10">' + task.content + '</p><div class="col-1"><button class="delete" data-id="' + task.id + '">🗙</button></div></div>');
        });
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

  // function to mark task complete
  var taskComplete = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=191',
      dataType: 'json',
      success: function(response, textStatus) {
        refreshTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  // function to mark task active
  var taskActive = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=191',
      dataType: 'json',
      success: function(response, textStatus) {
        refreshTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  // link checkbox to taskComplete/taskActive functions
  $(document).on('change', '.mark-complete', function () {
    if (this.checked) {
      taskComplete($(this).data('id'));
    } else {
      taskActive($(this).data('id'));
    }
  });

  // function to deactivate active class of buttons
    var deactivate = function(id) {
      $('#' + id).replaceWith('<button type="button" class="btn btn-success statusButton" data-bs-toggle="button" autocomplete="off" aria-pressed="false" id="' + id + '">' + id + '</button>')
    }

  // event listener for active button
  $('#active').on ('click', function() {
    // filter only active items
    const showTask = document.querySelector('.newTask');
    if (this.completed == 'true') {
      showTask.style.display = 'none';
    } 

    // change active status of currently activated button
    deactivate('all');
    deactivate('complete');
  });

  // TODO event listener for complete button

  // TODO event listener for all button

  refreshTasks();
});