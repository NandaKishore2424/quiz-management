document.getElementById('createQuizForm')?.addEventListener('submit', function(event) {
  event.preventDefault();

  const title = document.getElementById('quizTitle').value;
  const description = document.getElementById('quizDescription').value;

  const questions = []; // Store quiz questions

  // Loop through questions and gather data
  const questionElements = document.querySelectorAll('.question');
  questionElements.forEach((questionElem, index) => {
      const questionText = questionElem.querySelector('.questionText').value;
      const options = [];
      questionElem.querySelectorAll('.option').forEach((optionElem) => {
          options.push(optionElem.value);
      });
      questions.push({
          question: questionText,
          options: options,
          correctAnswer: questionElem.querySelector('.correctAnswer').value
      });
  });

  const quizData = {
      title,
      description,
      questions
  };

  console.log('Quiz Created:', quizData);
  alert('Quiz Created Successfully!');
});
