const botResponses = [
    { responseText: "I am feeling great!", action: "suggest_feedback", intent: "CheckIn", followUpQuestionIndex: 1 },
    { responseText: "I am a bit stressed.", action: "suggest_help", intent: "CheckIn", followUpQuestionIndex: 2 },
    { responseText: "I need help with something.", action: "request_assistance", intent: "RequestHelp", followUpQuestionIndex: 3 },
    { responseText: "Not right now, thanks.", action: "end_conversation", intent: "CheckIn", followUpQuestionIndex: null },
    { responseText: "I am facing a technical issue.", action: "log_issue", intent: "ReportIssue", followUpQuestionIndex: 4 },
    { responseText: "I appreciate the support from my team.", action: "log_positive_feedback", intent: "ExpressGratitude", followUpQuestionIndex: 5 },
    { responseText: "Can you clarify the task details?", action: "provide_clarification", intent: "AskForClarification", followUpQuestionIndex: 6 },
    { responseText: "I have a suggestion to improve our process.", action: "log_suggestion", intent: "SuggestImprovement", followUpQuestionIndex: 6 },
    { responseText: "Just wanted to have a quick chat.", action: "social_chat", intent: "SocialChat", followUpQuestionIndex: 1 },
    { responseText: "I am frustrated with the current workload.", action: "suggest_help", intent: "ReportIssue", followUpQuestionIndex: 2 },
    { responseText: "The leadership has been excellent.", action: "log_positive_feedback", intent: "ExpressGratitude", followUpQuestionIndex: 3 },
  ];
  
  module.exports = botResponses;
  