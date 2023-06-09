$(document).ready(function(){

  // function to list all current to-do list items
  var refreshTasks = function (toggleStatus) {
    $.ajax({
      type: 'GET',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=191',
      dataType: 'json', 
      success: function (response, textStatus) {
        // clear existing tasks from html
        $("#to-do-list").empty();
        // sort tasks
        var sortedTasks = response.tasks.sort(function (a, b) {
          if(a.created_at < b.created_at) return -1;
          if(a.created_at > b.created_at) return 1;
          return 0;
        });
        console.log(sortedTasks);
        // add task list to html
        response.tasks.forEach(function (sortedTask) {
          // function to create list
          var createList = function () {
            $('#to-do-list').prepend('<div class="row newTask"><p class="col-1"><input type="checkbox" class="mark-complete" data-id="' + sortedTask.id + '"' + (sortedTask.completed ? 'checked' : '') + '></p><p class="col-10">' + sortedTask.content + '</p><div class="col-1"><button class="delete" data-id="' + sortedTask.id + '">🗙</button></div></div>');   
          }
          // toggle 'active'/'complete'/'all'
          if (toggleStatus == 'active') {
            if (!sortedTask.completed) {
              createList();
            }
          } else if (toggleStatus == 'complete') {
            if (sortedTask.completed) {
              createList();
            }
          } else {
            createList();
          }
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

  // event listener for active button
  $('#active').on('click', function() {
    refreshTasks('active');
  });

  // event listener for complete button
  $('#complete').on('click', function() {
     refreshTasks('complete');
   });

  // event listener for all button
  $('#all').on('click', function() {
     refreshTasks('all');
   });

  refreshTasks('all');
});