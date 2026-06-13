// Change this one value to switch between live API and custom bank
// 'live'   = Open Trivia DB (needs internet)
// 'custom' = your own questions.json (works offline)
const QUESTION_MODE ='live'

const CATEGORY_MAP ={
    fire : 'science',
    water: 'geography',
    electric: 'technology',
    normal: 'history'

}

const TRIVIA_CATEGORY_IDS={
    science: 17,
    geography: 22,
    technology: 18,
    history: 23
}

async function getQuestion(moveType){
    const category = CATEGORY_MAP[moveType]
    if(QUESTION_MODE === 'live'){
    
        return await getTriviaQuestion(category)
    }
    
    if(QUESTION_MODE === 'custom'){
        return await getCustomQuestion(category)
    }
}//end getQuestion

async function getCustomQuestion(category){
    try{
    const response = await fetch('../questions.json')

       if(!response.ok){
        throw new Error('Failed to load questions')
    }
    const data = await response.json()

    const questions = data.questions
     
    const filtered = questions.filter(q => q.category ===category)

    if(filtered.length ===0){
        throw new Error('No questions found for category: ' + category)
    }

    const random= Math.floor(Math.random() * filtered.length)
    return filtered[random]
}catch(error){
    console.error('Error loading questions:', error)

    //Fallback Question
    return{
        text: 'What does HTML stand for?',
        category:'technology',
        options: ['A: HyperText Markup Language', 'B: High Transfer Markup Language', 'C: HyperText Media Language', 'D: Home Tool Markup Language'],
        correct: 'A'
    }
}
}//end getCustomQuestion

async function getTriviaQuestion(category){
    try{
    const categoryId = TRIVIA_CATEGORY_IDS[category]
    const response = await fetch(`https://opentdb.com/api.php?amount=1&category=${categoryId}&type=multiple`)

    if(!response.ok){
        throw new Error('Failed to fetch trivia question')
    }
    const data = await response.json()

    if(data.response_code !== 0 || data.results.length ===0){
        throw new Error('No questions returned from API')
    }

    const random = Math.floor(Math.random() *data.results.length)
    const raw = data.results[random]

    const allAnswers = [...raw.incorrect_answers, raw.correct_answer].map(decodeHTML)

    console.log("allAnswers:", allAnswers)
    console.log("Array?", Array.isArray(allAnswers))

    const shuffled= shuffleArray(allAnswers)

    console.log("shuffled:", shuffled)
    console.log("raw.correct_answer:", raw.correct_answer)

    const labels =['A', 'B', 'C', 'D']
    const options = shuffled.map((ans,i) => `${labels[i]} : ${ans}`)

    const correctIndex = shuffled.findIndex(ans => decodeHTML(ans.trim()) === decodeHTML(raw.correct_answer.trim()))
    if(correctIndex === -1){
        throw new Error('Correct answer not found in options')
    }

    const correct = labels[correctIndex]

    return {
      text:     decodeHTML(raw.question),
      options:  options,
      correct:  correct,
      category: category
    }
}catch(error){
    console.warn('Live question failed, falling back to custom:', error.message)
    // Always fall back to custom if live fails
    return await getCustomQuestion(category)
} 
}//end getTriviaQuestion

function shuffleArray(array){
    const arry = [...array]

    //Fisher-Yates Shuffle
    for(let i =arry.length -1; i>0 ;i--){
        const j = Math.floor(Math.random() * (i+1));
        [arry[i],arry[j]] = [arry[j],arry[i]]
    }
    return arry;

}//end shuffleArray

function decodeHTML(str){
    const txt = document.createElement('textarea')
    txt.innerHTML =str
    return txt.value
}//end decodeHTML
