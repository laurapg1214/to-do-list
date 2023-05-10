$.ajax({
  type: 'GET',
  url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=191',
  contentType: 'application/json',
  dataType: 'json',
  data: JSON.stringify({
    task: {
      content: 'Feed the plants'
    }
  }),
  success: function (response, textStatus) {
    console.log(response);
  },
  error: function (request, textStatus, errorMessage) {
    console.log(errorMessage);
  }
});